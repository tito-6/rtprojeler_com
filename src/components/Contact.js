"use client"; // Ensures it's treated as a client-side component

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "next-i18next";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Lottie from "lottie-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";
import { parsePhoneNumberFromString } from "libphonenumber-js"; // Importing from libphonenumber-js

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

  // Extended warnings state to include email and phone warnings
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

  // Additional state for email validation
  const [isEmailValid, setIsEmailValid] = useState(false);

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

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "appointment") {
      setIsBooking(checked);
    }

    // Clear specific warnings when user modifies the corresponding field
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      [name]: "",
    }));
  };

  // Handler for language selection
  const handleLanguageChange = (language) => {
    setLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );

    // Clear language warning when languages are selected/deselected
    setWarnings((prevWarnings) => ({
      ...prevWarnings,
      language: "",
    }));
  };

  // Function to validate phone number using libphonenumber-js
  const validatePhoneNumber = (value, countryCode) => {
    setPhone(value);

    // Remove any non-digit characters
    const cleanedPhone = `+${value.replace(/\D/g, "")}`;

    // Use the detected or selected country code
    const phoneNumberObj = parsePhoneNumberFromString(cleanedPhone, countryCode);
    const valid = phoneNumberObj ? phoneNumberObj.isValid() : false;

    setIsPhoneValid(valid);

    // Update warnings based on validation
    if (valid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        phone: "",
      }));
    } else {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        phone: t("contactpage.form.phoneInvalid"),
      }));
    }
  };

  // Function to validate email format using regex
  const validateEmailFormat = (email) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handler for email input changes
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
    const isValid = validateEmailFormat(value);
    setIsEmailValid(isValid);

    // Update warnings based on validation
    if (isValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: "",
      }));
    } else {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: t("contactpage.form.emailInvalid"),
      }));
    }
  };

  // Handler for ReCAPTCHA
  const handleRecaptcha = (token) => {
    setRecaptchaValue(token);
    // After obtaining the token, proceed to submit the form
    submitForm(token);
  };

  // Handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Reset form warnings
    setWarnings({
      phone: "",
      email: "",
      recaptcha: "",
      language: "",
      privacyPolicy: "",
      formSubmit: "",
    });

    let hasError = false;

    // Validate phone
    if (!isPhoneValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        phone: t("contactpage.form.phoneInvalid"),
      }));
      hasError = true;
    }

    // Validate email
    if (!isEmailValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: t("contact.emailInvalid"),
      }));
      hasError = true;
    }

    // Validate language preference
    if (languages.length === 0) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        language: t("contact.languageError"),
      }));
      hasError = true;
    }

    // Validate privacy policy acceptance
    if (!formData.privacyPolicy) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        privacyPolicy: t("contact.privacyPolicyError"),
      }));
      hasError = true;
    }

    if (hasError) return;

    // Proceed with ReCAPTCHA verification
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  };

  // Function to handle form submission after ReCAPTCHA verification
  const submitForm = async (token) => {
    if (!isPhoneValid || !isEmailValid) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        formSubmit: t("contact.submitError"),
      }));
      return;
    }

    if (!token) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        recaptcha: t("contact.recaptchaError"),
      }));
      return;
    }

    if (languages.length === 0) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        language: t("contact.languageError"),
      }));
      return;
    }

    if (!formData.privacyPolicy) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        privacyPolicy: t("contact.privacyPolicyError"),
      }));
      return;
    }

    const appointmentFormatted = appointmentDate
      ? moment(appointmentDate).format("MMMM Do YYYY, h:mm a")
      : t("contact.noAppointment");

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
      fingerprint,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadDetails),
      });

      if (response.ok) {
        window.location.href = "/thank-you";
      } else {
        const errorData = await response.json();
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          formSubmit: errorData.message || t("contact.submitError"),
        }));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        formSubmit: t("contact.submitError"),
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="container mx-auto py-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="w-full flex justify-center mb-6">
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-full max-w-md"
              />
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            {t("contact.title")}
          </h2>

          <form onSubmit={handleFormSubmit} className="relative">
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("contact.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact.namePlaceholder")}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("contact.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleEmailChange} // Updated handler
                placeholder={t("contact.emailPlaceholder")}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
              />
              {warnings.email && (
                <p className="text-red-500 text-sm mt-1">{warnings.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("contact.phone")}
              </label>
              <PhoneInput
                country={"tr"}
                value={phone}
                onChange={(value, country) =>
                  validatePhoneNumber(value, country.countryCode)
                } // Updated handler
                inputClass="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                enableSearch={true}
                placeholder={t("contact.phonePlaceholder")}
                required
              />
              {warnings.phone && (
                <p className="text-red-500 text-sm mt-1">{warnings.phone}</p>
              )}
            </div>

            {/* Project Selection */}
            <div className="mb-4">
              <label
                htmlFor="project"
                className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("contact.project")}
              </label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                required
              >
                <option value="">{t("contact.projectPlaceholder")}</option>
                <option value="Afra Park">Afra Park</option>
                <option value="Sylvana Istanbul">Sylvana Istanbul</option>
                <option value="Arabian Ranches">
                  {t("contact.arabianranches")}
                </option>
                <option value="Other">{t("contact.other")}</option>
              </select>
            </div>

            {/* Unit Type Selection */}
            <div className="mb-4">
              <label
                htmlFor="unitType"
                className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("contact.unitType")}
              </label>
              <select
                id="unitType"
                name="unitType"
                value={formData.unitType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                required
              >
                <option value="">{t("contact.unitTypePlaceholder")}</option>
                <option value="2+1">2+1</option>
                <option value="3+1">3+1</option>
                <option value="3.5+1">3.5+1</option>
                <option value="4+1">4+1</option>
                <option value="Other">{t("contact.other")}</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.messagePlaceholder")}
                rows="5"
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
              />
            </div>

            {/* Language Preference */}
<div className="mb-4">
  <label className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
    {t("contact.languageSelect")}
  </label>
  <div className="flex space-x-4">
    {/* Turkish Language Button - First Option */}
    <button
      type="button"
      onClick={() => handleLanguageChange("Turkish")}
      className={`px-4 py-2 rounded-md ${
        languages.includes("Turkish")
          ? "bg-blue-600 text-white"
          : "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300"
      }`}
      aria-pressed={languages.includes("Turkish")}
      aria-label={t("contact.turkish")}
    >
      🇹🇷 {t("contact.turkish")}
    </button>

    {/* English Language Button */}
    <button
      type="button"
      onClick={() => handleLanguageChange("English")}
      className={`px-4 py-2 rounded-md ${
        languages.includes("English")
          ? "bg-blue-600 text-white"
          : "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300"
      }`}
      aria-pressed={languages.includes("English")}
      aria-label={t("contact.english")}
    >
      🇬🇧 {t("contact.english")}
    </button>

    {/* Arabic Language Button with Palestine Flag */}
    <button
      type="button"
      onClick={() => handleLanguageChange("Arabic")}
      className={`px-4 py-2 rounded-md ${
        languages.includes("Arabic")
          ? "bg-blue-600 text-white"
          : "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300"
      }`}
      aria-pressed={languages.includes("Arabic")}
      aria-label={t("contact.arabic")}
    >
      🇵🇸 {t("contact.arabic")}
    </button>
  </div>
  {warnings.language && (
    <p className="text-red-500 text-sm mt-1">{warnings.language}</p>
  )}
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
                  {t("contact.appointment")}
                </span>
              </label>
            </div>

            {/* Appointment Date Picker */}
            {isBooking && (
              <div className="mb-4">
                <label
                  htmlFor="appointment"
                  className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
                >
                  {t("contact.appointmentDate")}
                </label>
                <DatePicker
                  selected={appointmentDate}
                  onChange={(date) => setAppointmentDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  minDate={new Date()}
                  maxDate={moment().add(2, "months").toDate()}
                  minTime={moment().set("hour", 9).set("minute", 0).toDate()}
                  maxTime={moment().set("hour", 20).set("minute", 0).toDate()}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-300"
                  placeholderText={t("contact.selectDate")}
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
                  {t("contact.acceptMarketing")}
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
                  {t("contact.privacyPolicy")}
                </span>
              </label>
              {warnings.privacyPolicy && (
                <p className="text-red-500 text-sm mt-1">
                  {warnings.privacyPolicy}
                </p>
              )}
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
            {warnings.recaptcha && (
              <p className="text-red-500 text-sm mt-1">{warnings.recaptcha}</p>
            )}

            {/* Form Submission Warning */}
            {warnings.formSubmit && (
              <p className="text-red-500 text-sm mb-4">{warnings.formSubmit}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500 transition duration-300"
            >
              {t("contact.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
