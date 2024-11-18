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

export default function RealEstateInvestmentTurkey() {
  const { t } = useTranslation("common");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(t("shareText"))}`,
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
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("realEstateInvestmentTurkey.title")}
        </h1>

        <div className="mb-6">
          <Image
            src="/assets/images/growth-real-estate-turkey.webp"
            alt={t("realEstateInvestmentTurkey.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("realEstateInvestmentTurkey.intro")}
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("realEstateInvestmentTurkey.keyDriversTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaMapMarkedAlt size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("realEstateInvestmentTurkey.features.strategicLocation")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("realEstateInvestmentTurkey.features.strategicLocationDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaBuilding size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("realEstateInvestmentTurkey.features.modernInfrastructure")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("realEstateInvestmentTurkey.features.modernInfrastructureDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaChartLine size={50} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("realEstateInvestmentTurkey.features.highReturnPotential")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("realEstateInvestmentTurkey.features.highReturnPotentialDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaUniversity size={50} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("realEstateInvestmentTurkey.features.qualityEducationHealthcare")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("realEstateInvestmentTurkey.features.qualityEducationHealthcareDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaUserShield size={50} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("realEstateInvestmentTurkey.features.citizenshipInvestment")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("realEstateInvestmentTurkey.features.citizenshipInvestmentDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaMountain size={50} className="text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("realEstateInvestmentTurkey.features.spectacularViews")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("realEstateInvestmentTurkey.features.spectacularViewsDesc")}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("realEstateInvestmentTurkey.investmentOpportunitiesTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("realEstateInvestmentTurkey.investmentOpportunitiesText")}
        </p>

        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
          <li>
            <strong>{t("realEstateInvestmentTurkey.locations.istanbul")}</strong> –{" "}
            {t("realEstateInvestmentTurkey.locations.istanbulDesc")}
          </li>
          <li>
            <strong>{t("realEstateInvestmentTurkey.locations.antalya")}</strong> –{" "}
            {t("realEstateInvestmentTurkey.locations.antalyaDesc")}
          </li>
          <li>
            <strong>{t("realEstateInvestmentTurkey.locations.ankara")}</strong> –{" "}
            {t("realEstateInvestmentTurkey.locations.ankaraDesc")}
          </li>
        </ul>

        <div className="mb-6">
          <Image
            src="/assets/images/turkey-real-estate-growth.webp"
            alt={t("realEstateInvestmentTurkey.supportingImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("realEstateInvestmentTurkey.resourcesTitle")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a
              href="https://www.invest.gov.tr/"
              className="text-blue-500 hover:underline"
            >
              {t("realEstateInvestmentTurkey.resources.investTurkey")}
            </a>{" "}
            – {t("realEstateInvestmentTurkey.resources.investTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.propertyturkey.com/"
              className="text-blue-500 hover:underline"
            >
              {t("realEstateInvestmentTurkey.resources.propertyTurkey")}
            </a>{" "}
            – {t("realEstateInvestmentTurkey.resources.propertyTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.turkeyhomes.com/"
              className="text-blue-500 hover:underline"
            >
              {t("realEstateInvestmentTurkey.resources.turkeyHomes")}
            </a>{" "}
            – {t("realEstateInvestmentTurkey.resources.turkeyHomesDesc")}
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
