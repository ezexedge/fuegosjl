/** Configuración global de la tienda. */
export const config = {
  locale: "es-AR",
  currency: "ARS",
  /** Descuento por pago con transferencia o depósito (porcentaje). */
  transferDiscountPercent: 10,
  /** Cantidad de cuotas sin interés. */
  installments: 6,
  pagination: { defaultLimit: 12, maxLimit: 100 },
  admin: { cookieName: "admin_session", sessionHours: 12 },
} as const;
