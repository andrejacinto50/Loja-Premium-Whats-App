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

export default function AdminLayout({ children }) {
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
    <div className="admin-shell">
      <button
        className="admin-mobile-toggle"
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Fechar menu admin' : 'Abrir menu admin'}
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Store size={20} />
          </div>

          <div>
            <strong>Painel da Loja</strong>
            <span>Admin premium</span>
          </div>
        </div>

        <nav className="admin-nav">
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

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}