"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MuiLink from "@mui/material/Link";
import { site } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return href !== "#" && pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{ bgcolor: "background.default", borderBottom: 1, borderColor: "divider" }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            py: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="Abrir menú"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: "none" }, ml: -2 }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              aria-label="Buscar productos"
              component={Link}
              href="/productos"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          <MuiLink
            component={Link}
            href="/"
            aria-label={`${site.name} - Inicio`}
            sx={{ display: "block", height: { xs: 64, md: 80 }, aspectRatio: `${site.logo.width} / ${site.logo.height}`, position: "relative" }}
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              fill
              priority
              sizes="(min-width: 768px) 88px, 70px"
              style={{ objectFit: "contain" }}
            />
          </MuiLink>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
            <IconButton aria-label="Buscar productos" component={Link} href="/productos" sx={{ display: { md: "none" } }}>
              <SearchIcon />
            </IconButton>
            <IconButton aria-label="Mi cuenta" sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <PersonOutlinedIcon />
            </IconButton>
            <IconButton aria-label="Carrito de compras">
              <Badge badgeContent={0} showZero color="secondary">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        <Box
          component="nav"
          aria-label="Navegación principal"
          sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 8, pb: 3 }}
        >
          {site.nav.map((item) => (
            <MuiLink
              key={item.label}
              component={Link}
              href={item.href}
              variant="body2"
              underline="none"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              sx={{
                color: isActive(pathname, item.href) ? "text.primary" : "text.secondary",
                fontWeight: isActive(pathname, item.href) ? 600 : 400,
                borderBottom: 1,
                borderColor: isActive(pathname, item.href) ? "text.primary" : "transparent",
                pb: 0.5,
                "&:hover": { color: "text.primary" },
              }}
            >
              {item.label}
            </MuiLink>
          ))}
        </Box>
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 260, pt: 6 }} component="nav" aria-label="Navegación principal">
          {site.nav.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              href={item.href}
              selected={isActive(pathname, item.href)}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
