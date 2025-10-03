import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheck } from 'react-icons/fi';
import { copyToClipboard } from '../utils/clipboard';
import { openWhatsApp, generateWhatsAppMessage } from '../utils/whatsapp';
import type { Product } from '../types/product';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    productId: string;
    quantity: number;
    product: Product;
  }>;
  totalItems: number;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalItems
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [copied, setCopied] = useState(false);

  const quoteData = {
    customerName: customerName || undefined,
    customerPhone: customerPhone || undefined,
    items: cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity
    })),
    totalUnits: totalItems
  };

  const whatsappMessage = generateWhatsAppMessage(quoteData);
  const WHATSAPP_NUMBER = '5491123456789'; // Número de ejemplo

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(whatsappMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSendViaWhatsApp = () => {
    openWhatsApp(WHATSAPP_NUMBER, whatsappMessage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-dark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-primary/30"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold neon-text">Cotización - MEG Computers</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-dark/50 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-neutral/80 mb-4">
                Complete sus datos para generar la cotización:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="customerName" className="block mb-2 font-medium">
                    Nombre del cliente
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ingrese su nombre"
                    className="w-full px-4 py-2 bg-dark/50 border border-neutral/30 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className="block mb-2 font-medium">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+54 9..."
                    className="w-full px-4 py-2 bg-dark/50 border border-neutral/30 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-dark/30 p-4 rounded-lg mb-6">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {whatsappMessage}
              </pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendViaWhatsApp}
                className="flex-1 py-3 bg-primary text-dark rounded-lg font-bold hover:bg-primary/90 transition-colors glow-effect flex items-center justify-center"
              >
                <span className="mr-2">Enviar por WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyToClipboard}
                className="flex-1 py-3 bg-accent text-dark rounded-lg font-bold hover:bg-accent/90 transition-colors flex items-center justify-center"
              >
                {copied ? (
                  <>
                    <FiCheck className="mr-2" /> Copiado!
                  </>
                ) : (
                  <>
                    <FiCopy className="mr-2" /> Copiar mensaje
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
