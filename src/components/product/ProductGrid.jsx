import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 900);
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="product-grid-wrapper">
      <div
        className="product-grid"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
                width: '100%',
                maxWidth: '100%'
              }
            : undefined
        }
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}