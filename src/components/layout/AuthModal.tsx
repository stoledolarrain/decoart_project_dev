import React, { useState } from 'react';
import { X, Gift, CheckCircle, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const AuthModal: React.FC = () => {
  const { loginModalOpen, closeLoginModal, isRegistered, user, registerAccount, loginAccount, logout } = useAuth();
  const { applyCoupon } = useCart();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!loginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      if (!name || !email) return;
      registerAccount(name, email, phone || '70012345');
      // Automatically apply the welcome coupon
      applyCoupon('BIENVENIDO15');
    } else {
      if (!email) return;
      loginAccount(email);
      applyCoupon('BIENVENIDO15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeLoginModal}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner with Logo & Incentive */}
        <div className="bg-gradient-to-r from-deco-pink via-deco-pink-600 to-purple-600 p-6 text-white text-center relative">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg mx-auto mb-3 bg-white">
            <img 
              src="/resources/logo_1.jpg" 
              alt="DecoArt" 
              className="w-full h-full object-cover" 
            />
          </div>

          <h3 className="font-extrabold text-xl tracking-tight">Club DecoArt Santa Cruz</h3>
          <p className="text-xs text-pink-100 mt-1 max-w-xs mx-auto">
            {isRegistered
              ? '¡Bienvenido de nuevo a tu cuenta!'
              : 'Únete para recibir descuentos exclusivos, ofertas en fechas festivas y acumular puntos.'}
          </p>

          {!isRegistered && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-yellow-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
              <Gift className="w-3.5 h-3.5 text-slate-900" /> ¡15% OFF en tu primer pedido con BIENVENIDO15!
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isRegistered ? (
            /* Logged in state */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-lg">{user?.name}</h4>
                <p className="text-xs text-slate-500">{user?.email || 'Cuenta Registrada'}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-left text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Beneficios Activos:
                </div>
                <p>• Cupón de 15% OFF (BIENVENIDO15) habilitado.</p>
                <p>• Prioridad de armado en taller para fechas pico.</p>
                <p>• Historial de pedidos guardado en Santa Cruz.</p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={closeLoginModal}
                  className="flex-1 bg-deco-pink hover:bg-deco-pink-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                >
                  Continuar Comprando
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2.5 text-slate-500 hover:text-red-600 text-xs font-semibold hover:bg-red-50 rounded-xl transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            /* Not logged in form */
            <div>
              {/* Tab Selector */}
              <div className="flex border-b border-slate-200 mb-5">
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 pb-2.5 text-xs font-bold transition-all ${
                    mode === 'register'
                      ? 'border-b-2 border-deco-pink text-deco-pink'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Crear Cuenta (15% OFF)
                </button>
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 pb-2.5 text-xs font-bold transition-all ${
                    mode === 'login'
                      ? 'border-b-2 border-deco-pink text-deco-pink'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Ya tengo cuenta
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Valeria Aguilera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu-correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                  />
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Número de WhatsApp (Opcional)
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 70912345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl outline-none focus:border-deco-pink"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-deco-pink-600 to-deco-pink hover:from-deco-pink hover:to-deco-pink-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-98"
                >
                  {mode === 'register' ? 'Crear Cuenta y Obtener 15% OFF' : 'Iniciar Sesión'}
                </button>
              </form>

              {/* Guest option reminder */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline"
                >
                  ¿Tienes prisa? Continuar como invitado sin cuenta →
                </button>
                <p className="text-[10px] text-slate-400 mt-1">
                  En DecoArt puedes realizar tu pedido en 3 minutos sin registro obligatorio.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
