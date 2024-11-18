import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Dynamically load components to optimize performance
const AfraDocuments = dynamic(() => import("@/components/AfraDocuments"), { ssr: false });
const AfraUnitTypes = dynamic(() => import("@/components/AfraUnitTypes"), { ssr: false });
const AfraRenderImages = dynamic(() => import("@/components/AfraRenderImages"), { ssr: false });
const AfraSocialAmenities = dynamic(() => import("@/components/AfraSocialAmenities"), { ssr: false });
const AfraLocation = dynamic(() => import("@/components/AfraLocation"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const AfraAvailable = dynamic(() => import("@/components/AfraAvailable"), { ssr: false });

const AfraPage = () => {
  const { t } = useTranslation("common");

  // Virtual Tour Links for Afra Types
  const afraVirtualTours = [
    {
      type: t("AfraVirtualTours.typeA"),
      url: "https://kuula.co/share/collection/7X2tg?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeB"),
      url: "https://kuula.co/share/collection/7X2tB?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeC"),
      url: "https://kuula.co/share/collection/7cL6J?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeWithMaid"),
      url: "https://kuula.co/share/collection/7X3mZ?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeB3"),
      url: "https://kuula.co/share/collection/7XRhk?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeC3"),
      url: "https://kuula.co/share/collection/7X3Hr?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeA3_5"),
      url: "https://kuula.co/share/collection/7X3Ds?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeD3_5"),
      url: "https://kuula.co/share/collection/7Xw80?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeA4"),
      url: "https://kuula.co/share/collection/7XwnH?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeB4"),
      url: "https://kuula.co/share/collection/7Xwn0?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
    {
      type: t("AfraVirtualTours.typeC4_5"),
      url: "https://kuula.co/share/collection/7X37r?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1",
    },
  ];

  const [selectedTour, setSelectedTour] = useState(afraVirtualTours[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectTour = (tour) => {
    setSelectedTour(tour);
    setDropdownOpen(false);
  };

  return (
    <>
      <Head>
        <title>{t("AfraPage.title")}</title>
        <meta name="description" content={t("AfraPage.metaDescription")} />
        <meta name="keywords" content={t("AfraPage.keywords")} />
        <meta property="og:title" content={t("AfraPage.ogTitle")} />
        <meta property="og:description" content={t("AfraPage.ogDescription")} />
        <meta property="og:image" content="/afra-park/images/5_exteriorsafra.webp" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <header
        className="relative flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/afra-park/afra-park-projesi.webp')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center">
          <h1 className="text-5xl font-extrabold mb-4">{t("AfraPage.heroTitle")}</h1>
          <p className="text-lg">{t("AfraPage.heroSubtitle")}</p>
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
          {t("AfraPage.aboutTitle")}
        </motion.h1>
        <motion.h2
          className="text-xl mb-4 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t("AfraPage.aboutLocation")}
        </motion.h2>
        <motion.p
          className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t("AfraPage.aboutDescription")}
        </motion.p>
      </section>

      {/* Virtual Tour Section */}
      <section className="bg-gray-50 dark:bg-gray-900 dark:text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          <FaVideo className="inline-block mb-2 mr-2" /> {t("AfraPage.virtualToursTitle")}
        </h2>
        <p className="text-lg mb-8 italic">{t("AfraPage.virtualToursSubtitle")}</p>

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
                {afraVirtualTours.map((tour) => (
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
        <motion.div
          className="relative overflow-hidden pb-[56.25%] mb-8 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={selectedTour.url}
            allowFullScreen
            frameBorder="0"
            title={selectedTour.type}
          ></iframe>
        </motion.div>
      </section>

      {/* Project Documents */}
      <AfraDocuments />

      {/* Location Features */}
      <AfraLocation />

      {/* Render Exteriors and Interiors with Lazy Loading */}
      <AfraRenderImages />

      {/* Unit Types */}
      <AfraUnitTypes />

      {/* Social Amenities */}
      <AfraSocialAmenities />

      {/* Availability Section */}
      <section className="my-12">
        <AfraAvailable />
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 dark:bg-gray-900 dark:text-white py-12">
        <Contact />
      </section>
    </>
  );
};

export default AfraPage;

// Add serverSideTranslations for localization
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
