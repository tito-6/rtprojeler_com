import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon
import { useTranslation } from "next-i18next";

const WhatsAppButton = () => {
  const { t } = useTranslation("common"); // Load translations from common.json

  // Get the translated message
  const message = encodeURIComponent(t("whatsappMessage"));

  return (
    <a
      href={`https://wa.me/905010222000?text=${message}`} // Use the translated message
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center z-50" // Ensure a high z-index
      aria-label={t("whatsappMessage")}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Extra shadow for visibility
      }}
    >
      <FaWhatsapp size={24} className="animate-bounce" /> {/* WhatsApp icon with animation */}
    </a>
  );
};

export default WhatsAppButton;
