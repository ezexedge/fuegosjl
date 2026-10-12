import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

export function HomeDataSkeleton({ height = 288 }: { height?: number }) {
  return (
    <Container aria-busy="true" sx={{ py: { xs: 14, md: 20 } }}>
      <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" } }}>
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} variant="rectangular" height={height} />
        ))}
      </Box>
    </Container>
  );
}
