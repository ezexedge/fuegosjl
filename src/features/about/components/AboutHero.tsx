import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { aboutContent } from "../content";

export function AboutHero() {
  const { hero } = aboutContent;
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: { xs: 380, sm: 480, lg: 540 },
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        bgcolor: "common.black",
        color: "common.white",
      }}
    >
      <Image src={hero.image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.55)" }} />
      <Box sx={{ position: "relative", textAlign: "center", display: "grid", gap: 3, justifyItems: "center", px: 4 }}>
        <Typography variant="overline" sx={{ letterSpacing: "0.3em", opacity: 0.85 }}>
          {hero.overline}
        </Typography>
        <Typography variant="h1" component="h1">
          {hero.title}
        </Typography>
        <Box sx={{ width: 64, height: "1px", bgcolor: "primary.main", mt: 2 }} />
      </Box>
    </Box>
  );
}
