import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import htmlReactParser from "html-react-parser";

export default function ReportageTurkiyeLuxury() {
  const { t } = useTranslation("common");
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  // Social share URLs
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentURL
      )}&text=${encodeURIComponent(t("reportageTurkiyeLuxury.shareText"))}`,
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
          {t("reportageTurkiyeLuxury.title")}
        </h1>

        {/* Main Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/istanbul-real-estate.webp"
            alt={t("reportageTurkiyeLuxury.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("reportageTurkiyeLuxury.intro")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("reportageTurkiyeLuxury.featuresTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("reportageTurkiyeLuxury.featuresText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("reportageTurkiyeLuxury.projelerTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {htmlReactParser(t("reportageTurkiyeLuxury.projelerText"))}
        </p>

        {/* Secondary Image */}
        <div className="mb-6">
          <Image
            src="/assets/images/istanbul-investment.webp"
            alt={t("reportageTurkiyeLuxury.secondaryImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("reportageTurkiyeLuxury.lifestyleTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("reportageTurkiyeLuxury.lifestyleText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("reportageTurkiyeLuxury.investmentTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("reportageTurkiyeLuxury.investmentText")}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("reportageTurkiyeLuxury.exploreMoreTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {htmlReactParser(t("reportageTurkiyeLuxury.exploreMoreText"))}{" "}
          <a
            href="https://www.invest.gov.tr/"
            className="text-blue-500 hover:underline"
          >
            {t("reportageTurkiyeLuxury.investTurkey")}
          </a>
        </p>

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
