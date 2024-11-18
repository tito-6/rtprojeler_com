import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaCity,
  FaLandmark,
  FaChartLine,
  FaBuilding,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function WhyInvestIstanbul() {
  const { t } = useTranslation("common");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
        t("whyInvestIstanbul.shareText")
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("whyInvestIstanbul.title")}
        </h1>

        {/* Main Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/invest-istanbul.webp"
            alt={t("whyInvestIstanbul.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        {/* Introduction */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">{t("whyInvestIstanbul.description")}</p>

        {/* Reasons to Invest in Istanbul */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("whyInvestIstanbul.reasonsTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaCity size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("whyInvestIstanbul.reasons.strategicLocation")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("whyInvestIstanbul.reasons.strategicLocationDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaChartLine size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("whyInvestIstanbul.reasons.growingEconomy")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("whyInvestIstanbul.reasons.growingEconomyDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaLandmark size={50} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("whyInvestIstanbul.reasons.culturalAttractions")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("whyInvestIstanbul.reasons.culturalAttractionsDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaBuilding size={50} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("whyInvestIstanbul.reasons.realEstateMarket")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("whyInvestIstanbul.reasons.realEstateMarketDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaShieldAlt size={50} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("whyInvestIstanbul.reasons.investmentIncentives")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("whyInvestIstanbul.reasons.investmentIncentivesDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaGlobe size={50} className="text-cyan-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("whyInvestIstanbul.reasons.globalConnectivity")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("whyInvestIstanbul.reasons.globalConnectivityDesc")}
            </p>
          </div>
        </div>

        {/* Real Estate Investment Information */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("whyInvestIstanbul.realEstateInfoTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{t("whyInvestIstanbul.realEstateInfoDesc")}</p>

        {/* Supporting Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/istanbul-real-estate.webp"
            alt={t("whyInvestIstanbul.secondaryImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        {/* Reliable Sources */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t("whyInvestIstanbul.sourcesTitle")}</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a href="https://www.invest.gov.tr/" className="text-blue-500 hover:underline">
              {t("whyInvestIstanbul.sources.investTurkey")}
            </a>{" "}
            – {t("whyInvestIstanbul.sources.investTurkeyDesc")}
          </li>
          <li>
            <a href="https://www.propertyturkey.com/" className="text-blue-500 hover:underline">
              {t("whyInvestIstanbul.sources.propertyTurkey")}
            </a>{" "}
            – {t("whyInvestIstanbul.sources.propertyTurkeyDesc")}
          </li>
          <li>
            <a href="https://www.turkeyhomes.com/" className="text-blue-500 hover:underline">
              {t("whyInvestIstanbul.sources.turkeyHomes")}
            </a>{" "}
            – {t("whyInvestIstanbul.sources.turkeyHomesDesc")}
          </li>
        </ul>

        {/* Social Sharing */}
        <div className="flex gap-4 mt-6 justify-center">
          <Button color="light" onClick={shareOnTwitter}>
            <FaTwitter size={20} /> {t("whyInvestIstanbul.share.twitter")}
          </Button>
          <Button color="light" onClick={shareOnFacebook}>
            <FaFacebook size={20} /> {t("whyInvestIstanbul.share.facebook")}
          </Button>
          <Button color="light" onClick={shareOnLinkedIn}>
            <FaLinkedin size={20} /> {t("whyInvestIstanbul.share.linkedin")}
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
