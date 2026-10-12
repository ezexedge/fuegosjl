import "@mui/material/styles";
import "@mui/material/Typography";
import "@mui/material/Button";
import type { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    footer: PaletteColor;
    accent: PaletteColor;
  }
  interface PaletteOptions {
    footer?: PaletteColorOptions;
    accent?: PaletteColorOptions;
  }
  interface TypographyVariants {
    price: CSSProperties;
    priceFeatured: CSSProperties;
  }
  interface TypographyVariantsOptions {
    price?: CSSProperties;
    priceFeatured?: CSSProperties;
  }
  interface Theme {
    customShadows: { card: string; glowGold: string; glowEmber: string };
    layout: { containerMaxWidth: number };
    shape: { borderRadius: number; borderRadiusPill: number };
  }
  interface ThemeOptions {
    customShadows?: { card: string; glowGold: string; glowEmber: string };
    layout?: { containerMaxWidth: number };
  }
  interface Shape {
    borderRadiusPill: number;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    price: true;
    priceFeatured: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    footer: true;
    accent: true;
  }
}
