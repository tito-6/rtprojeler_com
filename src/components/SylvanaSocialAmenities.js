import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Card, Button } from "flowbite-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import {
  FaTimes,
  FaLeaf,
  FaParking,
  FaChild,
  FaUtensils,
  FaChair,
  FaDog,
  FaChess,
  FaDumbbell,
} from "react-icons/fa";

// Import Lottie animations
import landscapeAnimation from "/public/icons/landscape-icon.json";
import bbqAnimation from "/public/icons/bbq-icon.json";
import parkingAnimation from "/public/icons/parking-icon.json";
import kidsPlayAnimation from "/public/icons/kids-play-icon.json";
import chessAnimation from "/public/icons/chess-icon.json";
import gymAnimation from "/public/icons/gym-icon.json";
import petAnimation from "/public/icons/pet-icon.json";
import seatingAnimation from "/public/icons/seating-icon.json";

// Define amenities with labels and icons
const amenities = [
  {
    animation: landscapeAnimation,
    labelKey: "SylvanaAmenities.landscapeGarden",
    descriptionKey: "SylvanaAmenities.landscapeGardenDesc",
    icon: <FaLeaf size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: bbqAnimation,
    labelKey: "SylvanaAmenities.bbqAreas",
    descriptionKey: "SylvanaAmenities.bbqAreasDesc",
    icon: <FaUtensils size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: parkingAnimation,
    labelKey: "SylvanaAmenities.parkingArea",
    descriptionKey: "SylvanaAmenities.parkingAreaDesc",
    icon: <FaParking size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: kidsPlayAnimation,
    labelKey: "SylvanaAmenities.kidsPlayArea",
    descriptionKey: "SylvanaAmenities.kidsPlayAreaDesc",
    icon: <FaChild size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: chessAnimation,
    labelKey: "SylvanaAmenities.chessArea",
    descriptionKey: "SylvanaAmenities.chessAreaDesc",
    icon: <FaChess size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: seatingAnimation,
    labelKey: "SylvanaAmenities.seatingAreas",
    descriptionKey: "SylvanaAmenities.seatingAreasDesc",
    icon: <FaChair size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: petAnimation,
    labelKey: "SylvanaAmenities.petFriendlyAreas",
    descriptionKey: "SylvanaAmenities.petFriendlyAreasDesc",
    icon: <FaDog size={50} style={{ color: "#eeb558" }} />,
  },
  {
    animation: gymAnimation,
    labelKey: "SylvanaAmenities.gym",
    descriptionKey: "SylvanaAmenities.gymDesc",
    icon: <FaDumbbell size={50} style={{ color: "#eeb558" }} />,
  },
];

const SylvanaSocialAmenities = () => {
  const { t } = useTranslation("common");
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const handleOpen = (amenity) => {
    setSelectedAmenity(amenity);
  };

  const handleClose = () => {
    setSelectedAmenity(null);
  };

  return (
    <section className="text-center my-12">
      <h2 className="text-3xl font-bold mb-6" style={{ color: "#eeb558" }}>
        {t("SylvanaAmenities.title")}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {t("SylvanaAmenities.description")}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center mb-10">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex flex-col items-center">
            {amenity.icon}
            <span className="text-sm mt-2 text-black dark:text-white">
              {t(amenity.labelKey)}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-4"
            onClick={() => handleOpen(amenity)}
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
                />
              </div>
              <p className="text-lg font-semibold" style={{ color: "#eeb558" }}>
                {t(amenity.labelKey)}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedAmenity && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-800 dark:text-white text-2xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold mb-4" style={{ color: "#eeb558" }}>
              {t(selectedAmenity.labelKey)}
            </h3>

            <Player
              src={selectedAmenity.animation}
              autoplay
              loop
              className="w-64 h-64 mx-auto"
            />

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {t(selectedAmenity.descriptionKey)}
            </p>

            <Button
  onClick={handleClose}
  aria-label={t("SylvanaAmenities.closeButton")}
  className="mt-6 mx-auto bg-[#eeb558] hover:bg-[#dda347] text-white px-4 py-2 rounded-lg transition-colors"
>
  {t("SylvanaAmenities.closeButton")}
</Button>

          </div>
        </div>
      )}
    </section>
  );
};

export default SylvanaSocialAmenities;
