import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesSection({ categories }) {
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

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/catalogo?categoria=${category.slug}`}
            className="category-card"
            key={category.id}
          >
            <img src={category.imageUrl} alt={category.name} />

            <div className="category-overlay"></div>

            <div className="category-content">
              <span>Coleção premium</span>

              <h3>{category.name}</h3>

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