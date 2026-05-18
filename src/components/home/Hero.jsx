import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Star
} from 'lucide-react';

import useIsMobile from '../../hooks/useIsMobile';

export default function Hero({ banner }) {
  const isMobile = useIsMobile();

  return (
    <section
      className="hero"
      style={
        isMobile
          ? {
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '28px',
              minHeight: 'auto',
              padding: '42px 18px 58px',
              overflow: 'hidden'
            }
          : undefined
      }
    >
      <div className="hero-overlay"></div>

      <div
        className="hero-content"
        style={
          isMobile
            ? {
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                zIndex: 2
              }
            : undefined
        }
      >
        <span className="eyebrow">
          <Sparkles size={16} />
          Nova coleção disponível
        </span>

        <h1
          style={
            isMobile
              ? {
                  fontSize: 'clamp(42px, 13vw, 58px)',
                  lineHeight: '.92',
                  letterSpacing: '-0.075em',
                  maxWidth: '100%'
                }
              : undefined
          }
        >
          {banner?.title || 'Estilo premium para comprar com facilidade'}
        </h1>

        <p
          style={
            isMobile
              ? {
                  fontSize: '16px',
                  lineHeight: '1.65',
                  maxWidth: '100%'
                }
              : undefined
          }
        >
          {banner?.subtitle ||
            'Peças selecionadas, atendimento exclusivo e pedido rápido direto pelo WhatsApp.'}
        </p>

        <div
          className="hero-actions"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '12px',
                  width: '100%',
                  marginTop: '26px'
                }
              : undefined
          }
        >
          <Link
            className="btn btn-primary"
            to={banner?.buttonLink || '/catalogo'}
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '58px'
                  }
                : undefined
            }
          >
            {banner?.buttonText || 'Ver coleção'}
            <ArrowRight size={18} />
          </Link>

          <Link
            className="btn btn-secondary"
            to="/catalogo"
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '58px'
                  }
                : undefined
            }
          >
            Explorar produtos
          </Link>
        </div>

        <div
          className="hero-benefits"
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '10px',
                  width: '100%',
                  marginTop: '22px'
                }
              : undefined
          }
        >
          <div
            style={
              isMobile
                ? {
                    width: '100%',
                    justifyContent: 'center'
                  }
                : undefined
            }
          >
            <ShieldCheck size={18} />
            <span>Compra segura</span>
          </div>

          <div
            style={
              isMobile
                ? {
                    width: '100%',
                    justifyContent: 'center'
                  }
                : undefined
            }
          >
            <Truck size={18} />
            <span>Entrega facilitada</span>
          </div>

          <div
            style={
              isMobile
                ? {
                    width: '100%',
                    justifyContent: 'center'
                  }
                : undefined
            }
          >
            <Star size={18} />
            <span>Peças selecionadas</span>
          </div>
        </div>
      </div>

      <div
        className="hero-visual"
        style={
          isMobile
            ? {
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                zIndex: 1
              }
            : undefined
        }
      >
        <div
          className="hero-image-wrapper"
          style={
            isMobile
              ? {
                  width: '100%',
                  maxWidth: '100%',
                  borderRadius: '30px',
                  padding: '8px',
                  overflow: 'hidden',
                  animation: 'none'
                }
              : undefined
          }
        >
          <img
            src={banner?.imageUrl}
            alt={banner?.title || 'Coleção premium da loja'}
            style={
              isMobile
                ? {
                    width: '100%',
                    height: '390px',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '24px'
                  }
                : undefined
            }
          />
        </div>

        <div
          className="hero-floating-card"
          style={
            isMobile
              ? {
                  position: 'relative',
                  left: 'auto',
                  bottom: 'auto',
                  width: '100%',
                  marginTop: '14px',
                  padding: '20px',
                  borderRadius: '24px'
                }
              : undefined
          }
        >
          <span>Atendimento exclusivo</span>

          <strong>Pedido rápido pelo WhatsApp</strong>

          <p>
            Escolha tamanho, cor e quantidade. A loja recebe tudo organizado.
          </p>

          <div className="floating-status">
            <div className="status-dot"></div>
            Loja online agora
          </div>
        </div>
      </div>
    </section>
  );
}