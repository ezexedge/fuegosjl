import { handle, ok, readJson } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth/session";
import { categoryInputSchema, categoryListQuerySchema } from "@/features/categories/schemas";
import { createCategory, listCategories } from "@/features/categories/services/categories.service";

export async function GET(request: Request) {
  return handle(async () => {
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const query = categoryListQuerySchema.parse(params);
    const includeAll = Boolean(query.all) && (await isAdminRequest(request));
    return ok(await listCategories(query, includeAll));
  });
}

export async function POST(request: Request) {
  return handle(async () => {
    const input = categoryInputSchema.parse(await readJson(request));
    return ok(await createCategory(input), 201);
  });
}
