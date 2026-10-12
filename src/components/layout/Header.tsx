"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import MuiLink from "@mui/material/Link";
import { site } from "@/lib/site";
import { ColorModeToggle } from "./ColorModeToggle";
import { NavLinks } from "./NavLinks";

export function Header() {
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
            <ColorModeToggle />
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

        <NavLinks variant="bar" />
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 260, pt: 6 }} component="nav" aria-label="Navegación principal">
          <NavLinks variant="list" onNavigate={() => setDrawerOpen(false)} />
        </List>
      </Drawer>
    </Box>
  );
}
