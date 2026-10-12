import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { homeContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  const { testimonials, distribution } = homeContent;
  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 14, md: 20 } }}>
      <Container>
        <SectionHeading overline={testimonials.overline} title={testimonials.title} rule={false} />
        <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" } }}>
          {testimonials.items.map((t) => (
            <Box
              key={t.name}
              component="figure"
              sx={{
                m: 0,
                p: 6,
                display: "grid",
                gap: 4,
                alignContent: "space-between",
                bgcolor: "background.default",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", color: "primary.main" }} role="img" aria-label="5 estrellas">
                {[0, 1, 2, 3, 4].map((s) => (
                  <StarIcon key={s} fontSize="small" />
                ))}
              </Box>
              <Typography component="blockquote" variant="body1" sx={{ fontStyle: "italic", m: 0 }}>
                {`"${t.quote}"`}
              </Typography>
              <Box component="figcaption" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {t.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t.role}
                  </Typography>
                </Box>
                <VerifiedIcon fontSize="small" sx={{ color: "primary.main" }} titleAccess="Cliente verificado" />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 14, md: 20 } }}>
          <SectionHeading overline={distribution.overline} title={distribution.title} rule={false} />
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(6, 1fr)" } }}>
            {distribution.points.map((point) => (
              <Typography
                key={point}
                variant="caption"
                align="center"
                sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 1, color: "text.secondary" }}
              >
                {point}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
