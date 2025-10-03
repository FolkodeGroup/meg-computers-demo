import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  isVisible
}) => {
  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg ${bgColor} text-black shadow-lg`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
