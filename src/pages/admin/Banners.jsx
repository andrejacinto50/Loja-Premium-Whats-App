import { useEffect, useMemo, useState } from 'react';

import {
  Plus,
  Search,
  Pencil,
  Eye,
  X,
  Save,
  Image,
  Megaphone,
  Crown,
  AlertCircle
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';

import {
  getBanners,
  createBanner,
  updateBanner
} from '../../services/bannersService';

import { uploadImage } from '../../services/storageService';
import useIsMobile from '../../hooks/useIsMobile';

const emptyBanner = {
  id: '',
  title: '',
  subtitle: '',
  imageUrl: '',
  buttonText: '',
  buttonLink: '',
  position: 'hero',
  active: true
};

const fallbackImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop';

export default function Banners() {
  const isMobile = useIsMobile(900);

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [modalMode, setModalMode] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    async function loadBanners() {
      try {
        const data = await getBanners();
        setBanners(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadBanners();
  }, []);

  const activeHeroBanner = useMemo(() => {
    return banners.find(
      (banner) =>
        banner.position === 'hero' &&
        banner.active !== false
    );
  }, [banners]);

  const filteredBanners = useMemo(() => {
    return banners.filter((banner) => {
      const matchesSearch = (banner.title || '')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'hero' && banner.position === 'hero') ||
        (filter === 'promo' && banner.position === 'promo') ||
        (filter === 'active' && banner.active !== false) ||
        (filter === 'inactive' && banner.active === false);

      return matchesSearch && matchesFilter;
    });
  }, [banners, search, filter]);

  function openCreateModal() {
    setSelectedBanner({ ...emptyBanner });
    setModalMode('create');
  }

  function openEditModal(banner) {
    setSelectedBanner({
      ...emptyBanner,
      ...banner,
      active: banner.active !== false
    });

    setModalMode('edit');
  }

  function openViewModal(banner) {
    setSelectedBanner({
      ...emptyBanner,
      ...banner,
      active: banner.active !== false
    });

    setModalMode('view');
  }

  function closeModal() {
    setSelectedBanner(null);
    setModalMode(null);
    setUploadingImage(false);
  }

  function updateSelectedBanner(field, value) {
    setSelectedBanner((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleImageUpload(file) {
    if (!file) return;

    try {
      setUploadingImage(true);

      const imageUrl = await uploadImage(file, 'banners');

      if (!imageUrl) {
        alert('Erro ao enviar imagem.');
        return;
      }

      updateSelectedBanner('imageUrl', imageUrl);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar imagem.');
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveBanner() {
    if (!selectedBanner.title?.trim()) {
      alert('Preencha o título do banner.');
      return;
    }

    if (!selectedBanner.position) {
      alert('Selecione a posição do banner.');
      return;
    }

    try {
      const isHero =
        selectedBanner.position === 'hero' &&
        selectedBanner.active !== false;

      const formattedBanner = {
        ...selectedBanner,
        title: selectedBanner.title.trim(),
        subtitle: selectedBanner.subtitle || '',
        buttonText: selectedBanner.buttonText || '',
        buttonLink: selectedBanner.buttonLink || '',
        imageUrl: selectedBanner.imageUrl || fallbackImage,
        active: selectedBanner.active !== false
      };

      if (isHero) {
        const otherActiveHero = banners.find(
          (banner) =>
            banner.position === 'hero' &&
            banner.active !== false &&
            banner.id !== formattedBanner.id
        );

        if (otherActiveHero) {
          const confirmHero = window.confirm(
            'Já existe um Hero ativo. Para manter o site premium e rápido, apenas 1 Hero deve ficar ativo. Deseja ativar este e desativar o outro?'
          );

          if (!confirmHero) return;

          const disabledHero = await updateBanner(otherActiveHero.id, {
            ...otherActiveHero,
            active: false
          });

          setBanners((current) =>
            current.map((banner) =>
              banner.id === disabledHero.id
                ? disabledHero
                : banner
            )
          );
        }
      }

      if (modalMode === 'create') {
        const createdBanner = await createBanner(formattedBanner);

        setBanners((current) => [
          createdBanner,
          ...current
        ]);
      }

      if (modalMode === 'edit') {
        const updatedBanner = await updateBanner(
          formattedBanner.id,
          formattedBanner
        );

        setBanners((current) =>
          current.map((banner) =>
            banner.id === updatedBanner.id
              ? updatedBanner
              : banner
          )
        );
      }

      closeModal();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar banner.');
    }
  }

  function getPositionLabel(position) {
    if (position === 'hero') return 'Hero principal';
    if (position === 'promo') return 'Promoção';
    return 'Banner';
  }

  return (
    <AdminLayout>
      <div
        className="admin-banners-page"
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
              Banners
            </h1>

            <p>
              Controle o Hero principal da loja e os banners de promoções.
              Para manter a loja rápida e premium, use apenas 1 Hero ativo.
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
            Novo banner
          </button>
        </div>

        <div
          className="admin-banner-warning"
          style={
            isMobile
              ? {
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '18px',
                  borderRadius: '22px'
                }
              : undefined
          }
        >
          <AlertCircle size={18} />

          <div>
            <strong>Regra premium recomendada</strong>
            <p>
              Hero é a primeira impressão da loja: use apenas 1 ativo.
              Para campanhas, descontos e coleções, use banners do tipo Promo.
            </p>
          </div>
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
              placeholder="Buscar banner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div
          className="admin-filter-panel visible"
          style={
            isMobile
              ? {
                  display: 'flex',
                  gap: '10px',
                  overflowX: 'auto',
                  paddingBottom: '8px'
                }
              : undefined
          }
        >
          {[
            ['all', 'Todos'],
            ['hero', 'Hero'],
            ['promo', 'Promo'],
            ['active', 'Ativos'],
            ['inactive', 'Inativos']
          ].map(([value, label]) => (
            <button
              key={value}
              className={filter === value ? 'active' : ''}
              onClick={() => setFilter(value)}
              style={
                isMobile
                  ? {
                      flex: '0 0 auto',
                      whiteSpace: 'nowrap'
                    }
                  : undefined
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="admin-banner-grid"
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
              <strong>Carregando banners...</strong>
            </div>
          )}

          {!loading &&
            filteredBanners.map((banner) => {
              const isHero = banner.position === 'hero';
              const isActive = banner.active !== false;

              return (
                <div
                  className={`admin-banner-card ${
                    isHero ? 'hero-banner-card' : ''
                  }`}
                  key={banner.id}
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
                    className="admin-banner-image"
                    style={
                      isMobile
                        ? {
                            minHeight: '280px',
                            borderRadius: '28px',
                            overflow: 'hidden'
                          }
                        : undefined
                    }
                  >
                    <img
                      src={banner.imageUrl || fallbackImage}
                      alt={banner.title}
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

                    <div className="admin-banner-overlay"></div>

                    <div className="admin-banner-badges">
                      <span>
                        {isHero ? (
                          <>
                            <Crown size={13} />
                            Hero
                          </>
                        ) : (
                          <>
                            <Megaphone size={13} />
                            Promo
                          </>
                        )}
                      </span>

                      <span className={isActive ? 'active' : 'inactive'}>
                        {isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    <div className="admin-banner-info">
                      <strong>{banner.title}</strong>
                      <p>{banner.subtitle}</p>
                    </div>
                  </div>

                  <div
                    className="admin-banner-actions"
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
                    <button onClick={() => openViewModal(banner)}>
                      <Eye size={17} />
                    </button>

                    <button onClick={() => openEditModal(banner)}>
                      <Pencil size={17} />
                      Editar
                    </button>
                  </div>
                </div>
              );
            })}

          {!loading && filteredBanners.length === 0 && (
            <div className="admin-empty-state">
              <strong>Nenhum banner encontrado.</strong>
              <p>Tente mudar a busca ou o filtro.</p>
            </div>
          )}
        </div>
      </div>

      {selectedBanner && (
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
                    ? 'Editar banner'
                    : 'Novo banner'}
                </span>

                <h2>
                  {modalMode === 'view'
                    ? selectedBanner.title
                    : 'Dados do banner'}
                </h2>
              </div>

              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            {modalMode === 'view' ? (
              <div
                className="admin-banner-preview"
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
                <img
                  src={selectedBanner.imageUrl || fallbackImage}
                  alt={selectedBanner.title}
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

                <div>
                  <span className="badge inline">
                    {getPositionLabel(selectedBanner.position)}
                  </span>

                  <h3>{selectedBanner.title}</h3>

                  <p>{selectedBanner.subtitle}</p>

                  <div className="admin-banner-preview-meta">
                    <span>
                      Status:{' '}
                      {selectedBanner.active !== false
                        ? 'Ativo'
                        : 'Inativo'}
                    </span>

                    <span>
                      Botão:{' '}
                      {selectedBanner.buttonText || 'Sem botão'}
                    </span>

                    <span>
                      Link:{' '}
                      {selectedBanner.buttonLink || 'Sem link'}
                    </span>
                  </div>
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
                    Título

                    <input
                      value={selectedBanner.title || ''}
                      onChange={(e) =>
                        updateSelectedBanner('title', e.target.value)
                      }
                      placeholder="Título do banner"
                    />
                  </label>

                  <label>
                    Posição

                    <select
                      value={selectedBanner.position || 'hero'}
                      onChange={(e) =>
                        updateSelectedBanner('position', e.target.value)
                      }
                    >
                      <option value="hero">
                        Hero principal
                      </option>

                      <option value="promo">
                        Promoção
                      </option>
                    </select>
                  </label>
                </div>

                {selectedBanner.position === 'hero' &&
                  activeHeroBanner &&
                  activeHeroBanner.id !== selectedBanner.id && (
                    <div className="admin-form-alert">
                      <AlertCircle size={17} />
                      <p>
                        Já existe um Hero ativo. Ao salvar este banner como
                        Hero ativo, o outro será desativado para manter o site
                        mais rápido e profissional.
                      </p>
                    </div>
                  )}

                <label>
                  Subtítulo

                  <textarea
                    rows="4"
                    value={selectedBanner.subtitle || ''}
                    onChange={(e) =>
                      updateSelectedBanner('subtitle', e.target.value)
                    }
                    placeholder="Descrição do banner"
                  />
                </label>

                <label>
                  Imagem do banner

                  <div className="admin-upload-box">
                    {selectedBanner.imageUrl ? (
                      <img
                        src={selectedBanner.imageUrl}
                        alt="Preview do banner"
                      />
                    ) : (
                      <div className="admin-upload-placeholder">
                        <Image size={26} />
                        <strong>Imagem do banner</strong>
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
                    Texto do botão

                    <input
                      value={selectedBanner.buttonText || ''}
                      onChange={(e) =>
                        updateSelectedBanner('buttonText', e.target.value)
                      }
                      placeholder="Ver coleção"
                    />
                  </label>

                  <label>
                    Link do botão

                    <input
                      value={selectedBanner.buttonLink || ''}
                      onChange={(e) =>
                        updateSelectedBanner('buttonLink', e.target.value)
                      }
                      placeholder="/catalogo"
                    />
                  </label>
                </div>

                <div className="admin-checks">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBanner.active !== false}
                      onChange={(e) =>
                        updateSelectedBanner('active', e.target.checked)
                      }
                    />
                    Banner ativo
                  </label>
                </div>

                <button
                  className="btn btn-primary full"
                  onClick={saveBanner}
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
                    : 'Salvar banner'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}