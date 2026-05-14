import { useEffect, useMemo, useState } from 'react';

import {
  Plus,
  Search,
  Pencil,
  Eye,
  X,
  Save
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';

import {
  getAllCategoriesAdmin,
createCategory,
updateCategory
} from '../../services/categoriesService';

import { uploadImage } from '../../services/storageService';

const emptyCategory = {
  id: '',
  name: '',
  slug: '',
  imageUrl: '',
  order: 1,
  active: true
};

export default function Categories() {
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
        setCategories(data);
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
        category.name
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
    setSelectedCategory({ ...category });
    setModalMode('edit');
  }

  function openViewModal(category) {
    setSelectedCategory(category);
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
    if (!selectedCategory.name.trim()) {
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
        slug:
          selectedCategory.slug ||
          createSlug(selectedCategory.name),
        order: Number(selectedCategory.order || 1),
        imageUrl: selectedCategory.imageUrl
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
      <div className="admin-categories-page">
        <div className="admin-head row">
          <div>
            <span>Gestão</span>
            <h1>Categorias</h1>
            <p>Organize coleções, estilos e categorias exibidas na loja.</p>
          </div>

          <button className="btn btn-primary" onClick={openCreateModal}>
            <Plus size={18} />
            Nova categoria
          </button>
        </div>

        <div className="admin-products-toolbar">
          <div className="admin-search">
            <Search size={18} />
            <input
              placeholder="Buscar categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-category-grid">
          {loading && (
            <div className="admin-empty-state">
              <strong>Carregando categorias...</strong>
            </div>
          )}

          {!loading &&
            filteredCategories.map((category) => (
              <div className="admin-category-card" key={category.id}>
                <div className="admin-category-image">
                  {category.imageUrl ? (
                    <img src={category.imageUrl} alt={category.name} />
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

                  <div className="admin-category-actions">
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
        <div className="admin-modal-backdrop">
          <div className="admin-product-modal">
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
              <div className="admin-category-preview">
                {selectedCategory.imageUrl ? (
                  <img
                    src={selectedCategory.imageUrl}
                    alt={selectedCategory.name}
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
                </div>
              </div>
            ) : (
              <div className="admin-product-form">
                <div className="form-grid">
                  <label>
                    Nome
                    <input
                      value={selectedCategory.name}
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
                      value={selectedCategory.order}
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
                    {selectedCategory.imageUrl && (
                      <img
                        src={selectedCategory.imageUrl}
                        alt="Preview da categoria"
                      />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0])
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
                      checked={!!selectedCategory.active}
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