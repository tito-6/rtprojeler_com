
// src/components/ArabianRanchesSocialAmenities.
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Button } from "flowbite-react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaSwimmer,
  FaLeaf,
  FaDumbbell,
  FaParking,
  FaRunning,
  FaDog,
  FaChess,
  FaUtensils,
  FaClock,
} from "react-icons/fa";
import { useTranslation } from "next-i18next";

/**
 * ArabianRanchesSocialAmenities Component
 * 
 * Displays social amenities with icons, labels, descriptions, and animations.
 * Includes a modal to show detailed information about each amenity.
 * 
 * Optimizations:
 * - Memoization of amenities array with useMemo
 * - Semantic HTML for better SEO and accessibility
 * - ARIA attributes for improved accessibility
 * - Dynamic import of Player component for performance
 * - Responsive design using Tailwind CSS
 * - React.memo to prevent unnecessary re-renders
 */

// Dynamically import Player to enable code-splitting and lazy loading
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full" />,
  }
);

const ArabianRanchesSocialAmenities = () => {
  const { t } = useTranslation("common");
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  // Memoize the amenities array to prevent re-creation on each render
  const amenities = useMemo(
    () => [
      {
        animation: "/icons/swimming-pool-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.swimmingPool.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.swimmingPool.description"),
        icon: <FaSwimmer size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/bbq-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.bbq.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.bbq.description"),
        icon: <FaUtensils size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/parking-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.parking.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.parking.description"),
        icon: <FaParking size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/kids-play-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.kidsPlay.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.kidsPlay.description"),
        icon: <FaDog size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/chess-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.chess.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.chess.description"),
        icon: <FaChess size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/gym-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.gym.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.gym.description"),
        icon: <FaDumbbell size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/pet-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.petArea.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.petArea.description"),
        icon: <FaDog size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/seating-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.seating.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.seating.description"),
        icon: <FaLeaf size={50} aria-hidden="true" />,
      },
      {
        animation: "/icons/tennis-icon.json",
        label: t("ArabianRanchesSocialAmenities.amenities.tennis.label"),
        description: t("ArabianRanchesSocialAmenities.amenities.tennis.description"),
        icon: <FaRunning size={50} aria-hidden="true" />,
      },
    ],
    [t]
  );

  /**
   * Opens the modal with selected amenity details
   * @param {Object} amenity - The amenity object to display
   */
  const handleOpen = (amenity) => {
    setSelectedAmenity(amenity);
    document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
  };

  /**
   * Closes the modal
   */
  const handleClose = () => {
    setSelectedAmenity(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <section
      className="text-center my-12"
      aria-labelledby="social-amenities-title"
    >
      {/* Section Title */}
      <h2
        id="social-amenities-title"
        className="text-3xl font-bold mb-6"
        style={{ color: "#f1b452" }}
        role="heading"
        aria-level="2"
      >
        {t("ArabianRanchesSocialAmenities.title")}
      </h2>

      {/* Section Description */}
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {t("ArabianRanchesSocialAmenities.description")}
      </p>

      {/* Icons Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center mb-10">
        <div className="flex flex-col items-center">
          <FaSwimmer className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.swimming")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaParking className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.parking")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaDumbbell className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.fitness")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaLeaf className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.nature")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaRunning className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.sport")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaDog className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.petArea")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaChess className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.chess")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaUtensils className="text-4xl text-[#f3b359]" aria-hidden="true" />
          <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {t("ArabianRanchesSocialAmenities.icons.bbq")}
          </span>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-4"
            onClick={() => handleOpen(amenity)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleOpen(amenity);
            }}
            aria-label={`${amenity.label} ${t("ArabianRanchesSocialAmenities.viewDetails")}`}
          >
            <Card
              className="cursor-pointer text-center shadow-lg"
              style={{ minHeight: "250px" }}
            >
              <div className="flex justify-center">
                <Player
                  src={amenity.animation}
                  autoplay
                  loop
                  className="w-32 h-32 mb-4"
                  aria-hidden="true"
                />
              </div>
              <p
                className="text-lg font-semibold"
                style={{ color: "#f1b452" }}
              >
                {amenity.label}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal for Selected Amenity */}
      {selectedAmenity && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="amenity-modal-title"
        >
          <div className="relative max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-800 dark:text-white text-2xl"
              aria-label={t("ArabianRanchesSocialAmenities.closeButton")}
            >
              <FaTimes />
            </button>

            <h3
              id="amenity-modal-title"
              className="text-xl font-bold mb-4"
              style={{ color: "#f1b452" }}
            >
              {selectedAmenity.label}
            </h3>

            <Player
              src={selectedAmenity.animation}
              autoplay
              loop
              className="w-64 h-64 mx-auto"
              aria-hidden="true"
            />

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {selectedAmenity.description}
            </p>

            <div className="mt-6 flex justify-center">
  <Button
    onClick={handleClose}
    className="bg-[#eeb558] hover:bg-[#dda347] text-white px-4 py-2 rounded-lg transition-colors"
    aria-label={t("ArabianRanchesSocialAmenities.closeButton")}
  >
    {t("ArabianRanchesSocialAmenities.closeButton")}
  </Button>
</div>
          </div>
        </div>
      )}
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ArabianRanchesSocialAmenities);
