"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MuiLink from "@mui/material/Link";
import { site } from "@/lib/site";

type Variant = "bar" | "list";

interface NavLinksProps {
  variant: Variant;
  onNavigate?: () => void;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return href !== "#" && pathname.startsWith(href);
}

function Links({ variant, pathname, onNavigate }: NavLinksProps & { pathname: string }) {
  if (variant === "list") {
    return (
      <>
        {site.nav.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            href={item.href}
            selected={isActive(pathname, item.href)}
            onClick={onNavigate}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </>
    );
  }
  return (
    <Box
      component="nav"
      aria-label="Navegación principal"
      sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 8, pb: 3 }}
    >
      {site.nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <MuiLink
            key={item.label}
            component={Link}
            href={item.href}
            variant="body2"
            underline="none"
            aria-current={active ? "page" : undefined}
            sx={{
              color: active ? "text.primary" : "text.secondary",
              fontWeight: active ? 600 : 400,
              borderBottom: 1,
              borderColor: active ? "text.primary" : "transparent",
              pb: 0.5,
              "&:hover": { color: "text.primary" },
            }}
          >
            {item.label}
          </MuiLink>
        );
      })}
    </Box>
  );
}

function ActiveLinks(props: NavLinksProps) {
  const pathname = usePathname();
  return <Links {...props} pathname={pathname} />;
}

/** Links del sitio. `usePathname` es dato de la URL, por eso va dentro de Suspense. */
export function NavLinks(props: NavLinksProps) {
  return (
    <Suspense fallback={<Links {...props} pathname="" />}>
      <ActiveLinks {...props} />
    </Suspense>
  );
}
