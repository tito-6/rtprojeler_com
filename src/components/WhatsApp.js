import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import { useTranslation } from 'next-i18next';

const WhatsAppButton = () => {
  const { t } = useTranslation('common'); // Load translations from common.json

  // Get the translated message
  const message = encodeURIComponent(t('whatsappMessage'));

  return (
    <a
      href={`https://wa.me/905010222000?text=${message}`} // Use the translated message
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
      aria-label={t('whatsappMessage')}
    >
      <FaWhatsapp size={24} /> {/* WhatsApp icon */}
    </a>
  );
};

export default WhatsAppButton;
