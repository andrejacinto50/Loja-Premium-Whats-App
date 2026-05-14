import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Layout from '../../components/layout/Layout';
import ProductGrid from '../../components/product/ProductGrid';

import { getProducts } from '../../services/productsService';
import { getCategories } from '../../services/categoriesService';

export default function Catalog() {
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
      <section className="page-hero">
        <span>Catálogo premium</span>

        <h1>Produtos prontos para pedir pelo WhatsApp</h1>

        <p>
          Busca, filtros, categorias e ordenação para deixar
          a loja parecida com ecommerce.
        </p>
      </section>

      <section className="catalog-controls">
        <input
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

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

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="featured">
            Destaques
          </option>

          <option value="best">
            Mais vendidos
          </option>

          <option value="new">
            Novidades
          </option>

          <option value="lowest">
            Menor preço
          </option>
        </select>
      </section>

      <section className="section compact">
        <ProductGrid products={filteredProducts} />
      </section>
    </Layout>
  );
}