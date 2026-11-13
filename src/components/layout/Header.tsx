import React, { useState } from 'react';
import {
  ShoppingBag,
  MapPin,
  Search,
  Sparkles,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES, PRODUCTS } from '../../data/products';

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
      {/* Franja de color con la paleta del logo (fucsia, amarillo, celeste) */}
      <div className="h-1.5 bg-gradient-to-r from-deco-pink via-deco-yellow to-deco-sky" />

      {/* Contenedor principal del header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">

          {/* Logo y marca */}
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
                <span className="bg-deco-yellow text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  STORE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Arte • Detalles • Decoración
              </p>
            </div>
          </div>

          {/* Ubicación (Santa Cruz) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-deco-sky-light border border-sky-200 rounded-lg text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-deco-sky-dark" />
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Entregas en</div>
              <div className="font-semibold text-slate-800">Santa Cruz, Bolivia</div>
            </div>
          </div>

          {/* Buscador con selector de categoría */}
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
                placeholder="Buscar..."
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
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3 h-3" />
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

          {/* Acciones: Bouquet personalizado, cuenta, carrito */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Botón Bouquet Personalizado */}
            <button
              onClick={() => setCurrentView('custom-bouquet')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                currentView === 'custom-bouquet'
                  ? 'bg-deco-pink text-white shadow-pink-200'
                  : 'bg-deco-pink-50 text-deco-pink-700 border border-pink-200 hover:border-deco-pink hover:bg-deco-pink-100'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${currentView === 'custom-bouquet' ? 'text-deco-yellow' : 'text-deco-pink'}`} />
              <span className="hidden sm:inline">Bouquet</span> Personalizado
              <span className="bg-deco-yellow text-slate-900 text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase ml-1 shadow-sm">
                A tu gusto
              </span>
            </button>

            {/* Botón de cuenta */}
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-deco-pink hover:bg-pink-50 rounded-xl transition-colors border border-transparent hover:border-pink-200"
              title={isRegistered ? `Cuenta: ${user?.name}` : 'Crear cuenta / Iniciar sesión'}
            >
              <div className="relative">
                <UserIcon className="w-5 h-5 text-slate-600" />
                {isRegistered && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-deco-lime rounded-full border-2 border-white"></span>
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

            {/* Carrito con total */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-deco-pink hover:bg-deco-pink-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-md shadow-pink-200 hover:shadow-lg active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-deco-yellow text-slate-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-deco-pink shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-pink-100 font-semibold leading-none uppercase">Carrito</div>
                <div className="text-xs font-extrabold text-deco-yellow">
                  {subtotal > 0 ? `Bs. ${subtotal}` : 'Bs. 0'}
                </div>
              </div>
            </button>

            {/* Menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-deco-pink rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Buscador móvil */}
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

        {/* Menú de navegación móvil */}
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
              <span className="text-xs text-deco-pink">{PRODUCTS.length} modelos</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('custom-bouquet');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-deco-pink-700 bg-deco-pink-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-deco-pink" /> Bouquet Personalizado
              </span>
              <span className="text-xs bg-deco-yellow text-slate-900 px-1.5 py-0.5 rounded font-bold">A tu gusto</span>
            </button>
            <button
              onClick={() => {
                openLoginModal();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              {isRegistered ? `Mi Perfil (${user?.name})` : 'Crear cuenta (15% OFF de Bienvenida)'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
