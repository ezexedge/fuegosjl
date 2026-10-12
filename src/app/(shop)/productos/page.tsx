import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ProductsListing } from "@/features/products/components/ProductsListing";
import { ProductsListingSkeleton } from "@/features/products/components/ProductsListingSkeleton";

export const metadata: Metadata = { title: "Productos" };

export default function ProductsPage(props: PageProps<"/productos">) {
  return (
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <Typography variant="h2" component="h1" align="center" sx={{ mb: 4 }}>
        Productos
      </Typography>
      <Suspense fallback={<ProductsListingSkeleton />}>
        <ProductsListing searchParams={props.searchParams} />
      </Suspense>
    </Container>
  );
}
