import { useEffect, useState } from 'react';

import {
  Truck,
  Headphones,
  BadgeCheck,
  ShieldCheck
} from 'lucide-react';

const items = [
  {
    icon: Truck,
    title: 'Entrega rápida',
    text: 'Receba seus produtos com praticidade e segurança.'
  },
  {
    icon: Headphones,
    title: 'Atendimento exclusivo',
    text: 'Tire dúvidas e finalize seu pedido direto pelo WhatsApp.'
  },
  {
    icon: BadgeCheck,
    title: 'Peças selecionadas',
    text: 'Produtos escolhidos para quem valoriza estilo e qualidade.'
  },
  {
    icon: ShieldCheck,
    title: 'Compra facilitada',
    text: 'Escolha tamanho, cor e quantidade em poucos cliques.'
  }
];

export default function Highlights() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 900);
    }

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section
      className="highlights"
      style={
        isMobile
          ? {
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '18px',
              padding: '0 18px 56px',
              width: '100%',
              maxWidth: '100%',
              overflow: 'hidden'
            }
          : undefined
      }
    >
      {items.map(({ icon: Icon, title, text }) => (
        <div
          className="highlight-card"
          key={title}
          style={
            isMobile
              ? {
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: '0',
                  padding: '24px',
                  borderRadius: '28px'
                }
              : undefined
          }
        >
          <div className="highlight-icon">
            <Icon size={22} />
          </div>

          <h3
            style={
              isMobile
                ? {
                    fontSize: '28px',
                    lineHeight: '1.08',
                    margin: '20px 0 12px',
                    whiteSpace: 'normal'
                  }
                : undefined
            }
          >
            {title}
          </h3>

          <p
            style={
              isMobile
                ? {
                    fontSize: '15px',
                    lineHeight: '1.65',
                    whiteSpace: 'normal'
                  }
                : undefined
            }
          >
            {text}
          </p>
        </div>
      ))}
    </section>
  );
}