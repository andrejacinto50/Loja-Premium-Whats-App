import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Layout from '../../components/layout/Layout';
import ProductGrid from '../../components/product/ProductGrid';

import { getProducts } from '../../services/productsService';
import { getCategories } from '../../services/categoriesService';
import useIsMobile from '../../hooks/useIsMobile';

export default function Catalog() {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get('categoria') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryFromUrl);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    async function load() {
      const productsData = await getProducts();
      const categoriesData = await getCategories();

      setProducts(productsData);
      setCategories(categoriesData);
    }

    load();
  }, []);

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  function handleCategoryChange(value) {
    setCategory(value);

    if (value === 'all') {
      setSearchParams({});
      return;
    }

    setSearchParams({
      categoria: value
    });
  }

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (category !== 'all') {
      list = list.filter(
        (product) => product.categorySlug === category
      );
    }

    if (search) {
      list = list.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sort === 'lowest') {
      list.sort(
        (a, b) =>
          (a.promoPrice || a.price) -
          (b.promoPrice || b.price)
      );
    }

    if (sort === 'new') {
      list.sort((a, b) =>
        a.badge === 'Novo' ? -1 : 1
      );
    }

    if (sort === 'best') {
      list.sort((a, b) =>
        a.badge === 'Mais vendido' ? -1 : 1
      );
    }

    if (sort === 'featured') {
      list.sort((a, b) =>
        Number(b.featured) - Number(a.featured)
      );
    }

    return list;
  }, [products, search, category, sort]);

  return (
    <Layout>
      <section
        className="page-hero"
        style={
          isMobile
            ? {
                margin: '20px 18px 24px',
                padding: '34px 22px',
                borderRadius: '30px'
              }
            : undefined
        }
      >
        <span>Catálogo premium</span>

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
          Produtos prontos para pedir pelo WhatsApp
        </h1>

        <p
          style={
            isMobile
              ? {
                  fontSize: '16px',
                  lineHeight: '1.65'
                }
              : undefined
          }
        >
          Busca, filtros, categorias e ordenação para deixar
          a loja parecida com ecommerce.
        </p>
      </section>

      <section
        className="catalog-controls"
        style={
          isMobile
            ? {
                margin: '0 18px 28px',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '14px',
                padding: '14px',
                borderRadius: '26px',
                background:
                  'linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025))',
                border: '1px solid rgba(255,255,255,.08)',
                boxShadow: '0 20px 52px rgba(0,0,0,.34)'
              }
            : undefined
        }
      >
        <input
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={
            isMobile
              ? {
                  width: '100%',
                  height: '52px',
                  borderRadius: '18px',
                  border: '1px solid rgba(212,175,55,.16)',
                  background: 'rgba(0,0,0,.28)',
                  color: '#fff',
                  padding: '0 18px',
                  fontSize: '14px',
                  fontWeight: 800
                }
              : undefined
          }
        />

        {isMobile ? (
          <div
            className="mobile-category-filter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              overflowX: 'auto',
              padding: '2px 0 8px',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              style={{
                flex: '0 0 auto',
                whiteSpace: 'nowrap',
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: '999px',
                border:
                  category === 'all'
                    ? '1px solid transparent'
                    : '1px solid rgba(212,175,55,.22)',
                background:
                  category === 'all'
                    ? 'linear-gradient(135deg, #d4af37, #f6d879)'
                    : 'rgba(255,255,255,.055)',
                color: category === 'all' ? '#111' : 'rgba(255,255,255,.78)',
                fontSize: '13px',
                fontWeight: 900
              }}
            >
              Todas
            </button>

            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                style={{
                  flex: '0 0 auto',
                  whiteSpace: 'nowrap',
                  minHeight: '44px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  border:
                    category === cat.slug
                      ? '1px solid transparent'
                      : '1px solid rgba(212,175,55,.22)',
                  background:
                    category === cat.slug
                      ? 'linear-gradient(135deg, #d4af37, #f6d879)'
                      : 'rgba(255,255,255,.055)',
                  color:
                    category === cat.slug
                      ? '#111'
                      : 'rgba(255,255,255,.78)',
                  fontSize: '13px',
                  fontWeight: 900
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        ) : (
          <select
            value={category}
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
          >
            <option value="all">
              Todas as categorias
            </option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.slug}
              >
                {cat.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={
            isMobile
              ? {
                  width: '100%',
                  height: '52px',
                  borderRadius: '18px',
                  border: '1px solid rgba(212,175,55,.16)',
                  background: 'rgba(0,0,0,.28)',
                  color: '#fff',
                  padding: '0 18px',
                  fontSize: '14px',
                  fontWeight: 800
                }
              : undefined
          }
        >
          <option value="featured">Destaques</option>
          <option value="best">Mais vendidos</option>
          <option value="new">Novidades</option>
          <option value="lowest">Menor preço</option>
        </select>
      </section>

      <section
        className="section compact"
        style={
          isMobile
            ? {
                padding: '8px 18px 56px'
              }
            : undefined
        }
      >
        <ProductGrid products={filteredProducts} />
      </section>
    </Layout>
  );
}