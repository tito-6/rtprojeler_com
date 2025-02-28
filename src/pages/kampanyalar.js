// pages/kampanyalar.js

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
      <h1 className="text-4xl font-bold text-center mb-8">{t("ourOffers", "Our Offers")}</h1>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
        {t("offersDescription", "Choose from our range of exclusive offers tailored to your needs.")}
      </p>

      {/* Offers Cards Section */}
      <div className="mb-12">
        <Offers onSelectOffer={handleOfferSelection} selectedOffer={selectedOffer} />
      </div>

      {/* Display Selected Offer Summary */}
      {selectedOffer && (
        <div className="mb-12 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{t("selectedOffer", "Selected Offer")}</h2>
          <p><strong>{t("offer.name", "Offer Name")}:</strong> {selectedOffer.offername}</p>
          <p><strong>{t("offer.discountRate", "Discount Rate")}:</strong> {selectedOffer.discount_rate}%</p>
          <p><strong>{t("offer.downPayment", "Down Payment")}:</strong> {selectedOffer.down_payment}%</p>
          <p><strong>{t("offer.installmentPeriod", "Installment Period")}:</strong> {selectedOffer.months} {t("offer.months", "months")}</p>
        </div>
      )}

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
