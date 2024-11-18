"use client"; // Ensures the component is treated as a client-side component

import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";
import Image from "next/image";

export default function Offers({ onSelectOffer }) {
  const { t, i18n } = useTranslation("common");
  const [offersData, setOffersData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch offers data from the Strapi API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offers?populate=*`
        );

        if (response?.data?.data) {
          setOffersData(response.data.data);
          console.log("Offers fetched successfully:", response.data.data);
        } else {
          console.error("Unexpected response structure:", response);
          setError("Failed to load offers. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching offers data from Strapi:", err);
        setError("Failed to fetch offers. Please try again later.");
      }
    };

    fetchOffers();
  }, [i18n.language]);

  // Handle the scenario when an error occurs while fetching the offers
  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  // Handle the scenario when no offers are available
  if (offersData.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {t("offers.noOffersAvailable", "We do not have any offers available at the moment.")}
      </p>
    );
  }

  return (
    <section
      aria-labelledby="offers-heading"
      className="container mx-auto px-4 py-12 sm:py-16 lg:py-24"
    >
      <h1
        id="offers-heading"
        className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center"
      >
        {t("offers.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {offersData.map((offer, index) => {
          const { id, Offers, discount_rate, down_payment, months, Project, ar_image, tr_image, image } = offer;

          // Determine the image URL to use based on the language and availability
          let imageUrl = null;

          if (i18n.language === "ar" && ar_image?.url) {
            imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${ar_image.url}`;
          } else if (i18n.language === "tr" && tr_image?.url) {
            imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${tr_image.url}`;
          } else if (image?.url) {
            imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${image.url}`;
          }

          if (!imageUrl) {
            console.warn(`No image URL found for offer: ${id}`);
          }

          return (
            <article
              key={id}
              className="offer-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-[#f0b453] to-[#f0b453] dark:hover:from-[#f0b453] dark:hover:to-[#f0b453] relative"
            >
              {/* Offer Image */}
              {imageUrl ? (
                <div className="relative w-full mb-4">
                  <Image
                    src={imageUrl}
                    alt={`${Project || "Offer"} ${t("offer.altText")}`}
                    layout="responsive"
                    width={600}
                    height={400}
                    objectFit="cover"
                    quality={75}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 279px"
                    className="rounded-md transition-opacity duration-300"
                  />
                </div>
              ) : (
                <p className="text-gray-500">No image available</p>
              )}

              {/* Offer Details */}
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-2">
                {Project || t("offers.unnamedOffer", "Unnamed Offer")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {t("offer.discountRate")}:{" "}
                <span className="font-bold">{discount_rate ?? "N/A"}%</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {t("offer.downPayment")}:{" "}
                <span className="font-bold">{down_payment ?? "N/A"}%</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {t("offer.installmentPeriod")}:{" "}
                <span className="font-bold">
                  {months ?? "N/A"} {t("offer.months")}
                </span>
              </p>

              {/* Select Offer Button */}
              <button
                className="mt-4 w-full bg-[#8c8c8c] hover:bg-[#8c8c8c] text-white py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8c8c8c] focus:ring-opacity-50"
                onClick={() => onSelectOffer(offer)}
                aria-label={`${t("offer.selectOfferButton")} ${Project || "Offer"}`}
              >
                {t("offer.selectOfferButton")}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
