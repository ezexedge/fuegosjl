import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface StoryBlockProps {
  image: string;
  imageAlt: string;
  overline: string;
  title: string;
  paragraphs: readonly string[];
  /** Posición de la imagen en desktop. */
  imagePosition: "left" | "right";
  /** Tarjeta de texto oscura (siempre oscura, en ambos modos). */
  darkCard?: boolean;
}

export function StoryBlock({ image, imageAlt, overline, title, paragraphs, imagePosition, darkCard = false }: StoryBlockProps) {
  const imageFirst = imagePosition === "left";
  return (
    <Container component="section" maxWidth="lg" sx={{ mb: { xs: 12, md: 20 } }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 300, md: 420 },
            order: { xs: 0, md: imageFirst ? 0 : 1 },
          }}
        >
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 900px) 50vw, 100vw" style={{ objectFit: "cover" }} />
        </Box>
        <Box
          sx={{
            p: { xs: 6, md: 12 },
            display: "grid",
            gap: 4,
            alignContent: "center",
            order: { xs: 1, md: imageFirst ? 1 : 0 },
            bgcolor: darkCard ? "common.black" : "background.paper",
            color: darkCard ? "common.white" : "text.primary",
          }}
        >
          <Typography variant="overline" sx={{ color: "primary.main" }}>
            {overline}
          </Typography>
          <Typography variant="h3" component="h2">
            {title}
          </Typography>
          {paragraphs.map((p) => (
            <Typography key={p} variant="body2" sx={{ opacity: darkCard ? 0.8 : 1, color: darkCard ? "inherit" : "text.secondary" }}>
              {p}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
