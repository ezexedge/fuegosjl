import { handle, ok, parseId, readJson } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth/session";
import { productInputSchema, productPatchSchema } from "@/features/products/schemas";
import { deleteProduct, getProduct, updateProduct } from "@/features/products/services/products.service";

export async function GET(request: Request, ctx: RouteContext<"/api/products/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await getProduct(id, await isAdminRequest(request)));
  });
}

export async function PUT(request: Request, ctx: RouteContext<"/api/products/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await updateProduct(id, productInputSchema.parse(await readJson(request))));
  });
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/products/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await updateProduct(id, productPatchSchema.parse(await readJson(request))));
  });
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/products/[id]">) {
  return handle(async () => {
    const id = parseId((await ctx.params).id);
    return ok(await deleteProduct(id));
  });
}
