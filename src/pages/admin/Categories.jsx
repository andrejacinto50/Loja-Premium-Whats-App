import { useEffect, useMemo, useState } from 'react';

import {
  Plus,
  Search,
  Pencil,
  Eye,
  X,
  Save,
  Image
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';

import {
  getAllCategoriesAdmin,
  createCategory,
  updateCategory
} from '../../services/categoriesService';

import { uploadImage } from '../../services/storageService';
import useIsMobile from '../../hooks/useIsMobile';

const emptyCategory = {
  id: '',
  name: '',
  slug: '',
  imageUrl: '',
  order: 1,
  active: true
};

export default function Categories() {
  const isMobile = useIsMobile(900);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategoriesAdmin();
        setCategories(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) =>
        (category.name || '')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  }, [categories, search]);

  function createSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  function openCreateModal() {
    setSelectedCategory({
      ...emptyCategory,
      slug: '',
      order: categories.length + 1
    });

    setModalMode('create');
  }

  function openEditModal(category) {
    setSelectedCategory({
      ...emptyCategory,
      ...category,
      active: category.active !== false
    });

    setModalMode('edit');
  }

  function openViewModal(category) {
    setSelectedCategory({
      ...emptyCategory,
      ...category,
      active: category.active !== false
    });

    setModalMode('view');
  }

  function closeModal() {
    setSelectedCategory(null);
    setModalMode(null);
    setUploadingImage(false);
  }

  function updateSelectedCategory(field, value) {
    setSelectedCategory((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleImageUpload(file) {
    if (!file) return;

    try {
      setUploadingImage(true);

      const imageUrl = await uploadImage(file, 'categories');

      if (!imageUrl) {
        alert('Erro ao enviar imagem.');
        return;
      }

      updateSelectedCategory('imageUrl', imageUrl);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar imagem.');
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveCategory() {
    if (!selectedCategory.name?.trim()) {
      alert('Preencha o nome da categoria.');
      return;
    }

    if (!selectedCategory.imageUrl) {
      alert('Envie uma imagem para a categoria.');
      return;
    }

    try {
      const formattedCategory = {
        ...selectedCategory,
        name: selectedCategory.name.trim(),
        slug:
          selectedCategory.slug?.trim() ||
          createSlug(selectedCategory.name),
        order: Number(selectedCategory.order || 1),
        imageUrl: selectedCategory.imageUrl,
        active: selectedCategory.active !== false
      };

      if (modalMode === 'create') {
        const createdCategory = await createCategory(formattedCategory);

        setCategories((current) => [
          createdCategory,
          ...current
        ]);
      }

      if (modalMode === 'edit') {
        const updatedCategory = await updateCategory(
          formattedCategory.id,
          formattedCategory
        );

        setCategories((current) =>
          current.map((category) =>
            category.id === updatedCategory.id
              ? updatedCategory
              : category
          )
        );
      }

      closeModal();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar categoria.');
    }
  }

  return (
    <AdminLayout>
      <div
        className="admin-categories-page"
        style={
          isMobile
            ? {
                display: 'grid',
                gap: '22px'
              }
            : undefined
        }
      >
        <div
          className="admin-head row"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '18px'
                }
              : undefined
          }
        >
          <div>
            <span>Gestão</span>

            <h1
              style={
                isMobile
                  ? {
                      fontSize: 'clamp(42px, 13vw, 60px)',
                      lineHeight: '.92'
                    }
                  : undefined
              }
            >
              Categorias
            </h1>

            <p>
              Organize coleções, estilos e categorias exibidas na loja.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={openCreateModal}
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '56px'
                  }
                : undefined
            }
          >
            <Plus size={18} />
            Nova categoria
          </button>
        </div>

        <div
          className="admin-products-toolbar"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr'
                }
              : undefined
          }
        >
          <div className="admin-search">
            <Search size={18} />

            <input
              placeholder="Buscar categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div
          className="admin-category-grid"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '18px'
                }
              : undefined
          }
        >
          {loading && (
            <div className="admin-empty-state">
              <strong>Carregando categorias...</strong>
            </div>
          )}

          {!loading &&
            filteredCategories.map((category) => (
              <div
                className="admin-category-card"
                key={category.id}
                style={
                  isMobile
                    ? {
                        width: '100%',
                        borderRadius: '28px',
                        overflow: 'hidden'
                      }
                    : undefined
                }
              >
                <div
                  className="admin-category-image"
                  style={
                    isMobile
                      ? {
                          minHeight: '260px',
                          borderRadius: '28px',
                          overflow: 'hidden'
                        }
                      : undefined
                  }
                >
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      loading="lazy"
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
                  ) : (
                    <div className="admin-empty-state">
                      <strong>Sem imagem</strong>
                    </div>
                  )}

                  <span>Ordem {category.order}</span>
                </div>

                <div className="admin-category-content">
                  <div>
                    <strong>{category.name}</strong>
                    <p>{category.slug || 'categoria-premium'}</p>
                  </div>

                  <div
                    className="admin-category-actions"
                    style={
                      isMobile
                        ? {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginTop: '12px'
                          }
                        : undefined
                    }
                  >
                    <button onClick={() => openViewModal(category)}>
                      <Eye size={17} />
                    </button>

                    <button onClick={() => openEditModal(category)}>
                      <Pencil size={17} />
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {!loading && filteredCategories.length === 0 && (
            <div className="admin-empty-state">
              <strong>Nenhuma categoria encontrada.</strong>
              <p>Tente mudar o termo da busca.</p>
            </div>
          )}
        </div>
      </div>

      {selectedCategory && (
        <div
          className="admin-modal-backdrop"
          style={
            isMobile
              ? {
                  padding: '18px',
                  alignItems: 'flex-start',
                  overflowY: 'auto'
                }
              : undefined
          }
        >
          <div
            className="admin-product-modal"
            style={
              isMobile
                ? {
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight: 'none',
                    borderRadius: '28px',
                    padding: '22px'
                  }
                : undefined
            }
          >
            <div className="admin-modal-head">
              <div>
                <span>
                  {modalMode === 'view'
                    ? 'Visualização'
                    : modalMode === 'edit'
                    ? 'Editar categoria'
                    : 'Nova categoria'}
                </span>

                <h2>
                  {modalMode === 'view'
                    ? selectedCategory.name
                    : 'Dados da categoria'}
                </h2>
              </div>

              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            {modalMode === 'view' ? (
              <div
                className="admin-category-preview"
                style={
                  isMobile
                    ? {
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '18px'
                      }
                    : undefined
                }
              >
                {selectedCategory.imageUrl ? (
                  <img
                    src={selectedCategory.imageUrl}
                    alt={selectedCategory.name}
                    style={
                      isMobile
                        ? {
                            width: '100%',
                            height: '260px',
                            objectFit: 'cover',
                            borderRadius: '22px'
                          }
                        : undefined
                    }
                  />
                ) : (
                  <div className="admin-empty-state">
                    <strong>Categoria sem imagem</strong>
                  </div>
                )}

                <div>
                  <span className="badge inline">Categoria</span>

                  <h3>{selectedCategory.name}</h3>

                  <p>Slug: {selectedCategory.slug}</p>
                  <p>Ordem de exibição: {selectedCategory.order}</p>
                  <p>
                    Status:{' '}
                    {selectedCategory.active !== false
                      ? 'Ativa'
                      : 'Inativa'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="admin-product-form">
                <div
                  className="form-grid"
                  style={
                    isMobile
                      ? {
                          display: 'grid',
                          gridTemplateColumns: '1fr',
                          gap: '16px'
                        }
                      : undefined
                  }
                >
                  <label>
                    Nome

                    <input
                      value={selectedCategory.name || ''}
                      onChange={(e) =>
                        updateSelectedCategory('name', e.target.value)
                      }
                      placeholder="Nome da categoria"
                    />
                  </label>

                  <label>
                    Ordem

                    <input
                      type="number"
                      value={selectedCategory.order || 1}
                      onChange={(e) =>
                        updateSelectedCategory('order', e.target.value)
                      }
                      placeholder="1"
                    />
                  </label>
                </div>

                <label>
                  Slug

                  <input
                    value={selectedCategory.slug || ''}
                    onChange={(e) =>
                      updateSelectedCategory('slug', e.target.value)
                    }
                    placeholder="categoria-premium"
                  />
                </label>

                <label>
                  Imagem da categoria

                  <div className="admin-upload-box">
                    {selectedCategory.imageUrl ? (
                      <img
                        src={selectedCategory.imageUrl}
                        alt="Preview da categoria"
                      />
                    ) : (
                      <div className="admin-upload-placeholder">
                        <Image size={26} />
                        <strong>Imagem da categoria</strong>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e.target.files?.[0])
                      }
                    />

                    <span>
                      {uploadingImage
                        ? 'Enviando imagem...'
                        : 'Selecionar imagem'}
                    </span>
                  </div>
                </label>

                <div className="admin-checks">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCategory.active !== false}
                      onChange={(e) =>
                        updateSelectedCategory('active', e.target.checked)
                      }
                    />
                    Categoria ativa
                  </label>
                </div>

                <button
                  className="btn btn-primary full"
                  onClick={saveCategory}
                  disabled={uploadingImage}
                  style={
                    isMobile
                      ? {
                          width: '100%',
                          minHeight: '56px'
                        }
                      : undefined
                  }
                >
                  <Save size={18} />
                  {uploadingImage
                    ? 'Aguarde o upload...'
                    : 'Salvar categoria'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}