import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { homeContent } from "../content";

export function HistorySection() {
  const { history } = homeContent;
  return (
    <Container component="section" sx={{ pb: { xs: 14, md: 20 } }}>
      <Box sx={{ display: "grid", gap: { xs: 8, md: 12 }, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, alignItems: "center" }}>
        <Box sx={{ display: "grid", gap: 5, justifyItems: "start" }}>
          <Typography variant="overline" sx={{ color: "primary.main" }}>
            {history.overline}
          </Typography>
          <Typography variant="h2" component="h2">
            {history.title}
          </Typography>
          <Typography variant="h4" component="blockquote" sx={{ fontStyle: "italic", fontWeight: 400, m: 0 }}>
            {history.quote}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {history.text}
          </Typography>
          <AppLink
            href={history.cta.href}
            underline="none"
            variant="overline"
            sx={{ color: "primary.main", display: "inline-flex", alignItems: "center", gap: 1 }}
          >
            {history.cta.label}
            <ArrowForwardIcon sx={{ fontSize: "1em" }} />
          </AppLink>
        </Box>
        <Box sx={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 1, overflow: "hidden", border: 1, borderColor: "divider" }}>
          <Image src={history.image} alt="Herrero forjando una pieza" fill sizes="(min-width: 900px) 45vw, 100vw" style={{ objectFit: "cover" }} />
          <Box
            sx={{
              position: "absolute",
              left: 16,
              bottom: 16,
              maxWidth: 260,
              p: 4,
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Typography variant="h4" component="p" sx={{ color: "primary.main" }}>
              {history.badgeTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {history.badgeText}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
