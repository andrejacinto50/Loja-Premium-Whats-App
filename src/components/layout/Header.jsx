import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { getStoreSettings } from '../../services/settingsService';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const storeConfig = getStoreSettings();
  const storeName =
    storeConfig?.storeName || storeConfig?.name || 'Premium Store';

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 1180);
    }

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <ShoppingBag size={18} />
          </span>

          <div className="brand-text">
            <strong>{storeName}</strong>
            <span>Premium Store</span>
          </div>
        </Link>

        {!isMobile && (
          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/contato">Contato</NavLink>

            {storeConfig?.instagram && (
              <a
                href={storeConfig.instagram}
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
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </header>

      {isMobile && (
        <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
          <nav>
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

            {storeConfig?.instagram && (
              <a
                href={storeConfig.instagram}
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