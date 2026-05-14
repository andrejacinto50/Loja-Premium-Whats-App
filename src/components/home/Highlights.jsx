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
  return (
    <section className="highlights">
      {items.map(({ icon: Icon, title, text }) => (
        <div className="highlight-card" key={title}>
          <div className="highlight-icon">
            <Icon size={22} />
          </div>

          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </section>
  );
}