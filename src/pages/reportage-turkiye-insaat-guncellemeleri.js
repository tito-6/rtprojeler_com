import { ParallaxProvider } from "react-scroll-parallax";
import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { useRouter } from "next/router";

// Lazy-load the construction update charts for performance optimization
const AfraConstructionUpdateCharts = dynamic(
  () => import("@/components/AfraConstructionUpdateCharts"),
  {
    ssr: false,
    loading: () => <p>Loading Afra Park charts...</p>,
  }
);

const SylvanaConstructionUpdateCharts = dynamic(
  () => import("@/components/SylvanaConstructionUpdateCharts"),
  {
    ssr: false,
    loading: () => <p>Loading Sylvana Istanbul charts...</p>,
  }
);

const ArabianRanchesConstructionUpdates = dynamic(
  () => import("@/components/ArabianRanchesConstructionUpdates"),
  {
    ssr: false,
    loading: () => <p>Loading Arabian Ranches charts...</p>,
  }
);

const ConstructionsUpdatePage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale } = router;
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let embedUrl = "";

      if (locale === "ar") {
        // Arabic video
        embedUrl = "https://www.youtube.com/embed/k909cKRPxg4";
      } else {
        // Turkish video for all other languages
        embedUrl = "https://www.youtube.com/embed/g56UVBKC5uU";
      }

      const fetchedVideos = [
        {
          id: 1,
          url: embedUrl,
          title:
            locale === "ar"
              ? "تحديث أعمال البناء - سيلفانا إسطنبول"
              : "Sylvana Istanbul - Construction Update",
        },
      ];

      setVideoList(fetchedVideos);
      console.log(`Updated videoList state for locale (${locale}):`, fetchedVideos);
    };

    fetchData();
  }, [locale]);

  return (
    <>
      <Head>
        <title>{t("constructionUpdates.pageTitle")}</title>
        <meta
          name="description"
          content={t("constructionUpdates.metaDescription")}
        />
        <meta name="keywords" content={t("constructionUpdates.keywords")} />
      </Head>

      <ParallaxProvider>
        <section className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {t("constructionUpdates.pageTitle")}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("constructionUpdates.introText")}
          </p>
          <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold">
            {t("constructionUpdates.motivationalText")}
          </p>
        </section>

        {/* Monthly Video Updates */}
        {videoList.length > 0 && (
          <section className="container mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
              {t("constructionUpdates.monthlyUpdatesTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoList.map((video) => (
                <div key={video.id} className="mb-16">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="w-full h-[300px] lg:h-[200px] rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h2 className="text-2xl font-semibold text-center mt-4 text-gray-800 dark:text-gray-200">
                    {video.title}
                  </h2>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sylvana Istanbul Construction Update */}
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            {t("constructionUpdates.sylvanaTitle")}
          </h2>
          <SylvanaConstructionUpdateCharts />
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            {t("constructionUpdates.sylvanaDescription")}
          </p>
        </section>

        {/* Afra Park Construction Update */}
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            {t("constructionUpdates.afraTitle")}
          </h2>
          <AfraConstructionUpdateCharts />
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            {t("constructionUpdates.afraDescription")}
          </p>
        </section>

        {/* Arabian Ranches Construction Update */}
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            {t("constructionUpdates.arabianTitle")}
          </h2>
          <ArabianRanchesConstructionUpdates />
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            {t("constructionUpdates.arabianDescription")}
          </p>
        </section>

        {/* Conclusion Section */}
        <section className="container mx-auto py-12 px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            {t("constructionUpdates.conclusionTitle")}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("constructionUpdates.conclusionText")}
          </p>
          <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mt-4">
            {t("constructionUpdates.conclusionMotivation")}
          </p>
        </section>
      </ParallaxProvider>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default ConstructionsUpdatePage;
