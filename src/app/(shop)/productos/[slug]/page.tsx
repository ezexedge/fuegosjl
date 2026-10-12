import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { ProductDetail } from "@/features/products/components/ProductDetail";
import { ProductDetailSkeleton } from "@/features/products/components/ProductDetailSkeleton";

export const metadata: Metadata = { title: "Producto" };

export default function ProductPage(props: PageProps<"/productos/[slug]">) {
  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail params={props.params} />
      </Suspense>
    </Container>
  );
}
