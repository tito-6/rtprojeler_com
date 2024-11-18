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

const LocationFeatures = () => {
  const { t } = useTranslation("common");

  const features = [
      { name: t("locationFeatures.features.park"), icon: <FaTree size={50} />, time: t("locationFeatures.times.9min") },
      { name: t("locationFeatures.features.bilfenSchool"), icon: <FaSchool size={50} />, time: t("locationFeatures.times.10min") },
      { name: t("locationFeatures.features.leaderRussianSchool"), icon: <FaSchool size={50} />, time: t("locationFeatures.times.10min") },
      { name: t("locationFeatures.features.fitnessCenter"), icon: <FaRunning size={50} />, time: t("locationFeatures.times.10min") },
      { name: t("locationFeatures.features.trainStation"), icon: <FaTrain size={50} />, time: t("locationFeatures.times.10min") },
      { name: t("locationFeatures.features.mallPark"), icon: <FaShoppingCart size={50} />, time: t("locationFeatures.times.11min") },
      { name: t("locationFeatures.features.istinyeHospital"), icon: <FaHospital size={50} />, time: t("locationFeatures.times.15min") },
      { name: t("locationFeatures.features.istanbulUniversity"), icon: <FaUniversity size={50} />, time: t("locationFeatures.times.17min") },
      { name: t("locationFeatures.features.beykentUniversity"), icon: <FaUniversity size={50} />, time: t("locationFeatures.times.18min") },
      { name: t("locationFeatures.features.mallOfIstanbul"), icon: <FaShoppingCart size={50} />, time: t("locationFeatures.times.25min") },
      { name: t("locationFeatures.features.olympicStadium"), icon: <FaFootballBall size={50} />, time: t("locationFeatures.times.25min") },
      { name: t("locationFeatures.features.naturePark"), icon: <FaTree size={50} />, time: t("locationFeatures.times.30min") },
      { name: t("locationFeatures.features.aquaClub"), icon: <FaSwimmingPool size={50} />, time: t("locationFeatures.times.30min") },
      { name: t("locationFeatures.features.istanbulAirport"), icon: <FaPlane size={50} />, time: t("locationFeatures.times.40min") },
  ];

  return (
      <section className="py-16 px-4">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center mb-10 text-customYellow dark:text-white">
              {t("locationFeatures.title")}
          </h2>

          {/* Description */}
          <p className="text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto">
              {t("locationFeatures.description")}
          </p>

          {/* Location List */}
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ name, icon, time }, index) => (
                  <li
                      key={index}
                      className="flex flex-col items-center p-4 rounded-md shadow-lg hover:scale-105 transition-transform bg-white dark:bg-gray-800"
                  >
                      <span style={{ color: "#f5b354" }}>{icon}</span>
                      <span className="pt-2 font-bold text-gray-900 dark:text-white">{name}</span>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <FaClock className="mr-2" style={{ color: "#53cd7b" }} />
                          <p>{time}</p>
                      </div>
                  </li>
              ))}
          </ul>

          {/* Map */}
          <div className="mt-16 flex justify-center">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.606171283591!2d28.678741490156888!3d41.09945073991292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7b3acba54af%3A0x867ee8c6e7d356af!2zQWZyYSBQYXJrIMSwc3RhbmJ1bCBCYWjDp2XFn2VoaXI!5e0!3m2!1sen!2str!4v1728906158597!5m2!1sen!2str"
                  width="800"
                  height="500"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Afra Park Location"
              />
          </div>
      </section>
  );
};

export default LocationFeatures;
