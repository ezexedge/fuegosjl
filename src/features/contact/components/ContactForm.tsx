"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { site } from "@/lib/site";
import { contactFormSchema, type ContactFormValues } from "../schemas";

/** No hay backend de mensajes: se arma un correo a la casilla de contacto. */
function buildMailto(values: ContactFormValues): string {
  const subject = `Consulta de ${values.name}`;
  const lines = [values.message, "", `Nombre: ${values.name}`, `Email: ${values.email}`];
  if (values.phone) lines.push(`Teléfono: ${values.phone}`);
  const body = lines.join("\n");
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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

  const onSubmit = handleSubmit((values) => {
    window.location.assign(buildMailto(values));
    setSent(true);
  });

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
        <Alert severity="success" role="status">
          Se abrió tu aplicación de correo con el mensaje listo para enviar a {site.contact.email}.
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
