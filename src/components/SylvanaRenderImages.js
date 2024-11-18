import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTh,
  FaList,
  FaTree,
  FaBed,
  FaBuilding,
  FaMountain,
  FaBath,
  FaPaintBrush,
  FaTimes,
} from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTranslation } from "next-i18next";

// Exterior and Interior image arrays
const exteriors = [
  "/sylvana-istanbul/images/exteriors/1_exteriorssylvana.webp",
  "/sylvana-istanbul/images/exteriors/2_exteriorssylvana.webp",
  "/sylvana-istanbul/images/exteriors/3_exteriorssylvana.webp",
  // Additional images...
];

const interiors = [
  "/sylvana-istanbul/images/interiors/1interiorssylvana.webp",
  "/sylvana-istanbul/images/interiors/2interiorssylvana.webp",
  "/sylvana-istanbul/images/interiors/3interiorssylvana.webp",
  // Additional images...
];

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const SylvanaRenderImages = () => {
  const { t } = useTranslation("common");

  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  const handleExpandImage = (imgArray, index) => {
    setCurrentImages(imgArray);
    setExpandedImageIndex(index);
  };

  const handleCloseImage = () => setExpandedImageIndex(null);
  const handleNextImage = () => setExpandedImageIndex((prev) => (prev + 1) % currentImages.length);
  const handlePrevImage = () => setExpandedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  const toggleGridView = () => setIsGridView(!isGridView);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleCloseImage();
      if (event.key === "ArrowRight") handleNextImage();
      if (event.key === "ArrowLeft") handlePrevImage();
    };

    if (expandedImageIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedImageIndex]);

  return (
    <div>
      {/* Expanded Image Modal */}
      {expandedImageIndex !== null && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center p-4">
          <button
            onClick={handleCloseImage}
            className="absolute top-4 right-4 text-red-500 text-3xl z-10 hover:text-red-700 transition duration-300"
          >
            <FaTimes />
          </button>
          <div className="relative w-full max-w-4xl overflow-hidden p-4 flex justify-center items-center">
            <button onClick={handlePrevImage} className="absolute left-4 text-white bg-gray-500 px-2 py-2 rounded-full hover:bg-gray-700 transition duration-300 z-50">
              <FaArrowLeft size={24} />
            </button>
            <button onClick={handleNextImage} className="absolute right-4 text-white bg-gray-500 px-2 py-2 rounded-full hover:bg-gray-700 transition duration-300 z-50">
              <FaArrowRight size={24} />
            </button>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={currentImages[expandedImageIndex]}
                  alt={t("sylvanaRenderImages.expandedViewAlt")}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </motion.div>
      )}

      {/* Toggle Grid and Slider View */}
      <div className="flex justify-center mb-4">
        <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md" onClick={toggleGridView}>
          {isGridView ? (
            <>
              <FaList className="mr-2" /> {t("sylvanaRenderImages.sliderView")}
            </>
          ) : (
            <>
              <FaTh className="mr-2" /> {t("sylvanaRenderImages.gridView")}
            </>
          )}
        </button>
      </div>

      {/* Exterior Section */}
      <section className="text-center mb-12">
        <motion.h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {t("sylvanaRenderImages.exteriorTitle")}
        </motion.h2>
        <motion.p className="text-lg mb-8 text-gray-600" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {t("sylvanaRenderImages.exteriorDescription")}
        </motion.p>

        <div className="flex justify-center space-x-8 mb-8">
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <FaBuilding style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.modernDesign")}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <FaTree style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.openSpaces")}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <FaMountain style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.scenicView")}</p>
          </motion.div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {exteriors.map((img, index) => (
              <motion.div key={index} className="cursor-pointer" onClick={() => handleExpandImage(exteriors, index)}>
                <img src={img} alt={`${t("sylvanaRenderImages.exteriorTitle")} ${index + 1}`} className="rounded-lg shadow-lg object-cover w-full h-64" loading="lazy" />
              </motion.div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="mt-8">
            {exteriors.map((img, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-4 cursor-pointer" onClick={() => handleExpandImage(exteriors, index)}>
                <img src={img} alt={`${t("sylvanaRenderImages.exteriorTitle")} ${index + 1}`} className="rounded-lg shadow-lg object-cover w-full h-64 transition duration-500 hover:shadow-2xl" loading="lazy" />
              </motion.div>
            ))}
          </Slider>
        )}
      </section>

      {/* Interior Section */}
      <section className="text-center mb-12">
        <motion.h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {t("sylvanaRenderImages.interiorTitle")}
        </motion.h2>
        <motion.p className="text-lg mb-8 text-gray-600" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {t("sylvanaRenderImages.interiorDescription")}
        </motion.p>

        <div className="flex justify-center space-x-8 mb-8">
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <FaBed style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.mainBedrooms")}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <MdKitchen style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.closedKitchen")}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <FaBath style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.luxuryBathrooms")}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-4xl text-gray-500 flex flex-col items-center">
            <FaPaintBrush style={{ color: "#f1b653" }} />
            <p className="text-sm mt-2 text-center">{t("sylvanaRenderImages.elegantFinishes")}</p>
          </motion.div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interiors.map((img, index) => (
              <motion.div key={index} className="cursor-pointer" onClick={() => handleExpandImage(interiors, index)}>
                <img src={img} alt={`${t("sylvanaRenderImages.interiorTitle")} ${index + 1}`} className="rounded-lg shadow-lg object-cover w-full h-64" loading="lazy" />
              </motion.div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="mt-8">
            {interiors.map((img, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-4 cursor-pointer" onClick={() => handleExpandImage(interiors, index)}>
                <img src={img} alt={`${t("sylvanaRenderImages.interiorTitle")} ${index + 1}`} className="rounded-lg shadow-lg object-cover w-full h-64 transition duration-500 hover:shadow-2xl" loading="lazy" />
              </motion.div>
            ))}
          </Slider>
        )}
      </section>
    </div>
  );
};

export default SylvanaRenderImages;
