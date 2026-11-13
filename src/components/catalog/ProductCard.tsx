import React from 'react';
import { Star, Zap, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForModal } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, {
      selectedNumber: product.options.allowsNumberFoil ? product.options.defaultNumbers || '18' : undefined,
      selectedPalette: product.options.colorPalettes[0]?.name,
    });
  };

  return (
    <div 
      data-reveal
      onClick={() => setSelectedProductForModal(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-deco-pink/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.bestseller && (
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" /> Bestseller
            </span>
          )}
          {product.express3h && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" /> Listo en 3h
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-deco-pink" /> Ver y Personalizar
          </span>
        </div>

        {/* Height and Gas Tag */}
        <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
          {product.heightCm} cm • {product.includesHelium ? 'Helio 100%' : 'Aire Pro'}
        </div>
      </div>

      {/* Product Details (Amazon/eBay style) */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Ratings */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-bold text-deco-pink uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-extrabold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-deco-pink transition-colors mb-2">
            {product.name}
          </h3>

          {/* Palette Color Dots Preview */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[10px] text-slate-400 font-medium mr-1">Paletas:</span>
            {product.options.colorPalettes.slice(0, 3).map((pal) => (
              <div 
                key={pal.id} 
                className="flex -space-x-1 border border-slate-200 rounded-full p-0.5 bg-slate-50"
                title={pal.name}
              >
                {pal.hex.map((color, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-2.5 h-2.5 rounded-full border border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ))}
            {product.options.allowsNumberFoil && (
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200 ml-1">
                # Números
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                Bs. {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  Bs. {product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              Disponible hoy en SCZ
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="bg-slate-900 hover:bg-deco-pink text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 flex-shrink-0"
            title="Agregar directamente al carrito"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
