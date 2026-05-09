import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { posts, InsertPost, Post } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
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

// ---- Posts ----

export async function getAllPosts(category?: string): Promise<Post[]> {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(posts.published, 1)];
  if (category && category !== "全部") {
    conditions.push(eq(posts.category, category));
  }
  return db
    .select()
    .from(posts)
    .where(and(...conditions))
    .orderBy(desc(posts.createdAt));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, 1)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPost(data: InsertPost): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(posts).values(data);
  return { id: Number((result as any)[0]?.insertId ?? 0) };
}

export async function getCategories(): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .selectDistinct({ category: posts.category })
    .from(posts)
    .where(eq(posts.published, 1));
  return result.map((r: { category: string }) => r.category);
}
