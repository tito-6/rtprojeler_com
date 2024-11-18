import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { FaTwitter, FaFacebook, FaLinkedin, FaBullseye, FaHandshake, FaBuilding, FaGlobe, FaChartLine, FaHeart } from "react-icons/fa";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import htmlReactParser from "html-react-parser";

export default function ReportageTurkiyeVision() {
  const { t } = useTranslation("common");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(t("reportageTurkiyeVision.shareText"))}`,
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
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("reportageTurkiyeVision.title")}
        </h1>

        <div className="mb-6">
          <Image
            src="/assets/images/reportage-turkiye-vision.webp"
            alt={t("reportageTurkiyeVision.mainImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {htmlReactParser(t("reportageTurkiyeVision.intro"))}
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("reportageTurkiyeVision.missionTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <FaBullseye size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("reportageTurkiyeVision.vision")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("reportageTurkiyeVision.visionDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaHandshake size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("reportageTurkiyeVision.mission")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("reportageTurkiyeVision.missionDesc")}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("reportageTurkiyeVision.valuesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <FaBuilding size={50} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("reportageTurkiyeVision.innovation")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("reportageTurkiyeVision.innovationDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaHeart size={50} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("reportageTurkiyeVision.integrity")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("reportageTurkiyeVision.integrityDesc")}
            </p>
          </div>
          <div className="text-center">
            <FaGlobe size={50} className="text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("reportageTurkiyeVision.sustainability")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("reportageTurkiyeVision.sustainabilityDesc")}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("reportageTurkiyeVision.futureGoals")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("reportageTurkiyeVision.futureGoalsText")}
        </p>

        <div className="mb-6">
          <Image
            src="/assets/images/reportage-turkiye-future.webp"
            alt={t("reportageTurkiyeVision.futureImageAlt")}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("reportageTurkiyeVision.moreInfo")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
          <li>
            <a
              href="https://www.rtprojeler.com/"
              className="text-blue-500 hover:underline"
            >
              {t("reportageTurkiyeVision.officialSite")}
            </a>{" "}
            – {t("reportageTurkiyeVision.officialSiteDesc")}
          </li>
          <li>
            <a
              href="https://www.invest.gov.tr/en"
              className="text-blue-500 hover:underline"
            >
              {t("reportageTurkiyeVision.investTurkey")}
            </a>{" "}
            – {t("reportageTurkiyeVision.investTurkeyDesc")}
          </li>
          <li>
            <a
              href="https://www.propertyturkey.com/"
              className="text-blue-500 hover:underline"
            >
              {t("reportageTurkiyeVision.propertyTurkey")}
            </a>{" "}
            – {t("reportageTurkiyeVision.propertyTurkeyDesc")}
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
