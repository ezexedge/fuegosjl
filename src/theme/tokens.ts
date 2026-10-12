/**
 * TOKENS DEL TEMA — único lugar con valores literales de color, fuente,
 * tamaño, espaciado, radio y sombra. Ningún componente debe tener hex, rgb,
 * px de fuente ni fontFamily propios: todo se lee del tema de MUI.
 *
 * Cómo cambiar la identidad visual:
 *  - Paleta: editar `palette.light` y `palette.dark` (nombres semánticos).
 *    `light` es el esquema por defecto; `dark` se usa en la home y secciones oscuras.
 *  - Tipografía: cambiar las fuentes en `fonts.ts` (next/font) y los nombres en
 *    `fontFamily`; ajustar tamaños y pesos en `typography`.
 *  - Forma, espaciado, breakpoints y sombras: sus secciones de este archivo.
 */

export const palette = {
  light: {
    primary: { main: "#c5a059", light: "#dec388", dark: "#9f7f3d", contrastText: "#1c1b18" },
    secondary: { main: "#1c1b18", light: "#3a3835", dark: "#0b0a09", contrastText: "#ffffff" },
    background: { default: "#ffffff", paper: "#faf8f5" },
    text: { primary: "#1c1b18", secondary: "#666666" },
    success: { main: "#25d366", contrastText: "#ffffff" },
    error: { main: "#d9532f", contrastText: "#ffffff" },
    divider: "#e5e5e5",
    footer: { main: "#dec58d", contrastText: "#3d3420" },
    accent: { main: "#c99a3e", contrastText: "#ffffff" },
  },
  dark: {
    primary: { main: "#e9c176", light: "#ffdea5", dark: "#a88344", contrastText: "#412d00" },
    secondary: { main: "#e6e2de", light: "#ffffff", dark: "#9e9589", contrastText: "#141311" },
    background: { default: "#141311", paper: "#1d1b19" },
    text: { primary: "#e6e2de", secondary: "#9e9589" },
    success: { main: "#25d366", contrastText: "#ffffff" },
    error: { main: "#d9532f", contrastText: "#ffffff" },
    divider: "#2e2b26",
    footer: { main: "#1f1d1a", contrastText: "#e6e2de" },
    accent: { main: "#d4af37", contrastText: "#141311" },
  },
} as const;

export const fontFamily = {
  body: 'var(--font-montserrat), "Helvetica", "Arial", sans-serif',
  heading: 'var(--font-eb-garamond), "Georgia", serif',
} as const;

const mobileBelow = 768 - 0.05;

export const typography = {
  h1: { fontSize: "3.5rem", lineHeight: "4rem", letterSpacing: "-0.02em", fontWeight: 500 },
  h1Mobile: { fontSize: "2.25rem", lineHeight: "2.75rem", letterSpacing: "-0.01em" },
  h2: { fontSize: "2.5rem", lineHeight: "3rem", letterSpacing: "-0.01em", fontWeight: 500 },
  h2Mobile: { fontSize: "1.75rem", lineHeight: "2.25rem", letterSpacing: "0em" },
  h3: { fontSize: "1.75rem", lineHeight: "2.25rem", letterSpacing: "0em", fontWeight: 500 },
  h4: { fontSize: "1.375rem", lineHeight: "1.875rem", letterSpacing: "0.01em", fontWeight: 600 },
  h5: { fontSize: "1.125rem", lineHeight: "1.5rem", letterSpacing: "0.08em", fontWeight: 600 },
  body1: { fontSize: "1rem", lineHeight: "1.625rem", letterSpacing: "0em", fontWeight: 400 },
  body2: { fontSize: "0.875rem", lineHeight: "1.375rem", letterSpacing: "0.01em", fontWeight: 400 },
  caption: { fontSize: "0.75rem", lineHeight: "1.125rem", letterSpacing: "0.01em", fontWeight: 400 },
  overline: { fontSize: "0.6875rem", lineHeight: "1rem", letterSpacing: "0.12em", fontWeight: 600 },
  button: { fontSize: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0.08em", fontWeight: 600 },
  price: { fontSize: "1.125rem", lineHeight: "1.5rem", letterSpacing: "0em", fontWeight: 600 },
  priceFeatured: { fontSize: "1.375rem", lineHeight: "1.75rem", letterSpacing: "-0.01em", fontWeight: 700 },
  mobileMediaQuery: `@media (max-width:${mobileBelow}px)`,
} as const;

export const breakpoints = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

/** Escala de espaciado: spacing(1) = 4px. */
export const spacingUnit = 4;

export const shape = {
  borderRadius: 2,
  borderRadiusPill: 999,
} as const;

export const layout = {
  containerMaxWidth: 1280,
} as const;

export const shadows = {
  card: "0 4px 20px rgba(0, 0, 0, 0.4)",
  glowGold: "0 4px 24px -2px rgba(197, 160, 89, 0.3)",
  glowEmber: "0 4px 30px rgba(217, 83, 47, 0.35)",
} as const;
