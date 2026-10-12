import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";

export default function ProductNotFound() {
  return (
    <Box sx={{ display: "grid", justifyItems: "center", gap: 4, py: 16 }}>
      <Typography variant="h3" component="h1">
        Producto no encontrado
      </Typography>
      <Typography color="text.secondary">Puede que ya no esté disponible.</Typography>
      <Button component={AppLink} href="/productos" variant="outlined" color="secondary">
        Ver todos los productos
      </Button>
    </Box>
  );
}
