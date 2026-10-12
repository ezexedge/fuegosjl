export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pesos (con decimales) a centavos enteros. */
export function pesosToCents(pesos: number): number {
  return Math.round(pesos * 100);
}

export function centsToPesos(cents: number): number {
  return cents / 100;
}

/** Separador de opciones seleccionables dentro del valor de un atributo. */
export const ATTRIBUTE_OPTIONS_SEPARATOR = "|";

export function parseAttributeOptions(value: string): string[] {
  return value
    .split(ATTRIBUTE_OPTIONS_SEPARATOR)
    .map((o) => o.trim())
    .filter(Boolean);
}
