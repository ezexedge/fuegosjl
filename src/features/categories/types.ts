import type { Category } from "@/db/schema";

export type CategoryWithCount = Category & { productCount: number };
