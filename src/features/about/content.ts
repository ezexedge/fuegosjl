/** Contenido editorial de "Quiénes somos". */
export const aboutContent = {
  hero: { image: "/images/about/hero.jpg", overline: "Fuegos JL", title: "Nuestra Historia" },
  quote: {
    text: "“Hoy todos queremos un Fuegos JL que nos una, nos conecte y nos permita disfrutar el momento.”",
    author: "— JULIÁN, FUNDADOR",
  },
  story1: {
    image: "/images/about/julian.jpg",
    imageAlt: "Julián posando en su taller junto a su primer asador de hierro circular",
    overline: "COMO EMPEZÓ TODO",
    title: "Casi sin querer",
    paragraphs: [
      "Mi nombre es Julián. Fuegos JL nació a principios de 2018, casi sin querer y sin un plan.",
      "Desde chico, el fuego me atrae y me hipnotiza. Siempre fui amante de la buena comida y de crear con las manos. Uniendo estas tres pasiones, armé mi primer asador — un proyecto que me llevó ocho meses terminar, y que valió cada uno.",
    ],
  },
  story2: {
    image: "/images/about/taller.jpg",
    imageAlt: "Herrero artesanal soldando hierro en taller con máscara protectora y cámara grabando",
    overline: "EL PUNTO DE ENCUENTRO",
    title: "Compartir el fuego",
    paragraphs: [
      "Mi familia y amigos lo disfrutaron tanto como yo. Esa experiencia compartida nos llevó a pensar en algo más grande: hacer un asador para el club donde me crié.",
      "Así nació el segundo. Y después de varios encuentros donde el asador fue el centro de la reunión — de las charlas, la comida y el fuego — entendí que de todo eso había nacido algo nuevo: un proyecto de verdad.",
    ],
  },
  qatar: {
    image: "/images/about/equipo.jpg",
    imageAlt: "Equipo de herreros y artesanos de Fuegos JL frente a la monumental Parrilla Qatar",
    overline: "UN ORGULLO INMENSO",
    title: "Elegidos para ir a Qatar",
    text: "En el Mundial de 2022, nuestra \"Parrilla Qatar\" cruzó el océano para acompañar uno de los momentos más emocionantes del fútbol argentino. Un orgullo enorme que resume todo lo que buscamos: estar presentes en los grandes encuentros que la gente nunca olvida.",
  },
  mission: {
    overline: "HOY",
    title: "Más que un asador",
    paragraphs: [
      "Cada Fuegos JL nace de las mismas pasiones de siempre: el fuego, la creatividad y la buena comida. Pero sobre todo, nace de algo más profundo — la idea de reunirnos alrededor de lo que nos une y nos invita a disfrutar el momento.",
      "Lo que empezó con un asador hecho a mano hoy es un equipo de más de 30 personas que trabajamos como una gran familia. Compartimos el mismo fuego que nos mueve desde el día uno, y lo ponemos en cada pieza que sale de nuestro taller.",
    ],
    cta: { label: "CONOCE NUESTROS PRODUCTOS", href: "/productos" },
  },
} as const;
