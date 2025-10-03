import type { Product } from '../types/product';
interface QuoteData {
  customerName?: string;
  customerPhone?: string;
  items: Array<{ product: Product; quantity: number }>;
  totalUnits: number;
}

export const generateWhatsAppMessage = (data: QuoteData): string => {
  let message = `*¡Hola! Quisiera solicitar una cotización de MEG Computers!*

`;

  if (data.customerName) {
    message += `*Cliente:* ${data.customerName}
`;
  }
  if (data.customerPhone) {
    message += `*Teléfono:* ${data.customerPhone}
`;
  }
  message += `
*Detalle del pedido:*
`;

  data.items.forEach(item => {
    message += `-----------------------------------
`;
    message += `*Producto:* ${item.product.name}
`;
    message += `*SKU:* ${item.product.sku}
`;
    message += `*Cantidad:* ${item.quantity} unidades
`;
  });

  message += `-----------------------------------
`;
  message += `*Total de unidades:* ${data.totalUnits}

`;
  message += `_Este es un pedido de cotización, no una compra. Un representante se pondrá en contacto a la brevedad._`;

  return message;
};

export const openWhatsApp = (phoneNumber: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
