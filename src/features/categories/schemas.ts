import { z } from "zod";
import { imageUrlSchema, paginationSchema, slugSchema } from "@/lib/schemas";

export const categoryInputSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(120),
  slug: slugSchema,
  description: z.string().trim().max(1000).nullish().transform((v) => v || null),
  imageUrl: imageUrlSchema.nullish().transform((v) => v || null),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const categoryPatchSchema = categoryInputSchema.partial();

export const categoryListQuerySchema = paginationSchema.extend({
  search: z.string().trim().max(120).optional(),
  all: z.enum(["1", "true"]).optional(),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type CategoryPatch = z.infer<typeof categoryPatchSchema>;
export type CategoryListQuery = z.infer<typeof categoryListQuerySchema>;

/** Esquema del formulario del panel (valores crudos de los inputs). */
export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(120),
  slug: slugSchema,
  description: z.string().trim().max(1000),
  imageUrl: z
    .string()
    .trim()
    .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Debe ser una URL http(s)"),
  sortOrder: z.number({ error: "Ingresá un número" }).int("Debe ser entero").min(0, "No puede ser negativo"),
  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
