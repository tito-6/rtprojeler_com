import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Card } from "flowbite-react";
import { motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTranslation } from "next-i18next";

const SylvanaUnitTypes = () => {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent page scroll
  };

  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restore page scroll
  };

  const unitType = {
    image: "/sylvana-istanbul/sylvana-unit-types-sheet-1.webp",
    label: t("sylvanaUnitTypes.unitTypeLabel"),
    description: t("sylvanaUnitTypes.unitTypeDescription"),
  };

  return (
    <section className="text-center my-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        {t("sylvanaUnitTypes.title")}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {t("sylvanaUnitTypes.description")}
      </p>

      <div className="grid grid-cols-1 gap-6 justify-items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4"
          onClick={handleOpen}
        >
          <Card className="cursor-pointer text-center shadow-lg dark:bg-gray-800" style={{ minHeight: "250px" }}>
            <div className="flex justify-center">
              <img src={unitType.image} alt={unitType.label} className="w-32 h-32 mb-4" />
            </div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {unitType.label}
            </p>
          </Card>
        </motion.div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-800 dark:text-white text-2xl">
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {unitType.label}
            </h3>

            <TransformWrapper>
              <TransformComponent>
                <img src={unitType.image} alt={unitType.label} className="w-full h-auto rounded-lg shadow-lg" />
              </TransformComponent>
            </TransformWrapper>

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {unitType.description}
            </p>

            <Button onClick={handleClose} className="mt-6 mx-auto">
              {t("sylvanaUnitTypes.closeButton")}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SylvanaUnitTypes;
