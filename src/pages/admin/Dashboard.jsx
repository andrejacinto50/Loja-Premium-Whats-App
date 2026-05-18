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
import useIsMobile from '../../hooks/useIsMobile';

export default function Dashboard() {
  const isMobile = useIsMobile(900);

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

        setStats({
          products: data?.products || 0,
          categories: data?.categories || 0,
          banners: data?.banners || 0,
          featured: data?.featured || 0,
          promos: data?.promos || 0,
          activeProducts: data?.activeProducts || 0
        });
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
      <div
        className="admin-dashboard"
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
          className="admin-dashboard-top"
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
          <div className="admin-dashboard-head">
            <span>Painel premium</span>

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
              Dashboard da Loja
            </h1>

            <p>
              Gerencie produtos, banners, categorias e toda experiência
              visual da loja premium.
            </p>
          </div>

          <div
            className="admin-dashboard-actions"
            style={
              isMobile
                ? {
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '12px',
                    width: '100%'
                  }
                : undefined
            }
          >
            <Link
              to="/admin/produtos"
              className="btn btn-primary"
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
              Novo produto
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/"
              className="btn btn-secondary"
              target="_blank"
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
              Ver loja
            </Link>
          </div>
        </div>

        <div
          className="admin-stats-grid"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '14px'
                }
              : undefined
          }
        >
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Package size={22} />
            </div>

            <div>
              <span>Produtos</span>
              <strong>{loading ? '...' : stats.products}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Tags size={22} />
            </div>

            <div>
              <span>Categorias</span>
              <strong>{loading ? '...' : stats.categories}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Star size={22} />
            </div>

            <div>
              <span>Destaques</span>
              <strong>{loading ? '...' : stats.featured}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <BadgePercent size={22} />
            </div>

            <div>
              <span>Promoções</span>
              <strong>{loading ? '...' : stats.promos}</strong>
            </div>
          </div>
        </div>

        <div
          className="admin-dashboard-grid"
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
            className="admin-panel"
            style={
              isMobile
                ? {
                    borderRadius: '28px',
                    padding: '22px'
                  }
                : undefined
            }
          >
            <div className="admin-panel-head">
              <div>
                <span>Visão geral</span>
                <h2>Resumo da loja</h2>
              </div>

              <Sparkles size={18} />
            </div>

            <div
              className="admin-overview-list"
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
              <div>
                <strong>{loading ? '...' : stats.activeProducts}</strong>
                <span>Produtos ativos</span>
              </div>

              <div>
                <strong>{loading ? '...' : stats.featured}</strong>
                <span>Produtos destaque</span>
              </div>

              <div>
                <strong>{loading ? '...' : stats.promos}</strong>
                <span>Promoções ativas</span>
              </div>

              <div>
                <strong>{loading ? '...' : stats.banners}</strong>
                <span>Banners cadastrados</span>
              </div>
            </div>
          </div>

          <div
            className="admin-panel"
            style={
              isMobile
                ? {
                    borderRadius: '28px',
                    padding: '22px'
                  }
                : undefined
            }
          >
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
                  <p>
                    Produtos, categorias, banners e configurações integrados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="admin-shortcuts"
          style={
            isMobile
              ? {
                  borderRadius: '28px',
                  padding: '22px'
                }
              : undefined
          }
        >
          <div className="admin-shortcuts-head">
            <span>Acesso rápido</span>

            <h2>Gerencie sua loja</h2>
          </div>

          <div
            className="admin-shortcuts-grid"
            style={
              isMobile
                ? {
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '14px'
                  }
                : undefined
            }
          >
            <Link
              to="/admin/produtos"
              className="admin-shortcut-card"
              style={
                isMobile
                  ? {
                      borderRadius: '22px',
                      minHeight: '96px'
                    }
                  : undefined
              }
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
              style={
                isMobile
                  ? {
                      borderRadius: '22px',
                      minHeight: '96px'
                    }
                  : undefined
              }
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
              style={
                isMobile
                  ? {
                      borderRadius: '22px',
                      minHeight: '96px'
                    }
                  : undefined
              }
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
              style={
                isMobile
                  ? {
                      borderRadius: '22px',
                      minHeight: '96px'
                    }
                  : undefined
              }
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