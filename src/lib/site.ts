/** Contenido de marca del sitio (no son productos ni categorías). */
export const site = {
  name: "Fuegos JL",
  logo: { src: "/brand/logo.jpg", width: 512, height: 471, alt: "Fuegos JL" },
  announcements: [
    "10% OFF pagando con transferencia",
    "Envíos a todo el país",
    "Hasta 6 cuotas sin interés",
  ],
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Contacto", href: "/contacto" },
    { label: "Resto del mundo", href: "#" },
    { label: "Quiénes Somos", href: "/quienes-somos" },
  ],
  contact: {
    phoneRaw: "5491167422899",
    phone: "+54 9 11 6742-2899",
    email: "info@fuegosjl.com",
    address: "Abdon Calderon 1089",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "TikTok", href: "#" },
  ],
  payments: ["VISA", "Mastercard", "AMEX", "Naranja", "Cabal", "Argencard", "PagoFácil", "RapiPago", "Banelco"],
  darkFooter: {
    tagline: "Herrería de autor y cultura gastronómica.",
    address: "Abdon Calderon 1089, Buenos Aires, Argentina.",
    legalLinks: [
      "Términos y Condiciones",
      "Políticas de Envíos",
      "Garantía y Devoluciones",
      "Defensa de las y los Consumidores",
      "Parrilla Qatar 2022 Oficial",
      "Sucursales",
    ],
    payments: ["Visa", "Mastercard", "AMEX", "Mercado Pago", "Transferencia"],
    copyright: "© 2024 Fuegos JL. Todos los derechos reservados. Industria Argentina.",
    cuit: "CUIT 30-71677270-1",
  },
  legal: "Copyright Fuegos JL - 30716772701 - 2026. Todos los derechos reservados.",
} as const;
