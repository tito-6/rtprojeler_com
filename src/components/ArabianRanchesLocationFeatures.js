import {
  FaSchool,
  FaHospital,
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

const ArabianRanchesLocationFeatures = () => {
  const { t } = useTranslation("common");

  const features = [
    { name: t("ArabianRanchesLocationFeatures.locations.bakuBoulevard"), icon: <FaTree size={50} />, time: t("ArabianRanchesLocationFeatures.times.15min") },
    { name: t("ArabianRanchesLocationFeatures.locations.bakuInternationalSchool"), icon: <FaSchool size={50} />, time: t("ArabianRanchesLocationFeatures.times.12min") },
    { name: t("ArabianRanchesLocationFeatures.locations.europeAzerbaijanSchool"), icon: <FaSchool size={50} />, time: t("ArabianRanchesLocationFeatures.times.18min") },
    { name: t("ArabianRanchesLocationFeatures.locations.ganjlikMall"), icon: <FaShoppingCart size={50} />, time: t("ArabianRanchesLocationFeatures.times.20min") },
    { name: t("ArabianRanchesLocationFeatures.locations.heydarAliyevCenter"), icon: <FaRunning size={50} />, time: t("ArabianRanchesLocationFeatures.times.25min") },
    { name: t("ArabianRanchesLocationFeatures.locations.mall28"), icon: <FaShoppingCart size={50} />, time: t("ArabianRanchesLocationFeatures.times.22min") },
    { name: t("ArabianRanchesLocationFeatures.locations.oilWorkersHospital"), icon: <FaHospital size={50} />, time: t("ArabianRanchesLocationFeatures.times.17min") },
    { name: t("ArabianRanchesLocationFeatures.locations.bakuStateUniversity"), icon: <FaUniversity size={50} />, time: t("ArabianRanchesLocationFeatures.times.30min") },
    { name: t("ArabianRanchesLocationFeatures.locations.adaUniversity"), icon: <FaUniversity size={50} />, time: t("ArabianRanchesLocationFeatures.times.25min") },
    { name: t("ArabianRanchesLocationFeatures.locations.parkBoulevardMall"), icon: <FaShoppingCart size={50} />, time: t("ArabianRanchesLocationFeatures.times.15min") },
    { name: t("ArabianRanchesLocationFeatures.locations.bakuOlympicStadium"), icon: <FaFootballBall size={50} />, time: t("ArabianRanchesLocationFeatures.times.20min") },
    { name: t("ArabianRanchesLocationFeatures.locations.absheronNationalPark"), icon: <FaTree size={50} />, time: t("ArabianRanchesLocationFeatures.times.40min") },
    { name: t("ArabianRanchesLocationFeatures.locations.dalgaBeachResort"), icon: <FaSwimmingPool size={50} />, time: t("ArabianRanchesLocationFeatures.times.30min") },
    { name: t("ArabianRanchesLocationFeatures.locations.heydarAliyevAirport"), icon: <FaPlane size={50} />, time: t("ArabianRanchesLocationFeatures.times.35min") },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-customYellow dark:text-white">
        {t("ArabianRanchesLocationFeatures.title")}
      </h2>

      <p className="text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto">
        {t("ArabianRanchesLocationFeatures.description")}
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
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6597.310261503229!2d49.91491731428661!3d40.57918177874717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDM0JzQ4LjkiTiA0OcKwNTUnMTUuNCJF!5e1!3m2!1sen!2str!4v1730566792717!5m2!1sen!2str"
          width="800"
          height="500"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("ArabianRanchesLocationFeatures.mapTitle")}
        />
      </div>
    </section>
  );
};

export default ArabianRanchesLocationFeatures;
