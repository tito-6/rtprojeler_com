import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ image, onClose }) => {
  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative max-w-5xl w-full p-4" tabIndex="-1">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10"
          aria-label="Close Modal"
        >
          <FaTimes />
        </button>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="rounded-lg overflow-hidden"
        >
          <img
            src={image}
            alt="Enlarged content"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImageModal;
