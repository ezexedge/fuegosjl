import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function ProductDetailSkeleton() {
  return (
    <Box
      aria-busy="true"
      aria-label="Cargando producto"
      sx={{ display: "grid", gap: { xs: 6, md: 12 }, gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" } }}
    >
      <Skeleton variant="rectangular" sx={{ aspectRatio: "4 / 3", height: "auto" }} />
      <Box sx={{ display: "grid", gap: 3, alignContent: "start" }}>
        <Skeleton width="50%" />
        <Skeleton height={48} />
        <Skeleton width="40%" height={36} />
        <Skeleton width="70%" />
        <Skeleton height={48} />
      </Box>
    </Box>
  );
}
