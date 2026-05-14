import { MessageCircle } from 'lucide-react';
import { createSimpleWhatsappLink } from '../../utils/whatsapp';

export default function WhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={createSimpleWhatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <div className="whatsapp-pulse"></div>

      <div className="floating-whatsapp-icon">
        <MessageCircle size={22} />
      </div>

      <div className="floating-whatsapp-text">
        <strong>Atendimento rápido</strong>
        <span>Fale pelo WhatsApp</span>
      </div>
    </a>
  );
}