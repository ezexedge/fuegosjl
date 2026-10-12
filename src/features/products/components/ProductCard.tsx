import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { formatPrice, transferPrice } from "@/lib/format";
import type { ProductWithRelations } from "../types";

interface ProductCardProps {
  product: ProductWithRelations;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  return (
    <AppLink
      href={`/productos/${product.slug}`}
      underline="none"
      color="inherit"
      sx={{ display: "flex", flexDirection: "column", textAlign: "center", gap: 1, "&:hover .product-name": { color: "accent.main" } }}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: "1 / 1",
          bgcolor: "background.paper",
          mb: 3,
        }}
      >
        {image ? (
          <RemoteImage
            src={image.url}
            alt={image.alt ?? product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            style={{ objectFit: "contain", padding: 16 }}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </Box>
      <Typography className="product-name" variant="body2" component="h2" sx={{ transition: "color 0.2s" }}>
        {product.name}
      </Typography>
      <Typography variant="price" component="p" sx={{ color: "text.primary" }}>
        {formatPrice(product.price)}
      </Typography>
      <Typography variant="caption" color="text.secondary" component="p">
        {formatPrice(transferPrice(product.price))} con Transferencia
        <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
          {" "}
          o depósito bancario
        </Box>
      </Typography>
    </AppLink>
  );
}
