import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

import { getStoreSettings } from '../../services/settingsService';
import useIsMobile from '../../hooks/useIsMobile';

function formatInstagramUrl(instagram) {
  if (!instagram) return '';

  const cleanInstagram = instagram.trim();

  if (cleanInstagram.startsWith('http')) {
    return cleanInstagram;
  }

  return `https://instagram.com/${cleanInstagram.replace('@', '')}`;
}

export default function Header() {
  const isMobile = useIsMobile(1180);

  const [menuOpen, setMenuOpen] = useState(false);
  const [storeConfig, setStoreConfig] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getStoreSettings();
      setStoreConfig(settings);
    }

    loadSettings();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const storeName =
    storeConfig?.storeName ||
    storeConfig?.name ||
    'Premium Store';

  const instagramUrl = formatInstagramUrl(
    storeConfig?.instagram
  );

  return (
    <>
      <header
        className="site-header"
        style={
          isMobile
            ? {
                position: 'sticky',
                top: 0,
                zIndex: 999,
                height: '76px',
                padding: '0 18px',
                background: 'rgba(7, 7, 7, .90)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                borderBottom: '1px solid rgba(212, 175, 55, .14)'
              }
            : undefined
        }
      >
        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
          style={
            isMobile
              ? {
                  minWidth: 0
                }
              : undefined
          }
        >
          <span
            className="brand-icon"
            style={
              isMobile
                ? {
                    width: '42px',
                    height: '42px',
                    borderRadius: '16px',
                    flex: '0 0 auto'
                  }
                : undefined
            }
          >
            <ShoppingBag size={18} />
          </span>

          <div
            className="brand-text"
            style={
              isMobile
                ? {
                    minWidth: 0
                  }
                : undefined
            }
          >
            <strong
              style={
                isMobile
                  ? {
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '180px'
                    }
                  : undefined
              }
            >
              {storeName}
            </strong>

            {!isMobile && <span>Premium Store</span>}
          </div>
        </Link>

        {!isMobile && (
          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/contato">Contato</NavLink>

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-social"
              >
                <div className="nav-dot"></div>
                Instagram
              </a>
            )}
          </nav>
        )}

        <div className="header-actions">
          {!isMobile && (
            <Link className="header-cta" to="/catalogo">
              Explorar coleção
              <ArrowRight size={16} />
            </Link>
          )}

          {isMobile && (
            <button
              className="mobile-menu"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '18px',
                background: 'rgba(255, 255, 255, .06)',
                border: '1px solid rgba(212, 175, 55, .18)',
                color: '#fff',
                flex: '0 0 auto'
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </header>

      {isMobile && (
        <div
          className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: '88px',
            left: '18px',
            right: '18px',
            zIndex: 998,
            padding: '14px',
            borderRadius: '26px',
            background: 'rgba(8, 8, 8, .96)',
            border: '1px solid rgba(212, 175, 55, .16)',
            boxShadow: '0 28px 80px rgba(0, 0, 0, .58)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'opacity .28s ease, transform .28s ease'
          }}
        >
          <nav
            style={{
              display: 'grid',
              gap: '10px'
            }}
          >
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/catalogo" onClick={closeMenu}>
              Catálogo
            </NavLink>

            <NavLink to="/sobre" onClick={closeMenu}>
              Sobre
            </NavLink>

            <NavLink to="/contato" onClick={closeMenu}>
              Contato
            </NavLink>

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                Instagram
              </a>
            )}

            <Link
              to="/catalogo"
              className="btn btn-primary"
              onClick={closeMenu}
              style={{
                width: '100%',
                minHeight: '54px',
                marginTop: '4px'
              }}
            >
              Explorar coleção
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}