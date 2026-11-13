import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Truck, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useParallax } from '../../hooks/useScrollReveal';

export const HeroBanner: React.FC = () => {
  const { setCurrentView } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Parallax de las imágenes del banner ligado al scroll
  useParallax(sliderRef, 'img[data-parallax]');

  const banners = [
    {
      image: '/resources/banner_2.jpg',
      title: 'Los Mejores Bouquets de Globos en Santa Cruz',
      subtitle: 'Celebra cumpleaños, aniversarios y fechas especiales con arreglos espectaculares listos para entrega express.',
      cta: 'Ver Bouquets Disponibles',
      badge: 'Entrega hoy en Santa Cruz'
    },
    {
      image: '/resources/banner_1.jpg',
      title: 'Arte, Detalles & Decoración para Momentos Únicos',
      subtitle: 'Automatiza tu regalo en menos de 3 minutos sin esperar cotizaciones manuales.',
      cta: 'Explorar Catálogo',
      badge: 'Calidad Premium Certificada'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative mb-8">
      {/* Main Banner Slider */}
      <div ref={sliderRef} data-reveal className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-100 bg-slate-900 aspect-[21/9] sm:aspect-[24/8] min-h-[220px] sm:min-h-[300px]">
        {banners.map((b, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Banner Background Image */}
            <img 
              data-parallax
              src={b.image} 
              alt={b.title} 
              className="w-full h-full object-cover object-center will-change-transform" 
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent flex items-center p-6 sm:p-10 lg:p-14">
              <div className="max-w-xl text-white space-y-2 sm:space-y-3">
                <span className="inline-flex items-center gap-1.5 bg-deco-pink text-white text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> {b.badge}
                </span>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                  {b.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow hidden sm:block max-w-md">
                  {b.subtitle}
                </p>

                <div className="pt-2 sm:pt-4 flex flex-wrap gap-2.5 sm:gap-3">
                  <a
                    href="#catalogo"
                    className="bg-deco-pink hover:bg-deco-pink-600 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>{b.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setCurrentView('custom-bouquet')}
                    className="bg-white/90 hover:bg-white text-purple-900 font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span>Diseño Personalizado</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-3 right-4 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeSlide ? 'w-6 bg-deco-pink' : 'w-2 bg-white/60 hover:bg-white'
              }`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Feature Value Props Bar (Amazon/eBay Style) */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div data-reveal className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-deco-pink flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-800">Santa Cruz Express</div>
            <div className="text-[11px] text-slate-500">15 Bs. dentro del 4to anillo</div>
          </div>
        </div>

        <div data-reveal className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-800">Listos en 3 Horas</div>
            <div className="text-[11px] text-slate-500">Bouquets express en stock</div>
          </div>
        </div>

        <div data-reveal className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-800">Pago 100% Seguro</div>
            <div className="text-[11px] text-slate-500">QR Simple interoperable</div>
          </div>
        </div>

        <div data-reveal className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-800">Globos de Calidad</div>
            <div className="text-[11px] text-slate-500">Helio y látex certificado</div>
          </div>
        </div>
      </div>
    </div>
  );
};
