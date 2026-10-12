/** Textos de marca de la home (no son productos ni categorías). */
export const homeContent = {
  trustStrip: [
    { icon: "shipping", label: "ENVÍOS A TODO EL PAÍS" },
    { icon: "discount", label: "10% OFF CON TRANSFERENCIA" },
    { icon: "card", label: "HASTA 6 CUOTAS SIN INTERÉS" },
    { icon: "verified", label: "14 DÍAS DE GARANTÍA DIRECTA" },
  ],
  hero: {
    image: "/images/home/hero.jpg",
    overline: "HERRERÍA ARTESANAL • ALTA GASTRONOMÍA AL FUEGO",
    title: "No vendemos felicidad, pero ésto es lo más parecido.",
    primaryCta: { label: "NUESTROS PRODUCTOS", href: "/productos" },
    secondaryCta: { label: "Parrilla Oficial Qatar 2022", href: "#qatar" },
  },
  categories: { overline: "CATÁLOGO EXCLUSIVO", title: "CATEGORÍAS" },
  featured: {
    overline: "SELECCIÓN DE LA HERRERÍA",
    title: "Destacados",
    text: "Piezas forjadas a mano diseñadas para trascender generaciones. Financiación hasta 6 cuotas y envíos sin cargo.",
  },
  qatar: {
    image: "/images/home/qatar.jpg",
    overline: "PROVEEDOR OFICIAL DE LA SCALONETA",
    title: "FUIMOS ELEGIDOS POR LA SELECCIÓN",
    before:
      "En el mundial de 2022 en Qatar, la Asociación del Fútbol Argentino (AFA) y los campeones del mundo eligieron nuestra ",
    highlight: "\"PARRILLA QATAR\"",
    after: " para acompañar la concentración albiceleste durante todos los partidos del campeonato mundial.",
    cta: { label: "CONOCÉ LA HISTORIA", href: "/quienes-somos" },
    badge: "HECHO 100% EN INDUSTRIA ARGENTINA",
    caption: "PARRILLA QATAR 2022 • MODELO OFICIAL",
  },
  pillars: [
    { icon: "shipping", title: "ENVÍOS", text: "Hacemos envíos protegidos a todo el país y al exterior." },
    { icon: "payments", title: "PAGOS", text: "10% OFF pagando con transferencia bancaria directa." },
    { icon: "returns", title: "CAMBIOS", text: "Contamos con 14 días de garantía de fábrica asegurada." },
    { icon: "materials", title: "MATERIALES", text: "De máxima calidad y 100% apto para consumo alimenticio." },
  ],
  history: {
    image: "/images/home/historia.jpg",
    overline: "ORIGEN Y TRADICIÓN",
    title: "Nuestra Historia",
    quote:
      "\"El fuego, las herramientas y la buena comida. Tres pasiones que se unieron en 2018 y dieron origen a algo más grande.\"",
    text: "Nacimos en el taller forjando piezas rústicas con hierro macizo y detalles a medida para asadores apasionados. Hoy llevamos la cultura del fuego argentino a patios, restaurantes y hogares alrededor del mundo con la misma obsesión por la calidad y el diseño perdurable.",
    cta: { label: "Ver más sobre nosotros", href: "/quienes-somos" },
    badgeTitle: "Desde 2018",
    badgeText: "Forjando identidad y pasiones en cada rincón del asado.",
  },
  testimonials: {
    overline: "LA VOZ DEL ASADOR",
    title: "Testimonios de nuestros clientes",
    items: [
      { quote: "Usa FUEGOS JL desde EE.UU para mantener viva la tradición del asado de campo.", name: "Manu Ginóbili", role: "San Antonio, Texas (USA)" },
      { quote: "Nos elije día a día para sus recetas y producciones gastronómicas profesionales.", name: "Santiago Giorgini", role: "Chef Profesional • Buenos Aires" },
      { quote: "Súper confiables, calidad de productos y atención 🔟 recomiendo 🔥", name: "Julián Delgado", role: "Dueño de Parrilla Ragnar 80" },
      { quote: "Excelentes productos... es Disney para los que les gusta el fuego.", name: "Maxi Scandura", role: "Dueño de Ivar God 2.0" },
      { quote: "Compré un bjorn 80 y es un lujo. Si tenés poco espacio va como piña.", name: "Lucas Moro", role: "Dueño de Fogonero Björn 80" },
      { quote: "Compramos uno y este finde lo estrenamos. Una locura la calidad de terminaciones y la prestancia del Ragnar!", name: "Rodri Cozzi", role: "Dueño de Ragnar 100" },
    ],
  },
  distribution: {
    overline: "RED DE DISTRIBUCIÓN",
    title: "Dónde podés encontrarnos",
    points: [
      "Parrillas Burger", "Grill West", "Fuegos del Sur", "STM Home", "Mestizo", "Espíritu Parrillero",
      "HB Asadores", "Por Naturaleza Vivero", "El Leñero", "Il Giardino Leloir", "Mundo Diseño Acero", "Tucumán Parrillas",
    ],
  },
  newsletter: {
    title: "Newsletter",
    before: "Registrate y recibí un ",
    highlight: "5% off en tu primera compra",
    after: " y novedades exclusivas.",
    cta: "SUSCRIBIRME",
  },
} as const;
