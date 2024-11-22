// src/components/OfferRequestForm.js

"use client"; // Ensures it's treated as a client-side component

import React, { useState } from "react";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaGoogle, FaTwitter, FaFacebook, FaYahoo } from "react-icons/fa";
import {
  auth,
  googleProvider,
  twitterProvider,
  facebookProvider,
  yahooProvider,
} from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parsePhoneNumberFromString } from "libphonenumber-js"; // Importing from libphonenumber-js

export default function OfferRequestForm({ selectedOffer }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clientMessage: "",
    marketingMessages: false,
    privacyPolicy: false,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [authMethod, setAuthMethod] = useState("");

  // Unified warnings state
  const [warnings, setWarnings] = useState({
    privacyPolicy: "",
    robot: "",
    auth: "",
    clientMessage: "",
    email: "",
    phone: "",
    formSubmit: "",
  });

  const [isHumanCheckboxChecked, setIsHumanCheckboxChecked] = useState(false);

  // Email validation using regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Phone validation using libphonenumber-js
  const validatePhone = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);
    return phoneNumber ? phoneNumber.isValid() : false;
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific warnings when user modifies the corresponding field
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      [name]: "",
      ...(name === "privacyPolicy" && { privacyPolicy: "" }),
      ...(name === "clientMessage" && { clientMessage: "" }),
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));

    if (validateEmail(value)) {
      setWarnings((prevWarnings) => ({ ...prevWarnings, email: "" }));
    } else {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: t("offerRequest.emailInvalid"),
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));

    if (validatePhone(value)) {
      setWarnings((prevWarnings) => ({ ...prevWarnings, phone: "" }));
    } else {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        phone: t("offerRequest.phoneInvalid"),
      }));
    }
  };

  const handleAuth = async (provider, method) => {
    if (isAuthInProgress) return;
    setIsAuthInProgress(true);

    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      setAuthMethod(method);
      alert(t("offerRequest.authSuccess", { method }));
      setWarnings((prevWarnings) => ({ ...prevWarnings, auth: "" }));
    } catch (error) {
      console.error("Authentication error:", error);
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        auth:
          error.code === "auth/popup-closed-by-user"
            ? t("offerRequest.authIncomplete")
            : t("offerRequest.authError", { method }),
      }));
    } finally {
      setIsAuthInProgress(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Reset form submission warnings
    setWarnings({
      privacyPolicy: "",
      robot: "",
      auth: "",
      clientMessage: "",
      email: "",
      phone: "",
      formSubmit: "",
    });

    let hasError = false;

    // Validate privacy policy
    if (!formData.privacyPolicy) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        privacyPolicy: t("offerRequest.termsWarning"),
      }));
      hasError = true;
    }

    // Validate human checkbox
    if (!isHumanCheckboxChecked) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        robot: t("offerRequest.robotWarning"),
      }));
      hasError = true;
    }

    // Validate authentication
    if (!isAuthenticated) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        auth: t("offerRequest.authWarning"),
      }));
      hasError = true;
    }

    // Validate client message
    if (!formData.clientMessage) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        clientMessage: t("offerRequest.clientMessageWarning"),
      }));
      hasError = true;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: t("offerRequest.emailInvalid"),
      }));
      hasError = true;
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        phone: t("offerRequest.phoneInvalid"),
      }));
      hasError = true;
    }

    if (hasError) return;

    // Prepare data for submission
    const leadDetails = {
      name: formData.name,
      email: formData.email,
      phone: `+${formData.phone}`,
      marketingMessages: formData.marketingMessages,
      offerDetails: selectedOffer, // Include selected offer details
      clientMessage: formData.clientMessage,
      authMethod,
    };

    try {
      const response = await fetch("/api/submit-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData); // Log the full error response here
        throw new Error(errorData.message || t("offerRequest.submitError"));
      }

      alert(t("offerRequest.submitSuccess"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        clientMessage: "",
        marketingMessages: false,
        privacyPolicy: false,
      });
      setIsAuthenticated(false);
      setIsHumanCheckboxChecked(false);
      router.push("/thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        formSubmit: error.message,
      }));
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t("offerRequest.title")}</h1>

      <form
        onSubmit={handleFormSubmit}
        className="space-y-6 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md"
      >
        {/* Name Field */}
        <div>
          <label className="block text-lg dark:text-white">{t("offerRequest.nameLabel")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field dark:bg-gray-700 dark:text-white w-full p-2 rounded-md"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-lg dark:text-white">{t("offerRequest.emailLabel")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange} // Updated handler
            required
            className="input-field dark:bg-gray-700 dark:text-white w-full p-2 rounded-md"
          />
          {warnings.email && <p className="text-red-500 text-sm">{warnings.email}</p>}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-lg dark:text-white">{t("offerRequest.phoneLabel")}</label>
          <PhoneInput
            country="tr"
            value={formData.phone}
            onChange={handlePhoneChange} // Updated handler
            inputStyle={{ width: "100%" }}
            enableSearch={true}
            required
          />
          {warnings.phone && <p className="text-red-500 text-sm">{warnings.phone}</p>}
        </div>

        {/* Client Message Field */}
        <div>
          <label className="block text-lg dark:text-white">{t("offerRequest.clientMessageLabel")}</label>
          <textarea
            name="clientMessage"
            value={formData.clientMessage}
            onChange={handleChange}
            required
            placeholder={t("offerRequest.clientMessagePlaceholder")}
            rows="4"
            className="input-field dark:bg-gray-700 dark:text-white w-full p-2 rounded-md"
          />
          {warnings.clientMessage && <p className="text-red-500 text-sm">{warnings.clientMessage}</p>}
        </div>

        {/* Marketing Messages Checkbox */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="marketingMessages"
              checked={formData.marketingMessages}
              onChange={handleChange}
            />
            <span className="ml-2 dark:text-white">{t("offerRequest.marketingMessagesText")}</span>
          </label>
        </div>

        {/* Human Verification Checkbox */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isHumanCheckboxChecked}
              onChange={(e) => {
                setIsHumanCheckboxChecked(e.target.checked);
                // Clear robot warning when checkbox is toggled
                setWarnings((prevWarnings) => ({
                  ...prevWarnings,
                  robot: "",
                }));
              }}
            />
            <span className="ml-2 dark:text-white">{t("offerRequest.humanCheckbox")}</span>
          </label>
          {warnings.robot && <p className="text-red-500 text-sm">{warnings.robot}</p>}
        </div>

        {/* Privacy Policy Checkbox */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={handleChange}
              required
            />
            <span className="ml-2 dark:text-white">
              {t("offerRequest.privacyPolicy")}{" "}
              <Link
                href="/gizlilik-politikasi"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("mainLayout.privacyPolicy")}
              </Link>
            </span>
          </label>
          {warnings.privacyPolicy && <p className="text-red-500 text-sm">{warnings.privacyPolicy}</p>}
        </div>

        {/* Social Authentication Buttons */}
        {isHumanCheckboxChecked && !isAuthenticated && (
          <div className="space-y-4 mt-4">
            <button
              type="button"
              onClick={() => handleAuth(googleProvider, "Google")}
              className="flex items-center justify-center w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
              disabled={isAuthInProgress}
            >
              <FaGoogle className="text-red-500 mr-2" /> {t("offerRequest.googleAuth")}
            </button>
            <button
              type="button"
              onClick={() => handleAuth(twitterProvider, "Twitter")}
              className="flex items-center justify-center w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
              disabled={isAuthInProgress}
            >
              <FaTwitter className="text-blue-500 mr-2" /> {t("offerRequest.twitterAuth")}
            </button>
            <button
              type="button"
              onClick={() => handleAuth(yahooProvider, "Yahoo")}
              className="flex items-center justify-center w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
              disabled={isAuthInProgress}
            >
              <FaYahoo className="text-purple-500 mr-2" /> {t("offerRequest.yahooAuth")}
            </button>
            <button
              type="button"
              onClick={() => handleAuth(facebookProvider, "Facebook")}
              className="flex items-center justify-center w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
              disabled={isAuthInProgress}
            >
              <FaFacebook className="text-blue-600 mr-2" /> {t("offerRequest.facebookAuth")}
            </button>
          </div>
        )}
        {warnings.auth && <p className="text-red-500 text-sm mt-2">{warnings.auth}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500 transition duration-300"
        >
          {t("offerRequest.submitButton")}
        </button>

        {/* Form Submission Warning */}
        {warnings.formSubmit && <p className="text-red-500 text-sm mb-4">{warnings.formSubmit}</p>}
      </form>
    </div>
  );
}

// Server-side translations for i18next
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
