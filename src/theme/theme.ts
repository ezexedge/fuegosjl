import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import {
  breakpoints,
  layout,
  palette,
  shadows,
  shape,
  spacingUnit,
} from "./tokens";

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
  defaultColorScheme: "light",
  colorSchemes: {
    light: { palette: palette.light },
    dark: { palette: palette.dark },
  },
  breakpoints: { values: breakpoints },
  spacing: spacingUnit,
  shape,
  typography,
  layout,
  customShadows: shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Tokens que MUI no expone como variables CSS (usables desde Server Components).
        ":root": {
          "--shadow-card": shadows.card,
          "--shadow-glow-gold": shadows.glowGold,
          "--shadow-glow-ember": shadows.glowEmber,
          "--radius-pill": `${shape.borderRadiusPill}px`,
        },
        body: { WebkitFontSmoothing: "antialiased" },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "xl" },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(2.5, 6),
          "&:focus-visible": {
            outline: `2px solid ${(theme.vars ?? theme).palette.text.primary}`,
            outlineOffset: 2,
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius }),
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${(theme.vars ?? theme).palette.divider}`,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius }),
      },
    },
    MuiLink: {
      defaultProps: { underline: "hover", color: "inherit" },
    },
  },
});
