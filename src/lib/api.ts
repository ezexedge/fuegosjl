import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ServiceError } from "./errors";

export interface ApiResponse<T> {
  data: T | null;
  error: { message: string; details?: unknown } | null;
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ data, error: null }, { status });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json<ApiResponse<never>>(
    { data: null, error: { message, details } },
    { status },
  );
}

function isUniqueViolation(err: unknown): boolean {
  const e = err as { code?: string; cause?: { code?: string } };
  return e?.code === "23505" || e?.cause?.code === "23505";
}

/** Envuelve un handler y traduce errores conocidos a respuestas `{ data, error }`. */
export async function handle(fn: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ZodError) {
      return fail("Datos inválidos", 400, err.issues);
    }
    if (err instanceof ServiceError) {
      return fail(err.message, err.status);
    }
    if (isUniqueViolation(err)) {
      return fail("Ya existe un registro con ese slug o valor único", 409);
    }
    console.error(err);
    return fail("Error interno del servidor", 500);
  }
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ServiceError("El cuerpo de la solicitud no es JSON válido", 400);
  }
}

export function parseId(raw: string): number {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ServiceError("Id inválido", 400);
  }
  return id;
}
