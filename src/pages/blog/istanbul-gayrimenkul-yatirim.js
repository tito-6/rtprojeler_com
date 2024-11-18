import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function InvestingIstanbulRealEstatePage() {
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
      )}&text=${encodeURIComponent(t("investing.shareText"))}`,
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
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {t("investing.title")}
        </h1>

        <div className="mb-6">
          <Image
            src="/assets/images/istanbul-real-estate.webp"
            alt={t("investing.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investing.description")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("investing.whyInvestTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investing.whyInvestText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("investing.investInTurkeyInfoTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investing.investInTurkeyInfoText1")}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investing.investInTurkeyInfoText2")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("investing.keyAreasTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t("investing.bosphorus")}</strong>: {t("investing.bosphorusDesc")}
          <br />
          <strong>{t("investing.bahcesehirBeylikduzu")}</strong>: {t("investing.bahcesehirBeylikduzuDesc")}
          <br />
          <strong>{t("investing.cityCenter")}</strong>: {t("investing.cityCenterDesc")}
        </p>

        <div className="mb-6">
          <Image
            src="/assets/images/istanbul-investment.webp"
            alt={t("investing.secondaryImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("investing.trendsTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("investing.trendsText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("investing.resourcesTitle")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a
              href="https://www.propertyturkey.com/"
              className="text-blue-500 hover:underline"
            >
              {t("investing.resources.propertyTurkey")}
            </a>{" "}
            – {t("investing.resources.propertyTurkeyDescription")}
          </li>
          <li>
            <a
              href="https://www.invest.gov.tr/"
              className="text-blue-500 hover:underline"
            >
              {t("investing.resources.investTurkey")}
            </a>{" "}
            – {t("investing.resources.investTurkeyDescription")}
          </li>
          <li>
            <a
              href="https://www.turkeyhomes.com/"
              className="text-blue-500 hover:underline"
            >
              {t("investing.resources.turkeyHomes")}
            </a>{" "}
            – {t("investing.resources.turkeyHomesDescription")}
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
