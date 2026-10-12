import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Fab from "@mui/material/Fab";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <Fab
      component="a"
      href={`https://wa.me/${site.contact.phoneRaw}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      color="success"
      size="medium"
      sx={{ position: "fixed", right: 24, bottom: 56, zIndex: "speedDial" }}
    >
      <WhatsAppIcon />
    </Fab>
  );
}
