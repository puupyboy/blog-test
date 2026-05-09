// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/routers.ts
import { z } from "zod";

// server/_core/trpc.ts
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;

// server/db.ts
import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: varchar("category", { length: 100 }).default("\u672A\u5206\u7C7B").notNull(),
  published: int("published").default(1).notNull(),
  // 1 = published, 0 = draft
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function getAllPosts(category) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(posts.published, 1)];
  if (category && category !== "\u5168\u90E8") {
    conditions.push(eq(posts.category, category));
  }
  return db.select().from(posts).where(and(...conditions)).orderBy(desc(posts.createdAt));
}
async function getPostBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(posts).where(and(eq(posts.slug, slug), eq(posts.published, 1))).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createPost(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(posts).values(data);
  return { id: Number(result[0]?.insertId ?? 0) };
}
async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  const result = await db.selectDistinct({ category: posts.category }).from(posts).where(eq(posts.published, 1));
  return result.map((r) => r.category);
}

// server/routers.ts
function generateSlug(title) {
  const timestamp2 = Date.now();
  const base = title.toLowerCase().replace(/[\s\u4e00-\u9fa5]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
  return `${base || "post"}-${timestamp2}`;
}
var appRouter = router({
  posts: router({
    list: publicProcedure.input(z.object({ category: z.string().optional() }).optional()).query(async ({ input }) => {
      return getAllPosts(input?.category);
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      const post = await getPostBySlug(input.slug);
      if (!post) throw new Error("Post not found");
      return post;
    }),
    categories: publicProcedure.query(async () => {
      return getCategories();
    }),
    create: publicProcedure.input(
      z.object({
        password: z.string(),
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        category: z.string().default("\u672A\u5206\u7C7B"),
        excerpt: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      if (input.password !== "666") {
        throw new Error("\u5BC6\u7801\u9519\u8BEF");
      }
      const slug = generateSlug(input.title);
      const excerpt = input.excerpt || input.content.replace(/#+\s/g, "").replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "").slice(0, 150) + "...";
      await createPost({
        title: input.title,
        slug,
        content: input.content,
        excerpt,
        category: input.category,
        published: 1
      });
      return { success: true, slug };
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  return {
    req: opts.req,
    res: opts.res
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss(), jsxLocPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = path2.resolve(import.meta.dirname, "../..", "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "10mb" }));
  app.use(express2.urlencoded({ limit: "10mb", extended: true }));
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
