# Fuegos JL — Ecommerce

Ecommerce (Next.js + MUI) con panel de administración. Frontend y backend viven en un único proyecto Next.js; categorías y productos se cargan desde `/admin` y se guardan en PostgreSQL (Neon) con Drizzle ORM.

## Cómo correr el proyecto

```bash
npm install
cp .env.example .env.local   # y completar las variables (ver abajo)
npm run db:migrate           # crea las tablas
npm run db:seed              # carga categorías y productos de muestra
npm run dev                  # http://localhost:3000
```

Otros comandos: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run db:generate` (nueva migración tras cambiar `src/db/schema.ts`), `npm run db:studio`.

> `npm run db:seed` **borra y recrea** categorías, productos e imágenes. Usalo solo en desarrollo.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión a Neon (`postgresql://…?sslmode=require`). |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin`. También firma la cookie de sesión. |

Ambas se leen solo en el servidor (no llevan prefijo `NEXT_PUBLIC_`). `.env.local` está en `.gitignore`; nunca subas credenciales al repositorio.

## Estructura

```
src/app/            ruteo (páginas finas, route handlers en app/api)
src/features/       categories, products, home, about, auth, admin
src/components/     ui/ (genéricos) y layout/ (header, footer, etc.)
src/db/             schema.ts, index.ts (cliente Drizzle + Neon), seed.ts
src/lib/            config, formato de precios, auth, http, utilidades
src/theme/          tokens.ts, theme.ts, typography.ts, ThemeRegistry.tsx
drizzle/            migraciones generadas
```

Los route handlers solo validan con Zod y delegan en `features/<x>/services`; únicamente los services acceden a la base.

## Cómo cambiar el tema

Toda la identidad visual se edita en **`src/theme/tokens.ts`** (hay un comentario al inicio con las instrucciones):

- **Colores**: `palette.light` y `palette.dark` con nombres semánticos (`primary`, `background.default`, `text.primary`, `footer`, `accent`…).
- **Tipografía**: las fuentes se cargan con `next/font` en `src/theme/fonts.ts`; tamaños y pesos de cada variante están en `typography` dentro de `tokens.ts`.
- **Forma, espaciado, breakpoints y sombras**: secciones `shape`, `spacingUnit`, `breakpoints` y `shadows`.

Los componentes usan solo tokens del tema (`color: "primary.main"`, `<Typography variant="…">`); no deben llevar colores ni tamaños de fuente propios. El sitio arranca en modo claro y el header incluye un botón para cambiar a oscuro (la elección se recuerda en el navegador).

## Cargar categorías y productos desde `/admin`

1. Entrá a `/admin` e ingresá con `ADMIN_PASSWORD`.
2. **Categorías**: nombre, slug (se genera solo y se puede editar), descripción, imagen, orden y si está activa. No se puede eliminar una categoría que tenga productos.
3. **Productos**: categoría, nombre, slug, descripción, precio (en pesos), precio anterior, stock, SKU, etiqueta (por ejemplo "ENVÍO GRATIS"), imágenes múltiples con orden (la primera es la principal), atributos clave/valor, activo y destacado.
   - Para que un atributo se muestre como **opciones seleccionables** en el detalle del producto, separá los valores con `|` (ej. `Modelo de Asador` → `Floki | Ragnar 100 | Rollo`).
   - Los productos marcados como **destacados** aparecen en la home.
4. Solo se muestran en el sitio los registros **activos**; desde la tabla del admin se activan o desactivan con un interruptor.

### Imágenes

La base guarda solo la **URL** de la imagen. Hoy el formulario acepta una URL `http(s)` o una ruta local que empiece con `/` (archivos dentro de `public/`, por ejemplo `/images/products/mi-foto.jpg`) y muestra una vista previa. La subida directa de archivos requiere un almacenamiento externo (Vercel Blob o Cloudinary) y todavía no está implementada.

## API

Respuestas con formato `{ data, error }`.

- `GET /api/categories`, `GET /api/products` (paginación `page`/`limit`; filtros `category`, `search`, `featured`). Los GET públicos devuelven solo registros activos.
- `POST/PUT/PATCH/DELETE` en `/api/categories[/id]` y `/api/products[/id]` requieren sesión de admin (`proxy.ts` + cookie httpOnly firmada).
- `POST /api/auth/login` y `POST /api/auth/logout`.

## Pendiente / fuera de alcance

El formulario de Contacto tiene diseño y validación, pero por ahora no envía ni guarda mensajes (no hay tabla ni servicio de correo) y no incluye reCAPTCHA. Carrito, checkout, login de clientes y cuenta de usuario no tienen diseño en `resources/` y no están implementados. El botón "Agregar al carrito" del detalle muestra un aviso.
