import React from 'react';
import { 
  Sparkles, 
  Cake, 
  Heart, 
  GraduationCap, 
  Baby, 
  Building, 
  Gift, 
  Zap,
  SlidersHorizontal 
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterExpressOnly: boolean;
  onToggleExpress: () => void;
  totalResults: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  filterExpressOnly,
  onToggleExpress,
  totalResults,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Baby': return <Baby className="w-4 h-4" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Gift': return <Gift className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div id="catalogo" className="mb-6 space-y-4">
      {/* Category Pills Bar (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-deco-pink text-white shadow-md shadow-pink-200 scale-102'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-deco-pink'}>
                {getCategoryIcon(cat.icon)}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Bar: Count, Express filter, Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200 shadow-sm text-xs">
        
        {/* Results Counter */}
        <div className="text-slate-600 font-medium">
          Mostrando <span className="font-extrabold text-slate-900">{totalResults}</span> bouquets listos para entrega en Santa Cruz
        </div>

        {/* Filters & Sorting */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Express 3h Quick Filter */}
          <button
            onClick={onToggleExpress}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold transition-colors ${
              filterExpressOnly
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${filterExpressOnly ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span>Express (3 Horas)</span>
          </button>

          {/* Sort By Dropdown (Amazon/eBay Style) */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer hover:text-deco-pink"
            >
              <option value="populares">Más Populares</option>
              <option value="precio-bajo">Menor Precio (Bs.)</option>
              <option value="precio-alto">Mayor Precio (Bs.)</option>
              <option value="valorados">Mejor Calificados</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
