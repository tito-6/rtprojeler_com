// components/AfraLocation.js


import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTh, FaList, FaTree, FaBed, FaBuilding, FaMountain, FaBath, FaPaintBrush, FaTimes, FaClock, FaPlane } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";


// Dynamically import react-slick Slider with SSR disabled to reduce initial bundle size
const Slider = dynamic(() => import("react-slick"), { ssr: false });


// Import slick-carousel CSS dynamically to prevent render-blocking
const SlickCarouselStyles = () => (
  <>
    <link
      rel="stylesheet"
      type="text/css"
      charSet="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
  </>
);


const AfraLocation = () => {
  const { t } = useTranslation("common");


  // Image Arrays with optimized formats (preferably WebP) and predefined dimensions
  const afraInteriors = useMemo(
    () => [
      { src: "/afra-park/images/interiors/Interiors1.webp", width: 800, height: 600 },
      { src: "/afra-park/images/interiors/Interiors2.webp", width: 800, height: 600 },
      { src: "/afra-park/images/interiors/Interiors3.webp", width: 800, height: 600 },
      { src: "/afra-park/images/interiors/Interiors4.webp", width: 800, height: 600 },
    ],
    []
  );


  const afraExteriors = useMemo(
    () => [
      { src: "/afra-park/images/exteriors/Exteriors1.webp", width: 800, height: 600 },
      { src: "/afra-park/images/exteriors/Exteriors2.webp", width: 800, height: 600 },
      { src: "/afra-park/images/exteriors/Exteriors3.webp", width: 800, height: 600 },
      { src: "/afra-park/images/exteriors/Exteriors4.webp", width: 800, height: 600 },
      { src: "/afra-park/images/exteriors/Exteriors5.webp", width: 800, height: 600 },
    ],
    []
  );


  // Slider settings with performance optimizations
  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
      arrows: true,
      prevArrow: <FaArrowLeft aria-label="Previous Slide" />,
      nextArrow: <FaArrowRight aria-label="Next Slide" />,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
      // Accessibility settings
      accessibility: true,
      // Optimize performance by enabling lazy loading
      lazyLoad: "ondemand",
    }),
    []
  );


  // State management for expanded image modal
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [isGridView, setIsGridView] = useState(false);


  // Handler to expand image
  const handleExpandImage = useCallback((imgArray, index) => {
    setCurrentImages(imgArray);
    setExpandedImageIndex(index);
  }, []);


  // Handler to close expanded image
  const handleCloseImage = useCallback(() => {
    setExpandedImageIndex(null);
  }, []);


  // Handlers to navigate images
  const handleNextImage = useCallback(() => {
    setExpandedImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  }, [currentImages.length]);


  const handlePrevImage = useCallback(() => {
    setExpandedImageIndex((prevIndex) => (prevIndex - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);


  // Toggle between grid and slider view
  const toggleGridView = useCallback(() => {
    setIsGridView((prev) => !prev);
  }, []);


  // Keyboard event listeners for accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (expandedImageIndex !== null) {
        if (event.key === "Escape") handleCloseImage();
        if (event.key === "ArrowRight") handleNextImage();
        if (event.key === "ArrowLeft") handlePrevImage();
      }
    };


    if (expandedImageIndex !== null) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }


    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [expandedImageIndex, handleCloseImage, handleNextImage, handlePrevImage]);


  return (
    <div>
      {/* Include slick-carousel CSS dynamically */}
      <SlickCarouselStyles />


      {/* Expanded Image Modal */}
      <AnimatePresence>
        {expandedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="expanded-image-title"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseImage}
              className="absolute top-4 right-4 text-red-500 text-3xl z-10 hover:text-red-700 transition duration-300"
              aria-label="Close Expanded Image"
            >
              <FaTimes />
            </button>


            {/* Image Container */}
            <div className="relative w-full max-w-4xl overflow-hidden p-4 flex justify-center items-center">
              {/* Previous Image Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 text-white bg-gray-500 px-2 py-2 rounded-full hover:bg-gray-700 transition duration-300 z-50"
                aria-label="Previous Image"
              >
                <FaArrowLeft size={24} />
              </button>


              {/* Next Image Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 text-white bg-gray-500 px-2 py-2 rounded-full hover:bg-gray-700 transition duration-300 z-50"
                aria-label="Next Image"
              >
                <FaArrowRight size={24} />
              </button>


              {/* Zoom and Pan Component */}
              <TransformWrapper
                defaultScale={1}
                defaultPositionX={0}
                defaultPositionY={0}
                wheel={{ step: 0.2 }}
              >
                <TransformComponent>
                  <Image
                    src={currentImages[expandedImageIndex].src}
                    alt={t("afraRenderImages.expandedViewAlt")}
                    width={800}
                    height={600}
                    layout="responsive"
                    objectFit="contain"
                    className="rounded-lg shadow-lg"
                    priority // Load immediately for expanded view
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>


            {/* Thumbnails Below Expanded Image */}
            <div className="w-full mt-4 flex justify-center overflow-x-auto">
              {currentImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setExpandedImageIndex(index)}
                  className={`cursor-pointer m-2 p-1 rounded-lg shadow-lg transition-transform ${
                    index === expandedImageIndex ? "border-2 border-yellow-500" : "border"
                  } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  aria-label={`View Image ${index + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={`${t("afraRenderImages.thumbnailAlt")} ${index + 1}`}
                    width={96}
                    height={96}
                    objectFit="cover"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Toggle Grid and Slider View Button */}
      <div className="flex justify-center mb-4">
        <button
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onClick={toggleGridView}
          aria-pressed={isGridView}
          aria-label={isGridView ? t("afraRenderImages.sliderView") : t("afraRenderImages.gridView")}
        >
          {isGridView ? (
            <>
              <FaList className="mr-2" style={{ color: "#f3b64c" }} aria-hidden="true" />
              {t("afraRenderImages.sliderView")}
            </>
          ) : (
            <>
              <FaTh className="mr-2" style={{ color: "#f3b64c" }} aria-hidden="true" />
              {t("afraRenderImages.gridView")}
            </>
          )}
        </button>
      </div>


      {/* Exterior Section */}
      <section className="text-center mb-12" aria-labelledby="exterior-section-title">
        <motion.h2
          id="exterior-section-title"
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {t("afraRenderImages.exteriorTitle")}
        </motion.h2>


        <motion.p
          className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t("afraRenderImages.exteriorDescription")}
        </motion.p>


        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <FaBuilding style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.modernDesign")}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <FaTree style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.openSpaces")}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <FaMountain style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.scenicView")}</p>
          </motion.div>
        </div>


        {/* Exterior Images: Grid or Slider View */}
        {isGridView ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {afraExteriors.map((img, index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                onClick={() => handleExpandImage(afraExteriors, index)}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={img.src}
                  alt={`${t("afraRenderImages.exteriorTitle")} ${index + 1}`}
                  width={400}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="mt-8">
            {afraExteriors.map((img, index) => (
              <motion.div
                key={index}
                className="p-2"
                onClick={() => handleExpandImage(afraExteriors, index)}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={img.src}
                  alt={`${t("afraRenderImages.exteriorTitle")} ${index + 1}`}
                  width={400}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </Slider>
        )}
      </section>


      {/* Interior Section */}
      <section className="text-center mb-12" aria-labelledby="interior-section-title">
        <motion.h2
          id="interior-section-title"
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {t("afraRenderImages.interiorTitle")}
        </motion.h2>


        <motion.p
          className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t("afraRenderImages.interiorDescription")}
        </motion.p>


        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <FaBed style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.spaciousBedrooms")}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <MdKitchen style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.modernKitchen")}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <FaBath style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.luxuryBathrooms")}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-4xl text-gray-500 flex flex-col items-center"
          >
            <FaPaintBrush style={{ color: "#f3b64c" }} aria-hidden="true" />
            <p className="text-sm mt-2 text-center">{t("afraRenderImages.artisticFinishes")}</p>
          </motion.div>
        </div>


        {/* Interior Images: Grid or Slider View */}
        {isGridView ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {afraInteriors.map((img, index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                onClick={() => handleExpandImage(afraInteriors, index)}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={img.src}
                  alt={`${t("afraRenderImages.interiorTitle")} ${index + 1}`}
                  width={400}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="mt-8">
            {afraInteriors.map((img, index) => (
              <motion.div
                key={index}
                className="p-2"
                onClick={() => handleExpandImage(afraInteriors, index)}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={img.src}
                  alt={`${t("afraRenderImages.interiorTitle")} ${index + 1}`}
                  width={400}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
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


// Define PropTypes for future scalability and type checking
AfraLocation.propTypes = {
  // Define prop types here if you plan to pass props in the future
};


export default React.memo(AfraLocation);
