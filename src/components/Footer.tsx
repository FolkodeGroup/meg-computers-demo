import React from 'react';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark/95 backdrop-blur-md border-t border-primary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/assets/logo-footer.png" alt="MEG Computers" className="w-40 mb-4 mx-auto md:mx-0" />
            <div className="flex space-x-5 justify-center md:justify-start">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral/80 hover:text-primary transition-colors">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral/80 hover:text-primary transition-colors">
                <FiFacebook className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral/80 hover:text-primary transition-colors">
                <FiTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 neon-text">Contacto</h3>
            <ul className="space-y-3 text-neutral/80">
              <li>
                <a href="tel:+5491123456789" className="hover:text-primary transition-colors">📞 +54 9 11 2345-6789</a>
              </li>
              <li>
                <a href="mailto:info@megcomputers.com" className="hover:text-primary transition-colors">✉️ info@megcomputers.com</a>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <span className="mt-1 mr-2">📍</span>
                <span>Av. Siempre Viva 123, Buenos Aires</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 neon-text">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos" className="text-neutral/80 hover:text-primary transition-colors">Productos</Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-neutral/80 hover:text-primary transition-colors">Nosotros</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-neutral/80 hover:text-primary transition-colors">Contacto</Link>
              </li>
              <li>
                <Link to="/carrito" className="text-neutral/80 hover:text-primary transition-colors">Mi Pedido</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral/20 mt-8 pt-6 text-center text-neutral/60">
          <p>&copy; {new Date().getFullYear()} MEG Computers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
