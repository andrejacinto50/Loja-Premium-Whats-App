import { useEffect, useMemo, useState } from 'react';

import {
  Plus,
  Search,
  SlidersHorizontal,
  Pencil,
  Eye,
  Star,
  BadgePercent,
  Save,
  X
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';

import {
  getAllProductsAdmin,
  createProduct,
  updateProduct
} from '../../services/productsService';

import { getCategories } from '../../services/categoriesService';
import { formatPrice } from '../../utils/formatPrice';
import { uploadImage } from '../../services/storageService';

const sizeOptions = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

const colorOptions = [
  'Preto',
  'Branco',
  'Cinza',
  'Azul',
  'Bege',
  'Verde',
  'Laranja'
];

const emptyProduct = {
  id: '',
  name: '',
  slug: '',
  price: '',
  promoPrice: '',
  description: '',
  badge: '',
  stockStatus: 'Disponível',
  categoryId: '',
  categorySlug: '',
  featured: false,
  promo: false,
  active: true,
  images: [],
  sizes: [],
  colors: []
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');

  const [modalMode, setModalMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
  getAllProductsAdmin(),
  getCategories()
]);
        setProducts(productsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isActive = product.active !== false;

      const matchesSearch = (product.name || '')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && isActive) ||
        (filter === 'inactive' && !isActive) ||
        (filter === 'featured' && product.featured) ||
        (filter === 'promo' && (product.promo || product.promoPrice));

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  function isAccessoryProduct(product) {
    return product?.categorySlug === 'acessorios';
  }

  function createSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  function openCreateModal() {
    setSelectedProduct({ ...emptyProduct });
    setModalMode('create');
  }

  function openEditModal(product) {
    setSelectedProduct({
      ...emptyProduct,
      ...product,
      price: product.price ?? '',
      promoPrice: product.promoPrice ?? '',
      categoryId: product.categoryId || '',
      categorySlug: product.categorySlug || '',
      sizes: product.sizes || [],
      colors: product.colors || [],
      images: product.images || [],
      active: product.active !== false
    });

    setModalMode('edit');
  }

  function openViewModal(product) {
    setSelectedProduct({
      ...emptyProduct,
      ...product,
      sizes: product.sizes || [],
      colors: product.colors || [],
      images: product.images || [],
      active: product.active !== false
    });

    setModalMode('view');
  }

  function closeModal() {
    setSelectedProduct(null);
    setModalMode(null);
    setUploadingImage(false);
  }

  function updateSelectedProduct(field, value) {
    setSelectedProduct((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleCategoryChange(categorySlug) {
    const selectedCategory = categories.find(
      (category) => category.slug === categorySlug
    );

    setSelectedProduct((current) => {
      const isAccessory = selectedCategory?.slug === 'acessorios';

      return {
        ...current,
        categorySlug: selectedCategory?.slug || '',
        categoryId: selectedCategory?.id || '',
        sizes: isAccessory ? [] : current.sizes || [],
        colors: isAccessory ? [] : current.colors || []
      };
    });
  }

  function toggleArrayValue(field, value) {
    setSelectedProduct((current) => {
      const currentValues = current[field] || [];
      const alreadyExists = currentValues.includes(value);

      return {
        ...current,
        [field]: alreadyExists
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value]
      };
    });
  }

  async function handleImageUpload(file) {
    if (!file) return;

    try {
      setUploadingImage(true);

      const imageUrl = await uploadImage(file, 'products');

      if (!imageUrl) {
        alert('Erro ao enviar imagem.');
        return;
      }

      updateSelectedProduct('images', [imageUrl]);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar imagem.');
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveProduct() {
    if (!selectedProduct.name?.trim() || !selectedProduct.price) {
      alert('Preencha pelo menos o nome e o preço do produto.');
      return;
    }

    if (!selectedProduct.categorySlug) {
      alert('Selecione uma categoria para o produto.');
      return;
    }

    if (!selectedProduct.images?.[0]) {
      alert('Envie uma imagem para o produto.');
      return;
    }

    const isAccessory = isAccessoryProduct(selectedProduct);

    if (!isAccessory && !selectedProduct.sizes?.length) {
      alert('Selecione pelo menos um tamanho.');
      return;
    }

    if (!isAccessory && !selectedProduct.colors?.length) {
      alert('Selecione pelo menos uma cor.');
      return;
    }

    try {
      const formattedProduct = {
        ...selectedProduct,
slug:
  selectedProduct.slug ||
  (modalMode === 'create'
    ? `${createSlug(selectedProduct.name)}-${Date.now()}`
    : createSlug(selectedProduct.name)),
        price: Number(selectedProduct.price),
        promoPrice: selectedProduct.promoPrice
          ? Number(selectedProduct.promoPrice)
          : null,
        images: selectedProduct.images || [],
        sizes: isAccessory ? [] : selectedProduct.sizes || [],
        colors: isAccessory ? [] : selectedProduct.colors || [],
        active: selectedProduct.active !== false
      };

      if (modalMode === 'create') {
        const createdProduct = await createProduct(formattedProduct);

        setProducts((current) => [
          createdProduct,
          ...current
        ]);
      }

      if (modalMode === 'edit') {
        const updatedProduct = await updateProduct(
          formattedProduct.id,
          formattedProduct
        );

        setProducts((current) =>
          current.map((product) =>
            product.id === formattedProduct.id
              ? {
                  ...product,
                  ...updatedProduct,
                  active: updatedProduct.active !== false
                }
              : product
          )
        );
      }

      closeModal();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto.');
    }
  }

  return (
    <AdminLayout>
      <div className="admin-products-page">
        <div className="admin-head row">
          <div>
            <span>Gestão</span>

            <h1>Produtos</h1>

            <p>
              Gerencie o catálogo, preços, promoções e produtos em destaque.
            </p>
          </div>

          <button className="btn btn-primary" onClick={openCreateModal}>
            <Plus size={18} />
            Novo produto
          </button>
        </div>

        <div className="admin-products-toolbar">
          <div className="admin-search">
            <Search size={18} />

            <input
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className={`admin-filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="admin-filter-panel">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>

            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Ativos
            </button>

            <button
              className={filter === 'inactive' ? 'active' : ''}
              onClick={() => setFilter('inactive')}
            >
              Desativados
            </button>

            <button
              className={filter === 'featured' ? 'active' : ''}
              onClick={() => setFilter('featured')}
            >
              Destaques
            </button>

            <button
              className={filter === 'promo' ? 'active' : ''}
              onClick={() => setFilter('promo')}
            >
              Promoções
            </button>
          </div>
        )}

        <div className="admin-products-list">
          {loading && (
            <div className="admin-empty-state">
              <strong>Carregando produtos...</strong>
            </div>
          )}

          {!loading &&
            filteredProducts.map((product) => {
              const isActive = product.active !== false;

              return (
                <div className="admin-product-row" key={product.id}>
                  <div className="admin-product-main">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="admin-empty-state">
                        <strong>Sem imagem</strong>
                      </div>
                    )}

                    <div>
                      <strong>{product.name}</strong>

                      <p>
                        {product.badge || 'Produto'} · {product.stockStatus}
                      </p>

                      <div className="admin-product-tags">
                        {product.featured && (
                          <span>
                            <Star size={13} />
                            Destaque
                          </span>
                        )}

                        {(product.promo || product.promoPrice) && (
                          <span>
                            <BadgePercent size={13} />
                            Promoção
                          </span>
                        )}
                      </div>

                      {!isAccessoryProduct(product) && (
                        <div className="admin-product-tags">
                          {product.sizes?.map((size) => (
                            <span key={size}>{size}</span>
                          ))}

                          {product.colors?.map((color) => (
                            <span key={color}>{color}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="admin-product-price">
                    {product.promoPrice && (
                      <span>{formatPrice(product.price)}</span>
                    )}

                    <strong>
                      {formatPrice(product.promoPrice || product.price)}
                    </strong>
                  </div>

                  <div className="admin-product-status">
                    <span
                      className={`status-pill ${
                        isActive ? 'active' : 'inactive'
                      }`}
                    >
                      {isActive ? 'Ativo' : 'Desativado'}
                    </span>
                  </div>

                  <div className="admin-product-actions">
                    <button onClick={() => openViewModal(product)}>
                      <Eye size={17} />
                    </button>

                    <button onClick={() => openEditModal(product)}>
                      <Pencil size={17} />
                      Editar
                    </button>
                  </div>
                </div>
              );
            })}

          {!loading && filteredProducts.length === 0 && (
            <div className="admin-empty-state">
              <strong>Nenhum produto encontrado.</strong>

              <p>Tente mudar a busca ou limpar os filtros.</p>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="admin-modal-backdrop">
          <div className="admin-product-modal">
            <div className="admin-modal-head">
              <div>
                <span>
                  {modalMode === 'view'
                    ? 'Visualização'
                    : modalMode === 'edit'
                    ? 'Editar produto'
                    : 'Novo produto'}
                </span>

                <h2>
                  {modalMode === 'view'
                    ? selectedProduct.name
                    : 'Dados do produto'}
                </h2>
              </div>

              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            {modalMode === 'view' ? (
              <div className="admin-product-preview">
                {selectedProduct.images?.[0] ? (
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                  />
                ) : (
                  <div className="admin-empty-state">
                    <strong>Produto sem imagem</strong>
                  </div>
                )}

                <div>
                  <span className="badge inline">
                    {selectedProduct.badge || 'Produto'}
                  </span>

                  <h3>{selectedProduct.name}</h3>

                  <p>{selectedProduct.description}</p>

                  {!isAccessoryProduct(selectedProduct) && (
                    <div className="admin-product-tags">
                      {selectedProduct.sizes?.map((size) => (
                        <span key={size}>{size}</span>
                      ))}

                      {selectedProduct.colors?.map((color) => (
                        <span key={color}>{color}</span>
                      ))}
                    </div>
                  )}

                  <strong>
                    {formatPrice(
                      selectedProduct.promoPrice || selectedProduct.price
                    )}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="admin-product-form">
                <div className="form-grid">
                  <label>
                    Nome

                    <input
                      value={selectedProduct.name || ''}
                      onChange={(e) =>
                        updateSelectedProduct('name', e.target.value)
                      }
                      placeholder="Nome do produto"
                    />
                  </label>

                  <label>
                    Badge

                    <input
                      value={selectedProduct.badge || ''}
                      onChange={(e) =>
                        updateSelectedProduct('badge', e.target.value)
                      }
                      placeholder="Novo, Promoção..."
                    />
                  </label>
                </div>

                <div className="form-grid">
                  <label>
                    Preço

                    <input
                      type="number"
                      value={selectedProduct.price || ''}
                      onChange={(e) =>
                        updateSelectedProduct('price', e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Preço promocional

                    <input
                      type="number"
                      value={selectedProduct.promoPrice || ''}
                      onChange={(e) =>
                        updateSelectedProduct('promoPrice', e.target.value)
                      }
                    />
                  </label>
                </div>

                <label>
                  Categoria

                  <select
                    value={selectedProduct.categorySlug || ''}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="">Selecione uma categoria</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Imagem principal

                  <div className="admin-upload-box">
                    {selectedProduct.images?.[0] && (
                      <img
                        src={selectedProduct.images[0]}
                        alt="Preview do produto"
                      />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    />

                    <span>
                      {uploadingImage
                        ? 'Enviando imagem...'
                        : 'Selecionar imagem'}
                    </span>
                  </div>
                </label>

                {!isAccessoryProduct(selectedProduct) && (
                  <>
                    <label>
                      Tamanhos

                      <div className="admin-checks">
                        {sizeOptions.map((size) => (
                          <label key={size}>
                            <input
                              type="checkbox"
                              checked={selectedProduct.sizes?.includes(size)}
                              onChange={() => toggleArrayValue('sizes', size)}
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </label>

                    <label>
                      Cores

                      <div className="admin-checks">
                        {colorOptions.map((color) => (
                          <label key={color}>
                            <input
                              type="checkbox"
                              checked={selectedProduct.colors?.includes(color)}
                              onChange={() => toggleArrayValue('colors', color)}
                            />
                            {color}
                          </label>
                        ))}
                      </div>
                    </label>
                  </>
                )}

                <label>
                  Descrição

                  <textarea
                    rows="5"
                    value={selectedProduct.description || ''}
                    onChange={(e) =>
                      updateSelectedProduct('description', e.target.value)
                    }
                  />
                </label>

                <div className="admin-checks">
                  <label>
                    <input
                      type="checkbox"
                      checked={!!selectedProduct.featured}
                      onChange={(e) =>
                        updateSelectedProduct('featured', e.target.checked)
                      }
                    />
                    Produto em destaque
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={!!selectedProduct.promo}
                      onChange={(e) =>
                        updateSelectedProduct('promo', e.target.checked)
                      }
                    />
                    Produto em promoção
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={selectedProduct.active !== false}
                      onChange={(e) =>
                        updateSelectedProduct('active', e.target.checked)
                      }
                    />
                    Produto ativo
                  </label>
                </div>

                <button
                  className="btn btn-primary full"
                  onClick={saveProduct}
                  disabled={uploadingImage}
                >
                  <Save size={18} />
                  {uploadingImage ? 'Aguarde o upload...' : 'Salvar produto'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}