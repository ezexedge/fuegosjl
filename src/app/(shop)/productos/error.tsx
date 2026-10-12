"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProductsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Box sx={{ display: "grid", justifyItems: "center", gap: 4, py: 16 }}>
      <Typography>No pudimos cargar los productos.</Typography>
      <Button variant="outlined" color="secondary" onClick={reset}>
        Reintentar
      </Button>
    </Box>
  );
}
