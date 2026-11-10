import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { AuthModal } from './components/layout/AuthModal';
import { HeroBanner } from './components/catalog/HeroBanner';
import { CategoryFilters } from './components/catalog/CategoryFilters';
import { ProductCard } from './components/catalog/ProductCard';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderConfirmation } from './components/confirmation/OrderConfirmation';
import { CustomBouquetPage } from './components/custom/CustomBouquetPage';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PRODUCTS } from './data/products';
import { SearchX } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, selectedProductForModal, setSelectedProductForModal } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('populares');
  const [filterExpressOnly, setFilterExpressOnly] = useState<boolean>(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'todos') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Express 3h filter
    if (filterExpressOnly) {
      result = result.filter((p) => p.express3h);
    }

    // Sorting
    if (sortBy === 'precio-bajo') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'precio-alto') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'valorados') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Populares / Bestsellers first
      result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, filterExpressOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Global Header */}
      <Header
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Hero Banners */}
            <HeroBanner />

            {/* Category Filter Pills and Sort Bar */}
            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterExpressOnly={filterExpressOnly}
              onToggleExpress={() => setFilterExpressOnly(!filterExpressOnly)}
              totalResults={filteredProducts.length}
            />

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 my-8">
                <div className="w-16 h-16 bg-pink-50 text-deco-pink rounded-full flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">
                  No encontramos bouquets con esos criterios
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Intenta cambiar el término de búsqueda o selecciona otra categoría.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('todos');
                    setFilterExpressOnly(false);
                  }}
                  className="bg-deco-pink text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-deco-pink-600 transition-colors"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'custom-bouquet' && <CustomBouquetPage />}
        {currentView === 'confirmation' && <OrderConfirmation />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <AuthModal />
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
