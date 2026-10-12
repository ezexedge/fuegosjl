"use client";

import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { site } from "@/lib/site";

const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
} as const;

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "footer.main", color: "footer.contrastText", pt: 14, pb: 12 }}>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6 }}
      >
        <Image
          src={site.logo.src}
          alt={`Escudo ${site.name}`}
          width={site.logo.width}
          height={site.logo.height}
          sizes="64px"
          style={{ width: "auto", height: 56 }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          {site.social.map((s) => {
            const Icon = socialIcons[s.label as keyof typeof socialIcons];
            return (
              <IconButton key={s.label} component="a" href={s.href} aria-label={s.label} color="inherit" size="small">
                <Icon fontSize="small" />
              </IconButton>
            );
          })}
        </Box>

        <Box component="nav" aria-label="Pie de página" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 6, rowGap: 2 }}>
          {site.nav.map((item) => (
            <MuiLink key={item.label} component={Link} href={item.href} variant="caption" color="inherit">
              {item.label}
            </MuiLink>
          ))}
        </Box>

        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ display: "flex", width: "100%", maxWidth: 448 }}
        >
          <TextField
            type="email"
            required
            fullWidth
            placeholder="Suscribite al newsletter..."
            slotProps={{ htmlInput: { "aria-label": "Correo electrónico" } }}
            sx={{ "& .MuiOutlinedInput-root": { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
          />
          <Button
            type="submit"
            variant="outlined"
            color="inherit"
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, px: 5 }}
          >
            Enviar
          </Button>
        </Box>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography variant="caption">{site.contact.phoneRaw}</Typography>
          <Typography variant="caption">{site.contact.phone}</Typography>
          <MuiLink href={`mailto:${site.contact.email}`} variant="caption" color="inherit">
            {site.contact.email}
          </MuiLink>
          <Typography variant="caption">{site.contact.address}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5 }}>
          {site.payments.map((name) => (
            <Typography
              key={name}
              variant="caption"
              component="span"
              sx={{
                bgcolor: "background.default",
                color: "text.primary",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                px: 2,
                fontWeight: 700,
              }}
            >
              {name}
            </Typography>
          ))}
        </Box>

        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {site.legal}
        </Typography>
      </Container>
    </Box>
  );
}
