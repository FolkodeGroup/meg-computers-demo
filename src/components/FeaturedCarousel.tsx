import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface FeaturedCarouselProps {
  products: Product[];
  onCardClick: (product: Product) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products, onCardClick }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      '(max-width: 1024px)': { slides: { perView: 2 } },
      '(max-width: 640px)': { slides: { perView: 1 } },
    },
  });

  // Autoplay
  React.useEffect(() => {
    let timeout: any;
    const next = () => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
      timeout = setTimeout(next, 3500);
    };
    timeout = setTimeout(next, 3500);
    return () => clearTimeout(timeout);
  }, [instanceRef]);

  return (
    <div className="relative py-4 flex items-center justify-center px-12">
      {/* Flecha izquierda fuera del carrusel */}
      <button
        className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white border-2 border-primary text-primary rounded-full shadow-xl p-3 z-20 flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-2xl"
        onClick={() => instanceRef.current?.prev()}
        aria-label="Anterior"
        style={{ width: 48, height: 48 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <div ref={sliderRef} className="keen-slider w-full flex items-stretch">
        {products.map((product) => (
          <div className="keen-slider__slide flex items-stretch" key={product.id}>
            <ProductCard product={product} onCardClick={onCardClick} />
          </div>
        ))}
      </div>
      {/* Flecha derecha fuera del carrusel */}
      <button
        className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white border-2 border-primary text-primary rounded-full shadow-xl p-3 z-20 flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-2xl"
        onClick={() => instanceRef.current?.next()}
        aria-label="Siguiente"
        style={{ width: 48, height: 48 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
      </button>
    </div>
  );
};
