import type { Product } from '../types';
import { PRODUCTS } from '../data/products';

/**
 * Devuelve la foto que corresponde a la paleta elegida.
 * Busca primero por `paletteId` (estable ante cambios de nombre) y hace fallback por `paletteName`.
 * Usa los datos actuales del catálogo (no la copia guardada en el carrito de localStorage),
 * así un carrito antiguo también muestra la imagen correcta.
 */
export function getPaletteImage(
  product: Product,
  paletteName?: string,
  paletteId?: string,
): string {
  const current = PRODUCTS.find((p) => p.id === product.id) ?? product;
  const palettes = current.options.colorPalettes;
  const palette =
    (paletteId ? palettes.find((pal) => pal.id === paletteId) : undefined) ??
    (paletteName ? palettes.find((pal) => pal.name === paletteName) : undefined);
  return palette?.image ?? current.image;
}
