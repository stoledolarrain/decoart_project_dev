import type { Product } from '../types';
import { PRODUCTS } from '../data/products';

/**
 * Devuelve la foto que corresponde a la paleta elegida.
 * Usa los datos actuales del catálogo (no la copia guardada en el carrito de localStorage),
 * así un carrito antiguo también muestra la imagen correcta.
 */
export function getPaletteImage(product: Product, paletteName?: string): string {
  const current = PRODUCTS.find((p) => p.id === product.id) ?? product;
  const palette = current.options.colorPalettes.find((pal) => pal.name === paletteName);
  return palette?.image ?? current.image;
}
