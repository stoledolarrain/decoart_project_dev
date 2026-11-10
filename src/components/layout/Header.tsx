import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Sparkles, 
  User as UserIcon, 
  MessageCircle, 
  Clock, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/products';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearchChange, 
  selectedCategory, 
  onSelectCategory 
}) => {
  const { cartCount, subtotal, openCart, currentView, setCurrentView } = useCart();
  const { user, isRegistered, openLoginModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
    if (currentView !== 'catalog') {
      setCurrentView('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-pink-100">
      {/* Top Banner (Amazon/eBay style announcement) */}
      <div className="bg-gradient-to-r from-deco-pink-600 via-deco-pink to-pink-500 text-white text-xs sm:text-sm py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" /> Express SCZ
            </span>
            <span className="hidden sm:inline">Envíos en el día en Santa Cruz de la Sierra |</span>
            <span>¡Tarifa plana dentro del 4to anillo a solo 15 Bs!</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-white/90">
              <Clock className="w-3.5 h-3.5 text-yellow-300" /> Pedidos 24/7 sin cotizar
            </span>
            <span className="flex items-center gap-1 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Pago Seguro por QR Simple
            </span>
            <a 
              href="https://wa.me/59170973792" 
              target="_blank" 
              rel="noreferrer"
              className="hover:underline flex items-center gap-1 font-semibold text-yellow-200"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Cel: 709-73792
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentView('catalog')}
            className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-deco-pink shadow-md group-hover:scale-105 transition-transform">
              <img 
                src="/resources/logo_1.jpg" 
                alt="DecoArt Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-deco-pink transition-colors">
                  Deco<span className="text-deco-pink">Art</span>
                </span>
                <span className="bg-pink-100 text-deco-pink text-[10px] font-bold px-1.5 py-0.5 rounded">
                  STORE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Arte • Detalles • Decoración
              </p>
            </div>
          </div>

          {/* Location Badge (Santa Cruz) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-deco-pink" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Entregas en</div>
              <div className="font-semibold text-slate-800">Santa Cruz, Bolivia</div>
            </div>
          </div>

          {/* Search Bar with Category Dropdown (Amazon/eBay style) */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl items-center border-2 border-slate-200 focus-within:border-deco-pink rounded-xl overflow-hidden transition-all shadow-sm"
          >
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="bg-slate-50 text-xs font-medium text-slate-700 py-2.5 px-3 border-r border-slate-200 outline-none hover:bg-slate-100 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                placeholder="Buscar bouquet (ej. cumpleaños, amor, dorado, 25)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearchChange(e.target.value);
                }}
                className="w-full py-2 px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearchChange('');
                  }}
                  className="mr-2 text-slate-400 hover:text-slate-600 text-xs font-bold px-1.5 py-0.5 rounded-full hover:bg-slate-100"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-deco-pink hover:bg-deco-pink-600 text-white px-4 py-2.5 transition-colors flex items-center justify-center"
              title="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Action Buttons: Custom Bouquet, User, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Custom Bouquet Button (Highlighted) */}
            <button
              onClick={() => setCurrentView('custom-bouquet')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                currentView === 'custom-bouquet'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-200'
                  : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200 hover:border-purple-300 hover:bg-purple-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">Bouquet</span> Personalizado
              <span className="bg-purple-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase ml-1 animate-pulse">
                WhatsApp
              </span>
            </button>

            {/* User / Account Button */}
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-deco-pink hover:bg-pink-50 rounded-xl transition-colors border border-transparent hover:border-pink-200"
              title={isRegistered ? `Cuenta: ${user?.name}` : 'Crear cuenta / Iniciar sesión'}
            >
              <div className="relative">
                <UserIcon className="w-5 h-5 text-slate-600" />
                {isRegistered && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <div className="text-[10px] text-slate-400 font-medium leading-none">
                  {isRegistered ? 'Hola,' : 'Acceso rápido'}
                </div>
                <div className="font-bold text-slate-800 truncate max-w-[90px]">
                  {isRegistered ? user?.name : 'Mi Cuenta'}
                </div>
              </div>
            </button>

            {/* Cart Button with Total */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-deco-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-slate-300 font-semibold leading-none uppercase">Carrito</div>
                <div className="text-xs font-extrabold text-yellow-300">
                  {subtotal > 0 ? `Bs. ${subtotal}` : 'Bs. 0'}
                </div>
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-deco-pink rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <form 
            onSubmit={handleSearch}
            className="flex items-center border border-slate-300 rounded-xl overflow-hidden shadow-sm"
          >
            <input
              type="text"
              placeholder="Buscar bouquets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearchChange(e.target.value);
              }}
              className="w-full py-2 px-3 text-sm text-slate-800 outline-none"
            />
            <button type="submit" className="bg-deco-pink text-white px-3.5 py-2">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-100 md:hidden flex flex-col gap-2 pb-2">
            <button
              onClick={() => {
                setCurrentView('catalog');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-pink-50 rounded-lg flex items-center justify-between"
            >
              <span>Ver Catálogo Completo</span>
              <span className="text-xs text-deco-pink">8 modelos</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('custom-bouquet');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-purple-700 bg-purple-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Bouquet Personalizado
              </span>
              <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded font-bold">WhatsApp</span>
            </button>
            <button
              onClick={() => {
                openLoginModal();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              {isRegistered ? `Mi Perfil (${user?.name})` : '🎁 Crear cuenta (15% OFF de Bienvenida)'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
