"use client";

import NextLink from "next/link";
import MuiLink, { type LinkProps } from "@mui/material/Link";

/** Link de MUI que navega con next/link. Usable desde Server Components. */
export function AppLink(props: Omit<LinkProps<typeof NextLink>, "component">) {
  return <MuiLink component={NextLink} {...props} />;
}
