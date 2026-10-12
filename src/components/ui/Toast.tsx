"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export interface ToastState {
  message: string;
  severity: "success" | "error";
}

interface ToastProps {
  toast: ToastState | null;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  return (
    <Snackbar
      open={toast !== null}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {toast ? (
        <Alert severity={toast.severity} variant="filled" onClose={onClose}>
          {toast.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}
