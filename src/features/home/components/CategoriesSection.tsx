import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { homeContent } from "../content";
import { listHomeCategories } from "../services/home.service";
import { SectionHeading } from "./SectionHeading";

/** Patrón de la grilla (5 columnas en desktop); se repite si hay más categorías. */
const SPANS = [2, 3, 2, 1, 2, 1, 1, 1, 1, 1] as const;
const spanFor = (i: number) => SPANS[i % SPANS.length];
const heightFor = (i: number) => (i < 2 ? 288 : i < 5 ? 256 : 240);

export async function CategoriesSection() {
  const categories = await listHomeCategories();
  if (categories.length === 0) return null;

  return (
    <Container component="section" id="categorias" sx={{ py: { xs: 14, md: 20 } }}>
      <SectionHeading overline={homeContent.categories.overline} title={homeContent.categories.title} />
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" },
        }}
      >
        {categories.map((category, i) => {
          const large = i < 2;
          return (
            <AppLink
              key={category.id}
              href={`/productos?category=${category.slug}`}
              underline="none"
              color="inherit"
              sx={{
                position: "relative",
                height: heightFor(i),
                gridColumn: { sm: i === 0 ? "span 2" : "auto", lg: `span ${spanFor(i)}` },
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "common.black",
                transition: "border-color 0.3s",
                "&:hover": { borderColor: "primary.main" },
                "&:hover img": { transform: "scale(1.05)" },
                "&:hover .category-name": { color: "primary.main" },
              }}
            >
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  unoptimized
                  style={{ objectFit: "cover", filter: "brightness(0.75)", transition: "transform 0.7s" }}
                />
              ) : (
                <ImagePlaceholder />
              )}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  p: 6,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  color: "common.white",
                  background:
                    "linear-gradient(to top, var(--mui-palette-common-black), color-mix(in srgb, var(--mui-palette-common-black) 40%, transparent) 50%, transparent)",
                }}
              >
                <Typography className="category-name" variant={large ? "h3" : "h4"} component="h3" sx={{ textTransform: "uppercase", transition: "color 0.3s" }}>
                  {category.name}
                </Typography>
                <Typography variant="overline" sx={{ color: "primary.main", display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  {large ? "Ver colección" : "Ver"}
                  <ArrowForwardIcon sx={{ fontSize: "1em" }} />
                </Typography>
              </Box>
            </AppLink>
          );
        })}
      </Box>
    </Container>
  );
}
