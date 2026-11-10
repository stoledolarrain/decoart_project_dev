import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  QrCode, 
  ArrowLeft, 
  Clock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CustomBouquetPage: React.FC = () => {
  const { setCurrentView } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [celebrationType, setCelebrationType] = useState('Cumpleaños');
  const [budgetEstimate, setBudgetEstimate] = useState('200-350 Bs');
  const [details, setDetails] = useState('');

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `¡Hola DecoArt Santa Cruz! 👋 Vengo desde su tienda online y deseo cotizar un *Bouquet Personalizado*.\n\n` +
      `👤 *Nombre:* ${customerName || 'Cliente'}\n` +
      `🎉 *Ocasión:* ${celebrationType}\n` +
      `💰 *Presupuesto Estimado:* ${budgetEstimate}\n` +
      `📝 *Detalles de lo que busco:* ${details || 'Tengo fotos de referencia de lo que quiero armar.'}\n\n` +
      `¿Me podrían indicar disponibilidad y coordinar el envío en Santa Cruz? Gracias!`
    );
    return `https://wa.me/59170973792?text=${text}`;
  };

  const inspirationCards = [
    {
      title: 'Bouquet Temático Personajes & Temas',
      desc: 'Figuras especiales, globos temáticos infantiles o de series y videojuegos con base personalizada.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
      tag: 'Infantil / Temático'
    },
    {
      title: 'Maxi Bouquet 2 Metros para 15 Años & Bodas',
      desc: 'Estructuras monumentales con flores naturales preservadas, luces LED cálidas y globos orbe espejo.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      tag: 'Gala & 15 Años'
    },
    {
      title: 'Burbuja Cristal con Nombre en Vinilo & Regalo',
      desc: 'Maxi esfera transparente que puede alojar peluches, botellas o chocolates en su interior.',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      tag: 'Detalle Sorpresa'
    },
    {
      title: 'Arcos Orgánicos & Backdrop Corporativo',
      desc: 'Decoraciones completas para oficinas, lanzamientos de marca e inauguraciones comerciales en Santa Cruz.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
      tag: 'Empresarial'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-deco-pink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo principal</span>
        </button>
      </div>

      {/* Hero Presentation */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-purple-800">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-deco-pink to-purple-500 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5" /> Diseño a Medida • Santa Cruz de la Sierra
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            ¿Tienes una idea especial en mente? Diseñemos tu Bouquet Soñado.
          </h1>

          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-xl">
            Si viste un diseño en Pinterest, Instagram o quieres combinar colores únicos, globos gigantes con helio, luces LED o dedicatorias caligráficas, nuestro taller en Equipetrol lo hace realidad para ti.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-yellow-300" /> Respuesta en minutos por WhatsApp
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <QrCode className="w-4 h-4 text-emerald-300" /> Pago fácil por QR Simple
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Process: How it works */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-deco-pink uppercase tracking-wider">
            Proceso de Operación Simple
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            ¿Cómo funciona el pedido personalizado?
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Seguimos un flujo transparente en 4 pasos para que no pierdas tiempo y recibas tu cotización cerrada al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-deco-pink font-black text-base flex items-center justify-center">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Pasa tu Idea o Foto</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comparte la imagen de referencia que encontraste en Pinterest o dinos la paleta de colores y ocasión.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 font-black text-base flex items-center justify-center">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Definición de Insumos</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Seleccionamos números foil gigantes, orbes cromados, helio certificado o base con peluches/dulces.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 font-black text-base flex items-center justify-center">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Cotización & Envío</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Te enviamos el precio final cerrado y calculamos la tarifa según tu anillo de entrega en Santa Cruz.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 font-black text-base flex items-center justify-center">
              4
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Pago QR & Armado</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pagas con QR Simple desde cualquier banca móvil y el taller inicia el inflado para entrega puntual.
            </p>
          </div>

        </div>
      </div>

      {/* WhatsApp Message Coordinator Interactive Box */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-pink-50 p-6 sm:p-10 rounded-3xl border border-emerald-200 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Business Directo
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Prepara tu consulta rápida y habla con el diseñador
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rellena estos breves datos para que el enlace a WhatsApp lleve tu mensaje preconfigurado y podamos darte un presupuesto exacto en minutos.
            </p>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tu Nombre:</label>
                  <input
                    type="text"
                    placeholder="Ej. Paola Suárez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ocasión:</label>
                  <select
                    value={celebrationType}
                    onChange={(e) => setCelebrationType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Aniversario / Amor">Aniversario / Amor</option>
                    <option value="15 Años">15 Años</option>
                    <option value="Graduación">Graduación</option>
                    <option value="Baby Shower / Gender Reveal">Baby Shower / Gender Reveal</option>
                    <option value="Inauguración / Corporativo">Inauguración / Corporativo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Presupuesto Aprox:</label>
                  <select
                    value={budgetEstimate}
                    onChange={(e) => setBudgetEstimate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="150 - 250 Bs">150 - 250 Bs</option>
                    <option value="250 - 350 Bs">250 - 350 Bs</option>
                    <option value="350 - 500 Bs">350 - 500 Bs</option>
                    <option value="Más de 500 Bs">Más de 500 Bs (Arreglo Mega)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe brevemente qué colores, números o detalles te gustaría:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Quiero un bouquet en tonos lila y plata con el número 25, con una foto que tengo en el celular..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:border-emerald-500 bg-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Action: Big WhatsApp Button */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center space-y-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 mx-auto shadow-md">
              <img src="/resources/logo_1.jpg" alt="DecoArt" className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-base">DecoArt Taller Creativo</h3>
              <p className="text-xs text-emerald-700 font-semibold">Celular Oficial: 709-73792</p>
              <p className="text-[11px] text-slate-400">Santa Cruz de la Sierra</p>
            </div>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-98 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Chatear por WhatsApp Business</span>
            </a>

            <div className="text-[10px] text-slate-400">
              Se abrirá la app de WhatsApp para adjuntar fotos de referencia y coordinar envío y pago QR.
            </div>
          </div>

        </div>
      </div>

      {/* Inspiration Cards Section */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-extrabold text-deco-pink uppercase tracking-wider">
            Inspiración
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Trabajos y Estilos Recientes del Taller
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {inspirationCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-deco-pink uppercase tracking-wider bg-pink-50 px-2 py-0.5 rounded">
                  {card.tag}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
