import {
  MessageCircle,
  MapPin,
  Clock3,
  ArrowUpRight
} from 'lucide-react';

import Layout from '../../components/layout/Layout';
import { storeConfig } from '../../data/storeConfig';
import useIsMobile from '../../hooks/useIsMobile';

export default function Contact() {
  const isMobile = useIsMobile();

  const storeName =
    storeConfig?.storeName ||
    storeConfig?.name ||
    'Monarch Store';

  return (
    <Layout>
      <section
        className="contact-hero"
        style={
          isMobile
            ? {
                padding: '44px 18px 40px'
              }
            : undefined
        }
      >
        <div className="contact-hero-content">
          <span>Contato</span>

          <h1
            style={
              isMobile
                ? {
                    fontSize: 'clamp(40px, 13vw, 58px)',
                    lineHeight: '.92',
                    letterSpacing: '-0.075em'
                  }
                : undefined
            }
          >
            Estamos disponíveis para ajudar você a escolher melhor.
          </h1>

          <p
            style={
              isMobile
                ? {
                    fontSize: '16px',
                    lineHeight: '1.7'
                  }
                : undefined
            }
          >
            Tire dúvidas sobre produtos, tamanhos, pedidos e atendimento direto
            com a loja pelo WhatsApp.
          </p>
        </div>
      </section>

      <section
        className="contact-grid"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '18px',
                padding: '0 18px 56px'
              }
            : undefined
        }
      >
        <a
          href={`https://wa.me/${storeConfig?.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="contact-card featured"
          style={
            isMobile
              ? {
                  padding: '28px',
                  borderRadius: '30px',
                  minHeight: 'auto'
                }
              : undefined
          }
        >
          <div className="contact-icon">
            <MessageCircle size={24} />
          </div>

          <span>Atendimento direto</span>

          <h3
            style={
              isMobile
                ? {
                    fontSize: '32px',
                    lineHeight: '.98'
                  }
                : undefined
            }
          >
            Fale com a loja pelo WhatsApp
          </h3>

          <p
            style={
              isMobile
                ? {
                    fontSize: '15px',
                    lineHeight: '1.7'
                  }
                : undefined
            }
          >
            Atendimento rápido para dúvidas, pedidos e informações sobre os
            produtos disponíveis.
          </p>

          <div className="contact-link">
            Conversar agora
            <ArrowUpRight size={16} />
          </div>
        </a>

        <div
          className="contact-card"
          style={
            isMobile
              ? {
                  padding: '28px',
                  borderRadius: '30px',
                  minHeight: 'auto'
                }
              : undefined
          }
        >
          <div className="contact-icon">
            <MapPin size={24} />
          </div>

          <span>Localização</span>

          <h3
            style={
              isMobile
                ? {
                    fontSize: '30px',
                    lineHeight: '.98'
                  }
                : undefined
            }
          >
            {storeConfig?.address}
          </h3>

          <p
            style={
              isMobile
                ? {
                    fontSize: '15px',
                    lineHeight: '1.7'
                  }
                : undefined
            }
          >
            Atendimento online com suporte próximo para tornar sua experiência
            mais prática.
          </p>
        </div>

        <div
          className="contact-card"
          style={
            isMobile
              ? {
                  padding: '28px',
                  borderRadius: '30px',
                  minHeight: 'auto'
                }
              : undefined
          }
        >
          <div className="contact-icon">
            <Clock3 size={24} />
          </div>

          <span>Horário</span>

          <h3
            style={
              isMobile
                ? {
                    fontSize: '30px',
                    lineHeight: '.98'
                  }
                : undefined
            }
          >
            Atendimento disponível
          </h3>

          <p
            style={
              isMobile
                ? {
                    fontSize: '15px',
                    lineHeight: '1.7'
                  }
                : undefined
            }
          >
            {storeConfig?.openingHours}
          </p>
        </div>
      </section>

      <section
        className="contact-showcase"
        style={
          isMobile
            ? {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '34px',
                padding: '0 18px 58px'
              }
            : undefined
        }
      >
        <div
          className="contact-showcase-image"
          style={
            isMobile
              ? {
                  borderRadius: '30px',
                  overflow: 'hidden'
                }
              : undefined
          }
        >
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop"
            alt="Coleção premium"
            style={
              isMobile
                ? {
                    width: '100%',
                    height: '390px',
                    objectFit: 'cover'
                  }
                : undefined
            }
          />
        </div>

        <div className="contact-showcase-content">
          <span>Experiência premium</span>

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
            Atendimento próximo para ajudar você em cada detalhe.
          </h2>

          <p
            style={
              isMobile
                ? {
                    fontSize: '16px',
                    lineHeight: '1.7'
                  }
                : undefined
            }
          >
            Queremos que sua experiência seja simples desde a escolha do produto
            até o atendimento final. Por isso, deixamos o contato direto para
            facilitar tudo.
          </p>

          <a
            href={`https://wa.me/${storeConfig?.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={
              isMobile
                ? {
                    width: '100%',
                    minHeight: '56px'
                  }
                : undefined
            }
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>

      <section
        className="contact-final"
        style={
          isMobile
            ? {
                margin: '0 18px 58px',
                padding: '34px 24px',
                borderRadius: '30px'
              }
            : undefined
        }
      >
        <span>{storeName}</span>

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
          Atendimento pensado para oferecer uma experiência mais próxima,
          elegante e prática.
        </h2>
      </section>
    </Layout>
  );
}