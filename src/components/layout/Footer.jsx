import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ShoppingBag,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

import { getStoreSettings } from '../../services/settingsService';

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
  const [storeConfig, setStoreConfig] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getStoreSettings();
      setStoreConfig(settings);
    }

    loadSettings();
  }, []);

  const storeName =
    storeConfig?.storeName ||
    'Premium Store';

  const instagramUrl = formatInstagramUrl(
    storeConfig?.instagram
  );

  return (
    <footer className="footer">
      <div className="footer-glow"></div>

      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand-icon">
            <ShoppingBag size={18} />
          </div>

          <div>
            <strong>{storeName}</strong>

            <span>
              {storeConfig?.slogan ||
                'Premium Collection'}
            </span>
          </div>
        </div>

        <p className="footer-description">
          {storeConfig?.heroDescription ||
            storeConfig?.slogan ||
            'Peças selecionadas para quem valoriza estilo, praticidade e uma experiência premium.'}
        </p>
      </div>

      <div className="footer-grid">
        <div className="footer-column">
          <span>Navegação</span>

          <Link to="/">Home</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div className="footer-column">
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

        <div className="footer-column">
          <span>Informações</span>

          <p>
            {storeConfig?.address ||
              'Loja online premium'}
          </p>

          <p>
            {storeConfig?.openingHours ||
              'Atendimento online'}
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()}{' '}
          {storeName}. Todos os direitos reservados.
        </p>

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Seguir no Instagram
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </footer>
  );
}