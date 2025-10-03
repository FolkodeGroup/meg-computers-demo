import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filterCategories = {
  'CELULAR': [
    'BATERIAS', 'CAMARAS Y VIDRIOS', 'FLEX DE CARGA', 'FLEX POWER FLEX MAIN HUELLAS',
    'FPC Y MICRO ELECTRONICA', 'LCD Y DISPLAY', 'MODULOS', 'PINES DE CARGA-JACK-MIC',
    'SPEAKER BUZZER PORTA SIM', 'Tapas / Marcos', 'TAPAS-CUBRE PLACAS-BISEL', 'TOUCH', 'VIDRIOS GLASS'
  ],
  'PCs Y TABLETS': ['NOTEBOOK Y TABLETS', 'PC DE ESCRITORIO'],
  'HERRAMIENTAS': [],
  'ACCESORIOS Y TECNOLOGÍA': []
};

interface ProductFiltersProps {
  activeFilters: {
    mainCategory: string | null;
    category: string[];
  };
  onFilterChange: (type: 'mainCategory' | 'category', value: string) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  activeFilters,
  onFilterChange,
  onClearFilters,
}) => {
  const mainCategories = Object.keys(filterCategories);
  const subcategories = activeFilters.mainCategory ? filterCategories[activeFilters.mainCategory as keyof typeof filterCategories] : [];

  const handleMainCategoryClick = (mainCat: string) => {
    onFilterChange('mainCategory', activeFilters.mainCategory === mainCat ? '' : mainCat);
  };

  const handleSubCategoryClick = (subCat: string) => {
    onFilterChange('category', subCat);
  };

  const hasActiveFilters = activeFilters.mainCategory || activeFilters.category.length > 0;

  return (
    <motion.div layout className="mb-8 p-4 bg-dark/30 rounded-lg border border-neutral/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold neon-text">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-neutral/90">Categoría Principal</h3>
        <div className="flex flex-wrap gap-2">
          {mainCategories.map((mainCat) => (
            <button
              key={mainCat}
              onClick={() => handleMainCategoryClick(mainCat)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                activeFilters.mainCategory === mainCat
                  ? 'bg-primary text-dark font-bold shadow-lg'
                  : 'bg-dark/50 hover:bg-dark/70 text-neutral'
              }`}
            >
              {mainCat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeFilters.mainCategory && subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <h3 className="font-semibold mb-3 text-neutral/90">Subcategorías</h3>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => handleSubCategoryClick(subCat)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                    activeFilters.category.includes(subCat)
                      ? 'bg-primary text-dark font-bold shadow-lg'
                      : 'bg-dark/50 hover:bg-dark/70 text-neutral'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};