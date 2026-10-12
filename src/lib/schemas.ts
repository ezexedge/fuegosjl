import { z } from "zod";
import { config } from "./config";

export const slugSchema = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Solo minúsculas, números y guiones");

/** URL http(s) o ruta local que empiece con `/` (archivos de `public/`). */
export const IMAGE_URL_PATTERN = /^(https?:\/\/|\/(?!\/))\S+$/i;
export const IMAGE_URL_MESSAGE = "Debe ser una URL http(s) o una ruta que empiece con /";

export const imageUrlSchema = z.string().max(2000).regex(IMAGE_URL_PATTERN, IMAGE_URL_MESSAGE);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(config.pagination.maxLimit)
    .default(config.pagination.defaultLimit),
});

export interface Paginated<T> {
  items: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export function paginated<T>(items: T[], page: number, limit: number, total: number): Paginated<T> {
  return { items, pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } };
}
