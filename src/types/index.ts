export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'cumpleanos' | 'amor' | 'graduacion' | 'bebe' | 'corporativo' | 'mini';
  categoryLabel: string;
  price: number; // in Bolivianos (Bs.)
  originalPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  includesHelium: boolean;
  lifespanHours: number;
  heightCm: number;
  rating: number;
  reviewCount: number;
  bestseller?: boolean;
  express3h?: boolean;
  tags: string[];
  options: {
    allowsNumberFoil: boolean;
    defaultNumbers?: string;
    colorPalettes: { id: string; name: string; hex: string[] }[];
  };
}

export interface CustomizationSelection {
  selectedNumber?: string;
  selectedPalette?: string;
  cardMessage?: string;
  recipientName?: string;
}

export interface CartItem {
  id: string; // unique item id (product + customization hash)
  product: Product;
  quantity: number;
  customization: CustomizationSelection;
}

export type DeliveryType = 'delivery' | 'pickup';

export interface DeliveryDetails {
  type: DeliveryType;
  recipientName: string;
  buyerName: string;
  phone: string;
  address: string;
  neighborhood: string;
  reference: string;
  ring: number; // 1 to 8 (ring in Santa Cruz)
  latitude: number;
  longitude: number;
  deliveryDate: string;
  timeSlot: 'manana' | 'tarde';
  deliveryFee: number; // in Bs.
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  delivery: DeliveryDetails;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'qr_simple';
  status: 'paid' | 'pending';
  customerNotes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isRegistered: boolean;
  discountCoupon?: string;
  discountPercent?: number;
}
