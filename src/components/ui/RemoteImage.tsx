import Image, { type ImageProps } from "next/image";

/**
 * Imagen cuya URL carga el admin (hosts arbitrarios). Se sirve sin optimizar
 * para no requerir configurar cada dominio en `next.config.ts`.
 */
export function RemoteImage(props: Omit<ImageProps, "unoptimized">) {
  // eslint-disable-next-line jsx-a11y/alt-text -- `alt` llega por props
  return <Image {...props} unoptimized />;
}
