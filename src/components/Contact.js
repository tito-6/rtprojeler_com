"use client";

import { useEffect, useState, useRef } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Lottie from "lottie-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";
import { FaSmile, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Helper function to read cookies (for fbc and fbp)
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export default function Contact() {
  const { t } = useTranslation("common");
  const [animationData, setAnimationData] = useState(null);
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [fingerprint, setFingerprint] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    unitType: "",
    message: "",
    privacyPolicy: false,
  });
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  // Warnings state for form validation errors
  const [warnings, setWarnings] = useState({
    phone: "",
    email: "",
    recaptcha: "",
    language: "",
    privacyPolicy: "",
    formSubmit: "",
  });

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaRef = useRef(null);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Load FingerprintJS for visitor ID
  useEffect(() => {
    const fetchFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setFingerprint(result.visitorId);
      } catch (error) {
        console.error("FingerprintJS error:", error);
      }
    };
    fetchFingerprint();
  }, []);

  // Load Lottie animation data
  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/animations/contact-us.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };
    fetchAnimation();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "appointment") {
      setIsBooking(checked);
    }
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      [name]: "",
    }));
  };

  // Handle language selection
  const handleLanguageChange = (language) => {
    setLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      language: "",
    }));
  };

  // Handle ReCAPTCHA token
  const handleRecaptcha = (token) => {
    setRecaptchaValue(token);
    submitForm(token);
  };

  // Validate phone number using libphonenumber-js
  const validatePhoneNumber = (value, countryCode) => {
    setPhone(value);
    const cleanedPhone = `+${value.replace(/\D/g, "")}`;
    const phoneNumberObj = parsePhoneNumberFromString(cleanedPhone, countryCode);
    const valid = phoneNumberObj ? phoneNumberObj.isValid() : false;
    setIsPhoneValid(valid);
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      phone: valid ? "" : t("contactpage.form.phoneInvalid"),
    }));
  };

  // Validate email format
  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle email input changes
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
    const valid = validateEmailFormat(value);
    setIsEmailValid(valid);
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      email: valid ? "" : t("contactpage.form.emailInvalid"),
    }));
  };

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setWarnings({
      phone: "",
      email: "",
      recaptcha: "",
      language: "",
      privacyPolicy: "",
      formSubmit: "",
    });
    let hasError = false;
    if (!isPhoneValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        phone: t("contactpage.form.phoneInvalid"),
      }));
      hasError = true;
    }
    if (!isEmailValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: t("contactpage.form.emailInvalid"),
      }));
      hasError = true;
    }
    if (languages.length === 0) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        language: t("contactpage.form.languageError"),
      }));
      hasError = true;
    }
    if (!formData.privacyPolicy) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        privacyPolicy: t("contactpage.form.privacyPolicyError"),
      }));
      hasError = true;
    }
    if (hasError) return;
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  };

  // Submit the form data after ReCAPTCHA verification
  const submitForm = async (token) => {
    if (!isPhoneValid || !isEmailValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        formSubmit: t("contactpage.form.submitError"),
      }));
      return;
    }
    if (!token) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        recaptcha: t("contactpage.form.recaptchaError"),
      }));
      return;
    }
    if (languages.length === 0) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        language: t("contactpage.form.languageError"),
      }));
      return;
    }
    if (!formData.privacyPolicy) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        privacyPolicy: t("contactpage.form.privacyPolicyError"),
      }));
      return;
    }

    const appointmentFormatted = appointmentDate
      ? moment(appointmentDate).format("MMMM Do YYYY, h:mm a")
      : t("contactpage.form.noAppointment");

    // Build lead details for your contact API
    const leadDetails = {
      name: formData.name,
      email: formData.email,
      phone,
      project: formData.project,
      unitType: formData.unitType,
      message: formData.message,
      appointmentDate: appointmentFormatted,
      languages,
      acceptMarketing,
      recaptchaToken: token,
      fingerprint
    };

    try {
      // 1. Submit contact form data
      const response = await fetch("/api/bize-ulasin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadDetails),
      });

      if (response.ok) {
        // 2. Trigger the Conversions API event after successful form submission
        const conversionPayload = {
          eventName: "Lead",
          eventTime: Math.floor(Date.now() / 1000),
          userData: {
            email: formData.email,
            phone,
            // Pass fbc and fbp from cookies if available
            fbc: getCookie("fbc"),
            fbp: getCookie("fbp")
          },
          customData: {
            project: formData.project,
            unitType: formData.unitType
          },
          eventSourceUrl: window.location.href,
          testEventCode: "TEST38507"
        };

        const convResponse = await fetch("/api/conversions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(conversionPayload),
        });

        const convResult = await convResponse.json();
        console.log("Conversions API response:", convResult);

        // Redirect after success
        window.location.href = "/thank-you";
      } else {
        const errorData = await response.json();
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          formSubmit: errorData.message || t("contactpage.form.submitError"),
        }));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        formSubmit: t("contactpage.form.submitError"),
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative z-10">
      {/* Header Section */}
      <header
        className="w-full h-[75vh] bg-cover bg-center flex flex-col justify-center items-center relative z-10"
        style={{ backgroundImage: "url('/assets/images/contact-bottom-graphic.webp')" }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0"></div>
        <div className="z-10 relative text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            {t("contactpage.header.title")}
          </h1>
          <p className="text-lg text-gray-200">{t("contactpage.header.subtitle")}</p>
          <p className="text-lg text-gray-200 mt-2">{t("contactpage.header.message")}</p>
        </div>
      </header>

      {/* Contact Form Section */}
      <div className="container mx-auto py-12 px-4 lg:px-0 flex flex-col justify-center items-center relative z-20">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="w-full flex justify-center mb-6">
            {animationData ? (
              <Lottie animationData={animationData} loop={true} className="w-full max-w-md" />
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            {t("contactpage.form.contactTitle")}
          </h2>

          <form onSubmit={handleFormSubmit} className="relative">
            {/* Name and Email Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {t("contactpage.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contactpage.form.namePlaceholder")}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {t("contactpage.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder={t("contactpage.form.emailPlaceholder")}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                />
                {warnings.email && <p className="text-red-500 text-sm mt-1">{warnings.email}</p>}
              </div>
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {t("contactpage.form.phone")}
              </label>
              <PhoneInput
                country={"tr"}
                value={phone}
                onChange={(value, country) => validatePhoneNumber(value, country.countryCode)}
                inputClass="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                enableSearch={true}
                placeholder={t("contactpage.form.phonePlaceholder")}
                required
              />
              {warnings.phone && <p className="text-red-500 text-sm mt-1">{warnings.phone}</p>}
            </div>

            {/* Project Selection */}
            <div className="mb-4">
              <label htmlFor="project" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {t("contactpage.form.selectProject")}
              </label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                required
              >
                <option value="">{t("contactpage.form.selectProjectPlaceholder")}</option>
                <option value="Afra Park">{t("contactpage.form.afraPark")}</option>
                <option value="Sylvana Istanbul">{t("contactpage.form.sylvanaIstanbul")}</option>
                <option value="Arabian Ranches">{t("contactpage.form.arabianranches")}</option>
                <option value="Other">{t("contactpage.form.other")}</option>
              </select>
            </div>

            {/* Unit Type Selection */}
            <div className="mb-4">
              <label htmlFor="unitType" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {t("contactpage.form.unitType")}
              </label>
              <select
                id="unitType"
                name="unitType"
                value={formData.unitType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                required
              >
                <option value="">{t("contactpage.form.selectUnitType")}</option>
                <option value="2+1">2+1</option>
                <option value="3+1">3+1</option>
                <option value="3.5+1">3.5+1</option>
                <option value="4+1">4+1</option>
                <option value="Other">{t("contactpage.form.other")}</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {t("contactpage.form.messageLabel")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contactpage.form.messagePlaceholder")}
                rows="5"
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
              />
            </div>

            {/* Language Preference */}
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {t("contactpage.form.languagePreference")}
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("English")}
                  className={`px-3 py-2 rounded-md ${
                    languages.includes("English")
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  🇬🇧 {t("contactpage.form.english")}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("Turkish")}
                  className={`px-3 py-2 rounded-md ${
                    languages.includes("Turkish")
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  🇹🇷 {t("contactpage.form.turkish")}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("Arabic")}
                  className={`px-3 py-2 rounded-md ${
                    languages.includes("Arabic")
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  🇦🇪 {t("contactpage.form.arabic")}
                </button>
              </div>
              {warnings.language && <p className="text-red-500 text-sm mt-1">{warnings.language}</p>}
            </div>

            {/* Appointment Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="appointment"
                  checked={isBooking}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {t("contactpage.form.appointment")}
                </span>
              </label>
            </div>

            {/* Appointment Date Picker */}
            {isBooking && (
              <div className="mb-4 relative z-20">
                <label htmlFor="appointment" className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {t("contactpage.form.appointmentLabel")}
                </label>
                <DatePicker
                  selected={appointmentDate}
                  onChange={(date) => setAppointmentDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  minDate={new Date()}
                  maxDate={moment().add(2, "months").toDate()}
                  minTime={
                    appointmentDate &&
                    moment(appointmentDate).isSame(moment(), "day")
                      ? moment().isAfter(moment().set("hour", 9).set("minute", 0))
                        ? moment().toDate()
                        : moment().set("hour", 9).set("minute", 0).toDate()
                      : moment().set("hour", 9).set("minute", 0).toDate()
                  }
                  maxTime={moment().set("hour", 20).set("minute", 0).toDate()}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                  placeholderText={t("contactpage.form.appointmentPlaceholder")}
                  required
                />
                {appointmentDate && (
                  <p className="text-gray-500 text-sm mt-1">
                    {moment(appointmentDate).format("MMMM Do YYYY, h:mm a")}
                  </p>
                )}
              </div>
            )}

            {/* Marketing Consent */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={acceptMarketing}
                  onChange={(e) => setAcceptMarketing(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {t("contactpage.form.marketingConsent")}{" "}
                  <a
                    href="/kullanim-sartlari"
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("termsOfUse.title")}
                  </a>
                </span>
              </label>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {t("contactpage.form.privacyPolicy")}{" "}
                  <a
                    href="/gizlilik-politikasi"
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("mainLayout.privacyPolicy")}
                  </a>
                </span>
              </label>
              {warnings.privacyPolicy && <p className="text-red-500 text-sm mt-1">{warnings.privacyPolicy}</p>}
            </div>

            {/* Invisible ReCAPTCHA */}
            {recaptchaSiteKey && (
              <div className="hidden">
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={handleRecaptcha}
                  size="invisible"
                  ref={recaptchaRef}
                />
              </div>
            )}
            {warnings.recaptcha && <p className="text-red-500 text-sm mt-1">{warnings.recaptcha}</p>}
            {warnings.formSubmit && <p className="text-red-500 text-sm mb-4">{warnings.formSubmit}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500 transition duration-300"
            >
              {t("contactpage.form.submit")}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center flex flex-col justify-center items-center z-10"
        style={{ backgroundImage: "url('/assets/images/contact-bottom-graphic.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-20"></div>
        <div className="relative z-30 flex flex-col items-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <FaSmile className="text-yellow-300 text-4xl mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">
            {t("contactpage.footer.completion")}
          </h2>
          <p className="text-lg text-gray-200 text-center mb-4">
            {t("contactpage.footer.description")}
          </p>
          <FaCheckCircle className="text-green-400 text-4xl mb-2" />
          <p className="text-white italic">{t("contactpage.footer.journey")}</p>
        </div>
      </div>
    </div>
  );
}

// Server-side translations for i18next
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
