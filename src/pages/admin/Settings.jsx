import { useEffect, useState } from 'react';

import {
  Save,
  Store,
  MessageCircle,
  MapPin,
  Palette,
  Globe,
  Sparkles
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';

import {
  getStoreSettings,
  updateStoreSettings
} from '../../services/settingsService';

import useIsMobile from '../../hooks/useIsMobile';

export default function Settings() {
  const isMobile = useIsMobile(900);

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getStoreSettings();

        setSettings({
          ...data,
          colors: {
            primary: data?.colors?.primary || '#d4af37',
            secondary: data?.colors?.secondary || '#111111',
            background: data?.colors?.background || '#070707'
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function updateField(field, value) {
    setSettings((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateColor(field, value) {
    setSettings((current) => ({
      ...current,
      colors: {
        ...(current?.colors || {}),
        [field]: value
      }
    }));
  }

  async function saveSettings() {
    if (!settings?.id) {
      alert('Configuração da loja não encontrada no Supabase.');
      return;
    }

    try {
      setSaving(true);
      setSaved(false);

      const updatedSettings = await updateStoreSettings(settings.id, {
        ...settings,
        colors: {
          primary: settings.colors?.primary || '#d4af37',
          secondary: settings.colors?.secondary || '#111111',
          background: settings.colors?.background || '#070707'
        }
      });

      setSettings({
        ...updatedSettings,
        colors: {
          primary: updatedSettings?.colors?.primary || '#d4af37',
          secondary: updatedSettings?.colors?.secondary || '#111111',
          background: updatedSettings?.colors?.background || '#070707'
        }
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1600);
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar configurações.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div
          className="admin-settings-page"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gap: '22px'
                }
              : undefined
          }
        >
          <div className="admin-empty-state">
            <strong>Carregando configurações...</strong>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout>
        <div
          className="admin-settings-page"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gap: '22px'
                }
              : undefined
          }
        >
          <div className="admin-empty-state">
            <strong>Nenhuma configuração encontrada.</strong>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div
        className="admin-settings-page"
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
          className="admin-head"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '12px'
                }
              : undefined
          }
        >
          <span>Loja</span>

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
            Configurações
          </h1>

          <p>
            Personalize identidade, contatos, aparência e informações da loja.
          </p>
        </div>

        <div
          className="settings-layout"
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
          <div
            className="settings-sidebar-card"
            style={
              isMobile
                ? {
                    borderRadius: '28px',
                    padding: '22px'
                  }
                : undefined
            }
          >
            <div className="settings-sidebar-top">
              <div className="settings-logo-preview">
                <Store size={22} />
              </div>

              <div>
                <strong>{settings.storeName || 'Nome da loja'}</strong>
                <span>{settings.slogan || 'Premium Collection'}</span>
              </div>
            </div>

            <p>
              Configure o visual principal da loja e mantenha tudo sincronizado
              com o Supabase.
            </p>

            <div className="settings-sidebar-list">
              <div>
                <MessageCircle size={16} />
                <span>Atendimento via WhatsApp</span>
              </div>

              <div>
                <Sparkles size={16} />
                <span>Visual premium responsivo</span>
              </div>

              <div>
                <Globe size={16} />
                <span>Estrutura pronta para produção</span>
              </div>
            </div>
          </div>

          <div
            className="settings-content"
            style={
              isMobile
                ? {
                    display: 'grid',
                    gap: '18px'
                  }
                : undefined
            }
          >
            <div
              className="settings-section"
              style={
                isMobile
                  ? {
                      borderRadius: '28px',
                      padding: '22px'
                    }
                  : undefined
              }
            >
              <div className="settings-section-head">
                <span>
                  <Store size={16} />
                  Loja
                </span>

                <h3>Informações principais</h3>
              </div>

              <div
                className="settings-grid"
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
                  Nome da loja

                  <input
                    value={settings.storeName || ''}
                    onChange={(e) =>
                      updateField('storeName', e.target.value)
                    }
                    placeholder="Nome da loja"
                  />
                </label>

                <label>
                  Slogan

                  <input
                    value={settings.slogan || ''}
                    onChange={(e) =>
                      updateField('slogan', e.target.value)
                    }
                    placeholder="Slogan"
                  />
                </label>
              </div>

              <label>
                Texto padrão do WhatsApp

                <textarea
                  rows="3"
                  value={settings.defaultWhatsappText || ''}
                  onChange={(e) =>
                    updateField('defaultWhatsappText', e.target.value)
                  }
                  placeholder="Olá! Tenho interesse neste produto:"
                ></textarea>
              </label>
            </div>

            <div
              className="settings-section"
              style={
                isMobile
                  ? {
                      borderRadius: '28px',
                      padding: '22px'
                    }
                  : undefined
              }
            >
              <div className="settings-section-head">
                <span>
                  <MessageCircle size={16} />
                  Contato
                </span>

                <h3>Canais da loja</h3>
              </div>

              <div
                className="settings-grid"
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
                  WhatsApp

                  <input
                    value={settings.whatsapp || ''}
                    onChange={(e) =>
                      updateField('whatsapp', e.target.value)
                    }
                    placeholder="554899999999"
                  />
                </label>

                <label>
                  Instagram

                  <input
                    value={settings.instagram || ''}
                    onChange={(e) =>
                      updateField('instagram', e.target.value)
                    }
                    placeholder="@sualoja ou URL"
                  />
                </label>

                <label>
                  E-mail

                  <input
                    value={settings.email || ''}
                    onChange={(e) =>
                      updateField('email', e.target.value)
                    }
                    placeholder="contato@sualoja.com"
                  />
                </label>

                <label>
                  Facebook

                  <input
                    value={settings.facebook || ''}
                    onChange={(e) =>
                      updateField('facebook', e.target.value)
                    }
                    placeholder="URL do Facebook"
                  />
                </label>

                <label>
                  TikTok

                  <input
                    value={settings.tiktok || ''}
                    onChange={(e) =>
                      updateField('tiktok', e.target.value)
                    }
                    placeholder="URL do TikTok"
                  />
                </label>
              </div>
            </div>

            <div
              className="settings-section"
              style={
                isMobile
                  ? {
                      borderRadius: '28px',
                      padding: '22px'
                    }
                  : undefined
              }
            >
              <div className="settings-section-head">
                <span>
                  <MapPin size={16} />
                  Localização
                </span>

                <h3>Informações da empresa</h3>
              </div>

              <div
                className="settings-grid"
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
                  Endereço

                  <input
                    value={settings.address || ''}
                    onChange={(e) =>
                      updateField('address', e.target.value)
                    }
                    placeholder="Endereço"
                  />
                </label>

                <label>
                  Horário

                  <input
                    value={settings.openingHours || ''}
                    onChange={(e) =>
                      updateField('openingHours', e.target.value)
                    }
                    placeholder="Horário"
                  />
                </label>
              </div>
            </div>

            <div
              className="settings-section"
              style={
                isMobile
                  ? {
                      borderRadius: '28px',
                      padding: '22px'
                    }
                  : undefined
              }
            >
              <div className="settings-section-head">
                <span>
                  <Palette size={16} />
                  Aparência
                </span>

                <h3>Cores principais</h3>
              </div>

              <div
                className="settings-colors"
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
                  Cor principal

                  <div className="color-input">
                    <input
                      type="color"
                      value={settings.colors?.primary || '#d4af37'}
                      onChange={(e) =>
                        updateColor('primary', e.target.value)
                      }
                    />

                    <span>{settings.colors?.primary || '#d4af37'}</span>
                  </div>
                </label>

                <label>
                  Cor secundária

                  <div className="color-input">
                    <input
                      type="color"
                      value={settings.colors?.secondary || '#111111'}
                      onChange={(e) =>
                        updateColor('secondary', e.target.value)
                      }
                    />

                    <span>{settings.colors?.secondary || '#111111'}</span>
                  </div>
                </label>

                <label>
                  Cor de fundo

                  <div className="color-input">
                    <input
                      type="color"
                      value={settings.colors?.background || '#070707'}
                      onChange={(e) =>
                        updateColor('background', e.target.value)
                      }
                    />

                    <span>{settings.colors?.background || '#070707'}</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              className="btn btn-primary settings-save-btn"
              type="button"
              onClick={saveSettings}
              disabled={saving}
              style={
                isMobile
                  ? {
                      width: '100%',
                      minHeight: '56px',
                      justifyContent: 'center'
                    }
                  : undefined
              }
            >
              <Save size={18} />

              {saving
                ? 'Salvando...'
                : saved
                ? 'Alterações salvas'
                : 'Salvar alterações'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}