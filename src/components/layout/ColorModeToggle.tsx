"use client";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";

/** Alterna entre modo claro (por defecto) y oscuro; MUI recuerda la elección. */
export function ColorModeToggle() {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";
  return (
    <IconButton
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={() => setMode(isDark ? "light" : "dark")}
    >
      {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
}
