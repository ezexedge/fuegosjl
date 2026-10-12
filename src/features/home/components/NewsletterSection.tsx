"use client";

import { useState, type FormEvent } from "react";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { homeContent } from "../content";

export function NewsletterSection() {
  const { newsletter } = homeContent;
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <Container component="section" maxWidth="md" sx={{ py: { xs: 14, md: 20 }, textAlign: "center", display: "grid", gap: 4, justifyItems: "center" }}>
      <MailOutlinedIcon sx={{ color: "primary.main", fontSize: 32 }} />
      <Typography variant="h3" component="h2">
        {newsletter.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {newsletter.before}
        <Typography component="strong" variant="body2" sx={{ color: "primary.main", fontWeight: 700 }}>
          {newsletter.highlight}
        </Typography>
        {newsletter.after}
      </Typography>
      {sent ? (
        <Typography role="status" color="primary.main">
          ¡Gracias por suscribirte!
        </Typography>
      ) : (
        <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, width: "100%", maxWidth: 520 }}>
          <TextField
            type="email"
            required
            fullWidth
            placeholder="Ingresá tu e-mail"
            slotProps={{ htmlInput: { "aria-label": "Correo electrónico" } }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ whiteSpace: "nowrap" }}>
            {newsletter.cta}
          </Button>
        </Box>
      )}
    </Container>
  );
}
