import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

// Helper function to send a conversion event for offer selection
async function sendOfferConversionEvent(offer, localizedOffer) {
  // Build the payload for the conversion event
  const payload = {
    eventName: "Offer", // Event name for offer selections
    eventTime: Math.floor(Date.now() / 1000),
    // Since this page doesn’t collect user personal data, we pass an empty object.
    // Your server endpoint will add client IP and user agent from request headers.
    userData: {},
    customData: {
      offer_id: offer.id,
      offer_name: localizedOffer.offername,
      discount_rate: offer.discount_rate,
      down_payment: offer.down_payment,
      installment_period: offer.months,
    },
    eventSourceUrl: window.location.href,
    testEventCode: "TEST_OFFER_SELECTION",
  };

  try {
    const response = await fetch("/api/conversions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log("Offer Conversions API response:", data);
  } catch (error) {
    console.error("Error sending offer conversion event:", error);
  }
}

export default function Offers({ onSelectOffer, selectedOffer }) {
  const { t, i18n } = useTranslation("common");

  // Static offer data
  const offersData = [
    {
      id: 1,
      offername: "Default Offer 1",
      tr: { offername: "Afra Park", image: "/assets/images/offer-tr-1.webp" },
      ar: { offername: "أفرا بارك", image: "/assets/images/offer-ar-1.webp" },
      image: "/assets/images/offer-default-1.webp",
      discount_rate: 20,
      down_payment: 30,
      months: 24,
    },
    {
      id: 2,
      offername: "Default Offer 2",
      tr: { offername: "Sylvana İstanbul", image: "/assets/images/offer-tr-2.webp" },
      ar: { offername: "سيلفانا اسطنبول", image: "/assets/images/offer-ar-2.webp" },
      image: "/assets/images/offer-default-2.webp",
      discount_rate: "0",
      down_payment: 28,
      months: 60,
    },
  ];

  // Get the appropriate localized offer details for the current locale
  const getLocalizedOffer = (offer) => {
    switch (i18n.language) {
      case "tr":
        return offer.tr || { offername: offer.offername, image: offer.image };
      case "ar":
        return offer.ar || { offername: offer.offername, image: offer.image };
      default:
        return { offername: offer.offername, image: offer.image };
    }
  };

  // When an offer is selected, call the onSelectOffer callback
  // and trigger the conversion event.
  const handleSelectOffer = async (offer) => {
    if (selectedOffer && selectedOffer.id === offer.id) {
      return;
    }
    // Get localized details for the offer
    const localizedOffer = getLocalizedOffer(offer);
    // Trigger the parent callback
    onSelectOffer(offer);
    // Send the conversion event for offer selection
    await sendOfferConversionEvent(offer, localizedOffer);
  };

  return (
    <section
      aria-labelledby="offers-heading"
      className="container mx-auto px-4 py-12 sm:py-16 lg:py-24"
    >
      <h1
        id="offers-heading"
        className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center"
      >
        {t("offers.title", "Available Offers")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {offersData.map((offer) => {
          const localizedOffer = getLocalizedOffer(offer);
          const isSelected = selectedOffer?.id === offer.id;

          return (
            <article
              key={offer.id}
              className={`offer-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl relative ${
                isSelected ? "border-4 border-blue-500" : ""
              }`}
            >
              {/* Offer Image */}
              <div className="relative w-full mb-4">
                <Image
                  src={localizedOffer.image}
                  alt={`${localizedOffer.offername} ${t("offer.altText", "Offer image")}`}
                  layout="responsive"
                  width={600}
                  height={400}
                  objectFit="cover"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 279px"
                  className="rounded-md transition-opacity duration-300"
                />
              </div>

              {/* Offer Details */}
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-2">
                {localizedOffer.offername}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {t("offer.discountRate", "Discount Rate")}:{" "}
                <span className="font-bold">{offer.discount_rate}%</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {t("offer.downPayment", "Down Payment")}:{" "}
                <span className="font-bold">{offer.down_payment}%</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {t("offer.installmentPeriod", "Installment Period")}:{" "}
                <span className="font-bold">
                  {offer.months} {t("offer.months", "months")}
                </span>
              </p>

              {/* Select Offer Button */}
              <button
                className={`mt-4 w-full text-white py-2 rounded-md transition-all duration-300 transform ${
                  isSelected
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-[#8c8c8c] hover:bg-[#8c8c8c] hover:scale-105 hover:shadow-lg"
                } focus:outline-none focus:ring-2 focus:ring-[#8c8c8c] focus:ring-opacity-50`}
                onClick={() => handleSelectOffer(offer)}
                aria-label={`${t("offer.selectOfferButton", "Select Offer")} ${localizedOffer.offername}`}
                disabled={isSelected}
              >
                {isSelected ? t("offer.selected", "Selected") : t("offer.selectOfferButton", "Select Offer")}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
