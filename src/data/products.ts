import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'bq-01',
    name: 'Bouquet Cumpleaños Premium Gold & Black',
    slug: 'bouquet-cumpleanos-premium-gold-black',
    category: 'cumpleanos',
    categoryLabel: 'Cumpleaños',
    price: 220,
    originalPrice: 260,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Impresionante arreglo festivo con números metalizados foil gigantes de 34", esferas cromadas oro y negro, estrellas holográficas y base orgánica texturizada. El bouquet más solicitado para celebraciones de impacto.',
    includesHelium: true,
    lifespanHours: 48,
    heightCm: 160,
    rating: 4.9,
    reviewCount: 58,
    bestseller: true,
    express3h: true,
    tags: ['Más Vendido', 'Entrega 3h', 'Foil 34"'],
    options: {
      allowsNumberFoil: true,
      defaultNumbers: '25',
      colorPalettes: [
        { id: 'oro-negro', name: 'Oro & Negro Elegante', hex: ['#F59E0B', '#111827', '#E5E7EB'] },
        { id: 'rosa-oro', name: 'Rose Gold & Blanco', hex: ['#FB7185', '#FDE047', '#FFFFFF'] },
        { id: 'azul-plata', name: 'Azul Zafiro & Plata', hex: ['#2563EB', '#94A3B8', '#1E293B'] },
      ]
    }
  },
  {
    id: 'bq-02',
    name: 'Bouquet Romántico "Amor Infinito" con Corazón Foil',
    slug: 'bouquet-romantico-amor-infinito',
    category: 'amor',
    categoryLabel: 'Amor & Aniversario',
    price: 195,
    originalPrice: 230,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Composición con corazón foil microfoil de 28" con mensaje personalizado, globos látex pastel en tonos rosa cerezo, fucsia y blanco perla con cintas rizadas y tarjeta dedicatoria caligrafiada.',
    includesHelium: true,
    lifespanHours: 36,
    heightCm: 145,
    rating: 4.8,
    reviewCount: 42,
    bestseller: true,
    express3h: true,
    tags: ['Romántico', 'Express', 'Corazón 28"'],
    options: {
      allowsNumberFoil: false,
      colorPalettes: [
        { id: 'fucsia-rosa', name: 'Fucsia Deco & Rosa Pastel', hex: ['#FF2A85', '#F472B6', '#FFFFFF'] },
        { id: 'rojo-pasion', name: 'Rojo Pasión & Dorado', hex: ['#DC2626', '#F59E0B', '#FFFFFF'] },
      ]
    }
  },
  {
    id: 'bq-03',
    name: 'Bouquet Celebración "Graduación y Éxito"',
    slug: 'bouquet-graduacion-exito',
    category: 'graduacion',
    categoryLabel: 'Graduación & Logros',
    price: 210,
    originalPrice: 245,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Bouquet de birrete foil metalizado, estrellas doradas de 18", burbuja transparente cristal con confeti interno y mensaje en vinilo "¡Felicidades Licenciado / Ingeniero!".',
    includesHelium: true,
    lifespanHours: 48,
    heightCm: 155,
    rating: 5.0,
    reviewCount: 29,
    express3h: false,
    tags: ['Graduación', 'Birrete Foil', 'Burbuja Confeti'],
    options: {
      allowsNumberFoil: true,
      defaultNumbers: '26',
      colorPalettes: [
        { id: 'dorado-negro', name: 'Negro & Dorado Académico', hex: ['#111827', '#F59E0B', '#E5E7EB'] },
        { id: 'azul-plata', name: 'Azul Marino & Plata', hex: ['#1E3A8A', '#CBD5E1', '#FFFFFF'] },
        { id: 'verde-oro', name: 'Verde Esmeralda & Oro', hex: ['#047857', '#F59E0B', '#FFFFFF'] },
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
    name: 'Bouquet Cumpleaños Rosa Chic & Orbe Tornasol',
    slug: 'bouquet-cumpleanos-rosa-chic',
    category: 'cumpleanos',
    categoryLabel: 'Cumpleaños',
    price: 200,
    originalPrice: 235,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Bouquet delicado y fotogénico para fotos de Instagram. Incluye orbe tornasol 4D de 16", números foil a elección y ramillete de látex en tonos palo de rosa y blanco perla.',
    includesHelium: true,
    lifespanHours: 40,
    heightCm: 150,
    rating: 4.8,
    reviewCount: 37,
    bestseller: true,
    express3h: true,
    tags: ['Instagrammable', 'Orbe 4D', 'Express'],
    options: {
      allowsNumberFoil: true,
      defaultNumbers: '20',
      colorPalettes: [
        { id: 'rosa-chic', name: 'Rosa Chic & Blanco Perla', hex: ['#FB7185', '#FCE7F3', '#FFFFFF'] },
        { id: 'lila-pastel', name: 'Lavanda & Plata', hex: ['#C084FC', '#E2E8F0', '#FFFFFF'] },
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
