"use client";
import { useSyncExternalStore } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const STORAGE_KEY = "cookies-accepted";

const listeners = new Set<() => void>();
let dismissedInMemory = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): boolean {
  if (dismissedInMemory) return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

/** En el servidor no se muestra, para evitar diferencias de hidratación. */
const getServerSnapshot = () => false;

export function CookieBar() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!visible) return null;

  const accept = () => {
    dismissedInMemory = true;
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sin almacenamiento disponible: solo se oculta en esta sesión
    }
    listeners.forEach((l) => l());
  };

  return (
    <Box
      component="aside"
      aria-label="Aviso de cookies"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "snackbar",
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="caption">
        Al navegar por este sitio <strong>aceptás el uso de cookies</strong> para agilizar tu experiencia de compra.
      </Typography>
      <Button size="small" color="secondary" onClick={accept} sx={{ textDecoration: "underline", p: 0, minWidth: 0 }}>
        Entendido
      </Button>
    </Box>
  );
}
