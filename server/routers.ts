import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getAllPosts, getPostBySlug, createPost, getCategories } from "./db";

// Slug generation helper
function generateSlug(title: string): string {
  const timestamp = Date.now();
  const base = title
    .toLowerCase()
    .replace(/[\s\u4e00-\u9fa5]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  return `${base || "post"}-${timestamp}`;
}

export const appRouter = router({
  posts: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return getAllPosts(input?.category);
      }),

    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await getPostBySlug(input.slug);
        if (!post) throw new Error("Post not found");
        return post;
      }),

    categories: publicProcedure.query(async () => {
      return getCategories();
    }),

    create: publicProcedure
      .input(
        z.object({
          password: z.string(),
          title: z.string().min(1).max(255),
          content: z.string().min(1),
          category: z.string().default("未分类"),
          excerpt: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        if (input.password !== "666") {
          throw new Error("密码错误");
        }
        const slug = generateSlug(input.title);
        const excerpt =
          input.excerpt ||
          input.content
            .replace(/#+\s/g, "")
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/`/g, "")
            .slice(0, 150) + "...";

        await createPost({
          title: input.title,
          slug,
          content: input.content,
          excerpt,
          category: input.category,
          published: 1,
        });
        return { success: true, slug };
      }),
  }),
});

export type AppRouter = typeof appRouter;
