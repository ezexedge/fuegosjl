import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppLink } from "@/components/ui/AppLink";
import { aboutContent } from "../content";
import { AboutHero } from "./AboutHero";
import { StoryBlock } from "./StoryBlock";

export function AboutView() {
  const { quote, story1, story2, qatar, mission } = aboutContent;
  return (
    <>
      <AboutHero />

      <Container component="section" maxWidth="md" sx={{ py: { xs: 14, md: 24 }, textAlign: "center", display: "grid", gap: 6 }}>
        <Typography variant="h3" component="blockquote" sx={{ fontStyle: "italic", fontWeight: 400, m: 0 }}>
          {quote.text}
        </Typography>
        <Typography variant="overline" sx={{ color: "primary.main" }}>
          {quote.author}
        </Typography>
      </Container>

      <StoryBlock {...story1} imagePosition="left" />
      <StoryBlock {...story2} imagePosition="right" darkCard />

      <Box component="section" sx={{ bgcolor: "common.black", color: "common.white", py: { xs: 14, md: 24 } }}>
        <Container maxWidth="lg" sx={{ display: "grid", gap: 6, justifyItems: "center", textAlign: "center" }}>
          <Typography aria-hidden sx={{ color: "primary.main", letterSpacing: "0.6em" }}>
            ✶ ✶ ✶
          </Typography>
          <Typography variant="overline" sx={{ color: "primary.main" }}>
            {qatar.overline}
          </Typography>
          <Typography variant="h2" component="h2">
            {qatar.title}
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 640, opacity: 0.8 }}>
            {qatar.text}
          </Typography>
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9", mt: 6 }}>
            <Image src={qatar.image} alt={qatar.imageAlt} fill sizes="(min-width: 1200px) 1100px, 100vw" style={{ objectFit: "cover" }} />
          </Box>
        </Container>
      </Box>

      <Container component="section" maxWidth="md" sx={{ py: { xs: 14, md: 28 }, textAlign: "center", display: "grid", gap: 6, justifyItems: "center" }}>
        <Typography variant="overline" sx={{ color: "primary.main" }}>
          {mission.overline}
        </Typography>
        <Typography variant="h2" component="h2">
          {mission.title}
        </Typography>
        {mission.paragraphs.map((p) => (
          <Typography key={p} variant="body2" color="text.secondary">
            {p}
          </Typography>
        ))}
        <Button component={AppLink} href={mission.cta.href} variant="contained" color="secondary" sx={{ mt: 4 }}>
          {mission.cta.label}
        </Button>
      </Container>
    </>
  );
}
