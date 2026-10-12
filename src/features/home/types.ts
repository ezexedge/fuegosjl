import type { Category, Product } from "@/db/schema";

export type HomeCategory = Pick<Category, "id" | "name" | "slug" | "imageUrl">;

export type HomeProduct = Pick<
  Product,
  "id" | "name" | "slug" | "price" | "badge" | "stock"
> & { image: { url: string; alt: string | null } | null };
