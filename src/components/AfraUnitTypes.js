// src/components/AfraUnitTypes.js

import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "framer-motion";
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";

// Dynamically import Player to enable code-splitting and lazy loading
const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-lg" />
    ),
  }
);

// Define unit types with translation keys for type names
const unitTypesData = [
  {
    typeKey: "afraUnitTypes.unitType2A", // translation key for type name
    image: "/afra-park/images/2 + 1 TOWNHOUSE - TYPE A.webp",
  },
  {
    typeKey: "afraUnitTypes.unitType2B",
    image: "/afra-park/images/2 + 1 TOWNHOUSE - TYPE B.webp",
  },
  {
    typeKey: "afraUnitTypes.unitType2C",
    image: "/afra-park/images/2 + 1 TOWNHOUSE - TYPE C.webp",
  },
  {
    typeKey: "afraUnitTypes.unitType3AWithMaid",
    image: "/afra-park/images/3 + 1 TOWNHOUSE (With MAID) - TYPE A.webp",
  },
  {
    typeKey: "afraUnitTypes.unitType3B",
    image: "/afra-park/images/3 + 1 TOWNHOUSE - TYPE B.webp",
  },
  {
    typeKey: "afraUnitTypes.unitType4A",
    image: "/afra-park/images/4 + 1 TOWNHOUSE - TYPE A.webp",
  },
  {
    typeKey: "afraUnitTypes.unitType4B",
    image: "/afra-park/images/4 + 1 TOWNHOUSE - TYPE B.webp",
  },
];

const AfraUnitTypes = () => {
  const { t } = useTranslation("common");
  const [selectedUnitType, setSelectedUnitType] = useState(unitTypesData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize unitTypes to prevent unnecessary recalculations
  const unitTypes = useMemo(() => unitTypesData, []);

  // Handle opening the modal
  const handleOpenModal = useCallback(
    (index) => {
      setSelectedUnitType(unitTypes[index]);
      setCurrentIndex(index);
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    },
    [unitTypes]
  );

  // Handle selecting a unit type
  const handleSelectUnitType = useCallback(
    (index) => {
      setSelectedUnitType(unitTypes[index]);
      setCurrentIndex(index);
    },
    [unitTypes]
  );

  // Navigate to the next unit type
  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % unitTypes.length;
    setSelectedUnitType(unitTypes[nextIndex]);
    setCurrentIndex(nextIndex);
  }, [currentIndex, unitTypes]);

  // Navigate to the previous unit type
  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + unitTypes.length) % unitTypes.length;
    setSelectedUnitType(unitTypes[prevIndex]);
    setCurrentIndex(prevIndex);
  }, [currentIndex, unitTypes]);

  // Handle closing the modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  return (
    <section
      className="text-center my-12 px-4"
      aria-labelledby="afra-unit-types-title"
    >
      <motion.h2
        id="afra-unit-types-title"
        className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {t("afraUnitTypes.title")}
      </motion.h2>

      <motion.p
        className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t("afraUnitTypes.description")}
      </motion.p>

      {/* Unit Type Selection */}
      <div className="flex justify-center flex-wrap mb-8">
        {unitTypes.map((unit, index) => (
          <motion.div
            key={unit.typeKey}
            className={`p-2 mx-2 my-2 cursor-pointer transition-all duration-300 rounded-full 
              ${
                selectedUnitType.typeKey === unit.typeKey
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              } 
              text-sm md:text-base`}
            onClick={() => handleSelectUnitType(index)}
            whileHover={{ scale: 1.05 }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSelectUnitType(index);
            }}
            aria-pressed={selectedUnitType.typeKey === unit.typeKey}
            aria-label={`${t(unit.typeKey)} ${t("afraUnitTypes.selectUnit")}`}
          >
            <p className="font-semibold">{t(unit.typeKey)}</p>
          </motion.div>
        ))}
      </div>

      {/* Selected Unit Image */}
      <div
        className="cursor-pointer"
        onClick={() => handleOpenModal(currentIndex)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleOpenModal(currentIndex);
        }}
        aria-label={`${t(selectedUnitType.typeKey)} ${t("afraUnitTypes.viewDetails")}`}
      >
        <motion.img
          src={selectedUnitType.image}
          alt={t(selectedUnitType.typeKey)}
          className="rounded-lg shadow-lg mx-auto w-full max-w-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
          draggable="false"
        />
        <motion.p
          className="mt-2 text-lg font-semibold text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t(selectedUnitType.typeKey)}
        </motion.p>
      </div>

      {/* Modal for Unit Details */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="unit-modal-title"
        >
          <div className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-800 dark:text-white text-2xl"
              aria-label={t("afraUnitTypes.closeButton")}
            >
              <FaChevronLeft /> {/* Using ChevronLeft as a close icon */}
            </button>

            {/* Modal Title */}
            <h3
              id="unit-modal-title"
              className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
              style={{ color: "#f1b452" }}
            >
              {t(selectedUnitType.typeKey)}
            </h3>

            {/* Zoomable Image */}
            <TransformWrapper
              options={{
                limitToBounds: true,
                minScale: 1,
                maxScale: 3,
              }}
            >
              <TransformComponent>
                <img
                  src={selectedUnitType.image}
                  alt={t(selectedUnitType.typeKey)}
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                  draggable="false"
                />
              </TransformComponent>
            </TransformWrapper>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrev}
                className="text-[#888888] hover:text-gray-600 text-4xl"
                aria-label={t("afraUnitTypes.previousUnit")}
              >
                <FaChevronLeft />
              </button>

              <Button
                onClick={handleCloseModal}
                className="text-lg mx-auto"
                aria-label={t("afraUnitTypes.closeButton")}
              >
                {t("afraUnitTypes.closeButton")}
              </Button>

              <button
                onClick={handleNext}
                className="text-[#888888] hover:text-gray-600 text-4xl"
                aria-label={t("afraUnitTypes.nextUnit")}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(AfraUnitTypes);
