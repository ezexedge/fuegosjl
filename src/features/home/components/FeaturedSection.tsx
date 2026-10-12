import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { config } from "@/lib/config";
import { formatPrice, installmentValue, transferPrice } from "@/lib/format";
import { homeContent } from "../content";
import { listFeaturedProducts } from "../services/home.service";

const FEATURED_COUNT = 8;

export async function FeaturedSection() {
  const products = await listFeaturedProducts(FEATURED_COUNT);
  if (products.length === 0) return null;
  const { featured } = homeContent;

  return (
    <Box component="section" id="destacados" sx={{ bgcolor: "background.paper", py: { xs: 14, md: 20 } }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "flex-end" },
            gap: 4,
            mb: 10,
          }}
        >
          <Box>
            <Typography variant="overline" component="span" sx={{ color: "primary.main", display: "block", mb: 2 }}>
              {featured.overline}
            </Typography>
            <Typography variant="h2" component="h2">
              {featured.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 448 }}>
            {featured.text}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 6 },
            gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              component="article"
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                transition: "border-color 0.3s, box-shadow 0.3s",
                "&:hover": { borderColor: "primary.main", boxShadow: "var(--shadow-glow-gold)" },
              }}
            >
              <Box sx={{ position: "relative", aspectRatio: "1 / 1", p: 4 }}>
                {product.badge ? (
                  <Typography
                    variant="overline"
                    component="span"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      zIndex: 1,
                      px: 2,
                      py: 0.5,
                      color: "primary.main",
                      bgcolor: "background.paper",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                    }}
                  >
                    {product.badge}
                  </Typography>
                ) : null}
                {product.image ? (
                  <RemoteImage
                    src={product.image.url}
                    alt={product.image.alt ?? product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    style={{ objectFit: "contain", padding: 16 }}
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </Box>
              <Box sx={{ p: { xs: 3, md: 5 }, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 5 }}>
                <Box sx={{ display: "grid", gap: 1 }}>
                  <Typography variant="h4" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="price" component="p" sx={{ mt: 2 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ color: "error.main", fontWeight: 600 }}>
                    {formatPrice(transferPrice(product.price))}{" "}
                    <Typography component="span" variant="caption" color="text.secondary">
                      con Transferencia bancaria
                    </Typography>
                  </Typography>
                  <Typography variant="caption" component="p" sx={{ color: "primary.main" }}>
                    {config.installments} cuotas sin interés de {formatPrice(installmentValue(product.price))}
                  </Typography>
                </Box>
                <Button component={AppLink} href={`/productos/${product.slug}`} variant="contained" color="primary" fullWidth sx={{ px: 2 }}>
                  COMPRAR
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
