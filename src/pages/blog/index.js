import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "flowbite-react";
import htmlReactParser from "html-react-parser";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "/public/animations/loading.json";
import {
  FaHome,
  FaBuilding,
  FaCity,
  FaNewspaper,
  FaHandshake,
  FaGlobe,
  FaChartLine,
  FaMapMarkedAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const blogTopics = [
  {
    titleKey: "blogPage.istanbulInvestment.title",
    descriptionKey: "blogPage.istanbulInvestment.description",
    slug: "istanbul-gayrimenkul-yatirim",
    icon: <FaChartLine size={50} className="text-blue-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.reportageTurkey.title",
    descriptionKey: "blogPage.reportageTurkey.description",
    slug: "reportage-turkiye-luks",
    icon: <FaBuilding size={50} className="text-green-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.benefitsTurkeyInvestment.title",
    descriptionKey: "blogPage.benefitsTurkeyInvestment.description",
    slug: "turkiye-gayrimenkul-yatirim",
    icon: <FaHandshake size={50} className="text-yellow-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.afraParkBahcesehir.title",
    descriptionKey: "blogPage.afraParkBahcesehir.description",
    slug: "afra-park-bahcesehir",
    icon: <FaMapMarkedAlt size={50} className="text-purple-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.sylvanaIstanbul.title",
    descriptionKey: "blogPage.sylvanaIstanbul.description",
    slug: "sylvana-istanbul-modern-yasam",
    icon: <FaHome size={50} className="text-red-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.turkeyRealEstateGrowth.title",
    descriptionKey: "blogPage.turkeyRealEstateGrowth.description",
    slug: "turkiye-gayrimenkul-buyumesi",
    icon: <FaGlobe size={50} className="text-orange-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.istanbulInvestmentParadise.title",
    descriptionKey: "blogPage.istanbulInvestmentParadise.description",
    slug: "istanbul-yatirim-cenneti",
    icon: <FaCity size={50} className="text-teal-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.reportageFutureVision.title",
    descriptionKey: "blogPage.reportageFutureVision.description",
    slug: "reportage-turkiye-vizyon",
    icon: <FaBuilding size={50} className="text-yellow-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.realEstateForecast2024.title",
    descriptionKey: "blogPage.realEstateForecast2024.description",
    slug: "gayrimenkul-yatirim-2024",
    icon: <FaChartLine size={50} className="text-blue-500 mx-auto mb-4" />,
  },
  {
    titleKey: "blogPage.sustainableLivingIstanbul.title",
    descriptionKey: "blogPage.sustainableLivingIstanbul.description",
    slug: "surdurulebilir-yasam-istanbul",
    icon: <FaGlobe size={50} className="text-red-500 mx-auto mb-4" />,
  },
];

const BlogPage = () => {
  const { t } = useTranslation("common");
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setNewsItems(response.data);
      } catch (error) {
        console.error("Error fetching news:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGoogleNews();
  }, []);

  return (
    <div className="w-full min-h-screen p-6 md:p-10 bg-gradient-to-b from-gray-100 dark:from-gray-900 via-gray-200 dark:via-gray-800 to-gray-100 dark:to-gray-900 transition duration-500">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Player autoplay loop src={loadingAnimation} style={{ height: "200px", width: "200px" }} />
        </div>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            {t("blogPage.title")}
          </h1>

          {/* Blog Topics Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              {t("blogPage.popularTopics")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  {topic.icon}
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    {t(topic.titleKey)}
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                    {t(topic.descriptionKey)}
                  </p>
                  <Link href={`/blog/${topic.slug}`} passHref>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                      {t("common.readMore")}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Latest News Section */}
          <section className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              {t("blogPage.latestNews")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((news, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <FaNewspaper size={50} className="text-green-500 mx-auto mb-4" />
                  <h5 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {news.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400">
                    {htmlReactParser(news.description)}
                  </p>
                  <a href={news.link} target="_blank" rel="noopener noreferrer">
                    <Button className="mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white">
                      {t("common.readMore")}
                    </Button>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default BlogPage;
