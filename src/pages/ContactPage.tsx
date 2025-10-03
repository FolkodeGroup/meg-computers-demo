import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí se podría agregar la lógica para enviar el formulario
    alert('Mensaje enviado (simulación). ¡Gracias por contactarnos!');
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="section-title">Contáctanos</h1>
        <p className="text-lg text-neutral/80 text-center mb-12 max-w-2xl mx-auto">
          ¿Tienes alguna pregunta o quieres realizar un pedido grande? Estamos aquí para ayudarte.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Formulario de Contacto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-dark/50 p-8 rounded-lg border border-neutral/20"
        >
          <h2 className="subsection-title">Enviar un Mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-neutral/90">Nombre</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-2 bg-dark/70 border border-neutral/30 rounded-lg focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-neutral/90">Email</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-2 bg-dark/70 border border-neutral/30 rounded-lg focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium text-neutral/90">Asunto</label>
              <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 bg-dark/70 border border-neutral/30 rounded-lg focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-neutral/90">Mensaje</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 bg-dark/70 border border-neutral/30 rounded-lg focus:border-primary focus:outline-none transition-colors"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-primary text-dark rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors glow-effect"
            >
              Enviar Mensaje
            </motion.button>
          </form>
        </motion.div>

        {/* Información y Mapa */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-10"
        >
          <div>
            <h2 className="subsection-title">Información de Contacto</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <FiMail className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                <a href="mailto:info@megcomputers.com" className="text-neutral hover:text-primary transition-colors break-all">
                  info@megcomputers.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                <span className="text-neutral">+54 9 11 2345-6789</span>
              </li>
              <li className="flex items-start">
                <FiMapPin className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <span className="text-neutral">Av. Siempre Viva 123, Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="subsection-title">Síguenos en Redes</h2>
            <div className="flex items-center space-x-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition-colors">
                <FiInstagram className="w-8 h-8" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition-colors">
                <FiFacebook className="w-8 h-8" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral hover:text-primary transition-colors">
                <FiTwitter className="w-8 h-8" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="subsection-title">Nuestra Ubicación</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-primary/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.01688818641!2d-58.3815704!3d-34.6037389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf0e586903%3A0x11e5340f5a30a58!2sObelisco!5e0!3m2!1ses!2sar!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de MEG Computers"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};