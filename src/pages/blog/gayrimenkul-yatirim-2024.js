import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaRegGem,
  FaCity,
  FaBriefcase,
  FaMoneyBillWave,
  FaLeaf,
  FaSubway,
} from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function InvestmentInsights2024() {
  const { t } = useTranslation("common");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("investmentInsights.heading")}
        </h1>

        {/* Main Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/investment-istanbul.webp"
            alt={t("investmentInsights.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investmentInsights.introduction")}
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("investmentInsights.whyInvestTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investmentInsights.whyInvestText")}
        </p>

        {/* Advantages Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <FaCity size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.advantages.location.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.advantages.location.description")}
            </p>
          </div>
          <div className="text-center">
            <FaMoneyBillWave size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.advantages.economy.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.advantages.economy.description")}
            </p>
          </div>
          <div className="text-center">
            <FaRegGem size={50} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.advantages.incentives.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.advantages.incentives.description")}
            </p>
          </div>
          <div className="text-center">
            <FaCity size={50} className="text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.advantages.urbanDemand.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.advantages.urbanDemand.description")}
            </p>
          </div>
        </div>

        {/* Investment Trends for 2024 */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("investmentInsights.trendsTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaRegGem size={50} className="text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.trends.luxuryResidential.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.trends.luxuryResidential.description")}
            </p>
          </div>
          <div className="text-center">
            <FaCity size={50} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.trends.urbanExpansion.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.trends.urbanExpansion.description")}
            </p>
          </div>
          <div className="text-center">
            <FaBriefcase size={50} className="text-red-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.trends.commercialRealEstate.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.trends.commercialRealEstate.description")}
            </p>
          </div>
          <div className="text-center">
            <FaMoneyBillWave size={50} className="text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.trends.highROIRentals.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.trends.highROIRentals.description")}
            </p>
          </div>
          <div className="text-center">
            <FaLeaf size={50} className="text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.trends.greenprojeler.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.trends.greenprojeler.description")}
            </p>
          </div>
          <div className="text-center">
            <FaSubway size={50} className="text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("investmentInsights.trends.infrastructure.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("investmentInsights.trends.infrastructure.description")}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("investmentInsights.considerationsTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investmentInsights.considerationsText")}
        </p>

        {/* Social Sharing */}
        <div className="flex gap-4 mt-6 justify-center">
          <Button
            color="light"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(t("investmentInsights.shareText"))}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <FaTwitter size={20} /> {t("investmentInsights.share.twitter")}
          </Button>
          <Button
            color="light"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <FaFacebook size={20} /> {t("investmentInsights.share.facebook")}
          </Button>
          <Button
            color="light"
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  currentUrl
                )}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <FaLinkedin size={20} /> {t("investmentInsights.share.linkedin")}
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Server-side translations
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
