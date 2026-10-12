"use client";

import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { site } from "@/lib/site";

const socials = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "Facebook", Icon: FacebookIcon, href: "#" },
  { label: "YouTube", Icon: YouTubeIcon, href: "#" },
  { label: "WhatsApp", Icon: WhatsAppIcon, href: `https://wa.me/${site.contact.phoneRaw}` },
] as const;

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "grid", gap: 3, alignContent: "start" }}>
      <Typography variant="overline" component="h3" sx={{ color: "primary.main" }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function FooterColumns() {
  const f = site.darkFooter;
  return (
    <Box component="footer" sx={{ bgcolor: "background.default", color: "text.primary", borderTop: 1, borderColor: "divider", pt: 14, pb: 8 }}>
      <Container>
        <Box sx={{ display: "grid", gap: 10, gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" } }}>
          <Box sx={{ display: "grid", gap: 3, alignContent: "start" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Image src={site.logo.src} alt="" width={40} height={37} style={{ height: "auto" }} />
              <Typography variant="h4" component="p">
                {site.name.toUpperCase()}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {f.address}
              <br />
              {f.tagline}
            </Typography>
            <Typography variant="caption" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PhoneOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
              {site.contact.phone}
            </Typography>
            <MuiLink href={`mailto:${site.contact.email}`} variant="caption" color="inherit" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <MailOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
              {site.contact.email}
            </MuiLink>
          </Box>

          <Column title="Navegación">
            {site.nav.map((item) => (
              <MuiLink key={item.label} component={Link} href={item.href} variant="caption" color="text.secondary" underline="hover">
                {item.label}
              </MuiLink>
            ))}
          </Column>

          <Column title="Información Legal">
            {f.legalLinks.map((label) => (
              <MuiLink key={label} href="#" variant="caption" color="text.secondary" underline="hover">
                {label}
              </MuiLink>
            ))}
          </Column>

          <Column title="Seguinos">
            <Box sx={{ display: "flex", gap: 1 }}>
              {socials.map(({ label, Icon, href }) => (
                <IconButton key={label} component="a" href={href} aria-label={label} size="small" sx={{ border: 1, borderColor: "divider" }}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
            <Typography variant="overline" color="text.secondary" sx={{ mt: 3 }}>
              MEDIOS DE PAGO HABILITADOS
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {f.payments.map((name) => (
                <Typography
                  key={name}
                  variant="caption"
                  component="span"
                  sx={{ px: 2, py: 0.5, border: 1, borderColor: "divider", borderRadius: 1, color: "text.secondary" }}
                >
                  {name}
                </Typography>
              ))}
            </Box>
          </Column>
        </Box>

        <Divider sx={{ my: 8 }} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 2, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="caption" color="text.secondary">
            {f.copyright}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Botón de arrepentimiento • {f.cuit}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
