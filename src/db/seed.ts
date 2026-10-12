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
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCpcRqGdML9pnCRAjHuSALwKdHZZJwVWPJi61ofAhPdLH0Fb-SVc6wqiNObLDDMhwRuZqbh_C7dfv21Skn7eOPNTGe9dAIgdljPnMIJpDHq9ulLIJPg_CX2uNBVQBjiltkXv7sIzrmH3oWa4N9wbRCerO0l-Qcb2whLRFhIA_yYpD1DcOz1WRCllpmR-S0B_xkz8v4hLqJO6R0q3S_LQEkdC2UFtPVHmslDKfzCF0Q6Su5Gf2gfdNaExA",
    "sortOrder": 0
  },
  {
    "name": "Parrillas",
    "slug": "parrillas",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDJKqFdPvxc_LUCm3CCaYWUQH3jqCglEBDgX8GM_fAAV6_Hn9WIPol-QartELAAt_Lee_o8L5EIyFtOOGPCajVg4EJ4ZxZT37HcZtGe4wKohpl4F6TUSAtYeN7kiDvDsYNbM4_uTx0csIfMPdjFVCh4Fg97HgC54FAMlGrGsQ74F_gSYEfUQRPWUxl5vrMRoLn7-ScJ4k0YdIM55TIXSSsPtQNtQYRqZ8Az5YBbFhXUFdCO5DdTWoB0yA",
    "sortOrder": 1
  },
  {
    "name": "Fogoneros",
    "slug": "fogoneros",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBEoJyG-zzT4R63brTDNJAtVYzcm9H7o56d7wn-QWNonYf4MPQg4r6or_dBshezaNrfITJxfJZdU3n4mJbZM1zuf0LpHqXwcID4tLg4NdYghBPLaVh1-bzh7HO6E4xxW5WzWnZqFou0eopx3USFpfOKppyJ7ZWTxcKv8_Kz3Fy1E1jBZVg9N8k9hCPHeV-9WJ4l0ghB6qMM3KftcCWriD_cEXcZQBWMe5INT4zSo-j_B5TI72fOEisYwg",
    "sortOrder": 2
  },
  {
    "name": "Leñeros",
    "slug": "leneros",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuALO9e7DF5N-to4laptXLQxdzKpj25USfsTpIh4MEVJSNb7l8RLCUzb9Nb1ANHAXqFSkJZ9_Ub9jO2-kEPE4dghQqyk35qz-F7YY-DKoL4yd3Ghm1MHQwG0zgSohfe1BHXrrbh6MUEWMitBgZvyYCeTBMvC7VyV9SAllJ0XINIb9nBL5WvqiVPOTy55GAI3ZB06OqUPRDMIIKUChDPqPkMOeEMSuWgwqm6v7nqu1xn2W8ZL72iBjZeztA",
    "sortOrder": 3
  },
  {
    "name": "Hornos",
    "slug": "hornos",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCCpq3b0p0aPG5pOtBNkjLm13qycj8b6CR-Fg_kA8QoLl7e-px3KNsKugmqHLLjmqeP0jQBm5YboZR3BQqLzpZr5XCyEOAmrtSLNSDlnGDIWvfnWb1D0GsaGJl6VRbDO7IetpdaGGqRyYb1ZTcnAgu9JyJuKgrNyW7ejp0bawR-YmtDwcZhRBt2frIudHdlxYZ5FK5PhdJKe9wkeHfzKRi5OG_JcvCpxnX95UnSmI6dgSJwjs6JgIEgLA",
    "sortOrder": 4
  },
  {
    "name": "Accesorios",
    "slug": "accesorios",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAMHQ3P0ugYjLj2sd1MraaUxu6tfWSG94b3vEmpaUgSZbP_trPRCAQ5k3R5EjmekYFyseb5Oy90JG45AowlZwiQlaSJwcltgn72gqwCSwUeWd7E3K1Ax5kyfO9YZHAO7TgaBTIKLtkRNOHde8Vfe0S2tbfeO3wjOvAHzJdPwP7iysNr9HvUAl9QQPhBtaa9UmRqsS1UbvahtkVFcyz5d9T2rUMGjYSWQBXhFRkR1j1NS-_EmlIsUKu_4A",
    "sortOrder": 5
  },
  {
    "name": "Cubiertos",
    "slug": "cubiertos",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBKrvLkTDZOpnlE5M4X4v3_SkxIhfHyGwdxGkFa_xyLYqiAo8-Yi1YarBkEbQj8ldyW2OGYRDClNpY_HcMw71xARSd8Inb1ETSxBDXY04BBc9kO6BJc6sFc6RZJW0ugg8rLUMYkE6TspVeuCKztCY3MB8JxfZ8-SDzzh7k-nhNknniEZn5k9sekNlVbuskQ8aFrFp_jAmMimaM8sU6kD7kTCyjb9qIJiV-PTMu3bjEirOVrhP0efydFew",
    "sortOrder": 6
  },
  {
    "name": "Sartenes",
    "slug": "sartenes",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuALbWDf_v7XCdlS2Yrap0Rq1cEWqppc9i538YCOrDqi4EH04CJoLKTcYAjJkmy2oPtFUuzk1b0J4CY4dFUdUvWOQ6-ybKXvlXMpA9mgiH8mWk91QqpsfuU03MPQZri1X9Roe9gHECpS_kX1jpaWzBpJrw75Hnh13nEtE1zVsqOnnZSuHfrngpv2ReLZx2S7i9vrg5f082tvdO7lh7M23O2kGAP46d0ZHM2O2KvXL3igGk5n2oaR2kF2kg",
    "sortOrder": 7
  },
  {
    "name": "Merch",
    "slug": "merch",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC7OO5mUHJAXGRhjI7rba-LtH52EgU-HkNadXE5-H8J-ihPFZg6R3WwAAXxaeAuPxb9oqduZS9TUaLudaIk_E3NoFalsSwJTY9OJghLY6_oL9_ijeW5sLBYQ3PgmPy27LakoNlO92eFjzvPHXqJa02i4DSSJa_Xkm-lvS7UL7dh9YxGYiXqCINVihJSVnAJMmp7DN4UCIVHWfZuIHcRgvi9tML1ZVi8TxXiiBWmVzwB63yCOp6_l-7V8g",
    "sortOrder": 8
  },
  {
    "name": "Gift Card",
    "slug": "gift-card",
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBhGGC4T9tlCLUT78fclDtNDbmg_fr3uB6bYSSGh1ZeR5WcOUImwtN-ySN_QZ0MfT64QM0k82gkfBhN0GEUX8-7-Ps5BL7iaXAa_8ekvTV7mTIA_-bSSVvgSMDZBJqdORqJqzzW2lRqMB1_MbK7tCMeZN2NfRXdvTec5l3lehozN8uXnXuLvCpm0cd2-HRnSsIiNVMic7WnIiAS25trh8_wsXIP0KYVhoUg8zKF6jHA-Jd29wkyhBDxZw",
    "sortOrder": 9
  }
];

