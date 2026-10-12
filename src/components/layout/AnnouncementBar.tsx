import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  const items = [...site.announcements, ...site.announcements];
  return (
    <Box
      component="aside"
      aria-label="Promociones"
      sx={{
        bgcolor: "secondary.main",
        color: "secondary.contrastText",
        overflow: "hidden",
        py: 2,
        "[data-mui-color-scheme='dark'] &": { bgcolor: "background.paper", color: "primary.main" },
        "&:hover > div": { animationPlayState: "paused" },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "announcement-marquee 28s linear infinite",
          "@keyframes announcement-marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {[0, 1].map((copy) => (
          <Box key={copy} sx={{ display: "inline-flex" }} aria-hidden={copy === 1}>
            {items.slice(0, site.announcements.length).map((text) => (
              <Typography key={text} variant="overline" component="span" sx={{ px: 6, display: "inline-flex", gap: 6 }}>
                {text}
                <Box component="span" sx={{ opacity: 0.5 }}>
                  •
                </Box>
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
