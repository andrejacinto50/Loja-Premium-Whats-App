import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

import { formatPrice } from '../../utils/formatPrice';
import { createProductWhatsappLink } from '../../utils/whatsapp';
import useIsMobile from '../../hooks/useIsMobile';

export default function ProductCard({ product }) {
  const isMobile = useIsMobile();

  return (
    <article
      className="product-card"
      style={
        isMobile
          ? {
              width: '100%',
              maxWidth: '100%',
              minWidth: '0',
              borderRadius: '30px',
              padding: '10px',
              overflow: 'hidden'
            }
          : undefined
      }
    >
      <Link
        to={`/produto/${product.slug}`}
        className="product-image-wrap"
        style={
          isMobile
            ? {
                width: '100%',
                borderRadius: '24px',
                aspectRatio: '4 / 5',
                overflow: 'hidden'
              }
            : undefined
        }
      >
        {product.badge && (
          <span className="badge">
            {product.badge}
          </span>
        )}

        <img
          src={product.images[0]}
          alt={product.name}
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

        <div
          className="product-image-overlay"
          style={
            isMobile
              ? {
                  opacity: 1
                }
              : undefined
          }
        >
          <span>
            Ver detalhes
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      <div
        className="product-card-body"
        style={
          isMobile
            ? {
                padding: '18px 8px 8px'
              }
            : undefined
        }
      >
        <div className="product-card-info">
          <Link to={`/produto/${product.slug}`}>
            <h3
              style={
                isMobile
                  ? {
                      fontSize: '24px',
                      lineHeight: '1.08',
                      marginBottom: '8px'
                    }
                  : undefined
              }
            >
              {product.name}
            </h3>
          </Link>

          <p
            style={
              isMobile
                ? {
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }
                : undefined
            }
          >
            Pedido rápido pelo WhatsApp
          </p>
        </div>

        <div
          className="price-row"
          style={
            isMobile
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  marginBottom: '16px'
                }
              : undefined
          }
        >
          <div>
            {product.promoPrice && (
              <span className="old-price">
                {formatPrice(product.price)}
              </span>
            )}

            <strong
              style={
                isMobile
                  ? {
                      fontSize: '26px'
                    }
                  : undefined
              }
            >
              {formatPrice(product.promoPrice || product.price)}
            </strong>
          </div>

          <a
            href={createProductWhatsappLink(product)}
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="Pedir pelo WhatsApp"
            style={
              isMobile
                ? {
                    width: '50px',
                    height: '50px',
                    flex: '0 0 auto'
                  }
                : undefined
            }
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <Link
          to={`/produto/${product.slug}`}
          className="btn btn-ghost product-see-more"
          style={
            isMobile
              ? {
                  width: '100%',
                  minHeight: '50px',
                  borderRadius: '999px'
                }
              : undefined
          }
        >
          Ver produto
        </Link>
      </div>
    </article>
  );
}