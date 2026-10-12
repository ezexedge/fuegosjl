import { handle, ok, readJson } from "@/lib/api";
import { isAdminRequest } from "@/lib/auth/session";
import { productInputSchema, productListQuerySchema } from "@/features/products/schemas";
import { createProduct, listProducts } from "@/features/products/services/products.service";

export async function GET(request: Request) {
  return handle(async () => {
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const query = productListQuerySchema.parse(params);
    const includeAll = Boolean(query.all) && (await isAdminRequest(request));
    return ok(await listProducts(query, includeAll));
  });
}

export async function POST(request: Request) {
  return handle(async () => {
    const input = productInputSchema.parse(await readJson(request));
    return ok(await createProduct(input), 201);
  });
}
