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

export default function ProductPage() {
  const { slug } = useParams();

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
        <section className="page-hero">
          <h1>Produto não encontrado</h1>

          <Link to="/catalogo" className="btn btn-primary">
            Voltar ao catálogo
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="product-page">
        <ProductGallery
          images={product.images}
          name={product.name}
        />

        <div className="product-info">
          {product.badge && (
            <span className="badge inline">
              {product.badge}
            </span>
          )}

          <h1>{product.name}</h1>

          <div className="product-price">
            {product.promoPrice && (
              <span>{formatPrice(product.price)}</span>
            )}

            <strong>
              {formatPrice(product.promoPrice || product.price)}
            </strong>
          </div>

          <p>{product.description}</p>

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
          >
            <MessageCircle size={20} />
            Pedir pelo WhatsApp
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <span>Relacionados</span>
            <h2>Você também pode gostar</h2>
          </div>

          <ProductGrid products={related} />
        </section>
      )}
    </Layout>
  );
}