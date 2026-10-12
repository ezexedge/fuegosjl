import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Ingresá tu nombre").max(120),
  email: z.string().trim().min(1, "Ingresá tu email").pipe(z.email("Ingresá un email válido")),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v === "" || /^[0-9+()\-\s]{6,}$/.test(v), "Ingresá un teléfono válido"),
  message: z.string().trim().min(1, "Escribí tu mensaje").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
