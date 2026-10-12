import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { AnnouncementBar } from "./AnnouncementBar";
import { CookieBar } from "./CookieBar";
import { Footer } from "./Footer";
import { FooterColumns } from "./FooterColumns";
import { Header } from "./Header";
import { WhatsAppButton } from "./WhatsAppButton";

interface ShopShellProps {
  children: ReactNode;
  /** Variante del pie de página: la home usa el de columnas. */
  footer?: "centered" | "columns";
}

export function ShopShell({ children, footer = "centered" }: ShopShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AnnouncementBar />
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      {footer === "columns" ? <FooterColumns /> : <Footer />}
      <WhatsAppButton />
      <CookieBar />
    </Box>
  );
}
