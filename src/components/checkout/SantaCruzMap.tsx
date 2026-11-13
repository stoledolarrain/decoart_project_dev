import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import { Navigation, Store, MapPin } from 'lucide-react';
import {
  TALLER_LOCATION,
  calculateSantaCruzRing,
  PRESET_ZONES
} from '../../data/zones';

// Leaflet divIcons take plain HTML, not React: mount the lucide icon into a styled element.
const markerIconElement = (style: string, icon: React.ReactNode) => {
  const el = document.createElement('div');
  el.setAttribute('style', style);
  createRoot(el).render(icon);
  return el;
};

interface SantaCruzMapProps {
  currentLat: number;
  currentLng: number;
  onLocationSelect: (lat: number, lng: number, ring: number, fee: number, zoneName: string) => void;
}

export const SantaCruzMap: React.FC<SantaCruzMapProps> = ({
  currentLat,
  currentLng,
  onLocationSelect,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [activeZoneInfo, setActiveZoneInfo] = useState(() => 
    calculateSantaCruzRing(currentLat, currentLng)
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center of Santa Cruz de la Sierra: -17.7833, -63.1821
    const initialLat = currentLat || -17.7833;
    const initialLng = currentLng || -63.1821;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: true,
      });

      // Add clean OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Draw Santa Cruz Rings (Anillos)
      const centerCoords: L.LatLngTuple = [-17.7833, -63.1821];

      // Draw outer circles (5to to 8vo anillos) in light purple/blue
      [
        { radius: 11500, label: '8vo Anillo / Periferia (45 Bs)', color: '#9333EA', weight: 1.5, dash: '4, 4' },
        { radius: 9500, label: '7mo Anillo (35 Bs)', color: '#6366F1', weight: 1.5, dash: '4, 4' },
        { radius: 8000, label: '6to Anillo (28 Bs)', color: '#3B82F6', weight: 1.5, dash: '4, 4' },
        { radius: 6500, label: '5to Anillo (22 Bs)', color: '#0EA5E9', weight: 1.5, dash: '4, 4' },
      ].forEach((ring) => {
        L.circle(centerCoords, {
          radius: ring.radius,
          color: ring.color,
          fillColor: ring.color,
          fillOpacity: 0.03,
          weight: ring.weight,
          dashArray: ring.dash,
        }).addTo(map).bindTooltip(ring.label, { permanent: false, direction: 'top' });
      });

      // Draw 4to Anillo Boundary (Important highlight: inside is 15 Bs flat fee!)
      L.circle(centerCoords, {
        radius: 5000,
        color: '#10B981', // green for low flat fee boundary
        fillColor: '#10B981',
        fillOpacity: 0.08,
        weight: 3,
      }).addTo(map).bindTooltip('Límite 4to Anillo: Tarifa Plana Baja (15 Bs)', { permanent: false, direction: 'top' });

      // Draw 2do Anillo
      L.circle(centerCoords, {
        radius: 2400,
        color: '#059669',
        fillOpacity: 0.05,
        weight: 1.5,
      }).addTo(map);

      // Add Taller DecoArt marker at Equipetrol
      const tallerIcon = L.divIcon({
        className: 'custom-taller-icon',
        html: markerIconElement(
          'background-color: #FF2A85; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 16px;',
          <Store size={16} />
        ),
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker([TALLER_LOCATION.lat, TALLER_LOCATION.lng], { icon: tallerIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px;">
            <strong style="color: #FF2A85;">Taller Central DecoArt</strong><br/>
            ${TALLER_LOCATION.address}<br/>
            <span style="color: #059669; font-weight: bold;">Punto de recojo gratuito (0 Bs)</span>
          </div>
        `);

      // Delivery Destination Marker (Draggable)
      const deliveryIcon = L.divIcon({
        className: 'custom-delivery-pin',
        html: markerIconElement(
          'background-color: #0F172A; color: #FACC15; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 6px 15px rgba(0,0,0,0.4); font-size: 18px; transform: translateY(-8px);',
          <MapPin size={18} />
        ),
        iconSize: [36, 36],
        iconAnchor: [18, 28],
      });

      const marker = L.marker([initialLat, initialLng], {
        draggable: true,
        icon: deliveryIcon,
      }).addTo(map);

      markerRef.current = marker;

      // Update ring info on drag
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        handleUpdateLocation(pos.lat, pos.lng);
      });

      // Click anywhere on map to move marker
      map.on('click', (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        handleUpdateLocation(e.latlng.lat, e.latlng.lng);
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map instance alive or clean up
    };
  }, []);

  const handleUpdateLocation = (lat: number, lng: number) => {
    const ringData = calculateSantaCruzRing(lat, lng);
    setActiveZoneInfo(ringData);
    onLocationSelect(lat, lng, ringData.ring, ringData.fee, ringData.name);
  };

  const handleSelectPreset = (zone: typeof PRESET_ZONES[0]) => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([zone.lat, zone.lng], 14);
      markerRef.current.setLatLng([zone.lat, zone.lng]);
      handleUpdateLocation(zone.lat, zone.lng);
    }
  };

  return (
    <div className="space-y-3">
      {/* Map Control Bar & Ring Status */}
      <div className={`p-3 rounded-2xl border transition-all ${
        activeZoneInfo.isInside4to 
          ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
          : 'bg-amber-50 border-amber-300 text-amber-900'
      }`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white ${
              activeZoneInfo.isInside4to ? 'bg-emerald-600' : 'bg-amber-600'
            }`}>
              {activeZoneInfo.ring}°
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                <span>{activeZoneInfo.name}</span>
                {activeZoneInfo.isInside4to && (
                  <span className="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-0.2 rounded-full font-bold">
                    Tarifa Plana Baja
                  </span>
                )}
              </div>
              <p className="text-[11px] opacity-80">
                {activeZoneInfo.isInside4to 
                  ? 'Dentro del 4to anillo de Santa Cruz: Costo de envío estándar fijado en 15 Bs.'
                  : `Fuera del 4to anillo (~${activeZoneInfo.ring}to Anillo): Costo escalonado a ${activeZoneInfo.fee} Bs por distancia.`}
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-70">Tarifa de Envío</div>
            <div className="text-lg font-black">
              Bs. {activeZoneInfo.fee}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Quick Location Buttons (1-click for typical zones) */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Navigation className="w-3 h-3 text-deco-pink" /> Seleccionar Zonas Frecuentes en SCZ:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {PRESET_ZONES.map((zone, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(zone)}
              className="px-2.5 py-1 bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-300 rounded-lg text-xs font-semibold text-slate-700 whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>{zone.name}</span>
              <span className="text-[10px] font-extrabold text-deco-pink">({zone.fee} Bs)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Interactive Map Container */}
      <div className="relative border-2 border-slate-300 rounded-2xl overflow-hidden shadow-inner h-64 sm:h-72">
        <div ref={mapContainerRef} className="w-full h-full" />
        
        {/* Floating helper legend */}
        <div className="absolute bottom-2 left-2 z-[400] bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200 shadow-md text-[10px] text-slate-700 space-y-1 pointer-events-none">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-white"></span>
            <span>Zona Verde: Dentro del 4to Anillo = 15 Bs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block border border-white"></span>
            <span>Zona Azul/Morada: 5to al 8vo Anillo = 22 a 45 Bs</span>
          </div>
          <div className="text-slate-400 italic">Haz clic en el mapa o arrastra el marcador <MapPin className="inline w-3 h-3" /></div>
        </div>
      </div>
    </div>
  );
};
