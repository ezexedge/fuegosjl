import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ProductWithRelations } from "../types";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({ products }: { products: ProductWithRelations[] }) {
  if (products.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 16 }}>
        No encontramos productos con esos filtros.
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 4, md: 8 },
        rowGap: { xs: 8, md: 12 },
        gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
