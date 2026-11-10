import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Truck, 
  Store, 
  Calendar, 
  Clock, 
  MessageCircle, 
  ArrowRight,
  Receipt
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';

export const OrderConfirmation: React.FC = () => {
  const { lastOrder, setCurrentView } = useCart();

  useEffect(() => {
    // Confetti celebration on view mount
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF2A85', '#F59E0B', '#0EA5E9', '#10B981', '#A855F7'],
    });
  }, []);

  if (!lastOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No hay órdenes recientes registradas</h2>
        <button
          onClick={() => setCurrentView('catalog')}
          className="bg-deco-pink text-white text-xs font-bold px-5 py-2.5 rounded-xl"
        >
          Ir a la Tienda
        </button>
      </div>
    );
  }

  const isDelivery = lastOrder.delivery.type === 'delivery';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Thank you Success Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
        
        {/* Header Badge & Title */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            ¡Pago Acreditado con Éxito!
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ¡Gracias por tu compra en DecoArt!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Hemos recibido el pago de tu pedido mediante <strong>QR Simple</strong>. La orden ha ingresado directamente a la cola de armado de nuestro taller en Santa Cruz.
          </p>

          <div className="inline-block bg-slate-900 text-yellow-300 font-mono font-bold text-sm px-4 py-1.5 rounded-xl shadow-sm">
            N° de Orden: {lastOrder.id}
          </div>
        </div>

        {/* WhatsApp Notification Alert Box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
          <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-sm block mb-0.5">Notificación enviada a WhatsApp:</span>
            <span>
              Enviamos el comprobante digital detallado al número <strong>+591 {lastOrder.delivery.phone}</strong>. Te avisaremos cuando el bouquet esté saliendo en ruta.
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 text-xs">
          
          {/* Left: Delivery / Pickup info */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              {isDelivery ? <Truck className="w-4 h-4 text-deco-pink" /> : <Store className="w-4 h-4 text-emerald-600" />}
              {isDelivery ? 'Datos de Entrega en Santa Cruz' : 'Datos para Retiro en Taller'}
            </h3>

            <div className="space-y-1.5 text-slate-700">
              <div>
                <span className="text-slate-400 font-medium">Comprador:</span>{' '}
                <strong>{lastOrder.delivery.buyerName}</strong>
              </div>
              {lastOrder.delivery.recipientName && (
                <div>
                  <span className="text-slate-400 font-medium">Destinatario:</span>{' '}
                  <strong>{lastOrder.delivery.recipientName}</strong>
                </div>
              )}
              <div>
                <span className="text-slate-400 font-medium">Teléfono / WhatsApp:</span>{' '}
                <strong>{lastOrder.delivery.phone}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium">{isDelivery ? 'Dirección:' : 'Lugar de Recojo:'}</span>{' '}
                <strong>{lastOrder.delivery.address} ({lastOrder.delivery.neighborhood})</strong>
              </div>
              {isDelivery && lastOrder.delivery.reference && (
                <div>
                  <span className="text-slate-400 font-medium">Referencia:</span>{' '}
                  <span className="italic">{lastOrder.delivery.reference}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex items-center gap-4 text-emerald-800 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {lastOrder.delivery.deliveryDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Turno: {lastOrder.delivery.timeSlot === 'manana' ? '09:00 - 12:00' : '14:00 - 18:00'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Items and Financial Breakdown */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Receipt className="w-4 h-4 text-purple-600" /> Resumen Financiero
            </h3>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-slate-100 pb-1.5">
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-bold text-slate-800 truncate">{item.product.name}</div>
                    <div className="text-[10px] text-slate-500">
                      Cant: {item.quantity} • {item.customization.selectedNumber ? `#${item.customization.selectedNumber}` : ''} {item.customization.selectedPalette}
                    </div>
                  </div>
                  <div className="font-extrabold text-slate-900">
                    Bs. {item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal Arreglos:</span>
                <span className="font-semibold text-slate-800">Bs. {lastOrder.subtotal}</span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Descuento Aplicado:</span>
                  <span>- Bs. {lastOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Costo de Envío:</span>
                <span className="font-semibold text-slate-800">
                  {lastOrder.deliveryFee === 0 ? '0 Bs. (Recojo Gratis)' : `Bs. ${lastOrder.deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline font-black text-sm text-slate-900">
                <span>TOTAL PAGADO:</span>
                <span className="text-xl text-deco-pink">Bs. {lastOrder.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action: Return to Home Page */}
        <div className="pt-4 text-center space-y-3">
          <button
            onClick={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-deco-pink to-deco-pink-600 hover:from-deco-pink-600 hover:to-deco-pink-700 text-white font-extrabold text-sm py-4 px-8 rounded-2xl shadow-lg shadow-pink-200 transition-all inline-flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Volver a la Pantalla Principal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400">
            ¿Dudas sobre tu pedido? Escríbenos directamente a nuestro WhatsApp oficial: <strong>709-73792</strong>
          </p>
        </div>

      </div>
    </div>
  );
};
