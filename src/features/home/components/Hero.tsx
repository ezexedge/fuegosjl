import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { site } from "@/lib/site";
import { homeContent } from "../content";

export function Hero() {
  const { hero } = homeContent;
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "min(85vh, 760px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", filter: "brightness(0.68) contrast(1.1)" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, var(--mui-palette-common-black), color-mix(in srgb, var(--mui-palette-common-black) 50%, transparent) 50%, color-mix(in srgb, var(--mui-palette-common-black) 30%, transparent))",
        }}
      />
      <Box
        sx={{
          position: "relative",
          maxWidth: 896,
          px: 6,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          color: "common.white",
        }}
      >
        <Image
          src={site.logo.src}
          alt={site.logo.alt}
          width={96}
          height={88}
          priority
          style={{ height: "auto", width: 96 }}
        />
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: "0.25em" }}>
          {hero.overline}
        </Typography>
        <Typography variant="h1" component="h1" sx={{ maxWidth: 768 }}>
          {hero.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 4, mt: 4 }}>
          <Button
            component={AppLink}
            href={hero.primaryCta.href}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{ boxShadow: "var(--shadow-glow-gold)" }}
          >
            {hero.primaryCta.label}
          </Button>
          <Button component={AppLink} href={hero.secondaryCta.href} variant="outlined" color="primary">
            {hero.secondaryCta.label}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
