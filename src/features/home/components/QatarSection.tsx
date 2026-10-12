import Image from "next/image";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { homeContent } from "../content";

export function QatarSection() {
  const { qatar } = homeContent;
  return (
    <Container component="section" id="qatar" sx={{ py: { xs: 14, md: 20 } }}>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 8, md: 12 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          p: { xs: 6, md: 12 },
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <Box sx={{ display: "grid", gap: 5, justifyItems: "start" }}>
          <Typography variant="overline" sx={{ color: "accent.main", display: "flex", alignItems: "center", gap: 2 }}>
            <MilitaryTechOutlinedIcon fontSize="small" />
            {qatar.overline}
          </Typography>
          <Typography variant="h2" component="h2">
            {qatar.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {qatar.before}
            <Typography component="strong" variant="body1" sx={{ color: "text.primary", fontWeight: 700 }}>
              {qatar.highlight}
            </Typography>
            {qatar.after}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
            <Button component={AppLink} href={qatar.cta.href} variant="contained" color="accent" endIcon={<OpenInNewIcon />}>
              {qatar.cta.label}
            </Button>
            <Typography variant="overline" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
              {qatar.badge}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 1, overflow: "hidden", border: 1, borderColor: "divider" }}>
          <Image src={qatar.image} alt="Parrilla Qatar 2022" fill sizes="(min-width: 900px) 45vw, 100vw" style={{ objectFit: "cover" }} />
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "common.white",
              background:
                "linear-gradient(to top, var(--mui-palette-common-black), transparent)",
            }}
          >
            <Typography variant="overline">{qatar.caption}</Typography>
            <Box sx={{ display: "flex", color: "accent.main" }} aria-label="3 estrellas" role="img">
              {[0, 1, 2].map((s) => (
                <StarIcon key={s} fontSize="small" />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
