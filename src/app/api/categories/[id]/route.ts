import { handle, ok, parseId, readJson } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth/session";
import { categoryInputSchema, categoryPatchSchema } from "@/features/categories/schemas";
import { deleteCategory, getCategory, updateCategory } from "@/features/categories/services/categories.service";

export async function GET(request: Request, ctx: RouteContext<"/api/categories/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await getCategory(id, await isAdminRequest(request)));
  });
}

export async function PUT(request: Request, ctx: RouteContext<"/api/categories/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await updateCategory(id, categoryInputSchema.parse(await readJson(request))));
  });
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/categories/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await updateCategory(id, categoryPatchSchema.parse(await readJson(request))));
  });
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/categories/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await deleteCategory(id));
  });
}
