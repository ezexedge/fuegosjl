import { z } from "zod";
import { IMAGE_URL_MESSAGE, IMAGE_URL_PATTERN, imageUrlSchema, paginationSchema, slugSchema } from "@/lib/schemas";

export const productImageInputSchema = z.object({
  url: imageUrlSchema,
  alt: z.string().trim().max(200).nullish().transform((v) => v || null),
});

export const productInputSchema = z.object({
  categoryId: z.coerce.number().int().positive("Elegí una categoría"),
  name: z.string().trim().min(1, "El nombre es obligatorio").max(200),
  slug: slugSchema,
  description: z.string().trim().max(5000).nullish().transform((v) => v || null),
  /** En centavos. */
  price: z.coerce.number().int().min(0),
  compareAtPrice: z.coerce.number().int().min(0).nullish().transform((v) => v ?? null),
  sku: z.string().trim().max(80).nullish().transform((v) => v || null),
  stock: z.coerce.number().int().min(0).default(0),
  badge: z.string().trim().max(60).nullish().transform((v) => v || null),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  attributes: z.record(z.string().trim().min(1).max(80), z.string().trim().max(500)).default({}),
  /** El orden del array define sortOrder; la primera es la principal. */
  images: z.array(productImageInputSchema).max(20).default([]),
});

export const productPatchSchema = productInputSchema.partial();

export const productListQuerySchema = paginationSchema.extend({
  category: z.string().trim().max(160).optional(),
  search: z.string().trim().max(200).optional(),
  featured: z.enum(["1", "true"]).optional(),
  exclude: z.coerce.number().int().positive().optional(),
  all: z.enum(["1", "true"]).optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;
export type ProductPatch = z.infer<typeof productPatchSchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;

/** Esquema del formulario del panel (precios en pesos, atributos como lista). */
export const productFormSchema = z.object({
  categoryId: z.number({ error: "Elegí una categoría" }).int().positive("Elegí una categoría"),
  name: z.string().trim().min(1, "El nombre es obligatorio").max(200),
  slug: slugSchema,
  description: z.string().trim().max(5000),
  price: z.number({ error: "Ingresá un precio" }).min(0, "No puede ser negativo"),
  compareAtPrice: z.number().min(0, "No puede ser negativo").nullable(),
  sku: z.string().trim().max(80),
  stock: z.number({ error: "Ingresá el stock" }).int("Debe ser entero").min(0, "No puede ser negativo"),
  badge: z.string().trim().max(60),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  images: z
    .array(
      z.object({
        url: z.string().trim().regex(IMAGE_URL_PATTERN, IMAGE_URL_MESSAGE),
        alt: z.string().trim().max(200),
      }),
    )
    .max(20),
  attributes: z.array(
    z.object({
      key: z.string().trim().min(1, "Obligatorio").max(80),
      value: z.string().trim().max(500),
    }),
  ),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
