import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/layout/Layout';
import Hero from '../../components/home/Hero';
import Highlights from '../../components/home/Highlights';
import CategoriesSection from '../../components/home/CategoriesSection';
import PromoBanner from '../../components/home/PromoBanner';
import ProductGrid from '../../components/product/ProductGrid';

import { getBanners } from '../../services/bannersService';
import { getCategories } from '../../services/categoriesService';
import { getFeaturedProducts } from '../../services/productsService';

export default function Home() {
  const [data, setData] = useState({
    hero: null,
    promos: [],
    categories: [],
    products: [],
  });

  useEffect(() => {
    async function load() {
      const [banners, categories, products] = await Promise.all([
        getBanners(),
        getCategories(),
        getFeaturedProducts(),
      ]);

      const activeBanners = (banners || []).filter(
        (banner) => banner.active !== false
      );

      const hero =
        activeBanners.find((banner) => banner.position === 'hero') || null;

      const promos = activeBanners.filter(
        (banner) => banner.position === 'promo'
      );

      setData({
        hero,
        promos,
        categories: categories || [],
        products: products || [],
      });
    }

    load();
  }, []);

  return (
    <Layout>
      <Hero banner={data.hero} />

      <Highlights />

      <section className="section">
        <div className="section-head">
          <span>Seleção especial</span>

          <h2>Produtos em destaque</h2>

          <p>
            Escolha seus favoritos e envie o pedido direto pelo WhatsApp.
          </p>
        </div>

        <ProductGrid products={data.products} />
      </section>

      <CategoriesSection categories={data.categories} />

      <PromoBanner banners={data.promos} />

      <section className="final-cta">
        <div className="final-cta-content">
          <span>Pedido rápido</span>

          <h2>Gostou de algum produto?</h2>

          <p>
            Escolha seus favoritos, selecione as opções e fale com a loja pelo
            WhatsApp para finalizar seu pedido com atendimento direto.
          </p>

          <div className="final-cta-actions">
            <Link to="/catalogo" className="btn btn-primary">
              Ver coleção
            </Link>

            <Link to="/catalogo" className="btn btn-secondary">
              Explorar produtos
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}