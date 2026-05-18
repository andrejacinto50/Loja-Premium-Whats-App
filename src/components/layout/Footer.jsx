import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ShoppingBag,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

import { getStoreSettings } from '../../services/settingsService';
import useIsMobile from '../../hooks/useIsMobile';

function formatInstagramUrl(instagram) {
  if (!instagram) return '';

  const cleanInstagram = instagram.trim();

  if (cleanInstagram.startsWith('http')) {
    return cleanInstagram;
  }

  const username = cleanInstagram.replace('@', '');

  return `https://instagram.com/${username}`;
}

export default function Footer() {
  const isMobile = useIsMobile();
  const [storeConfig, setStoreConfig] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getStoreSettings();
      setStoreConfig(settings);
    }

    loadSettings();
  }, []);

  const storeName = storeConfig?.storeName || 'Premium Store';

  const instagramUrl = formatInstagramUrl(
    storeConfig?.instagram
  );

  return (
    <footer
      className="footer"
      style={
        isMobile
          ? {
              marginTop: '60px',
              padding: '58px 18px 30px',
              overflow: 'hidden'
            }
          : undefined
      }
    >
      <div className="footer-glow"></div>

      <div
        className="footer-top"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
                marginBottom: '34px'
              }
            : undefined
        }
      >
        <div className="footer-brand">
          <div
            className="footer-brand-icon"
            style={
              isMobile
                ? {
                    width: '54px',
                    height: '54px',
                    borderRadius: '20px',
                    flex: '0 0 auto'
                  }
                : undefined
            }
          >
            <ShoppingBag size={18} />
          </div>

          <div>
            <strong
              style={
                isMobile
                  ? {
                      fontSize: '24px',
                      lineHeight: '1'
                    }
                  : undefined
              }
            >
              {storeName}
            </strong>

            <span>
              {storeConfig?.slogan || 'Premium Collection'}
            </span>
          </div>
        </div>

        <p
          className="footer-description"
          style={
            isMobile
              ? {
                  justifySelf: 'start',
                  maxWidth: '100%',
                  fontSize: '15px',
                  lineHeight: '1.75'
                }
              : undefined
          }
        >
          {storeConfig?.heroDescription ||
            storeConfig?.slogan ||
            'Peças selecionadas para quem valoriza estilo, praticidade e uma experiência premium.'}
        </p>
      </div>

      <div
        className="footer-grid"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '14px',
                padding: '12px',
                borderRadius: '28px'
              }
            : undefined
        }
      >
        <div
          className="footer-column"
          style={
            isMobile
              ? {
                  minHeight: 'auto',
                  padding: '22px',
                  borderRadius: '22px'
                }
              : undefined
          }
        >
          <span>Navegação</span>

          <Link to="/">Home</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div
          className="footer-column"
          style={
            isMobile
              ? {
                  minHeight: 'auto',
                  padding: '22px',
                  borderRadius: '22px'
                }
              : undefined
          }
        >
          <span>Contato</span>

          {storeConfig?.whatsapp && (
            <a
              href={`https://wa.me/${storeConfig.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          )}

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="footer-dot"></span>
              Instagram
            </a>
          )}

          {storeConfig?.email && (
            <a href={`mailto:${storeConfig.email}`}>
              <span className="footer-dot"></span>
              {storeConfig.email}
            </a>
          )}
        </div>

        <div
          className="footer-column"
          style={
            isMobile
              ? {
                  minHeight: 'auto',
                  padding: '22px',
                  borderRadius: '22px'
                }
              : undefined
          }
        >
          <span>Informações</span>

          <p>
            {storeConfig?.address || 'Loja online premium'}
          </p>

          <p>
            {storeConfig?.openingHours || 'Atendimento online'}
          </p>
        </div>
      </div>

      <div
        className="footer-bottom"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '16px',
                alignItems: 'start',
                marginTop: '18px'
              }
            : undefined
        }
      >
        <p>
          © {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
        </p>

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '46px'
                  }
                : undefined
            }
          >
            Seguir no Instagram
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </footer>
  );
}