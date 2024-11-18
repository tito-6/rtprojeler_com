import React, { useState } from "react";
import OfferRequestForm from "@/components/OfferRequestForm";
import Offers from "@/components/Offers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function OffersPage() {
  const { t } = useTranslation("common"); // Assuming "common" is the namespace used
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleOfferSelection = (offer) => {
    setSelectedOffer(offer);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t("ourOffers")}</h1>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
        {t("offersDescription")}
      </p>

      {/* Offers Cards Section */}
      <div className="mb-12">
        <Offers onSelectOffer={handleOfferSelection} />
      </div>

      {/* Offer Request Form */}
      {selectedOffer && (
        <div className="space-y-8">
          <OfferRequestForm selectedOffer={selectedOffer} />
        </div>
      )}
    </div>
  );
}

// Enable server-side translations
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])), // Load the "common" namespace
  },
});
