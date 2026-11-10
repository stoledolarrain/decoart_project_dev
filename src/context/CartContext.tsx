import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, CustomizationSelection, Order } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: CustomizationSelection) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  couponCode: string;
  discountPercent: number;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  currentView: 'catalog' | 'checkout' | 'custom-bouquet' | 'confirmation';
  setCurrentView: (view: 'catalog' | 'checkout' | 'custom-bouquet' | 'confirmation') => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('decoart_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [currentView, setCurrentView] = useState<'catalog' | 'checkout' | 'custom-bouquet' | 'confirmation'>('catalog');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem('decoart_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    customization: CustomizationSelection = {}
  ) => {
    // Generate a unique item ID based on product and customization selections
    const customHash = `${product.id}_${customization.selectedNumber || 'none'}_${customization.selectedPalette || 'none'}_${customization.cardMessage ? 'msg' : 'nomsg'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === customHash);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: customHash,
            product,
            quantity,
            customization: {
              selectedNumber: customization.selectedNumber || (product.options.allowsNumberFoil ? product.options.defaultNumbers || '18' : undefined),
              selectedPalette: customization.selectedPalette || product.options.colorPalettes[0]?.name || 'Original',
              cardMessage: customization.cardMessage || '',
              recipientName: customization.recipientName || '',
            },
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DECO10') {
      setCouponCode('DECO10');
      setDiscountPercent(10);
      return { success: true, message: '¡Cupón DECO10 aplicado! 10% de descuento concedido.' };
    } else if (cleanCode === 'BIENVENIDO15') {
      setCouponCode('BIENVENIDO15');
      setDiscountPercent(15);
      return { success: true, message: '¡Cupón de Bienvenida BIENVENIDO15 aplicado! 15% de descuento.' };
    } else if (cleanCode === 'EXPRESS') {
      setCouponCode('EXPRESS');
      setDiscountPercent(5);
      return { success: true, message: '¡Cupón EXPRESS aplicado! 5% de descuento adicional.' };
    } else {
      return { success: false, message: 'Cupón inválido o expirado. Prueba con DECO10.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        couponCode,
        discountPercent,
        discountAmount,
        applyCoupon,
        removeCoupon,
        currentView,
        setCurrentView,
        lastOrder,
        setLastOrder,
        selectedProductForModal,
        setSelectedProductForModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
