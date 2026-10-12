import type { Product, ProductImage } from "@/db/schema";

export type ProductWithRelations = Product & {
  category: { id: number; name: string; slug: string };
  images: ProductImage[];
};
