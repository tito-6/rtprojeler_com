import {
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaLeaf,
    FaRecycle,
    FaWater,
    FaTree,
    FaSolarPanel,
    FaBuilding,
  } from "react-icons/fa";
  import { Card, Button } from "flowbite-react";
  import Image from "next/image";
  import { useEffect, useState } from "react";
  import { useTranslation } from "next-i18next";
  import { serverSideTranslations } from "next-i18next/serverSideTranslations";
  
  export default function SustainableLivingIstanbul() {
    const { t } = useTranslation("common");
    const [currentUrl, setCurrentUrl] = useState("");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        setCurrentUrl(window.location.href);
      }
    }, []);
  
    // Social share URLs
    const shareOnTwitter = () => {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(t("sustainableLiving.shareText"))}`,
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
            {t("sustainableLiving.title")}
          </h1>
  
          <div className="mb-6">
            <Image
              src="/assets/images/sustainable-istanbul.webp"
              alt={t("sustainableLiving.mainImageAlt")}
              width={800}
              height={450}
              className="rounded-lg shadow-md mx-auto"
            />
          </div>
  
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("sustainableLiving.intro")}
          </p>
  
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("sustainableLiving.coreElementsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <FeatureCard icon={<FaLeaf size={50} className="text-green-500" />} title={t("sustainableLiving.features.greenHomes")} text={t("sustainableLiving.features.greenHomesDesc")} />
            <FeatureCard icon={<FaSolarPanel size={50} className="text-yellow-500" />} title={t("sustainableLiving.features.renewableEnergy")} text={t("sustainableLiving.features.renewableEnergyDesc")} />
            <FeatureCard icon={<FaWater size={50} className="text-blue-500" />} title={t("sustainableLiving.features.waterConservation")} text={t("sustainableLiving.features.waterConservationDesc")} />
            <FeatureCard icon={<FaRecycle size={50} className="text-teal-500" />} title={t("sustainableLiving.features.wasteManagement")} text={t("sustainableLiving.features.wasteManagementDesc")} />
            <FeatureCard icon={<FaTree size={50} className="text-green-600" />} title={t("sustainableLiving.features.urbanGreenSpaces")} text={t("sustainableLiving.features.urbanGreenSpacesDesc")} />
            <FeatureCard icon={<FaBuilding size={50} className="text-gray-500" />} title={t("sustainableLiving.features.smartInfrastructure")} text={t("sustainableLiving.features.smartInfrastructureDesc")} />
          </div>
  
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("sustainableLiving.benefitsTitle")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("sustainableLiving.benefitsText")}
          </p>
  
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("sustainableLiving.caseStudyTitle")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("sustainableLiving.caseStudyText")}
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
  
  function FeatureCard({ icon, title, text }) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    );
  }
  
  // Server-side translations
  export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  });
  