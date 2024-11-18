import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaMapMarkedAlt,
  FaBuilding,
  FaChartLine,
  FaUniversity,
  FaUserShield,
  FaMountain,
} from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function GrowthRealEstateTurkey() {
  const { t } = useTranslation("common");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Social sharing URLs
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(t("growthRealEstateTurkey.shareText"))}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("growthRealEstateTurkey.title")}
        </h1>

        {/* Main Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/growth-real-estate-turkey.webp"
            alt={t("growthRealEstateTurkey.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        {/* Introduction */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("growthRealEstateTurkey.intro")}
        </p>

        {/* Key Drivers of Growth Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("growthRealEstateTurkey.keyDriversTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaMapMarkedAlt size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("growthRealEstateTurkey.features.strategicLocation")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("growthRealEstateTurkey.features.strategicLocationDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaBuilding size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("growthRealEstateTurkey.features.modernInfrastructure")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("growthRealEstateTurkey.features.modernInfrastructureDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaChartLine size={50} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("growthRealEstateTurkey.features.highReturnPotential")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("growthRealEstateTurkey.features.highReturnPotentialDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaUniversity size={50} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("growthRealEstateTurkey.features.qualityEducationHealthcare")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("growthRealEstateTurkey.features.qualityEducationHealthcareDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaUserShield size={50} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("growthRealEstateTurkey.features.citizenshipInvestment")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("growthRealEstateTurkey.features.citizenshipInvestmentDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaMountain size={50} className="text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("growthRealEstateTurkey.features.spectacularViews")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("growthRealEstateTurkey.features.spectacularViewsDesc")}
            </p>
          </div>
        </div>

        {/* Investment Opportunities Section */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("growthRealEstateTurkey.investmentOpportunitiesTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("growthRealEstateTurkey.investmentOpportunitiesText")}
        </p>

        {/* Key Locations for Real Estate Investment */}
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
          <li>
            <strong>{t("growthRealEstateTurkey.locations.istanbul")}</strong> –{" "}
            {t("growthRealEstateTurkey.locations.istanbulDesc")}
          </li>
          <li>
            <strong>{t("growthRealEstateTurkey.locations.antalya")}</strong> –{" "}
            {t("growthRealEstateTurkey.locations.antalyaDesc")}
          </li>
          <li>
            <strong>{t("growthRealEstateTurkey.locations.ankara")}</strong> –{" "}
            {t("growthRealEstateTurkey.locations.ankaraDesc")}
          </li>
        </ul>

        {/* Supporting Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/turkey-real-estate-growth.webp"
            alt={t("growthRealEstateTurkey.supportingImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        {/* Resources for Investors */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("growthRealEstateTurkey.resourcesTitle")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a
              href="https://www.invest.gov.tr/"
              className="text-blue-500 hover:underline"
            >
              {t("growthRealEstateTurkey.resources.investTurkey")}
            </a>{" "}
            – {t("growthRealEstateTurkey.resources.investTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.propertyturkey.com/"
              className="text-blue-500 hover:underline"
            >
              {t("growthRealEstateTurkey.resources.propertyTurkey")}
            </a>{" "}
            – {t("growthRealEstateTurkey.resources.propertyTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.turkeyhomes.com/"
              className="text-blue-500 hover:underline"
            >
              {t("growthRealEstateTurkey.resources.turkeyHomes")}
            </a>{" "}
            – {t("growthRealEstateTurkey.resources.turkeyHomesDesc")}
          </li>
        </ul>

        {/* Social Sharing */}
        <div className="flex gap-4 mt-6 justify-center">
          <Button color="light" onClick={shareOnTwitter}>
            <FaTwitter size={20} /> {t("sylvanaModernLiving.share.twitter")}
          </Button>
          <Button color="light" onClick={shareOnFacebook}>
            <FaFacebook size={20} /> {t("sylvanaModernLiving.share.facebook")}
          </Button>
          <Button color="light" onClick={shareOnLinkedIn}>
            <FaLinkedin size={20} /> {t("sylvanaModernLiving.share.linkedin")}
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
