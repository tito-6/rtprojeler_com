import React from "react";
import {
  FaSchool,
  FaHospital,
  FaTrain,
  FaTree,
  FaShoppingCart,
  FaRunning,
  FaSwimmingPool,
  FaUniversity,
  FaFootballBall,
  FaClock,
  FaPlane,
} from "react-icons/fa";
import { useTranslation } from "next-i18next";

const SylvanaLocation = () => {
  const { t } = useTranslation("common");

  const features = [
    {
      name: t("SylvanaLocation.features.bahcesehirPark"),
      icon: <FaTree size={50} />,
      time: t("SylvanaLocation.times.10min"),
    },
    {
      name: t("SylvanaLocation.features.bilfenSchool"),
      icon: <FaSchool size={50} />,
      time: t("SylvanaLocation.times.10min"),
    },
    {
      name: t("SylvanaLocation.features.leaderRussianSchool"),
      icon: <FaSchool size={50} />,
      time: t("SylvanaLocation.times.10min"),
    },
    {
      name: t("SylvanaLocation.features.bahcesehirFitness"),
      icon: <FaRunning size={50} />,
      time: t("SylvanaLocation.times.10min"),
    },
    {
      name: t("SylvanaLocation.features.bahcesehirTrainStation"),
      icon: <FaTrain size={50} />,
      time: t("SylvanaLocation.times.10min"),
    },
    {
      name: t("SylvanaLocation.features.prestigeMallPark"),
      icon: <FaShoppingCart size={50} />,
      time: t("SylvanaLocation.times.11min"),
    },
    {
      name: t("SylvanaLocation.features.istinyeHospital"),
      icon: <FaHospital size={50} />,
      time: t("SylvanaLocation.times.15min"),
    },
    {
      name: t("SylvanaLocation.features.istanbulUniversity"),
      icon: <FaUniversity size={50} />,
      time: t("SylvanaLocation.times.17min"),
    },
    {
      name: t("SylvanaLocation.features.ataturkOlympicStadium"),
      icon: <FaFootballBall size={50} />,
      time: t("SylvanaLocation.times.25min"),
    },
    {
      name: t("SylvanaLocation.features.aquaClubDolphin"),
      icon: <FaSwimmingPool size={50} />,
      time: t("SylvanaLocation.times.30min"),
    },
    {
      name: t("SylvanaLocation.features.istanbulAirport"),
      icon: <FaPlane size={50} />,
      time: t("SylvanaLocation.times.30min"),
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-customYellow dark:text-white">
        {t("SylvanaLocation.title")}
      </h2>

      <p className="text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto">
        {t("SylvanaLocation.description")}
      </p>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ name, icon, time }, index) => (
          <li
            key={index}
            className="flex flex-col items-center p-4 rounded-md shadow-lg hover:scale-105 transition-transform bg-white dark:bg-gray-800"
          >
            <span style={{ color: "#f5b354" }}>{icon}</span>
            <span className="pt-2 font-bold text-gray-900 dark:text-white">
              {name}
            </span>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaClock className="mr-2" style={{ color: "#53cd7b" }} />
              <p>{time}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.324111721519!2d28.64560257571584!3d41.097104771338195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b559466ee88df1%3A0x4161ca3897595647!2sSylvana%20%C4%B0stanbul!5e1!3m2!1str!2str!4v1730674172472!5m2!1str!2str"
          width="800"
          height="500"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("SylvanaLocation.mapTitle")}
        />
      </div>
    </section>
  );
};

export default SylvanaLocation;
