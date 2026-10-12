import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";
import type { HomeCategory, HomeProduct } from "../types";

export async function listHomeCategories(): Promise<HomeCategory[]> {
  return db
    .select({ id: categories.id, name: categories.name, slug: categories.slug, imageUrl: categories.imageUrl })
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.sortOrder), asc(categories.name));
}

export async function listFeaturedProducts(limit: number): Promise<HomeProduct[]> {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      badge: products.badge,
      stock: products.stock,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.isActive, true), eq(products.isFeatured, true), eq(categories.isActive, true)))
    .orderBy(desc(products.createdAt), desc(products.id))
    .limit(limit);
  if (rows.length === 0) return [];

  const images = await db
    .select()
    .from(productImages)
    .where(inArray(productImages.productId, rows.map((r) => r.id)))
    .orderBy(asc(productImages.sortOrder), asc(productImages.id));

  return rows.map((row) => {
    const first = images.find((i) => i.productId === row.id);
    return { ...row, image: first ? { url: first.url, alt: first.alt } : null };
  });
}
