import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Dynamically load components for performance optimization
const ArabianRanchesDocuments = dynamic(() => import("@/components/ArabianRanchesDocuments"), { ssr: false });
const ArabianRanchesRenderImages = dynamic(() => import("@/components/ArabianRanchesRenderImages"), { ssr: false });
const ArabianRanchesSocialAmenities = dynamic(() => import("@/components/ArabianRanchesSocialAmenities"), { ssr: false });
const ArabianRanchesLocationFeatures = dynamic(() => import("@/components/ArabianRanchesLocationFeatures"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const ArabianRanchesAvailability = dynamic(() => import("@/components/ArabianRanchesAvailability"), { ssr: false });

// Virtual Tour Links for Arabian Ranches Types
const arabianRanchesVirtualTours = [
  { type: "Tower C Studio Apartment", url: "https://example.com/tower-c-studio-tour" },
  { type: "4-Bedroom Townhouse", url: "https://example.com/4-bedroom-townhouse-tour" },
];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function ArabianRanchesPage() {
  const { t } = useTranslation("common");
  const [selectedTour, setSelectedTour] = useState(arabianRanchesVirtualTours[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectTour = (tour) => {
    setSelectedTour(tour);
    setDropdownOpen(false);
  };

  return (
    <>
      <Head>
        <title>{t("ArabianRanchesPage.title")}</title>
        <meta name="description" content={t("ArabianRanchesPage.metaDescription")} />
        <meta name="keywords" content={t("ArabianRanchesPage.metaKeywords")} />
        <meta property="og:title" content={t("ArabianRanchesPage.ogTitle")} />
        <meta property="og:description" content={t("ArabianRanchesPage.ogDescription")} />
        <meta property="og:image" content="/arabian-ranches/images/arabian-ranches-hero.webp" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <header
        className="relative flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/arabian-ranches/arabian-ranches-hero.webp')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center">
          <h1 className="text-5xl font-extrabold mb-4">{t("ArabianRanchesPage.heroTitle")}</h1>
          <p className="text-lg">{t("ArabianRanchesPage.heroSubtitle")}</p>
        </div>
      </header>

      {/* About Section */}
      <section className="text-center my-12">
        <motion.h1
          className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {t("ArabianRanchesPage.aboutTitle")}
        </motion.h1>
        <motion.h2
          className="text-xl mb-4 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t("ArabianRanchesPage.aboutLocation")}
        </motion.h2>
        <motion.p
          className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t("ArabianRanchesPage.aboutDescription")}
        </motion.p>
      </section>

      {/* Virtual Tour Section */}
      <section className="bg-gray-50 dark:bg-gray-900 dark:text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          <FaVideo className="inline-block mb-2 mr-2" /> {t("ArabianRanchesPage.virtualToursTitle")}
        </h2>
        <p className="text-lg mb-8 italic">{t("ArabianRanchesPage.virtualToursSubtitle")}</p>

        <div className="relative inline-block text-left mb-6">
          <button
            onClick={toggleDropdown}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg inline-flex items-center"
          >
            {selectedTour.type}
            <FaChevronDown className="ml-2" />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              <ul className="py-1">
                {arabianRanchesVirtualTours.map((tour) => (
                  <li
                    key={tour.type}
                    onClick={() => selectTour(tour)}
                    className={`px-4 py-2 hover:bg-gray-400 cursor-pointer ${selectedTour.type === tour.type ? "bg-gray-400" : "bg-white dark:bg-gray-700"}`}
                  >
                    {tour.type}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Virtual Tour Embed */}
        <motion.div className="relative overflow-hidden pb-[56.25%] mb-8 shadow-lg rounded-lg" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <iframe className="absolute top-0 left-0 w-full h-full rounded-lg" src={selectedTour.url} allowFullScreen frameBorder="0" title={selectedTour.type}></iframe>
        </motion.div>
      </section>

      {/* Project Documents */}
      <ArabianRanchesDocuments />

      {/* Location Features */}
      <ArabianRanchesLocationFeatures />

      {/* Render Exteriors and Interiors with Lazy Loading */}
      <ArabianRanchesRenderImages />

      {/* Social Amenities */}
      <ArabianRanchesSocialAmenities />

      {/* Availability Section */}
      <section className="my-12">
        <ArabianRanchesAvailability />
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 dark:bg-gray-900 dark:text-white py-12">
        <Contact />
      </section>
    </>
  );
}
