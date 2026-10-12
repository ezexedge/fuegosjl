import { and, asc, count, desc, eq, ilike, inArray, ne, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";
import { notFound, ServiceError } from "@/lib/errors";
import { paginated, type Paginated } from "@/lib/schemas";
import type { ProductInput, ProductListQuery, ProductPatch } from "../schemas";
import type { ProductWithRelations } from "../types";

async function attachImages(
  rows: { product: typeof products.$inferSelect; category: ProductWithRelations["category"] }[],
): Promise<ProductWithRelations[]> {
  if (rows.length === 0) return [];
  const images = await db
    .select()
    .from(productImages)
    .where(inArray(productImages.productId, rows.map((r) => r.product.id)))
    .orderBy(asc(productImages.sortOrder), asc(productImages.id));
  return rows.map(({ product, category }) => ({
    ...product,
    category,
    images: images.filter((i) => i.productId === product.id),
  }));
}

const categoryColumns = { id: categories.id, name: categories.name, slug: categories.slug };

export async function listProducts(
  query: ProductListQuery,
  includeInactive: boolean,
): Promise<Paginated<ProductWithRelations>> {
  const filters: SQL[] = [];
  if (!includeInactive) {
    filters.push(eq(products.isActive, true), eq(categories.isActive, true));
  }
  if (query.category) {
    filters.push(
      /^\d+$/.test(query.category)
        ? eq(products.categoryId, Number(query.category))
        : eq(categories.slug, query.category),
    );
  }
  if (query.search) filters.push(ilike(products.name, `%${query.search}%`));
  if (query.featured) filters.push(eq(products.isFeatured, true));
  if (query.exclude) filters.push(ne(products.id, query.exclude));
  const where = filters.length ? and(...filters) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select({ product: products, category: categoryColumns })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .orderBy(desc(products.isFeatured), desc(products.createdAt), desc(products.id))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit),
    db
      .select({ total: count() })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(where),
  ]);
  return paginated(await attachImages(rows), query.page, query.limit, total);
}

export async function getProduct(id: number, includeInactive: boolean): Promise<ProductWithRelations> {
  const rows = await db
    .select({ product: products, category: categoryColumns })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(
      includeInactive
        ? eq(products.id, id)
        : and(eq(products.id, id), eq(products.isActive, true), eq(categories.isActive, true)),
    );
  const [product] = await attachImages(rows);
  if (!product) throw notFound("Producto");
  return product;
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations> {
  const rows = await db
    .select({ product: products, category: categoryColumns })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.slug, slug), eq(products.isActive, true), eq(categories.isActive, true)));
  const [product] = await attachImages(rows);
  if (!product) throw notFound("Producto");
  return product;
}

async function assertCategoryExists(categoryId: number) {
  const [row] = await db.select({ id: categories.id }).from(categories).where(eq(categories.id, categoryId));
  if (!row) throw new ServiceError("La categoría indicada no existe", 400);
}

function imageRows(productId: number, images: ProductInput["images"]) {
  return images.map((img, i) => ({ productId, url: img.url, alt: img.alt, sortOrder: i }));
}

export async function createProduct(input: ProductInput) {
  await assertCategoryExists(input.categoryId);
  const { images, ...values } = input;
  const [row] = await db.insert(products).values(values).returning();
  if (images.length > 0) {
    try {
      await db.insert(productImages).values(imageRows(row.id, images));
    } catch (err) {
      await db.delete(products).where(eq(products.id, row.id));
      throw err;
    }
  }
  return getProduct(row.id, true);
}

export async function updateProduct(id: number, patch: ProductPatch) {
  if (patch.categoryId !== undefined) await assertCategoryExists(patch.categoryId);
  const { images, ...values } = patch;
  const hasValues = Object.keys(values).length > 0;

  const [existing] = await db.select({ id: products.id }).from(products).where(eq(products.id, id));
  if (!existing) throw notFound("Producto");

  if (hasValues && images !== undefined) {
    const queries = [
      db.update(products).set(values).where(eq(products.id, id)),
      db.delete(productImages).where(eq(productImages.productId, id)),
      ...(images.length > 0 ? [db.insert(productImages).values(imageRows(id, images))] : []),
    ] as const;
    await db.batch(queries as unknown as Parameters<typeof db.batch>[0]);
  } else if (hasValues) {
    await db.update(products).set(values).where(eq(products.id, id));
  } else if (images !== undefined) {
    await db.delete(productImages).where(eq(productImages.productId, id));
    if (images.length > 0) await db.insert(productImages).values(imageRows(id, images));
  }
  return getProduct(id, true);
}

export async function deleteProduct(id: number) {
  const [row] = await db.delete(products).where(eq(products.id, id)).returning({ id: products.id });
  if (!row) throw notFound("Producto");
  return row;
}
