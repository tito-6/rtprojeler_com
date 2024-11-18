import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaTree,
  FaSwimmingPool,
  FaUserShield,
} from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AfraParkBahcesehir() {
  const { t } = useTranslation("common");
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentURL
      )}&text=${encodeURIComponent(t("afraPark.shareText"))}`,
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
          {t("afraPark.title")}
        </h1>

        <div className="mb-6">
          <Image
            src="/assets/images/afra-park-bahcesehir.webp"
            alt={t("afraPark.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("afraPark.description")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("afraPark.whyChoose")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("afraPark.whyChooseText")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaTree size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("afraPark.features.greenSpaces")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("afraPark.features.greenSpacesDescription")}
            </p>
          </div>
          <div className="text-center">
            <FaSwimmingPool size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("afraPark.features.privateAmenities")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("afraPark.features.privateAmenitiesDescription")}
            </p>
          </div>
          <div className="text-center">
            <FaUserShield size={50} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("afraPark.features.security")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("afraPark.features.securityDescription")}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t("afraPark.investmentPotentialTitle")}</strong>{" "}
          {t("afraPark.investmentPotentialText")}
        </p>

        <div className="mb-6">
          <Image
            src="/assets/images/bahcesehir-community.webp"
            alt={t("afraPark.communityImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("afraPark.lifestyleTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("afraPark.lifestyleText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("afraPark.nearbyAttractionsTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("afraPark.nearbyAttractionsText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("afraPark.resourcesTitle")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a
              href="https://www.propertyturkey.com/"
              className="text-blue-500 hover:underline"
            >
              {t("afraPark.resources.propertyTurkey")}
            </a>{" "}
            – {t("afraPark.resources.propertyTurkeyDescription")}
          </li>
          <li>
            <a
              href="https://www.invest.gov.tr/"
              className="text-blue-500 hover:underline"
            >
              {t("afraPark.resources.investTurkey")}
            </a>{" "}
            – {t("afraPark.resources.investTurkeyDescription")}
          </li>
          <li>
            <a
              href="https://www.turkeyhomes.com/"
              className="text-blue-500 hover:underline"
            >
              {t("afraPark.resources.turkeyHomes")}
            </a>{" "}
            – {t("afraPark.resources.turkeyHomesDescription")}
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
