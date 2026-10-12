"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import IconButton from "@mui/material/IconButton";

interface LinkIconButtonProps {
  "aria-label": string;
  children: ReactNode;
  /** Sin `href`, el botón se muestra deshabilitado. */
  href?: string;
}

export function LinkIconButton({ href, children, "aria-label": ariaLabel }: LinkIconButtonProps) {
  if (!href) {
    return (
      <IconButton aria-label={ariaLabel} disabled>
        {children}
      </IconButton>
    );
  }
  return (
    <IconButton aria-label={ariaLabel} component={NextLink} href={href}>
      {children}
    </IconButton>
  );
}
