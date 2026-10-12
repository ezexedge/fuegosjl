import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ProductWithRelations } from "../types";
import { ProductCard } from "./ProductCard";

export function SimilarProducts({ products }: { products: ProductWithRelations[] }) {
  if (products.length === 0) return null;
  return (
    <Box component="section" aria-labelledby="similar-title" sx={{ mt: { xs: 14, md: 20 } }}>
      <Typography id="similar-title" variant="h3" component="h2" align="center" sx={{ mb: 10 }}>
        Productos similares
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 8 },
          gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}
