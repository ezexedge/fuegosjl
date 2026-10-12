import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { AnnouncementBar } from "./AnnouncementBar";
import { CookieBar } from "./CookieBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButton } from "./WhatsAppButton";

export function ShopShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
      <WhatsAppButton />
      <CookieBar />
    </Box>
  );
}
