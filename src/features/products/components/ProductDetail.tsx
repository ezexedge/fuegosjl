import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { PageBreadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceError } from "@/lib/errors";
import { getProductBySlug, listProducts } from "../services/products.service";
import { ProductGallery } from "./ProductGallery";
import { ProductPurchase } from "./ProductPurchase";
import { ProductShare } from "./ProductShare";
import { SimilarProducts } from "./SimilarProducts";

const SIMILAR_COUNT = 4;

/** Contenido dinámico del detalle: resuelve el slug y lee de la base. */
export async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch((err: unknown) => {
    if (err instanceof ServiceError && err.status === 404) return null;
    throw err;
  });
  if (!product) notFound();

  const similar = await listProducts(
    { page: 1, limit: SIMILAR_COUNT, category: product.category.slug, exclude: product.id },
    false,
  );

  return (
    <>
      <Box sx={{ display: "grid", gap: { xs: 6, md: 12 }, gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, alignItems: "start" }}>
        <Box sx={{ display: "grid", gap: 6 }}>
          <ProductGallery images={product.images} name={product.name} />
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <ProductShare name={product.name} />
          </Box>
        </Box>

        <Box sx={{ display: { xs: "contents", lg: "grid" }, gap: 5, alignContent: "start" }}>
          <Box sx={{ order: { xs: -1, lg: 0 } }}>
          <PageBreadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: product.category.name, href: `/productos?category=${product.category.slug}` },
              { label: product.name },
            ]}
          />
          </Box>
          <Typography variant="h2" component="h1">
            {product.name}
          </Typography>
          <ProductPurchase product={product} />
          {product.description ? (
            <>
              <Divider />
              <Typography variant="body1" sx={{ fontWeight: 600, whiteSpace: "pre-line" }}>
                {product.description}
              </Typography>
            </>
          ) : null}
          <Box sx={{ display: { lg: "none" } }}>
            <ProductShare name={product.name} />
          </Box>
        </Box>
      </Box>
      <SimilarProducts products={similar.items} />
    </>
  );
}
