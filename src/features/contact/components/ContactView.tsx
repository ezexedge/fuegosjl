import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { PageBreadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

const items = [
  { Icon: WhatsAppIcon, label: site.contact.phoneRaw, href: `https://wa.me/${site.contact.phoneRaw}` },
  { Icon: PhoneOutlinedIcon, label: site.contact.phone, href: `tel:+${site.contact.phoneRaw}` },
  { Icon: MailOutlinedIcon, label: site.contact.email, href: `mailto:${site.contact.email}` },
  { Icon: LocationOnOutlinedIcon, label: site.contact.address, href: undefined },
] as const;

export function ContactView() {
  return (
    <Container sx={{ py: { xs: 8, md: 12 }, display: "grid", justifyItems: "center", gap: 6 }}>
      <PageBreadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
      <Typography variant="h3" component="h1">
        Contacto
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 3, justifyItems: "center" }}>
        {items.map(({ Icon, label, href }) => (
          <Box key={label} component="li" sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Icon fontSize="small" />
            {href ? (
              <Link href={href} underline="hover" color="inherit" variant="body1">
                {label}
              </Link>
            ) : (
              <Typography variant="body1">{label}</Typography>
            )}
          </Box>
        ))}
      </Box>
      <ContactForm />
    </Container>
  );
}
