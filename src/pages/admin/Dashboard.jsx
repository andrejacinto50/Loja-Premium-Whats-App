import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Package,
  Tags,
  Star,
  BadgePercent,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  LayoutTemplate,
  Eye
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';

import { getDashboardStats } from '../../services/dashboardService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    banners: 0,
    featured: 0,
    promos: 0,
    activeProducts: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="admin-dashboard-top">
          <div className="admin-dashboard-head">
            <span>Painel premium</span>

            <h1>Dashboard da Loja</h1>

            <p>
              Gerencie produtos, banners, categorias e toda experiência
              visual da loja premium.
            </p>
          </div>

          <div className="admin-dashboard-actions">
            <Link
              to="/admin/produtos"
              className="btn btn-primary"
            >
              Novo produto
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/"
              className="btn btn-secondary"
              target="_blank"
            >
              Ver loja
            </Link>
          </div>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Package size={22} />
            </div>

            <div>
              <span>Produtos</span>
              <strong>
                {loading ? '...' : stats.products}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Tags size={22} />
            </div>

            <div>
              <span>Categorias</span>
              <strong>
                {loading ? '...' : stats.categories}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Star size={22} />
            </div>

            <div>
              <span>Destaques</span>
              <strong>
                {loading ? '...' : stats.featured}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <BadgePercent size={22} />
            </div>

            <div>
              <span>Promoções</span>
              <strong>
                {loading ? '...' : stats.promos}
              </strong>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span>Visão geral</span>
                <h2>Resumo da loja</h2>
              </div>

              <Sparkles size={18} />
            </div>

            <div className="admin-overview-list">
              <div>
                <strong>
                  {loading ? '...' : stats.activeProducts}
                </strong>
                <span>Produtos ativos</span>
              </div>

              <div>
                <strong>
                  {loading ? '...' : stats.featured}
                </strong>
                <span>Produtos destaque</span>
              </div>

              <div>
                <strong>
                  {loading ? '...' : stats.promos}
                </strong>
                <span>Promoções ativas</span>
              </div>

              <div>
                <strong>
                  {loading ? '...' : stats.banners}
                </strong>
                <span>Banners cadastrados</span>
              </div>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span>Atividade</span>
                <h2>Status do sistema</h2>
              </div>

              <Eye size={18} />
            </div>

            <div className="admin-activity">
              <div className="admin-activity-item">
                <div className="activity-dot"></div>

                <div>
                  <strong>Supabase conectado</strong>
                  <p>Dashboard puxando dados reais do banco.</p>
                </div>
              </div>

              <div className="admin-activity-item">
                <div className="activity-dot"></div>

                <div>
                  <strong>Auth real ativo</strong>
                  <p>Login administrativo protegido com Supabase.</p>
                </div>
              </div>

              <div className="admin-activity-item">
                <div className="activity-dot"></div>

                <div>
                  <strong>Painel em produção</strong>
                  <p>Produtos, categorias, banners e configurações integrados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-shortcuts">
          <div className="admin-shortcuts-head">
            <span>Acesso rápido</span>

            <h2>Gerencie sua loja</h2>
          </div>

          <div className="admin-shortcuts-grid">
            <Link
              to="/admin/produtos"
              className="admin-shortcut-card"
            >
              <Package size={22} />

              <div>
                <strong>Produtos</strong>
                <p>Gerencie catálogo e estoque.</p>
              </div>
            </Link>

            <Link
              to="/admin/categorias"
              className="admin-shortcut-card"
            >
              <Tags size={22} />

              <div>
                <strong>Categorias</strong>
                <p>Organize as coleções da loja.</p>
              </div>
            </Link>

            <Link
              to="/admin/banners"
              className="admin-shortcut-card"
            >
              <LayoutTemplate size={22} />

              <div>
                <strong>Banners</strong>
                <p>Edite hero e promoções.</p>
              </div>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="admin-shortcut-card"
            >
              <ShoppingBag size={22} />

              <div>
                <strong>Ver loja</strong>
                <p>Acesse o visual público.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}