import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    couponCode,
    discountPercent,
    discountAmount,
    applyCoupon,
    removeCoupon,
    setCurrentView 
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleProceedToCheckout = () => {
    closeCart();
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-deco-pink" />
              <h3 className="font-extrabold text-slate-800 text-lg">Tu Carrito de Bouquets</h3>
              <span className="bg-pink-100 text-deco-pink text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-pink-300" />
                </div>
                <h4 className="font-bold text-slate-700 text-base mb-1">Tu carrito está vacío</h4>
                <p className="text-xs text-slate-500 mb-5 max-w-xs">
                  Explora nuestro catálogo de bouquets para cumpleaños, aniversarios y momentos especiales.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-deco-pink hover:bg-deco-pink-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Ver Catálogo de Bouquets
                </button>
              </div>
            ) : (
              <>
                {/* SCZ Delivery Banner Hint */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-800">
                  <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Envíos en Santa Cruz de la Sierra:</span> Tarifa plana de solo 15 Bs dentro del 4to anillo. ¡O recojo gratis en nuestro taller!
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-slate-200 rounded-xl p-3 flex gap-3 hover:border-pink-200 transition-colors bg-white shadow-sm"
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                            title="Eliminar bouquet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization Details */}
                        <div className="mt-1 space-y-0.5 text-[11px] text-slate-500">
                          {item.customization.selectedNumber && (
                            <div className="flex items-center gap-1 text-slate-700">
                              <span className="font-semibold text-deco-pink">Número Foil:</span> {item.customization.selectedNumber}
                            </div>
                          )}
                          {item.customization.selectedPalette && (
                            <div className="flex items-center gap-1 text-slate-700">
                              <span className="font-semibold text-slate-500">Paleta:</span> {item.customization.selectedPalette}
                            </div>
                          )}
                          {item.customization.cardMessage && (
                            <div className="italic text-slate-400 truncate text-[10px]">
                              "{item.customization.cardMessage}"
                            </div>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="font-extrabold text-sm text-deco-pink">
                            Bs. {item.product.price * item.quantity}
                          </div>

                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Cupón (ej: DECO10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-deco-pink uppercase font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>

                  {couponCode && (
                    <div className="mt-2 flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1.5 rounded-lg">
                      <span className="flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cupón {couponCode} (-{discountPercent}%)
                      </span>
                      <button 
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-red-600 text-xs font-bold underline"
                      >
                        Quitar
                      </button>
                    </div>
                  )}

                  {couponFeedback && !couponCode && (
                    <div className={`mt-1.5 text-[11px] ${couponFeedback.success ? 'text-emerald-600' : 'text-red-500'}`}>
                      {couponFeedback.message}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal arreglos:</span>
                  <span className="font-semibold text-slate-800">Bs. {subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Descuento aplicado ({couponCode}):</span>
                    <span>- Bs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Envío estimado en Santa Cruz:</span>
                  <span className="font-medium text-slate-700">Desde 0 Bs. (Calculado en checkout)</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline text-sm font-extrabold text-slate-900">
                  <span>Total estimado:</span>
                  <span className="text-xl text-deco-pink">
                    Bs. {subtotal - discountAmount}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-deco-pink-600 to-deco-pink hover:from-deco-pink hover:to-deco-pink-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-pink-200 flex items-center justify-center gap-2 transition-all active:scale-98 text-sm group"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span>Compra rápida disponible como Invitado (Sin contraseña)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
