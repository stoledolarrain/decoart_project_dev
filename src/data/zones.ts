export interface SantaCruzZone {
  name: string;
  ring: number;
  description: string;
  fee: number;
  centerDistanceKm: number;
  lat: number;
  lng: number;
}

export const TALLER_LOCATION = {
  name: 'Taller Central DecoArt (Equipetrol)',
  address: 'Av. San Martín, Calle 7 Oeste #45, Barrio Equipetrol',
  city: 'Santa Cruz de la Sierra',
  lat: -17.7686,
  lng: -63.1956,
  hours: 'Lunes a Sábado: 08:30 - 19:30 | Domingos: 09:00 - 14:00',
  pickupNotice: 'Recojo sin costo. Tu arreglo estará inflado y empaquetado en funda protectora en el horario seleccionado.',
};

export const SANTA_CRUZ_RINGS_INFO = [
  {
    ring: 1,
    name: 'Casco Viejo / 1er Anillo',
    fee: 15,
    isInside4to: true,
    radiusKm: 1.2,
  },
  {
    ring: 2,
    name: '2do Anillo (Monseñor Rivero / El Trompillo)',
    fee: 15,
    isInside4to: true,
    radiusKm: 2.3,
  },
  {
    ring: 3,
    name: '3er Anillo (Equipetrol / Barrio Lindo / Zoo)',
    fee: 15,
    isInside4to: true,
    radiusKm: 3.5,
  },
  {
    ring: 4,
    name: '4to Anillo (Límite Urbano Central)',
    fee: 15,
    isInside4to: true,
    radiusKm: 4.8,
  },
  {
    ring: 5,
    name: '5to Anillo (Av. Banzer / Santos Dumont)',
    fee: 22,
    isInside4to: false,
    radiusKm: 6.2,
  },
  {
    ring: 6,
    name: '6to Anillo (Radial 26 / Pampa de la Isla)',
    fee: 28,
    isInside4to: false,
    radiusKm: 7.6,
  },
  {
    ring: 7,
    name: '7mo Anillo (Plan 3000 / Los Lotes)',
    fee: 35,
    isInside4to: false,
    radiusKm: 9.0,
  },
  {
    ring: 8,
    name: '8vo Anillo / Periferia / Urubó',
    fee: 45,
    isInside4to: false,
    radiusKm: 11.5,
  },
];

// Calculate distance in km from Santa Cruz center (Plaza 24 de Septiembre: -17.7833, -63.1821)
export function calculateSantaCruzRing(lat: number, lng: number): { ring: number; fee: number; isInside4to: boolean; name: string } {
  const CENTER_LAT = -17.7833;
  const CENTER_LNG = -63.1821;

  // Haversine formula
  const R = 6371; // Earth radius in km
  const dLat = ((lat - CENTER_LAT) * Math.PI) / 180;
  const dLng = ((lng - CENTER_LNG) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((CENTER_LAT * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  if (distanceKm <= 1.5) {
    return { ring: 1, fee: 15, isInside4to: true, name: '1er Anillo (Casco Viejo)' };
  } else if (distanceKm <= 2.6) {
    return { ring: 2, fee: 15, isInside4to: true, name: '2do Anillo' };
  } else if (distanceKm <= 3.8) {
    return { ring: 3, fee: 15, isInside4to: true, name: '3er Anillo (Equipetrol / Zona Central)' };
  } else if (distanceKm <= 5.2) {
    return { ring: 4, fee: 15, isInside4to: true, name: '4to Anillo (Límite Tarifa Plana Baja)' };
  } else if (distanceKm <= 6.8) {
    return { ring: 5, fee: 22, isInside4to: false, name: '5to Anillo' };
  } else if (distanceKm <= 8.2) {
    return { ring: 6, fee: 28, isInside4to: false, name: '6to Anillo' };
  } else if (distanceKm <= 9.8) {
    return { ring: 7, fee: 35, isInside4to: false, name: '7mo Anillo' };
  } else {
    return { ring: 8, fee: 45, isInside4to: false, name: '8vo Anillo / Zona Periférica / Urubó' };
  }
}

// Preset popular delivery zones in Santa Cruz for fast 1-click selection
export const PRESET_ZONES: SantaCruzZone[] = [
  { name: 'Equipetrol / Sirari (3er Anillo)', ring: 3, description: 'Cerca al Taller DecoArt', fee: 15, centerDistanceKm: 3.2, lat: -17.7667, lng: -63.1965 },
  { name: 'Casco Viejo / Plaza 24 de Septiembre (1er Anillo)', ring: 1, description: 'Centro histórico', fee: 15, centerDistanceKm: 0.5, lat: -17.7833, lng: -63.1821 },
  { name: 'Av. Las Américas / Cine Center (2do Anillo)', ring: 2, description: 'Zona Sur / Trompillo', fee: 15, centerDistanceKm: 2.1, lat: -17.7981, lng: -63.1789 },
  { name: 'Av. San Martín y 4to Anillo', ring: 4, description: 'Límite tarifa reducida', fee: 15, centerDistanceKm: 4.8, lat: -17.7562, lng: -63.2045 },
  { name: 'Radial 26 / Av. Banzer 5to Anillo', ring: 5, description: 'Zona Norte', fee: 22, centerDistanceKm: 6.2, lat: -17.7451, lng: -63.1754 },
  { name: 'Pampa de la Isla / Av. Virgen de Cotoca (6to Anillo)', ring: 6, description: 'Zona Este', fee: 28, centerDistanceKm: 7.5, lat: -17.7725, lng: -63.1251 },
  { name: 'Plan 3000 (7mo Anillo)', ring: 7, description: 'Zona Sur-Este', fee: 35, centerDistanceKm: 8.9, lat: -17.8285, lng: -63.1264 },
  { name: 'Urubó Village / Colinas del Urubó', ring: 8, description: 'Cruzando puente Foianini', fee: 45, centerDistanceKm: 10.5, lat: -17.7541, lng: -63.2321 },
];
