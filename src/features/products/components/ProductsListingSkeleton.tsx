import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function ProductsListingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Box
      aria-busy="true"
      aria-label="Cargando productos"
      sx={{
        display: "grid",
        gap: { xs: 4, md: 8 },
        rowGap: { xs: 8, md: 12 },
        gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <Box key={i}>
          <Skeleton variant="rectangular" sx={{ aspectRatio: "1 / 1", height: "auto" }} />
          <Skeleton sx={{ mt: 3 }} />
          <Skeleton width="60%" />
        </Box>
      ))}
    </Box>
  );
}
