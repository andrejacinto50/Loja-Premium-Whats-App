import { Link } from 'react-router-dom';

import {
  Sparkles,
  ShieldCheck,
  Truck,
  MessageCircle,
  ArrowUpRight,
  Heart,
  Gem,
  Star,
  BadgeCheck
} from 'lucide-react';

import Layout from '../../components/layout/Layout';
import { storeConfig } from '../../data/storeConfig';

export default function About() {
  const storeName =
    storeConfig?.storeName ||
    storeConfig?.name ||
    'Monarch Store';

  return (
    <Layout>
      <section className="about-hero about-hero-premium">
        <div className="about-hero-content">
          <span className="about-kicker">
            <Sparkles size={16} />
            Sobre a {storeName}
          </span>

          <h1>
            Uma loja pensada para quem valoriza estilo, presença e uma compra mais elegante.
          </h1>

          <p>
            A {storeName} nasceu para transformar a escolha de cada peça em uma experiência
            mais simples, bonita e confiável. Aqui, cada produto é apresentado com cuidado,
            com atendimento direto e uma curadoria feita para quem gosta de escolher bem.
          </p>

          <div className="about-hero-actions">
            <Link to="/catalogo" className="btn btn-primary">
              Ver coleção
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/contato" className="btn btn-secondary">
              <MessageCircle size={16} />
              Falar com a loja
            </Link>
          </div>

          <div className="about-trust-row">
            <div>
              <strong>Curadoria</strong>
              <span>Peças selecionadas</span>
            </div>

            <div>
              <strong>Atendimento</strong>
              <span>Direto pelo WhatsApp</span>
            </div>

            <div>
              <strong>Experiência</strong>
              <span>Compra simples e premium</span>
            </div>
          </div>
        </div>

        <div className="about-hero-visual about-visual-premium">
          <div className="about-image-frame">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop"
              alt={`Ambiente premium da ${storeName}`}
              loading="lazy"
            />

            <div className="about-image-shade"></div>
          </div>

          <div className="about-floating-card about-floating-premium">
            <div className="about-floating-icon">
              <Gem size={18} />
            </div>

            <div>
              <span>Curadoria premium</span>
              <strong>Peças escolhidas com atenção aos detalhes.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-values-section">
        <div className="section-head">
          <span>Nossa essência</span>

          <h2>Mais do que produtos, uma experiência de compra com mais confiança.</h2>

          <p>
            Cada detalhe da loja foi pensado para facilitar sua escolha, valorizar os produtos
            e deixar o atendimento mais rápido, direto e seguro.
          </p>
        </div>

        <div className="about-grid about-premium-grid">
          <div className="about-card">
            <Heart size={26} />

            <h3>Escolha com propósito</h3>

            <p>
              Produtos selecionados para combinar estilo, qualidade e versatilidade no dia a dia.
            </p>
          </div>

          <div className="about-card featured-about-card">
            <ShieldCheck size={26} />

            <h3>Qualidade nos detalhes</h3>

            <p>
              Cada peça é apresentada com cuidado para transmitir confiança antes mesmo do primeiro contato.
            </p>
          </div>

          <div className="about-card">
            <MessageCircle size={26} />

            <h3>Atendimento direto</h3>

            <p>
              Você escolhe, tira dúvidas e finaliza seu pedido direto pelo WhatsApp, sem complicação.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story about-story-premium">
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop"
            alt="Coleção fashion premium"
            loading="lazy"
          />
        </div>

        <div className="about-story-content">
          <span>Estilo e experiência</span>

          <h2>Do primeiro olhar ao pedido finalizado.</h2>

          <p>
            A experiência começa quando você encontra uma peça que combina com seu estilo.
            Por isso, a loja foi estruturada para mostrar os produtos com clareza, destacar
            os detalhes importantes e facilitar o contato direto na hora de comprar.
          </p>

          <div className="about-mini-list about-premium-list">
            <div>
              <strong>01</strong>
              <p>Produtos organizados por categoria para você encontrar tudo com facilidade.</p>
            </div>

            <div>
              <strong>02</strong>
              <p>Informações importantes apresentadas de forma clara, bonita e objetiva.</p>
            </div>

            <div>
              <strong>03</strong>
              <p>Pedido enviado direto para o WhatsApp com praticidade e atendimento próximo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-experience-strip">
        <div>
          <BadgeCheck size={20} />
          <span>Compra prática</span>
        </div>

        <div>
          <Star size={20} />
          <span>Visual premium</span>
        </div>

        <div>
          <Truck size={20} />
          <span>Atendimento ágil</span>
        </div>

        <div>
          <ShieldCheck size={20} />
          <span>Mais confiança</span>
        </div>
      </section>

      <section className="about-banner about-banner-premium">
        <div className="about-banner-overlay"></div>

        <div className="about-banner-content">
          <span>Nova coleção</span>

          <h2>
            Encontre peças que combinam com seu estilo e elevam sua presença.
          </h2>

          <p>
            Explore a seleção da loja e fale direto pelo WhatsApp para tirar dúvidas ou finalizar seu pedido.
          </p>

          <Link to="/catalogo" className="btn btn-primary">
            Explorar coleção
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}