import { MessageCircle } from 'lucide-react';

import { createSimpleWhatsappLink } from '../../utils/whatsapp';
import useIsMobile from '../../hooks/useIsMobile';

export default function WhatsAppButton() {
  const isMobile = useIsMobile();

  return (
    <a
      className="floating-whatsapp"
      href={createSimpleWhatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      style={
        isMobile
          ? {
              right: '14px',
              bottom: '14px',
              padding: '10px',
              borderRadius: '999px',
              gap: '0',
              zIndex: 999
            }
          : undefined
      }
    >
      <div className="whatsapp-pulse"></div>

      <div
        className="floating-whatsapp-icon"
        style={
          isMobile
            ? {
                width: '54px',
                height: '54px',
                borderRadius: '50%'
              }
            : undefined
        }
      >
        <MessageCircle size={22} />
      </div>

      {!isMobile && (
        <div className="floating-whatsapp-text">
          <strong>Atendimento rápido</strong>
          <span>Fale pelo WhatsApp</span>
        </div>
      )}
    </a>
  );
}