import Box from "@mui/material/Box";
import { PageBreadcrumbs } from "@/components/ui/Breadcrumbs";
import { productListQuerySchema } from "../schemas";
import { listCategoryFilterOptions, listProducts } from "../services/products.service";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsPagination } from "./ProductsPagination";

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/** Contenido dinámico del listado: lee filtros de la URL y datos de la base. */
export async function ProductsListing({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const raw = await searchParams;
  const parsed = productListQuerySchema.safeParse({
    page: first(raw.page),
    category: first(raw.category),
    search: first(raw.search),
  });
  const query = parsed.success ? parsed.data : productListQuerySchema.parse({});

  const [result, categories] = await Promise.all([listProducts(query, false), listCategoryFilterOptions()]);

  const hrefFor = (page: number) => {
    const params = new URLSearchParams();
    if (query.category) params.set("category", query.category);
    if (query.search) params.set("search", query.search);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/productos?${qs}` : "/productos";
  };

  return (
    <>
      <Box sx={{ display: "grid", justifyItems: "center", gap: 3, mb: 10 }}>
        <PageBreadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Productos" }]} />
        <ProductsFilter categories={categories} category={query.category ?? ""} search={query.search ?? ""} />
      </Box>
      <ProductsGrid products={result.items} />
      <ProductsPagination
        page={result.pagination.page}
        totalPages={result.pagination.totalPages}
        hrefFor={hrefFor}
      />
    </>
  );
}
