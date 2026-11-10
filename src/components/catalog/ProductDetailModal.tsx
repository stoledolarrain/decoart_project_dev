import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  Truck, 
  Sparkles,
  Check,
  ShieldCheck
} from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, setCurrentView } = useCart();

  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedNumber, setSelectedNumber] = useState(product.options.defaultNumbers || '18');
  const [customNumberInput, setCustomNumberInput] = useState('');
  const [selectedPalette, setSelectedPalette] = useState(product.options.colorPalettes[0]?.name || '');
  const [cardMessage, setCardMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const effectiveNumber = customNumberInput.trim() || selectedNumber;

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      selectedNumber: product.options.allowsNumberFoil ? effectiveNumber : undefined,
      selectedPalette,
      cardMessage,
      recipientName,
    });
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      selectedNumber: product.options.allowsNumberFoil ? effectiveNumber : undefined,
      selectedPalette,
      cardMessage,
      recipientName,
    });
    onClose();
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 p-2 rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Visual Gallery */}
          <div className="bg-slate-100 p-6 flex flex-col justify-between">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail switcher */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2 justify-center mb-4">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-deco-pink scale-105 shadow-md' : 'border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="bg-white/90 p-4 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-deco-pink" /> Garantía de Calidad DecoArt:
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Vida útil: <strong>{product.lifespanHours} horas</strong> flotación garantizada.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Despacho seguro en auto acondicionado en Santa Cruz.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Customization Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="bg-pink-100 text-deco-pink font-extrabold px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} opiniones)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-deco-pink">
                  Bs. {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    Bs. {product.originalPrice}
                  </span>
                )}
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded ml-2">
                  Stock Disponible
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Customization 1: Numbers (if allowsNumberFoil) */}
              {product.options.allowsNumberFoil && (
                <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="block text-xs font-extrabold text-slate-800 mb-2 flex items-center justify-between">
                    <span>1. Elige el Número Foil Gigante (34"):</span>
                    <span className="text-deco-pink text-[11px] font-bold">Seleccionado: #{effectiveNumber}</span>
                  </label>
                  
                  {/* Preset number pills */}
                  <div className="flex flex-wrap gap-2 mb-2.5">
                    {['18', '20', '25', '30', '40', '50'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setSelectedNumber(num);
                          setCustomNumberInput('');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          selectedNumber === num && !customNumberInput
                            ? 'bg-slate-900 text-white shadow'
                            : 'bg-white border border-slate-300 text-slate-700 hover:border-deco-pink'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {/* Custom Number Input */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-medium">O escribe otro número:</span>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="Ej. 15 o 60"
                      value={customNumberInput}
                      onChange={(e) => setCustomNumberInput(e.target.value)}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-center font-bold outline-none focus:border-deco-pink bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Customization 2: Color Palette */}
              <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <label className="block text-xs font-extrabold text-slate-800 mb-2">
                  2. Paleta de Colores de los Globos:
                </label>
                <div className="space-y-2">
                  {product.options.colorPalettes.map((palette) => {
                    const isSelected = selectedPalette === palette.name;
                    return (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => setSelectedPalette(palette.name)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-deco-pink bg-pink-50/70 text-deco-pink shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex -space-x-1.5">
                            {palette.hex.map((c, i) => (
                              <span
                                key={i}
                                className="w-4 h-4 rounded-full border-2 border-white shadow-xs"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <span>{palette.name}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-deco-pink" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customization 3: Dedication Card */}
              <div className="mb-6 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  3. Tarjeta con Dedicatoria Impresa (Gratis):
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Se imprimirá en tarjeta caligráfica colocada en el centro del bouquet.
                </p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Para quién es (ej. Mi Amor, Camila, Papá)..."
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink bg-white"
                  />
                  <textarea
                    rows={2}
                    maxLength={120}
                    placeholder="Escribe tu dedicatoria especial (máx. 120 caracteres)..."
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink bg-white resize-none"
                  />
                  <div className="text-right text-[10px] text-slate-400">
                    {cardMessage.length}/120 caracteres
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity and Checkout Buttons */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Cantidad:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900 bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-yellow-400" />
                  <span>Agregar al Carrito</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-deco-pink to-deco-pink-600 hover:from-deco-pink-600 hover:to-deco-pink-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <span>Comprar Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pago con QR Simple • Envíos en Santa Cruz de la Sierra</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
