"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { http } from "@/lib/http";
import { loginFormSchema, type LoginFormValues } from "../schemas";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await http("/api/auth/login", { method: "POST", body: JSON.stringify(values) });
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión");
    }
  });

  return (
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 4 }}>
      <Paper
        component="form"
        onSubmit={onSubmit}
        noValidate
        variant="outlined"
        sx={{ width: "100%", maxWidth: 400, p: 8, display: "grid", gap: 4 }}
      >
        <Typography variant="h3" component="h1">
          Panel de administración
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          autoFocus
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Ingresar
        </Button>
      </Paper>
    </Box>
  );
}
