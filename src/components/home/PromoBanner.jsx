import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

import useIsMobile from '../../hooks/useIsMobile';

export default function PromoBanner({ banners = [] }) {
  const isMobile = useIsMobile();

  const activePromos = banners.filter(
    (banner) => banner?.active !== false
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activePromos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === activePromos.length - 1
          ? 0
          : current + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [activePromos.length]);

  if (!activePromos.length) return null;

  if (activePromos.length === 1) {
    const banner = activePromos[0];

    return (
      <section
        className="promo-banner"
        style={{
          backgroundImage: `url(${banner.imageUrl})`,
          ...(isMobile && {
            margin: '42px 18px',
            minHeight: '440px',
            padding: '28px',
            borderRadius: '30px',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end'
          })
        }}
      >
        <div className="promo-overlay"></div>

        <div
          className="promo-content"
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
          <span>Nova coleção</span>

          <h2
            style={
              isMobile
                ? {
                    fontSize: 'clamp(38px, 12vw, 56px)',
                    lineHeight: '.92'
                  }
                : undefined
            }
          >
            {banner.title || 'Peças selecionadas para elevar seu estilo'}
          </h2>

          <p
            style={
              isMobile
                ? {
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }
                : undefined
            }
          >
            {banner.subtitle ||
              'Descubra produtos exclusivos com visual premium e atendimento direto pelo WhatsApp.'}
          </p>

          <Link
            className="btn btn-primary"
            to={banner.buttonLink || '/catalogo'}
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '56px'
                  }
                : undefined
            }
          >
            {banner.buttonText || 'Explorar coleção'}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    );
  }

  const banner = activePromos[currentIndex];

  function previousBanner() {
    setCurrentIndex((current) =>
      current === 0
        ? activePromos.length - 1
        : current - 1
    );
  }

  function nextBanner() {
    setCurrentIndex((current) =>
      current === activePromos.length - 1
        ? 0
        : current + 1
    );
  }

  return (
    <section
      className="premium-promos-section"
      style={
        isMobile
          ? {
              padding: '54px 18px'
            }
          : undefined
      }
    >
      <div
        className="section-head"
        style={
          isMobile
            ? {
                marginBottom: '26px'
              }
            : undefined
        }
      >
        <span>
          <Sparkles size={15} />
          Ofertas especiais
        </span>

        <h2
          style={
            isMobile
              ? {
                  fontSize: 'clamp(38px, 12vw, 56px)',
                  lineHeight: '.92'
                }
              : undefined
          }
        >
          Promoções em destaque
        </h2>

        <p
          style={
            isMobile
              ? {
                  fontSize: '16px',
                  lineHeight: '1.6'
                }
              : undefined
          }
        >
          Veja campanhas, novidades e condições especiais selecionadas para você.
        </p>
      </div>

      <div
        className="premium-promo-slider"
        style={{
          backgroundImage: `url(${banner.imageUrl})`,
          ...(isMobile && {
            minHeight: '460px',
            borderRadius: '30px',
            padding: '26px',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            position: 'relative',
            overflow: 'hidden'
          })
        }}
      >
        <div className="premium-promo-overlay"></div>

        <div
          className="premium-promo-content"
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
          <span>Promoção</span>

          <h3
            style={
              isMobile
                ? {
                    fontSize: 'clamp(38px, 12vw, 56px)',
                    lineHeight: '.92',
                    margin: '14px 0 18px'
                  }
                : undefined
            }
          >
            {banner.title || 'Oferta especial'}
          </h3>

          <p
            style={
              isMobile
                ? {
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '22px'
                  }
                : undefined
            }
          >
            {banner.subtitle || 'Aproveite uma seleção especial da loja.'}
          </p>

          <Link
            className="btn btn-primary"
            to={banner.buttonLink || '/catalogo'}
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '56px'
                  }
                : undefined
            }
          >
            {banner.buttonText || 'Ver produtos'}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div
          className="premium-promo-controls"
          style={
            isMobile
              ? {
                  position: 'absolute',
                  left: '18px',
                  right: '18px',
                  bottom: '18px',
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }
              : undefined
          }
        >
          <button type="button" onClick={previousBanner}>
            <ChevronLeft size={20} />
          </button>

          <div className="premium-promo-dots">
            {activePromos.map((item, index) => (
              <button
                type="button"
                key={item.id || index}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <button type="button" onClick={nextBanner}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}