import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  QrCode, 
  CreditCard,
  MessageCircle,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useCart();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t-4 border-deco-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-deco-pink shadow-md bg-white">
                <img 
                  src="/resources/logo_1.jpg" 
                  alt="DecoArt Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">
                  Deco<span className="text-deco-pink">Art</span>
                </span>
                <p className="text-[11px] text-pink-400 font-medium">Arte • Detalles • Decoración</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Plataforma e-commerce especializada en bouquets de globos estandarizados y personalizados con despacho express en Santa Cruz de la Sierra. Compra 24/7 en 3 minutos sin cotizar.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Compra Segura
              </span>
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                <Truck className="w-3.5 h-3.5 text-yellow-400" /> Entrega Express
              </span>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-deco-pink" /> Servicios y Catálogo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-deco-pink transition-colors text-left"
                >
                  • Catálogo de Bouquets Estandarizados
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('custom-bouquet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1"
                >
                  • Bouquet Personalizado (Vía WhatsApp)
                </button>
              </li>
              <li>
                <span className="text-slate-400">• Bouquets Cumpleaños con Números Foil 34"</span>
              </li>
              <li>
                <span className="text-slate-400">• Arreglos Románticos & Aniversarios</span>
              </li>
              <li>
                <span className="text-slate-400">• Graduaciones & Logros Académicos</span>
              </li>
              <li>
                <span className="text-slate-400">• Mini Bouquets Económicos</span>
              </li>
            </ul>
          </div>

          {/* Delivery & Coverage */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-400" /> Envíos en Santa Cruz
            </h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <p>
                <strong className="text-white">Dentro del 4to Anillo:</strong> Tarifa plana baja de <span className="text-emerald-400 font-bold">15 Bs.</span>
              </p>
              <p>
                <strong className="text-white">5to al 8vo Anillo & Urubó:</strong> Tarifa calculada según distancia (22 Bs. a 45 Bs.).
              </p>
              <p>
                <strong className="text-white">Recojo en Taller (Equipetrol):</strong> Costo <span className="text-emerald-400 font-bold">0 Bs.</span> (Gratis).
              </p>
              <div className="mt-3 p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                <span className="font-semibold text-slate-300">Horarios de Entrega:</span>
                <div className="text-slate-400">Turno Mañana: 09:00 - 12:00</div>
                <div className="text-slate-400">Turno Tarde: 14:00 - 18:00</div>
              </div>
            </div>
          </div>

          {/* Contact & Payment Methods */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> Contacto & Pagos
            </h4>
            <div className="space-y-2 text-xs text-slate-300 mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/59170973792" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:underline font-semibold text-emerald-400"
                >
                  WhatsApp Business: 709-73792
                </a>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Barrio Equipetrol, Av. San Martín #45, Santa Cruz de la Sierra - Bolivia</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Lunes a Sábado: 08:30 - 19:30</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-2">
                Medios de Pago Aceptados
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[11px] text-emerald-400 font-bold">
                  <QrCode className="w-3.5 h-3.5" /> QR Simple (Banca Móvil)
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[11px] text-blue-400 font-bold">
                  <CreditCard className="w-3.5 h-3.5" /> Visa / Mastercard
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic">
                * No se acepta pago contra entrega debido a la naturaleza personalizada y perecedera de los globos con helio.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 DecoArt - Todos los derechos reservados. Santa Cruz de la Sierra, Bolivia.
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-deco-pink fill-deco-pink" />
            <span>para celebrar momentos especiales.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
