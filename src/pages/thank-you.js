import {
    FaSmileBeam,
    FaHome,
    FaEnvelopeOpenText,
    FaThumbsUp,
  } from "react-icons/fa";
  import Link from "next/link";
  import { useState, useEffect } from "react";
  import { useTranslation } from "next-i18next";
  import { serverSideTranslations } from "next-i18next/serverSideTranslations";
  
  export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
  
  export default function ThankYou() {
    const { t } = useTranslation("common");
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    // Toggle dark mode
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    };
  
    useEffect(() => {
      const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(darkModePreference);
      if (darkModePreference) {
        document.documentElement.classList.add("dark");
      }
    }, []);
  
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center text-center px-4 relative ${isDarkMode ? "dark" : ""}`}
      >
        {/* Background with Turkish Flag */}
        <div className="absolute inset-0 z-0 waving-flag-container">
          <div className="w-full h-full waving-flag bg-cover bg-center opacity-40" />
        </div>
  
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center">
          <FaSmileBeam className="text-6xl mb-4 animate-bounce text-green-500 dark:text-green-300" />
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t("thankYou.title")}
          </h1>
          <p className="text-lg max-w-lg text-gray-800 dark:text-gray-300">
            {t("thankYou.message")}
          </p>
  
          {/* Illustration */}
          <div className="mb-8 flex flex-col items-center">
            <FaThumbsUp className="text-8xl text-green-500 dark:text-green-300 mb-4 animate-pulse" />
            <p className="italic text-lg text-gray-800 dark:text-gray-300">
              {t("thankYou.journey")}
            </p>
          </div>
  
          {/* Call to Action */}
          <div className="mt-8 flex gap-6 justify-center">
            <Link href="/" legacyBehavior>
              <a className="bg-white text-green-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white transition duration-300 ease-in-out flex items-center justify-center">
                <FaHome className="mr-2" /> {t("thankYou.backToHome")}
              </a>
            </Link>
            <Link href="/projeler" legacyBehavior>
              <a className="bg-white text-green-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white transition duration-300 ease-in-out flex items-center justify-center">
                <FaEnvelopeOpenText className="mr-2" /> {t("thankYou.exploreprojeler")}
              </a>
            </Link>
          </div>
        </div>
  
        {/* CSS for Waving Effect */}
        <style jsx>{`
          .waving-flag-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
  
          .waving-flag {
            background-image: url("/assets/images/turkish-flag.webp"); /* Full Turkish flag image */
            animation: wave 10s infinite linear;
          }
  
          @keyframes wave {
            0% {
              background-position: 0 0;
            }
            50% {
              background-position: 100% 0;
            }
            100% {
              background-position: 0 0;
            }
          }
        `}</style>
      </div>
    );
  }
  