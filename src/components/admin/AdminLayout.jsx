import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Package,
  Tags,
  Image,
  Settings,
  Store,
  Menu,
  X,
  LogOut
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import useIsMobile from '../../hooks/useIsMobile';

export default function AdminLayout({ children }) {
  const isMobile = useIsMobile(900);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  function closeSidebar() {
    setSidebarOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error(error);
      alert('Erro ao sair do painel.');
    }
  }

  return (
    <div
      className="admin-shell"
      style={
        isMobile
          ? {
              display: 'block',
              minHeight: '100vh',
              width: '100%',
              overflowX: 'hidden'
            }
          : undefined
      }
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 98,
            background: 'rgba(0,0,0,.58)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }}
        />
      )}

      <button
        className="admin-mobile-toggle"
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Fechar menu admin' : 'Abrir menu admin'}
        style={
          isMobile
            ? {
                position: 'fixed',
                right: '18px',
                top: '18px',
                zIndex: 120,
                width: '50px',
                height: '50px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '18px',
                border: '1px solid rgba(212,175,55,.18)',
                background: 'rgba(10,10,10,.92)',
                color: '#fff',
                boxShadow: '0 18px 50px rgba(0,0,0,.42)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)'
              }
            : undefined
        }
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <aside
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        style={
          isMobile
            ? {
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: 'min(330px, 86vw)',
                height: '100vh',
                zIndex: 110,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                transform: sidebarOpen
                  ? 'translateX(0)'
                  : 'translateX(-105%)',
                transition: 'transform .3s ease',
                background: 'rgba(8,8,8,.97)',
                borderRight: '1px solid rgba(212,175,55,.16)',
                boxShadow: '28px 0 90px rgba(0,0,0,.55)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)'
              }
            : undefined
        }
      >
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Store size={20} />
          </div>

          <div>
            <strong>Painel da Loja</strong>
            <span>Admin premium</span>
          </div>
        </div>

        <nav
          className="admin-nav"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gap: '10px'
                }
              : undefined
          }
        >
          <NavLink to="/admin" onClick={closeSidebar} end>
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/produtos" onClick={closeSidebar}>
            <Package size={19} />
            Produtos
          </NavLink>

          <NavLink to="/admin/categorias" onClick={closeSidebar}>
            <Tags size={19} />
            Categorias
          </NavLink>

          <NavLink to="/admin/banners" onClick={closeSidebar}>
            <Image size={19} />
            Banners
          </NavLink>

          <NavLink to="/admin/configuracoes" onClick={closeSidebar}>
            <Settings size={19} />
            Configurações
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <button type="button" onClick={handleLogout}>
            <LogOut size={18} />
            Sair do painel
          </button>
        </div>
      </aside>

      <main
        className="admin-content"
        style={
          isMobile
            ? {
                width: '100%',
                maxWidth: '100%',
                minHeight: '100vh',
                padding: '88px 18px 32px',
                overflowX: 'hidden'
              }
            : undefined
        }
      >
        {children}
      </main>
    </div>
  );
}