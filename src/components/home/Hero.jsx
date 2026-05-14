import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from 'lucide-react';

export default function Hero({ banner }) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="eyebrow">
          <Sparkles size={16} />
          Nova coleção disponível
        </span>

        <h1>
          {banner?.title || 'Estilo premium para comprar com facilidade'}
        </h1>

        <p>
          {banner?.subtitle ||
            'Peças selecionadas, atendimento exclusivo e pedido rápido direto pelo WhatsApp.'}
        </p>

        <div className="hero-actions">
          <Link
            className="btn btn-primary"
            to={banner?.buttonLink || '/catalogo'}
          >
            {banner?.buttonText || 'Ver coleção'}
            <ArrowRight size={18} />
          </Link>

          <Link className="btn btn-secondary" to="/catalogo">
            Explorar produtos
          </Link>
        </div>

        <div className="hero-benefits">
          <div>
            <ShieldCheck size={18} />
            <span>Compra segura</span>
          </div>

          <div>
            <Truck size={18} />
            <span>Entrega facilitada</span>
          </div>

          <div>
            <Star size={18} />
            <span>Peças selecionadas</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-wrapper">
          <img
            src={banner?.imageUrl}
            alt={banner?.title || 'Coleção premium da loja'}
          />
        </div>

        <div className="hero-floating-card">
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