import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaTh, FaList, FaTimes } from "react-icons/fa";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTranslation } from "next-i18next";

// Arabian Ranches projesine ait tüm görseller
const arabianRanchesImages = [
  { src: "/arabian-ranches/images/arabianranches-01.webp" },
  { src: "/arabian-ranches/images/arabianranches-02.webp" },
  { src: "/arabian-ranches/images/arabianranches-03.webp" },
  { src: "/arabian-ranches/images/arabianranches-04.webp" },
  { src: "/arabian-ranches/images/arabianranches-05.webp" },
  { src: "/arabian-ranches/images/arabianranches-06.webp" },
  { src: "/arabian-ranches/images/arabianranches-07.webp" },
  { src: "/arabian-ranches/images/arabianranches-08.webp" },
  { src: "/arabian-ranches/images/arabianranches-09.webp" },
  { src: "/arabian-ranches/images/arabianranches-10.webp" },
  { src: "/arabian-ranches/images/arabianranches-11.webp" },
  { src: "/arabian-ranches/images/arabianranches-12.webp" },
];

// Slider ayarları
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ArabianRanchesRenderImages = () => {
  const { t } = useTranslation("common");
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [isGridView, setIsGridView] = useState(false); // Izgara ve kaydırıcı görünümü arasında geçiş

  const handleExpandImage = (index) => {
    setExpandedImageIndex(index);
  };

  const handleCloseImage = () => {
    setExpandedImageIndex(null);
  };

  const handleNextImage = () => {
    setExpandedImageIndex((prevIndex) => (prevIndex + 1) % arabianRanchesImages.length);
  };

  const handlePrevImage = () => {
    setExpandedImageIndex(
      (prevIndex) => (prevIndex - 1 + arabianRanchesImages.length) % arabianRanchesImages.length
    );
  };

  const toggleGridView = () => {
    setIsGridView(!isGridView);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      } else if (event.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    if (expandedImageIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedImageIndex]);

  return (
    <div>
      {/* Genişletilmiş Görüntü Modali */}
      {expandedImageIndex !== null && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center p-4">
          <button
            onClick={handleCloseImage}
            className="absolute top-4 right-4 text-red-500 text-3xl z-10 hover:text-red-700 transition duration-300"
          >
            <FaTimes />
          </button>
          <div className="relative w-full max-w-4xl overflow-hidden p-4 flex justify-center items-center">
            <button
              onClick={handlePrevImage}
              className="absolute left-4 text-white bg-gray-500 px-2 py-2 rounded-full hover:bg-gray-700 transition duration-300 z-50"
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 text-white bg-gray-500 px-2 py-2 rounded-full hover:bg-gray-700 transition duration-300 z-50"
            >
              <FaArrowRight size={24} />
            </button>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={arabianRanchesImages[expandedImageIndex].src}
                  alt={t("arabianRanchesRenderImages.expandedViewAlt")}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>

          {/* Genişletilmiş Görünüm Altındaki Küçük Görseller */}
          <div className="w-full mt-4 flex justify-center overflow-x-auto">
            {arabianRanchesImages.map((img, index) => (
              <div
                key={index}
                className={`cursor-pointer m-2 p-1 rounded-lg shadow-lg transition-transform ${
                  index === expandedImageIndex ? "border-2 border-yellow-500" : "border"
                }`}
                onClick={() => setExpandedImageIndex(index)}
              >
                <img
                  src={img.src}
                  alt={`${t("arabianRanchesRenderImages.thumbnailAlt")} ${index + 1}`}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex justify-center mb-4">
        <button
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={toggleGridView}
        >
          {isGridView ? (
            <>
              <FaList className="mr-2" style={{ color: "#f3b64c" }} /> {t("arabianRanchesRenderImages.sliderView")}
            </>
          ) : (
            <>
              <FaTh className="mr-2" style={{ color: "#f3b64c" }} /> {t("arabianRanchesRenderImages.gridView")}
            </>
          )}
        </button>
      </div>

      {/* Dış Mekan Bölümü */}
      <section className="text-center mb-12">
        <motion.h2
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {t("arabianRanchesRenderImages.galleryTitle")}
        </motion.h2>

        {isGridView ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {arabianRanchesImages.map((img, index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                onClick={() => handleExpandImage(index)}
              >
                <img
                  src={img.src}
                  alt={`${t("arabianRanchesRenderImages.imageAlt")} ${index + 1}`}
                  className="rounded-lg shadow-lg object-cover w-full h-64"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="mt-8">
            {arabianRanchesImages.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4 cursor-pointer"
                onClick={() => handleExpandImage(index)}
              >
                <img
                  src={img.src}
                  alt={`${t("arabianRanchesRenderImages.imageAlt")} ${index + 1}`}
                  className="rounded-lg shadow-lg object-cover w-full h-64 transition duration-500 hover:shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </Slider>
        )}
      </section>
    </div>
  );
};

export default ArabianRanchesRenderImages;
