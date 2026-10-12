import { and, asc, count, eq, getTableColumns, ilike, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { conflict, notFound } from "@/lib/errors";
import { paginated, type Paginated } from "@/lib/schemas";
import type { CategoryInput, CategoryListQuery, CategoryPatch } from "../schemas";
import type { CategoryWithCount } from "../types";

const productCount = sql<number>`(select count(*)::int from ${products} where ${products.categoryId} = ${categories.id})`;

export async function listCategories(
  query: CategoryListQuery,
  includeInactive: boolean,
): Promise<Paginated<CategoryWithCount>> {
  const filters: SQL[] = [];
  if (!includeInactive) filters.push(eq(categories.isActive, true));
  if (query.search) filters.push(ilike(categories.name, `%${query.search}%`));
  const where = filters.length ? and(...filters) : undefined;

  const [items, [{ total }]] = await Promise.all([
    db
      .select({ ...getTableColumns(categories), productCount })
      .from(categories)
      .where(where)
      .orderBy(asc(categories.sortOrder), asc(categories.name))
      .limit(query.limit)
      .offset((query.page - 1) * query.limit),
    db.select({ total: count() }).from(categories).where(where),
  ]);
  return paginated(items, query.page, query.limit, total);
}

export async function getCategory(id: number, includeInactive: boolean): Promise<CategoryWithCount> {
  const [row] = await db
    .select({ ...getTableColumns(categories), productCount })
    .from(categories)
    .where(includeInactive ? eq(categories.id, id) : and(eq(categories.id, id), eq(categories.isActive, true)));
  if (!row) throw notFound("Categoría");
  return row;
}

export async function createCategory(input: CategoryInput) {
  const [row] = await db.insert(categories).values(input).returning();
  return row;
}

export async function updateCategory(id: number, patch: CategoryPatch) {
  const [row] = await db.update(categories).set(patch).where(eq(categories.id, id)).returning();
  if (!row) throw notFound("Categoría");
  return row;
}

export async function deleteCategory(id: number) {
  const [{ total }] = await db.select({ total: count() }).from(products).where(eq(products.categoryId, id));
  if (total > 0) {
    throw conflict(
      `No se puede eliminar: la categoría tiene ${total} producto${total === 1 ? "" : "s"}. Eliminá o movés los productos primero.`,
    );
  }
  const [row] = await db.delete(categories).where(eq(categories.id, id)).returning({ id: categories.id });
  if (!row) throw notFound("Categoría");
  return row;
}
