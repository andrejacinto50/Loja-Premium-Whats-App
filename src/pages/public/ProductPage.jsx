import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

import Layout from '../../components/layout/Layout';
import ProductGallery from '../../components/product/ProductGallery';
import ProductOptions from '../../components/product/ProductOptions';
import ProductGrid from '../../components/product/ProductGrid';

import {
  getProductBySlug,
  getRelatedProducts
} from '../../services/productsService';

import { formatPrice } from '../../utils/formatPrice';
import { createProductWhatsappLink } from '../../utils/whatsapp';
import useIsMobile from '../../hooks/useIsMobile';

export default function ProductPage() {
  const { slug } = useParams();
  const isMobile = useIsMobile();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [options, setOptions] = useState({
    size: '',
    color: '',
    quantity: 1
  });

  useEffect(() => {
    async function load() {
      const item = await getProductBySlug(slug);

      setProduct(item);

      if (item) {
        setOptions({
          size: item.sizes?.[0] || '',
          color: item.colors?.[0] || '',
          quantity: 1
        });

        const relatedProducts = await getRelatedProducts(item);
        setRelated(relatedProducts);
      }
    }

    load();
  }, [slug]);

  if (!product) {
    return (
      <Layout>
        <section
          className="page-hero"
          style={
            isMobile
              ? {
                  margin: '20px 18px',
                  padding: '34px 22px',
                  borderRadius: '30px'
                }
              : undefined
          }
        >
          <h1
            style={
              isMobile
                ? {
                    fontSize: 'clamp(38px, 12vw, 56px)',
                    lineHeight: '.92'
                  }
                : undefined
            }
          >
            Produto não encontrado
          </h1>

          <Link
            to="/catalogo"
            className="btn btn-primary"
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '56px'
                  }
                : undefined
            }
          >
            Voltar ao catálogo
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className="product-page"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
                padding: '24px 18px 58px'
              }
            : undefined
        }
      >
        <ProductGallery
          images={product.images}
          name={product.name}
        />

        <div
          className="product-info"
          style={
            isMobile
              ? {
                  width: '100%',
                  maxWidth: '100%',
                  padding: '26px',
                  borderRadius: '30px'
                }
              : undefined
          }
        >
          {product.badge && (
            <span className="badge inline">
              {product.badge}
            </span>
          )}

          <h1
            style={
              isMobile
                ? {
                    fontSize: 'clamp(36px, 11vw, 52px)',
                    lineHeight: '.94',
                    letterSpacing: '-0.06em'
                  }
                : undefined
            }
          >
            {product.name}
          </h1>

          <div
            className="product-price"
            style={
              isMobile
                ? {
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px',
                    marginBottom: '18px'
                  }
                : undefined
            }
          >
            {product.promoPrice && (
              <span>{formatPrice(product.price)}</span>
            )}

            <strong
              style={
                isMobile
                  ? {
                      fontSize: '32px'
                    }
                  : undefined
              }
            >
              {formatPrice(product.promoPrice || product.price)}
            </strong>
          </div>

          <p
            style={
              isMobile
                ? {
                    fontSize: '15px',
                    lineHeight: '1.7'
                  }
                : undefined
            }
          >
            {product.description}
          </p>

          <ProductOptions
            product={product}
            options={options}
            setOptions={setOptions}
          />

          <div className="product-meta">
            <p>
              <strong>Material:</strong> acabamento premium
            </p>

            <p>
              <strong>Disponibilidade:</strong> {product.stockStatus}
            </p>

            <p>
              <strong>Atendimento:</strong> pedido finalizado pelo WhatsApp
            </p>
          </div>

          <a
            className="btn btn-primary full"
            href={createProductWhatsappLink(product, options)}
            target="_blank"
            rel="noreferrer"
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '58px',
                    borderRadius: '999px'
                  }
                : undefined
            }
          >
            <MessageCircle size={20} />
            Pedir pelo WhatsApp
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section
          className="section"
          style={
            isMobile
              ? {
                  padding: '24px 18px 58px'
                }
              : undefined
          }
        >
          <div className="section-head">
            <span>Relacionados</span>

            <h2
              style={
                isMobile
                  ? {
                      fontSize: 'clamp(36px, 11vw, 52px)',
                      lineHeight: '.94'
                    }
                  : undefined
              }
            >
              Você também pode gostar
            </h2>
          </div>

          <ProductGrid products={related} />
        </section>
      )}
    </Layout>
  );
}