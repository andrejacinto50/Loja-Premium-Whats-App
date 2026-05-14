import {
  MessageCircle,
  MapPin,
  Clock3,
  ArrowUpRight
} from 'lucide-react';

import Layout from '../../components/layout/Layout';
import { storeConfig } from '../../data/storeConfig';

export default function Contact() {
  const storeName =
    storeConfig?.storeName ||
    storeConfig?.name ||
    'Monarch Store';

  return (
    <Layout>
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span>Contato</span>

          <h1>
            Estamos disponíveis para ajudar você a escolher melhor.
          </h1>

          <p>
            Tire dúvidas sobre produtos, tamanhos, pedidos e atendimento direto
            com a loja pelo WhatsApp.
          </p>
        </div>
      </section>

      <section className="contact-grid">
        <a
          href={`https://wa.me/${storeConfig?.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="contact-card featured"
        >
          <div className="contact-icon">
            <MessageCircle size={24} />
          </div>

          <span>Atendimento direto</span>

          <h3>Fale com a loja pelo WhatsApp</h3>

          <p>
            Atendimento rápido para dúvidas, pedidos e informações sobre os
            produtos disponíveis.
          </p>

          <div className="contact-link">
            Conversar agora
            <ArrowUpRight size={16} />
          </div>
        </a>

        <div className="contact-card">
          <div className="contact-icon">
            <MapPin size={24} />
          </div>

          <span>Localização</span>

          <h3>{storeConfig?.address}</h3>

          <p>
            Atendimento online com suporte próximo para tornar sua experiência
            mais prática.
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">
            <Clock3 size={24} />
          </div>

          <span>Horário</span>

          <h3>Atendimento disponível</h3>

          <p>{storeConfig?.openingHours}</p>
        </div>
      </section>

      <section className="contact-showcase">
        <div className="contact-showcase-image">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop"
            alt="Coleção premium"
          />
        </div>

        <div className="contact-showcase-content">
          <span>Experiência premium</span>

          <h2>
            Atendimento próximo para ajudar você em cada detalhe.
          </h2>

          <p>
            Queremos que sua experiência seja simples desde a escolha do produto
            até o atendimento final. Por isso, deixamos o contato direto para
            facilitar tudo.
          </p>

          <a
            href={`https://wa.me/${storeConfig?.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>

      <section className="contact-final">
        <span>{storeName}</span>

        <h2>
          Atendimento pensado para oferecer uma experiência mais próxima,
          elegante e prática.
        </h2>
      </section>
    </Layout>
  );
}