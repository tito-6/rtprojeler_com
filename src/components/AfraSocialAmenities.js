// src/components/AfraSocialAmenities.js

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, Button } from "flowbite-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
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
} from "react-icons/fa";

// Dynamically import Player to enable code-splitting and lazy loading
const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full" />
    ),
  }
);

const AfraSocialAmenities = () => {
  const { t } = useTranslation("common");
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const amenities = useMemo(
    () => [
      {
        id: "swimming-pool",
        animation: "/icons/swimming-pool-icon.json",
        label: t("afraSocialAmenities.swimmingPool"),
        description: t("afraSocialAmenities.swimmingPoolDescription"),
        icon: <FaSwimmer size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "bbq-area",
        animation: "/icons/bbq-icon.json",
        label: t("afraSocialAmenities.bbqArea"),
        description: t("afraSocialAmenities.bbqAreaDescription"),
        icon: <FaUtensils size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "parking",
        animation: "/icons/parking-icon.json",
        label: t("afraSocialAmenities.parking"),
        description: t("afraSocialAmenities.parkingDescription"),
        icon: <FaParking size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "kids-play-area",
        animation: "/icons/kids-play-icon.json",
        label: t("afraSocialAmenities.kidsPlayArea"),
        description: t("afraSocialAmenities.kidsPlayAreaDescription"),
        icon: <FaDog size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "chess-area",
        animation: "/icons/chess-icon.json",
        label: t("afraSocialAmenities.chessArea"),
        description: t("afraSocialAmenities.chessAreaDescription"),
        icon: <FaChess size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "gym",
        animation: "/icons/gym-icon.json",
        label: t("afraSocialAmenities.gym"),
        description: t("afraSocialAmenities.gymDescription"),
        icon: <FaDumbbell size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "pet-area",
        animation: "/icons/pet-icon.json",
        label: t("afraSocialAmenities.petArea"),
        description: t("afraSocialAmenities.petAreaDescription"),
        icon: <FaDog size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "seating-area",
        animation: "/icons/seating-icon.json",
        label: t("afraSocialAmenities.seatingArea"),
        description: t("afraSocialAmenities.seatingAreaDescription"),
        icon: <FaLeaf size={50} color="#f1b555" aria-hidden="true" />,
      },
      {
        id: "tennis-court",
        animation: "/icons/tennis-icon.json",
        label: t("afraSocialAmenities.tennisCourt"),
        description: t("afraSocialAmenities.tennisCourtDescription"),
        icon: <FaRunning size={50} color="#f1b555" aria-hidden="true" />,
      },
    ],
    [t]
  );

  const handleOpen = (amenity) => {
    setSelectedAmenity(amenity);
  };

  const handleClose = () => {
    setSelectedAmenity(null);
  };

  return (
    <section
      className="text-center my-12"
      aria-labelledby="social-amenities-title"
    >
      <h2
        id="social-amenities-title"
        className="text-3xl font-bold mb-6"
        style={{ color: "#f1b452" }}
      >
        {t("afraSocialAmenities.title")}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {t("afraSocialAmenities.description")}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center mb-10">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex flex-col items-center">
            {amenity.icon}
            <span className="text-sm mt-2 text-gray-900 dark:text-gray-100">
              {amenity.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity) => (
          <motion.div
            key={amenity.id}
            whileHover={{ scale: 1.05 }}
            className="p-4"
            onClick={() => handleOpen(amenity)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleOpen(amenity);
            }}
            aria-label={`${amenity.label} ${t(
              "afraSocialAmenities.viewDetails"
            )}`}
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
              aria-label={t("afraSocialAmenities.closeButton")}
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
    aria-label={t("afraSocialAmenities.closeButton")}
    className="bg-[#eeb558] hover:bg-[#dda347] text-white px-4 py-2 rounded-lg transition-colors"
  >
    {t("afraSocialAmenities.closeButton")}
  </Button>
</div>

          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(AfraSocialAmenities);
