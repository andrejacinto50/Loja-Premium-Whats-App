import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesSection({ categories }) {
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
    <section className="section">
      <div className="section-head">
        <span>Categorias</span>

        <h2>Escolha seu estilo</h2>

        <p>
          Produtos organizados para facilitar sua experiência e encontrar
          exatamente o que procura.
        </p>
      </div>

      <div
        className="category-grid"
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
        {categories.map((category) => (
          <Link
            to={`/catalogo?categoria=${category.slug}`}
            className="category-card"
            key={category.id}
            style={
              isMobile
                ? {
                    width: '100%',
                    maxWidth: '100%',
                    minHeight: '420px',
                    borderRadius: '30px',
                    overflow: 'hidden'
                  }
                : undefined
            }
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              style={
                isMobile
                  ? {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }
                  : undefined
              }
            />

            <div className="category-overlay"></div>

            <div className="category-content">
              <span>Coleção premium</span>

              <h3
                style={
                  isMobile
                    ? {
                        fontSize: '54px',
                        lineHeight: '.9'
                      }
                    : undefined
                }
              >
                {category.name}
              </h3>

              <div className="category-link">
                <p>Explorar coleção</p>

                <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}