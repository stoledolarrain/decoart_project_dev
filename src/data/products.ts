import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'bq-01',
    name: 'Decoración "Feliz Cumpleaños" con Letras Foil y Moños',
    slug: 'decoracion-feliz-cumpleanos-letras-foil',
    category: 'cumpleanos',
    categoryLabel: 'Cumpleaños',
    price: 220,
    originalPrice: 260,
    image: '/resources/catalog/birthday/birthday1.jpg',
    gallery: [
      '/resources/catalog/birthday/birthday1.jpg',
      '/resources/catalog/birthday/birthday2.jpg',
      '/resources/catalog/birthday/birthday3.jpg',
      '/resources/catalog/birthday/birthday4.jpg',
    ],
    description: 'Decoración de pared con letrero "Feliz Cumpleaños" en letras foil cursivas, dos columnas de globos cromados, perlados y transparentes con confeti, moños de cinta y corazones de papel.',
    includesHelium: true,
    lifespanHours: 48,
    heightCm: 180,
    rating: 4.9,
    reviewCount: 58,
    bestseller: true,
    express3h: true,
    tags: ['Más Vendido', 'Entrega 3h', 'Letras Foil'],
    options: {
      allowsNumberFoil: false,
      colorPalettes: [
        { id: 'rose-gold', name: 'Rose Gold & Champagne', hex: ['#C98A7A', '#F3E2C7', '#F2B8B5'], image: '/resources/catalog/birthday/birthday1.jpg' },
        { id: 'verde-olivo', name: 'Verde Olivo & Champagne', hex: ['#7D8F45', '#A7B98A', '#F3E2C7'], image: '/resources/catalog/birthday/birthday2.jpg' },
        { id: 'terracota', name: 'Terracota & Cobre', hex: ['#A8542F', '#C9774F', '#F3E2C7'], image: '/resources/catalog/birthday/birthday3.jpg' },
        { id: 'fucsia-lila', name: 'Fucsia & Lila', hex: ['#B5267A', '#B69ADB', '#F3E2C7'], image: '/resources/catalog/birthday/birthday4.jpg' },
      ]
    }
  },
  {
    id: 'bq-02',
    name: 'Mesa Romántica "Amor Infinito" para Boda o Aniversario',
    slug: 'mesa-romantica-amor-infinito',
    category: 'amor',
    categoryLabel: 'Amor & Aniversario',
    price: 195,
    originalPrice: 230,
    image: '/resources/catalog/wedding/wedding1.jpg',
    gallery: [
      '/resources/catalog/wedding/wedding1.jpg',
      '/resources/catalog/wedding/wedding2.jpg',
      '/resources/catalog/wedding/wedding3.jpg',
      '/resources/catalog/wedding/wedding4.jpg',
    ],
    description: 'Ambientación romántica con arco dorado, caída de tela en gasa, arreglos de rosas e hortensias, camino de mesa y luces cálidas. Ideal para pedidas de mano, aniversarios y bodas íntimas en jardín.',
    includesHelium: false,
    lifespanHours: 36,
    heightCm: 220,
    rating: 4.8,
    reviewCount: 42,
    bestseller: true,
    express3h: true,
    tags: ['Romántico', 'Express', 'Arco Floral'],
    options: {
      allowsNumberFoil: false,
      colorPalettes: [
        { id: 'celeste-blanco', name: 'Celeste Cielo & Blanco', hex: ['#A9D8E6', '#FFFFFF', '#C9A24B'], image: '/resources/catalog/wedding/wedding1.jpg' },
        { id: 'verde-pistacho', name: 'Verde Pistacho & Blanco', hex: ['#9BB57A', '#FFFFFF', '#C9A24B'], image: '/resources/catalog/wedding/wedding2.jpg' },
        { id: 'verde-eucalipto', name: 'Verde Eucalipto & Marfil', hex: ['#6F8F78', '#F5F0E1', '#C9A24B'], image: '/resources/catalog/wedding/wedding3.jpg' },
        { id: 'terracota-rose', name: 'Terracota Rosé & Dorado', hex: ['#A8665A', '#E8C3B0', '#C9A24B'], image: '/resources/catalog/wedding/wedding4.jpg' },
      ]
    }
  },
  {
    id: 'bq-03',
    name: 'Arco de Globos "Graduación 2026" con Birrete',
    slug: 'arco-globos-graduacion',
    category: 'graduacion',
    categoryLabel: 'Graduación & Logros',
    price: 210,
    originalPrice: 245,
    image: '/resources/catalog/graduation/graduation1.jpg',
    gallery: [
      '/resources/catalog/graduation/graduation1.jpg',
      '/resources/catalog/graduation/graduation2.jpg',
      '/resources/catalog/graduation/graduation3.jpg',
    ],
    description: 'Arco orgánico de globos con esferas cromadas plateadas y orbes espejo, panel con letrero "Graduación", birrete decorativo y diploma con moño a juego. Elige el color de tu carrera o promoción.',
    includesHelium: false,
    lifespanHours: 72,
    heightCm: 230,
    rating: 5.0,
    reviewCount: 29,
    express3h: false,
    tags: ['Graduación', 'Arco Orgánico', 'Cromados'],
    options: {
      allowsNumberFoil: false,
      colorPalettes: [
        { id: 'vino-plata', name: 'Vino & Plata', hex: ['#7A1F2B', '#C0C4CC', '#FFFFFF'], image: '/resources/catalog/graduation/graduation1.jpg' },
        { id: 'magenta-plata', name: 'Magenta & Plata', hex: ['#A3238A', '#C0C4CC', '#FFFFFF'], image: '/resources/catalog/graduation/graduation2.jpg' },
        { id: 'azul-plata', name: 'Azul Rey & Plata', hex: ['#2E1FA3', '#C0C4CC', '#FFFFFF'], image: '/resources/catalog/graduation/graduation3.jpg' },
      ]
    }
  },
  {
    id: 'bq-04',
    name: 'Mini Bouquet Infantil "Arcoíris Dulce"',
    slug: 'mini-bouquet-arcoiris-dulce',
    category: 'mini',
    categoryLabel: 'Mini Bouquets',
    price: 130,
    originalPrice: 155,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Versión compacta y tierna ideal para mesas o entregas sorpresa en colegios u oficinas. Incluye figura temática foil (estrella o corona), globos macarrón y base sólida de apoyo.',
    includesHelium: false, // aire con estructura
    lifespanHours: 120, // dura más por ser aire sellado
    heightCm: 90,
    rating: 4.7,
    reviewCount: 31,
    bestseller: false,
    express3h: true,
    tags: ['Económico', 'Larga Duración', 'Ideal Escritorio'],
    options: {
      allowsNumberFoil: true,
      defaultNumbers: '7',
      colorPalettes: [
        { id: 'pastel-mix', name: 'Pastel Unicornio', hex: ['#F472B6', '#38BDF8', '#FDE047', '#A78BFA'] },
        { id: 'safari', name: 'Verde Menta & Selva', hex: ['#10B981', '#34D399', '#FBBF24'] },
      ]
    }
  },
  {
    id: 'bq-05',
    name: 'Bouquet Revelación de Género "Boy or Girl?"',
    slug: 'bouquet-revelacion-genero-baby',
    category: 'bebe',
    categoryLabel: 'Baby Shower & Bebés',
    price: 240,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Maxi globo negro opaco de 36" inflado con helio y relleno de confeti azul o rosa para el momento de la revelación, acompañado de bouquet de apoyo en tonos celestes y rosas pastel.',
    includesHelium: true,
    lifespanHours: 24,
    heightCm: 170,
    rating: 4.9,
    reviewCount: 19,
    express3h: false,
    tags: ['Gender Reveal', 'Maxi Globo 36"', 'Helio'],
    options: {
      allowsNumberFoil: false,
      colorPalettes: [
        { id: 'reveal-classic', name: 'Celeste Baby & Rosa Chicle', hex: ['#38BDF8', '#F472B6', '#FFFFFF'] },
      ]
    }
  },
  {
    id: 'bq-06',
    name: 'Bouquet Corporativo "Gran Inauguración & Aniversario"',
    slug: 'bouquet-corporativo-inauguracion',
    category: 'corporativo',
    categoryLabel: 'Corporativo & Marcas',
    price: 280,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Estructura imponente de 1.80m con orbes cromados reflectantes, estrellas gigantes de 24" y rotulación personalizada en vinilo premium con el logotipo de la empresa o nombre del agasajado.',
    includesHelium: true,
    lifespanHours: 60,
    heightCm: 180,
    rating: 5.0,
    reviewCount: 14,
    express3h: false,
    tags: ['Empresarial', 'Gran Formato', 'Branding Vinilo'],
    options: {
      allowsNumberFoil: true,
      defaultNumbers: '10',
      colorPalettes: [
        { id: 'plata-azul-corp', name: 'Azul Real & Plata Espejo', hex: ['#1D4ED8', '#94A3B8', '#FFFFFF'] },
        { id: 'oro-negro-corp', name: 'Oro Champán & Negro Mate', hex: ['#F59E0B', '#0F172A', '#E2E8F0'] },
        { id: 'magenta-deco', name: 'Magenta & Turquesa Vibrante', hex: ['#FF2A85', '#06B6D4', '#FBBF24'] },
      ]
    }
  },
  {
    id: 'bq-07',
    name: 'Decoración "Mis 15 Años" con Arco Neón y Números Luminosos',
    slug: 'decoracion-mis-15-anos',
    category: 'cumpleanos',
    categoryLabel: 'Cumpleaños',
    price: 200,
    originalPrice: 235,
    image: '/resources/catalog/xvage/xv1.jpg',
    gallery: [
      '/resources/catalog/xvage/xv1.jpg',
      '/resources/catalog/xvage/xv2.jpg',
      '/resources/catalog/xvage/xv3.jpg',
    ],
    description: 'Set completo para quinceañera: guirnaldas de globos con cromados dorados y rosé, arco con luz neón, letrero "Mis 15", mariposas luminosas, cilindros para la torta y números gigantes con focos.',
    includesHelium: false,
    lifespanHours: 72,
    heightCm: 240,
    rating: 4.8,
    reviewCount: 37,
    bestseller: true,
    express3h: true,
    tags: ['Quinceañera', 'Arco Neón', 'Números Luminosos'],
    options: {
      allowsNumberFoil: true,
      defaultNumbers: '15',
      colorPalettes: [
        { id: 'vino-dorado', name: 'Vino & Dorado', hex: ['#7A1F3D', '#D4AF37', '#E7B9A5'], image: '/resources/catalog/xvage/xv1.jpg' },
        { id: 'magenta-dorado', name: 'Magenta & Dorado', hex: ['#A3266E', '#D4AF37', '#F3E2C7'], image: '/resources/catalog/xvage/xv2.jpg' },
        { id: 'celeste-dorado', name: 'Celeste & Dorado', hex: ['#3EA7D6', '#D4AF37', '#F3E2C7'], image: '/resources/catalog/xvage/xv3.jpg' },
      ]
    }
  },
  {
    id: 'bq-08',
    name: 'Mini Bouquet Sorpresa "Felicidades en tu Día"',
    slug: 'mini-bouquet-sorpresa-dia',
    category: 'mini',
    categoryLabel: 'Mini Bouquets',
    price: 110,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'El detalle perfecto para no llegar con las manos vacías o felicitar a un compañero de oficina. Compacto, transportable en cualquier vehículo y montado sobre base pesada antifugas.',
    includesHelium: false,
    lifespanHours: 96,
    heightCm: 75,
    rating: 4.6,
    reviewCount: 23,
    express3h: true,
    tags: ['Económico', 'Listo en 2h', 'Compacto'],
    options: {
      allowsNumberFoil: false,
      colorPalettes: [
        { id: 'fiesta-alegre', name: 'Multicolor Festivo', hex: ['#FF2A85', '#F59E0B', '#0EA5E9', '#10B981'] },
        { id: 'dorado-blanco', name: 'Blanco & Oro Glam', hex: ['#F59E0B', '#FFFFFF', '#E2E8F0'] },
      ]
    }
  }
];

export const CATEGORIES = [
  { id: 'todos', label: 'Todos los Bouquets', icon: 'Sparkles' },
  { id: 'cumpleanos', label: 'Cumpleaños', icon: 'Cake' },
  { id: 'amor', label: 'Amor & Aniversario', icon: 'Heart' },
  { id: 'graduacion', label: 'Graduaciones', icon: 'GraduationCap' },
  { id: 'bebe', label: 'Baby Shower', icon: 'Baby' },
  { id: 'corporativo', label: 'Corporativos', icon: 'Building' },
  { id: 'mini', label: 'Mini Bouquets', icon: 'Gift' },
] as const;
