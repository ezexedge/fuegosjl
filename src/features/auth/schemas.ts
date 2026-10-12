import { z } from "zod";

export const loginFormSchema = z.object({
  password: z.string().min(1, "Ingresá la contraseña"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
