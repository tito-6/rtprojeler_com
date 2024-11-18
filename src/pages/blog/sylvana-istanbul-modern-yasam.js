import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaTree,
  FaCouch,
  FaShieldAlt,
  FaCity,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SylvanaIstanbulModernLiving() {
  const { t } = useTranslation("common");
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  // Social share handlers
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentURL
      )}&text=${encodeURIComponent(t("sylvanaModernLiving.shareText"))}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentURL
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentURL
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("sylvanaModernLiving.title")}
        </h1>

        {/* Main Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/sylvana-istanbul.webp"
            alt={t("sylvanaModernLiving.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("sylvanaModernLiving.intro")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("sylvanaModernLiving.elegantLifestyleTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("sylvanaModernLiving.elegantLifestyleText")}
        </p>

        {/* Key Features Icons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaTree size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("sylvanaModernLiving.features.greenSpaces")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("sylvanaModernLiving.features.greenSpacesDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaCouch size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("sylvanaModernLiving.features.luxuryInteriors")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("sylvanaModernLiving.features.luxuryInteriorsDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaShieldAlt size={50} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("sylvanaModernLiving.features.security")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("sylvanaModernLiving.features.securityDesc")}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t("sylvanaModernLiving.modernConvenienceTitle")}</strong>{" "}
          {t("sylvanaModernLiving.modernConvenienceText")}
        </p>

        {/* Supporting Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/sylvana-community.webp"
            alt={t("sylvanaModernLiving.communityImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("sylvanaModernLiving.whyChooseTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("sylvanaModernLiving.whyChooseText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("sylvanaModernLiving.nearbyLandmarksTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("sylvanaModernLiving.nearbyLandmarksText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("sylvanaModernLiving.reliableResourcesTitle")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a
              href="https://www.invest.gov.tr/"
              className="text-blue-500 hover:underline"
            >
              {t("sylvanaModernLiving.resources.investTurkey")}
            </a>{" "}
            – {t("sylvanaModernLiving.resources.investTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.propertyturkey.com/"
              className="text-blue-500 hover:underline"
            >
              {t("sylvanaModernLiving.resources.propertyTurkey")}
            </a>{" "}
            – {t("sylvanaModernLiving.resources.propertyTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.turkeyhomes.com/"
              className="text-blue-500 hover:underline"
            >
              {t("sylvanaModernLiving.resources.turkeyHomes")}
            </a>{" "}
            – {t("sylvanaModernLiving.resources.turkeyHomesDesc")}
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
