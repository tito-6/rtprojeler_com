// pages/_app.js or your main layout file
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Flag from "react-world-flags"; // Ensure this package is installed: npm install react-world-flags
import {
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeAltIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import {
  Footer,
  FooterTitle,
  FooterLinkGroup,
  FooterLink,
  FooterDivider,
  FooterCopyright,
  FooterIcon,
  FooterBrand,
} from "../components/FooterComponents"; // Adjust the import path accordingly
export default function MainLayout({ children }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProjelerDropdownOpen, setProjelerDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navbarRef = useRef(null);

  // Toggle navigation menu
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  // Close all dropdowns and navigation
  const closeNav = () => {
    setIsNavOpen(false);
    setProjelerDropdownOpen(false);
    setBlogDropdownOpen(false);
    setIsLangDropdownOpen(false);
  };

  // Switch application language
  const switchLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
    closeNav();
  };

  // Toggle dark mode and persist preference
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  // Initialize dark mode based on user's system preference or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const prefersDark = savedTheme === "dark";
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <nav
        ref={navbarRef}
        className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Brand */}
          <Link href="/" className="flex items-center" onClick={closeNav}>
            <span className="text-2xl font-semibold dark:text-white">
              {t("mainLayout.brandName")}
            </span>
          </Link>

          {/* Controls: Language Switcher & Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded focus:outline-none"
                aria-label="Language Switcher"
                aria-haspopup="true"
                aria-expanded={isLangDropdownOpen}
              >
                <GlobeAltIcon className="w-5 h-5 mr-1" />
                {router.locale.toUpperCase()}
                {isLangDropdownOpen ? (
                  <ChevronUpIcon className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                )}
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-56">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {/* Language options */}
                    {[
                      { code: "tr", label: "Türkçe", flag: "TR" },
                      { code: "en", label: "English", flag: "GB" },
                      { code: "ar", label: "العربية", flag: "PS" },
                      { code: "de", label: "Deutsch", flag: "DE" },
                      { code: "es", label: "Español", flag: "ES" },
                      { code: "fa", label: "فارسی", flag: "IR" },
                      { code: "nl", label: "Nederlands", flag: "NL" },
                      { code: "ru", label: "Русский", flag: "RU" },
                      { code: "zh", label: "中文", flag: "CN" },
                      { code: "fr", label: "Français", flag: "FR" },
                    ].map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={() => switchLanguage(lang.code)}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                        >
                          <Flag code={lang.flag} className="w-5 h-5 mr-2" />
                          {lang.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={toggleNav}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Toggle navigation"
            aria-expanded={isNavOpen}
          >
            {isNavOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>

          {/* Navbar Links */}
          <div
            className={`w-full md:block md:w-auto ${
              isNavOpen ? "block" : "hidden"
            }`}
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
              {/* Home Link */}
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={closeNav}
                >
                  {t("mainLayout.home")}
                </Link>
              </li>

              {/* Projeler Dropdown */}
              <li className="relative">
                <div className="flex items-center">
                  {/* Parent Link */}
                  <Link
                    href="/projeler"
                    className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onClick={closeNav}
                  >
                    {t("mainLayout.projeler")}
                  </Link>
                  {/* Dropdown Toggle */}
                  <button
                    onClick={() => setProjelerDropdownOpen(!isProjelerDropdownOpen)}
                    className="px-2 focus:outline-none"
                    aria-label="Toggle Projeler Dropdown"
                  >
                    {isProjelerDropdownOpen ? (
                      <ChevronUpIcon className="w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isProjelerDropdownOpen && (
                  <div className="absolute z-10 mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-44">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          href="/projeler/sylvana-istanbul-bahcesehir"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.projelerylvana")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/projeler/afra-park-istanbul-bahcesehir"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.projectAfra")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/projeler/arabian-ranches"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.projectArabian")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Blog Dropdown */}
              <li className="relative">
                <div className="flex items-center">
                  {/* Parent Link */}
                  <Link
                    href="/blog"
                    className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onClick={closeNav}
                  >
                    {t("mainLayout.blog")}
                  </Link>
                  {/* Dropdown Toggle */}
                  <button
                    onClick={() => setBlogDropdownOpen(!isBlogDropdownOpen)}
                    className="px-2 focus:outline-none"
                    aria-label="Toggle Blog Dropdown"
                  >
                    {isBlogDropdownOpen ? (
                      <ChevronUpIcon className="w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isBlogDropdownOpen && (
                  <div className="absolute z-10 mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-44 overflow-y-scroll max-h-56">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          href="/blog/afra-park-bahcesehir"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogAfraPark")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/gayrimenkul-yatirim-2024"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogGayrimenkulYatirim2024")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/istanbul-gayrimenkul-yatirim"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogIstanbulGayrimenkulYatirim")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/istanbul-yatirim-cenneti"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogIstanbulYatirimCenneti")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/reportage-turkiye-luks"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogReportageTurkiyeLuks")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/reportage-turkiye-vizyon"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogReportageTurkiyeVizyon")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/surdurulebilir-yasam-istanbul"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogSurdurulebilirYasamIstanbul")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/sylvana-istanbul-modern-yasam"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogSylvanaIstanbulModernYasam")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/turkiye-gayrimenkul-buyumesi"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogTurkiyeGayrimenkulBuyumesi")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/turkiye-gayrimenkul-yatirim"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeNav}
                        >
                          {t("mainLayout.blogTurkiyeGayrimenkulYatirim")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Additional Links */}
              <li>
                <Link
                  href="/reportage-turkiye-insaat-guncellemeleri"
                  className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={closeNav}
                >
                  {t("mainLayout.constructionUpdates")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kampanyalar"
                  className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={closeNav}
                >
                  {t("mainLayout.offers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/bize-ulasin"
                  className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={closeNav}
                >
                  {t("mainLayout.contactUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto pt-16 pb-16 space-y-12 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
        {children}
      </main>

      <Footer container>
        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {/* About Section */}
            <div>
              <FooterTitle title={t("footer.about")} />
              <FooterLinkGroup col>
                <FooterLink href="/" ariaLabel={t("mainLayout.home")}>
                  {t("mainLayout.home")}
                </FooterLink>
                <FooterLink href="/bize-ulasin" ariaLabel={t("mainLayout.contactUs")}>
                  {t("mainLayout.contactUs")}
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Projects Section */}
            <div>
              <FooterTitle title={t("mainLayout.projeler")} />
              <FooterLinkGroup col>
                <FooterLink
                  href="/projeler/sylvana-istanbul-bahcesehir"
                  ariaLabel={t("mainLayout.projelerylvana")}
                >
                  {t("mainLayout.projelerylvana")}
                </FooterLink>
                <FooterLink
                  href="/projeler/afra-park-istanbul-bahcesehir"
                  ariaLabel={t("mainLayout.projectAfra")}
                >
                  {t("mainLayout.projectAfra")}
                </FooterLink>
                <FooterLink
                  href="/projeler/arabian-ranches"
                  ariaLabel={t("mainLayout.projectArabian")}
                >
                  {t("mainLayout.projectArabian")}
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Legal Section */}
            <div>
              <FooterTitle title={t("footer.legal")} />
              <FooterLinkGroup col>
                <FooterLink
                  href="/kullanim-sartlari"
                  ariaLabel={t("mainLayout.termsOfUseLink")}
                >
                  {t("mainLayout.termsOfUseLink")}
                </FooterLink>
                <FooterLink
                  href="/gizlilik-politikasi"
                  ariaLabel={t("mainLayout.privacyPolicy")}
                >
                  {t("mainLayout.privacyPolicy")}
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>

          {/* Divider */}
          <FooterDivider />

          {/* Footer Bottom */}
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright
              href="/"
              by={t("mainLayout.brandName")}
              year={new Date().getFullYear()}
            />
           
          </div>
        </div>
      </Footer>
    </div>
  );
}
