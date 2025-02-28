import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Dynamically import components for performance optimization
const SylvanaDocuments = dynamic(() => import("@/components/SylvanaDocuments"), { ssr: false });
const SylvanaRenderImages = dynamic(() => import("@/components/SylvanaRenderImages"), { ssr: false });
const AfraDocuments = dynamic(() => import("@/components/AfraDocuments"), { ssr: false });
const AfraRenderImages = dynamic(() => import("@/components/AfraRenderImages"), { ssr: false });
const ArabianRanchesDocuments = dynamic(() => import("@/components/ArabianRanchesDocuments"), { ssr: false });
const ArabianRanchesRenderImages = dynamic(() => import("@/components/ArabianRanchesRenderImages"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/Contact"), { ssr: false });

const projelerPage = () => {
  const { t } = useTranslation("common");
  const [currentImage, setCurrentImage] = useState(0);
  const backgroundImages = [
    "/arabian-ranches/arabian-ranches-hero.webp",
    "/arabian-ranches/images/arabianranches-02.webp",
    "/afra-park/afra-park-projesi.webp",
    "/sylvana-istanbul/sylvana.webp",
  ];

  // Hero background image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>{`${t("projelerPage.pageTitle")} - Reportage Türkiye`}</title>
        <meta name="description" content={t("projelerPage.pageDescription")} />
        <meta name="keywords" content={t("projelerPage.keywords")} />
        <meta property="og:title" content={`${t("projelerPage.pageTitle")} - Reportage Türkiye`} />
        <meta property="og:description" content={t("projelerPage.pageDescription")} />
        <meta property="og:image" content="/assets/images/projelerbg.webp" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Introduction Section with Hero Image Slider */}
      <section
        className="relative flex justify-center items-center h-screen bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImages[currentImage]})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center">
          <h1 className="text-5xl font-extrabold mb-4">{t("projelerPage.heroTitle")}</h1>
          <p className="text-lg">{t("projelerPage.heroSubtitle")}</p>
        </div>
      </section>

      {/* Sylvana Istanbul Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t("projelerPage.sylvana.title")}
        </h2>
        <div className="text-center text-gray-800 dark:text-white p-6">
          <p>{t("projelerPage.sylvana.description")}</p>
        </div>
        <div className="py-6">
          <SylvanaDocuments />
          <SylvanaRenderImages />
          <div className="text-center my-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("projelerPage.sylvana.virtualTourTitle")}
            </h3>
            <iframe
              className="w-full h-96 rounded-lg shadow-lg"
              src="https://kuula.co/share/collection/7J5cv?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=148&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1"
              allowFullScreen
              frameBorder="0"
              title={t("projelerPage.sylvana.virtualTourTitle")}
            ></iframe>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/projeler/sylvana-istanbul-bahcesehir">
            <button className="px-6 py-2 bg-[#f3b64c] text-white rounded hover:bg-[#d9a33e] transition">
              {t("projelerPage.sylvana.moreInfo")}
            </button>
          </Link>
        </div>
      </section>

      {/* Afra Park Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t("projelerPage.afraPark.title")}
        </h2>
        <div className="text-center text-gray-800 dark:text-white p-6">
          <p>{t("projelerPage.afraPark.description")}</p>
        </div>
        <div className="py-6">
          <AfraDocuments />
          <AfraRenderImages />
          <div className="text-center my-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("projelerPage.afraPark.virtualTourTitle")}
            </h3>
            <iframe
              className="w-full h-96 rounded-lg shadow-lg"
              src="https://kuula.co/share/collection/7XwnH?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1"
              allowFullScreen
              frameBorder="0"
              title={t("projelerPage.afraPark.virtualTourTitle")}
            ></iframe>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/projeler/afra-park-istanbul-bahcesehir">
            <button className="px-6 py-2 bg-[#f3b64c] text-white rounded hover:bg-[#d9a33e] transition">
              {t("projelerPage.afraPark.moreInfo")}
            </button>
          </Link>
        </div>
      </section>

      {/* Arabian Ranches Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t("projelerPage.arabianRanches.title")}
        </h2>
        <div className="text-center text-gray-800 dark:text-white p-6">
          <p>{t("projelerPage.arabianRanches.description")}</p>
        </div>
        <div className="py-6">
          <ArabianRanchesDocuments />
          <ArabianRanchesRenderImages />
          
        </div>
        <div className="text-center mt-6">
          <Link href="/projeler/arabian-ranches">
            <button className="px-6 py-2 bg-[#f3b64c] text-white rounded hover:bg-[#d9a33e] transition">
              {t("projelerPage.arabianRanches.moreInfo")}
            </button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-200 dark:bg-gray-800 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t("contact.title")}
        </h2>
        <ContactForm />
      </section>
    </>
  );
};

// Server-side translations
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default projelerPage;
