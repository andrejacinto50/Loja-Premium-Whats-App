import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <div className="site-background-glow"></div>

      <Header />

      <main className="site-main">
        {children}
      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
}