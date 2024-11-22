import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Dynamically load components for performance optimization
const ArabianRanchesDocuments = dynamic(() => import("@/components/ArabianRanchesDocuments"), { ssr: false });
const ArabianRanchesRenderImages = dynamic(() => import("@/components/ArabianRanchesRenderImages"), { ssr: false });
const ArabianRanchesSocialAmenities = dynamic(() => import("@/components/ArabianRanchesSocialAmenities"), { ssr: false });
const ArabianRanchesLocationFeatures = dynamic(() => import("@/components/ArabianRanchesLocationFeatures"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const ArabianRanchesAvailability = dynamic(() => import("@/components/ArabianRanchesAvailability"), { ssr: false });

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function ArabianRanchesPage() {
  const { t } = useTranslation("common");

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
