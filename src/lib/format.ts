import { config } from "./config";

const formatter = new Intl.NumberFormat(config.locale, {
  style: "currency",
  currency: config.currency,
});

/** Formatea un monto en centavos como moneda. */
export function formatPrice(cents: number): string {
  return formatter.format(cents / 100).replace(/\s/g, "");
}

/** Precio con descuento por transferencia, en centavos. */
export function transferPrice(cents: number): number {
  return Math.round(cents * (1 - config.transferDiscountPercent / 100));
}

/** Valor de cada cuota sin interés, en centavos. */
export function installmentValue(cents: number): number {
  return Math.round(cents / config.installments);
}
