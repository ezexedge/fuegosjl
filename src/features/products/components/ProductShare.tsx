"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

interface ProductShareProps {
  name: string;
}

const networks = [
  { label: "Facebook", Icon: FacebookIcon, url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { label: "X", Icon: XIcon, url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { label: "Pinterest", Icon: PinterestIcon, url: (u: string, t: string) => `https://www.pinterest.com/pin/create/button/?url=${u}&description=${t}` },
  { label: "WhatsApp", Icon: WhatsAppIcon, url: (u: string, t: string) => `https://wa.me/?text=${t}%20${u}` },
] as const;

export function ProductShare({ name }: ProductShareProps) {
  const share = (build: (u: string, t: string) => string) => {
    const url = encodeURIComponent(window.location.href);
    window.open(build(url, encodeURIComponent(name)), "_blank", "noopener,noreferrer");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 2 }}>
      {networks.map(({ label, Icon, url }) => (
        <IconButton key={label} aria-label={`Compartir en ${label}`} size="small" onClick={() => share(url)}>
          <Icon fontSize="small" />
        </IconButton>
      ))}
    </Box>
  );
}
