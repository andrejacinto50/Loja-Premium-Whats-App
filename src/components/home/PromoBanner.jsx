import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function PromoBanner({ banners = [] }) {
  const activePromos = banners.filter(
    (banner) => banner?.active !== false
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activePromos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === activePromos.length - 1 ? 0 : current + 1
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
        style={{ backgroundImage: `url(${banner.imageUrl})` }}
      >
        <div className="promo-overlay"></div>

        <div className="promo-content">
          <span>Nova coleção</span>

          <h2>{banner.title || 'Peças selecionadas para elevar seu estilo'}</h2>

          <p>
            {banner.subtitle ||
              'Descubra produtos exclusivos com visual premium e atendimento direto pelo WhatsApp.'}
          </p>

          <Link className="btn btn-primary" to={banner.buttonLink || '/catalogo'}>
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
      current === 0 ? activePromos.length - 1 : current - 1
    );
  }

  function nextBanner() {
    setCurrentIndex((current) =>
      current === activePromos.length - 1 ? 0 : current + 1
    );
  }

  return (
    <section className="premium-promos-section">
      <div className="section-head">
        <span>
          <Sparkles size={15} />
          Ofertas especiais
        </span>

        <h2>Promoções em destaque</h2>

        <p>
          Veja campanhas, novidades e condições especiais selecionadas para você.
        </p>
      </div>

      <div
        className="premium-promo-slider"
        style={{ backgroundImage: `url(${banner.imageUrl})` }}
      >
        <div className="premium-promo-overlay"></div>

        <div className="premium-promo-content">
          <span>Promoção</span>

          <h3>{banner.title || 'Oferta especial'}</h3>

          <p>
            {banner.subtitle || 'Aproveite uma seleção especial da loja.'}
          </p>

          <Link className="btn btn-primary" to={banner.buttonLink || '/catalogo'}>
            {banner.buttonText || 'Ver produtos'}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="premium-promo-controls">
          <button onClick={previousBanner}>
            <ChevronLeft size={20} />
          </button>

          <div className="premium-promo-dots">
            {activePromos.map((item, index) => (
              <button
                key={item.id || index}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <button onClick={nextBanner}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}