import { formatPrice } from './formatPrice';
import { getStoreSettings } from '../services/settingsService';

const WHATSAPP_NUMBER = '5548991087702';

function getWhatsappConfig() {
  return getStoreSettings();
}

function createWhatsappUrl(message) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    message
  )}`;
}

export function createProductWhatsappLink(
  product,
  options = {}
) {
  const storeConfig = getWhatsappConfig();

  const price =
    product.promoPrice || product.price;

  const lines = [
    storeConfig.defaultWhatsappText ||
      'Olá! Tenho interesse neste produto:',

    '',

    `Produto: ${product.name}`,

    `Preço: ${formatPrice(price)}`,

    options.size
      ? `Tamanho: ${options.size}`
      : null,

    options.color
      ? `Cor: ${options.color}`
      : null,

    `Quantidade: ${options.quantity || 1}`,

    '',

    `Link:`,
    window.location.href,

    '',

    'Gostaria de saber mais.'
  ].filter(Boolean);

  return createWhatsappUrl(
    lines.join('\n')
  );
}

export function createCatalogProductWhatsappLink(
  product
) {
  const price =
    product.promoPrice || product.price;

  const lines = [
    'Olá! Vi este produto no catálogo e tenho interesse:',

    '',

    `Produto: ${product.name}`,

    `Preço: ${formatPrice(price)}`,

    '',

    'Pode me passar mais informações?'
  ];

  return createWhatsappUrl(
    lines.join('\n')
  );
}

export function createQuickServiceWhatsappLink() {
  const lines = [
    'Olá! Vim pela loja online.',

    '',

    'Gostaria de um atendimento rápido.'
  ];

  return createWhatsappUrl(
    lines.join('\n')
  );
}

export function createSimpleWhatsappLink(
  text = 'Olá! Vim pelo site e gostaria de saber mais.'
) {
  return createWhatsappUrl(text);
}