const seedProducts: SeedProduct[] = [
  {
    "category": "accesorios",
    "name": "Iniciador de Fuego",
    "slug": "iniciador-de-fuego",
    "price": 8900000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuA60LoFOAt6BtP93SLKPKJdFf1U1bwaUDDNKDwb8s3nJaPBlzGhQh-qQTS31ReGMZllwpiljEtWa_XpA-Q1r1iryt15jFQCrXXbCmbZz49kQL_KCbTORX873OebkQCS7dBMGnfsSSmMlgstDvR-Y-o4tM_dY9Q7B6cT7oNdIFGoBMq7w-1Q9wl4V65YsJBjrHxMxvNfhfQlBk8dnIXfsDTAI0WL0xlOxI4vWK_fdtkpJV3U2TwpyfhJpA",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "fogoneros",
    "name": "Mini Björn - Brasero de mesa",
    "slug": "mini-bjorn-brasero-de-mesa",
    "price": 13980000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAeoHrHGPtylH-i5BitUDm7eKn0Tz-mNaNcLeL_yLa7FHVq75BMYpiYiE3-F_0hYLVdhqXNsMgbYcwwHlQWMHPGnEtpob9j_wAqmPdDDa7UsEBosY3O4KbTrqdaXfeaL64VifTDqB0laPNLTtiXy3E-H9UNMeoMFzYSP73DC5lKOgPbeRY-7i2J0bsBsp7KWM7B6HdOWywR6s32WvwC6kguOte4SGAzxCQgyRMfevj_Fj9yxGMuaGUsWQ",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Odín Full Inox",
    "slug": "odin-full-inox",
    "price": 738000000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC4lJyH15A8rxC2T_Weo6RQ7OfxmWLbuSNR7Fo9yWvD9jKeQ0aoMq4wB7fbGjvJ9a6GKuz7X1j4A3nWTQuiXEPzvmWnvverxFOQFdOARAljiGWgKrqzQNvMZOGvhu7HbdpPYnqbwp8-eK6-dNS448skxYQu62hYdqw1YtHuR08w9NuaSM3wALGlnaKYDztXaoE4uHrT_iGr3Wyt2gS1l4QlqOnNND4hUkaaYM5YttKRj7S2iTQt3AXxXQ",
    "badge": "EDICIÓN LUXURY",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Björn 100",
    "slug": "bjorn-100",
    "price": 92540000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuACBasGpcu2os6iiT0jVKJGKHWuCVIfkUMeQER7DcDKxqVw_Gg31Ds2Z5xAXRdzxMXMrrTBQJLWIvKZGcJshoMJmUjmIANwoiVEkmssaTnTw1u5MqEsaFkHjGQV4YZ4AYVLRvQk4IMmpCGXw9SyMNYg0hnUHgTNS338v6OMoQIXfYCzH07xNGWxxi7YidrbshiO_YDyoFw6ED5S_IGXoS9aZfc4pXTGtBG54j9EvOxQ7LA8oAUgzVQ4ZA",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Ragnar 100",
    "slug": "ragnar-100",
    "price": 116740000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCS4P3d5GoR4_iGxq1QMIj9m1VlH_NRMmXBKGfJlTgQB20IjNDnf3YfZbeVKj8vvVuiQFsMoGw9vB32CnFfBuBcVUu9kfa0htFQFZiFfqep3cPDBiWSC558gxD4PpNNcR7YHiXdS1Nc8Vv2nUEWutC7whZCdKddLBCzZRROHH-S8ugEEUIf1AnjSev75uYPzIZ_Gj0RRIa_MWzoVnYksZ_BSkH9p9-CZU3yJGQcJx2xTA-DwiuIo3X2FA",
    "badge": "MÁS VENDIDO",
    "stock": 10,
    "featured": true
  },
  {
    "category": "asadores",
    "name": "Floki",
    "slug": "floki",
    "price": 222260000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC2KoTLQyEtUDIm1d3a841n0zsXTltE3UETLKaswLDZjHe6noHxc8-IauzcY7uX75naTo9-q2t4SZeBGs2piOtHu0MQ_0GdIDOJWU2peljWUe3GEYibYkF3A9T3Uysfp0SpOE9_K0P3qfIYGbpxL5eHCyOpj3ZP5p0qFkCd724v4iFi1IH8gbY01MSik0ceQ3alBSwMw59zQ49eFsXw_X91mSp6zNCjKbr-ax1ZhQS_8tWeXD3w4Qt3ag",
    "badge": "ENVÍO GRATIS",
    "stock": 10,
    "featured": true
  },
  {
    "category": "sartenes",
    "name": "Combo Sartenes",
    "slug": "combo-sartenes",
    "price": 21411500,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCIE5HJ61qZzJCE_RC5kAsbZ7nwWtPpU8lLSVykLgu6xXsJtjf3rNzWR-Umhbh18oBghcTmUYEVkv08CrF9w4ueuC4Iy0VtKWWyc8TvngTVAG0BbdYHKisUOzeiAkwfkHzKxCULCNhJSCJNcPk95u5WzsJi2jepbkltDn6HS8FFIKmAq38qyO-d20JnFl5de-uxpom9qyALwP5wMIR0oIuNr0ZpTVwcn1ZGONE4n2i7rjpqpkBDDFp9kg",
    "badge": "COMBO PROMO",
    "stock": 10,
    "featured": true
  },
  {
    "category": "fogoneros",
    "name": "Fogonero Francis con Plancha",
    "slug": "fogonero-francis-con-plancha",
    "price": 98500000,
    "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDJWiyfQPv7kDiVOhz2rPWCsG-rxEG2CGjbRwKGQ2hO1qqEOjyAxpSNIv0DWDAJ8cPDp8XL7olggiE-sMk-H2YzgFxvu3S0qJVItAZVLyNKvutkAjpOHmeyJhjm9C5MC9ikKVbTbG4mVB4X8n7BgAh1flP-TlETmWctPOEOmoS8wzMJbA4d-SpyObMj5jEdJdov_ydpKcprkcCzEnCvgbziXt568pPn9DhrWjr9IMfQ0xM2fu7JWiPmpg",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr18LR68snn6EjAJPOXSEdFmQSty_CWRTVZPWXuT6oEdbgSGMxHfkIT_NOyLSBAqRLAE3l0zGgsuIrobviSMgyHzkHdgby7em7KtxiIpY1_PGJ5QSc68c2iGiaz2h_5XaBrDSSukNHSfRkJjFU314bdFzLvOjTASnHXb33s1B6RtiLne3jhoD--_wlPqy9NGYrlTnhwXKqzbGMi3o-S1Xh1SXYK1aWxcuF_C2rKye_mWZ4uHjYX5PKzg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFW3HCiQDNQvifnlU9VqGDSdy-Iu08AtcCo5ZhGpHZ_lE9rvJ4uhhf9WnrhUK6gnZ5NDVrIE6ej_-UTa3q452UdA4yLOy1kItVwCKvF848LE3bQBk_UAzz-u0y3GBj-yDIrPwOFOO09ffiy4UOgrYZ-PgWZg_vbu6a8M8nsp4u9CXZ7HT0Lgn18mBBGQEScWrmVG7PMGFmKqoijwID0H42bef_UlYLhkv8aWj-N9kHqabkAbuhR2jMlA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCswC01G7f9N-quedH4pta25k0j-k453YEYLV-skc-cqSlcRFLj5OT0qMFoQoT8Z40-Ren3t3JoIzueapjnBpfjR9Xd4TDdlLpmXoh3sB-1bH4F-kXFnRb1MnK-sC6yOL3V8cuAF1TNAaXVrpCCdsxIe3Z9mXYS5apU9ju9zZTiBfZ7dIdYo9UKGpktyDAVqQHjlFke9B4Btu82iwcGSQCDmFepEPTEUp0osBjURFhbsdAzEmIdrRCbXQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_8ftnscIzC3iiqiUTAvXu8SNDb45jk6rEXoFY0Jg0HFs-QEiAjTBpbMNEwoeMYi_M_qssVeCbldARrO8rQlecVUuQJ7U_hIC8EJkHM-1DI1yI3nH9-UqQNeJwmUN6xJ2vso81vF3pkBalgzri-0irE_oVMg77z1kzJVc7SpcPSeDu1YW7s6CX-nUAHWauMzej54WrWusHqERRaodsIckQOUs0IHHLW8MjhB-Gr7B9ykIiNnoS3XynhA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA12ogU4KVS4vb-SQoICQPloBIwMbj78iFOv55_YKKSXhFdY1RLlLUi3MTIHgl58-uZ4sGFul7ReYIL75s9klQruvZD8mvPJqkL_xI7K4G2VZInE2-rDdmsINfF_vkUwfLJEBXFJwqcmtfyelWsDFXNMi8W1cpo81483UxEZWm3hw0Y80P9yTvxEuh20laE4JcwfjddBrzBuUZPfz7CB8cR72OFmEId6MyMV03BYkFhZvUupqxdXnP7dg"
    ],
    "badge": null,
    "stock": 1,
    "featured": false,
    "description": "Cuidá tu asador con nuestras fundas especiales.",
    "attributes": {
      "Modelo de Asador": "Floki / Odin, Parrilla Qatar, Ragnar 100/120, Ragnar 80, Bjorn 120, Bjorn 100, Bjorn 80, Rollo"
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
