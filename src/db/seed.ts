import { config } from "dotenv";

config({ path: ".env.local" });

type SeedCategory = { name: string; slug: string; imageUrl: string; sortOrder: number };
type SeedProduct = {
  category: string;
  name: string;
  slug: string;
  /** Centavos. */
  price: number;
  imageUrl?: string;
  images?: string[];
  badge: string | null;
  stock: number;
  featured: boolean;
  description?: string;
  attributes?: Record<string, string>;
};

const seedCategories: SeedCategory[] = [
  {
    "name": "Asadores",
    "slug": "asadores",
    "imageUrl": "/images/categories/asadores.jpg",
    "sortOrder": 0
  },
  {
    "name": "Parrillas",
    "slug": "parrillas",
    "imageUrl": "/images/categories/parrillas.jpg",
    "sortOrder": 1
  },
  {
    "name": "Fogoneros",
    "slug": "fogoneros",
    "imageUrl": "/images/categories/fogoneros.jpg",
    "sortOrder": 2
  },
  {
    "name": "Leñeros",
    "slug": "leneros",
    "imageUrl": "/images/categories/leneros.jpg",
    "sortOrder": 3
  },
  {
    "name": "Hornos",
    "slug": "hornos",
    "imageUrl": "/images/categories/hornos.jpg",
    "sortOrder": 4
  },
  {
    "name": "Accesorios",
    "slug": "accesorios",
    "imageUrl": "/images/categories/accesorios.jpg",
    "sortOrder": 5
  },
  {
    "name": "Cubiertos",
    "slug": "cubiertos",
    "imageUrl": "/images/categories/cubiertos.jpg",
    "sortOrder": 6
  },
  {
    "name": "Sartenes",
    "slug": "sartenes",
    "imageUrl": "/images/categories/sartenes.jpg",
    "sortOrder": 7
  },
  {
    "name": "Merch",
    "slug": "merch",
    "imageUrl": "/images/categories/merch.jpg",
    "sortOrder": 8
  },
  {
    "name": "Gift Card",
    "slug": "gift-card",
    "imageUrl": "/images/categories/gift-card.jpg",
    "sortOrder": 9
  }
];

const seedProducts: SeedProduct[] = [
  {
    "category": "accesorios",
    "name": "Iniciador de Fuego",
    "slug": "iniciador-de-fuego",
    "price": 8900000,
    "imageUrl": "/images/products/iniciador-de-fuego.jpg",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "fogoneros",
    "name": "Mini Björn - Brasero de mesa",
    "slug": "mini-bjorn-brasero-de-mesa",
    "price": 13980000,
    "imageUrl": "/images/products/mini-bjorn-brasero-de-mesa.jpg",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Odín Full Inox",
    "slug": "odin-full-inox",
    "price": 738000000,
    "imageUrl": "/images/products/odin-full-inox.jpg",
    "badge": "EDICIÓN LUXURY",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Björn 100",
    "slug": "bjorn-100",
    "price": 92540000,
    "imageUrl": "/images/products/bjorn-100.jpg",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Ragnar 100",
    "slug": "ragnar-100",
    "price": 116740000,
    "imageUrl": "/images/products/ragnar-100.jpg",
    "badge": "MÁS VENDIDO",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Floki",
    "slug": "floki",
    "price": 222260000,
    "imageUrl": "/images/products/floki.jpg",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "sartenes",
    "name": "Combo Sartenes",
    "slug": "combo-sartenes",
    "price": 21411500,
    "imageUrl": "/images/products/combo-sartenes.jpg",
    "badge": "COMBO PROMO",
    "stock": 10,
    "featured": true
  },
  {
    "category": "fogoneros",
    "name": "Fogonero Francis con Plancha",
    "slug": "fogonero-francis-con-plancha",
    "price": 98500000,
    "imageUrl": "/images/products/fogonero-francis-con-plancha.jpg",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "accesorios",
    "name": "Funda FUEGOS para Asador",
    "slug": "funda-fuegos-para-asador",
    "price": 17940000,
    "images": [
      "/images/products/funda-fuegos-para-asador-1.jpg",
      "/images/products/funda-fuegos-para-asador-2.jpg",
      "/images/products/funda-fuegos-para-asador-3.jpg",
      "/images/products/funda-fuegos-para-asador-4.jpg",
      "/images/products/funda-fuegos-para-asador-5.jpg"
    ],
    "badge": null,
    "stock": 1,
    "featured": false,
    "description": "Cuidá tu asador con nuestras fundas especiales.",
    "attributes": {
      "Modelo de Asador": "Floki / Odin | Parrilla Qatar | Ragnar 100/120 | Ragnar 80 | Bjorn 120 | Bjorn 100 | Bjorn 80 | Rollo"
    }
  }
];

async function main() {
  const { db } = await import("./index");
  const { categories, productImages, products } = await import("./schema");

  await db.delete(productImages);
  await db.delete(products);
  await db.delete(categories);

  const insertedCategories = await db
    .insert(categories)
    .values(seedCategories.map((c) => ({ ...c, description: null })))
    .returning({ id: categories.id, slug: categories.slug });
  const categoryId = new Map(insertedCategories.map((c) => [c.slug, c.id]));

  for (const p of seedProducts) {
    const [row] = await db
      .insert(products)
      .values({
        categoryId: categoryId.get(p.category)!,
        name: p.name,
        slug: p.slug,
        description: p.description ?? null,
        price: p.price,
        stock: p.stock,
        badge: p.badge,
        isFeatured: p.featured,
        attributes: p.attributes ?? {},
      })
      .returning({ id: products.id });
    const urls = p.images ?? (p.imageUrl ? [p.imageUrl] : []);
    if (urls.length > 0) {
      await db.insert(productImages).values(
        urls.map((url, i) => ({ productId: row.id, url, alt: p.name, sortOrder: i })),
      );
    }
  }

  console.log(`Seed OK: ${seedCategories.length} categorías, ${seedProducts.length} productos`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
