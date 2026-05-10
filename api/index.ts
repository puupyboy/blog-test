import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import serverless from "serverless-http";

const app = express();

// CORS: dynamic origin support for GitHub Pages and local dev
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map(s => s.trim())
    : [];

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  } else if (!origin || allowedOrigins.length === 0) {
    // No origin header (e.g. curl) or no restriction configured
    res.header("Access-Control-Allow-Origin", "*");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Handle preflight requests
app.options("*", (_req, res) => {
  res.sendStatus(200);
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
});

// Mount tRPC on both paths to match dev/prod setups
app.use("/api/trpc", trpcMiddleware);
app.use("/blog-test/api/trpc", trpcMiddleware);

app.get("/", (_req, res) => {
  res.json({ status: "Blog API is running", time: new Date().toISOString() });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default serverless(app);
