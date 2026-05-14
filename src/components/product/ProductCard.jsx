import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { createProductWhatsappLink } from '../../utils/whatsapp';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/produto/${product.slug}`} className="product-image-wrap">
        {product.badge && <span className="badge">{product.badge}</span>}

        <img src={product.images[0]} alt={product.name} />

        <div className="product-image-overlay">
          <span>
            Ver detalhes
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      <div className="product-card-body">
        <div className="product-card-info">
          <Link to={`/produto/${product.slug}`}>
            <h3>{product.name}</h3>
          </Link>

          <p>Pedido rápido pelo WhatsApp</p>
        </div>

        <div className="price-row">
          <div>
            {product.promoPrice && (
              <span className="old-price">{formatPrice(product.price)}</span>
            )}

            <strong>{formatPrice(product.promoPrice || product.price)}</strong>
          </div>

          <a
            href={createProductWhatsappLink(product)}
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="Pedir pelo WhatsApp"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <Link to={`/produto/${product.slug}`} className="btn btn-ghost product-see-more">
          Ver produto
        </Link>
      </div>
    </article>
  );
}