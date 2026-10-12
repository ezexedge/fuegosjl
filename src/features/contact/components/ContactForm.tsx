"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { contactFormSchema, type ContactFormValues } from "../schemas";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  // Por ahora el formulario solo valida: no envía ni guarda el mensaje.
  const onSubmit = handleSubmit(() => setSent(true));

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 5, width: "100%", maxWidth: 560 }}>
      <TextField
        label="Nombre"
        placeholder="ej.: María Perez"
        autoComplete="name"
        slotProps={{ inputLabel: { shrink: true } }}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Email"
        type="email"
        placeholder="ej.: tuemail@email.com"
        autoComplete="email"
        slotProps={{ inputLabel: { shrink: true } }}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Teléfono"
        type="tel"
        placeholder="ej.: 1123445567"
        autoComplete="tel"
        slotProps={{ inputLabel: { shrink: true } }}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        {...register("phone")}
      />
      <TextField
        label="Mensaje"
        placeholder="ej.: Tu mensaje"
        multiline
        minRows={6}
        slotProps={{ inputLabel: { shrink: true } }}
        error={Boolean(errors.message)}
        helperText={errors.message?.message}
        {...register("message")}
      />
      {sent ? (
        <Alert severity="info" role="status">
          Por el momento el formulario no envía mensajes. Escribinos por WhatsApp o por email.
        </Alert>
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
