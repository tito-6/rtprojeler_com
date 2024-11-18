import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { FaBuilding, FaGlobe, FaHandshake, FaHome } from 'react-icons/fa';

const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* SEO-optimized meta tags */}
      <Head>
        <title>{t('hero.title')}</title>
        <meta name="description" content={t('hero.metaDescription')} />
        <meta property="og:title" content={t('hero.title')} />
        <meta property="og:description" content={t('hero.metaDescription')} />
        <meta property="og:image" content="/assets/images/og-image.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative w-full bg-transparent text-gray-900 dark:bg-gray-900 dark:text-white z-10"
        aria-labelledby="hero-heading"
      >
        <div className="px-4 mx-auto text-center max-w-screen-xl pt-24 lg:pt-24 lg:pb-16">
          <div className="py-3 px-3 mb-5 rounded-lg border-4 border-white bg-white dark:bg-white w-fit mx-auto">
            <img
              src="/assets/images/logo.webp"
              alt={t('hero.logoAlt')}
              className="h-32 w-32 object-contain"
              loading="lazy"
              width={128}
              height={128}
            />
          </div>
          <h1 id="hero-heading" className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48">{t('hero.description')}</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#about-us"
              className="inline-flex items-center py-3 px-5 text-base font-medium text-white bg-gray-700 hover:bg-gray-900 shadow-lg transition-transform transform hover:scale-105 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label={t('hero.moreInfo')}
            >
              {t('hero.moreInfo')}
              <HiMiniArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* About Reportage Section */}
      <section
        id="about-us"
        className="relative w-full bg-gray-100 dark:bg-gray-900 dark:text-white py-12 px-4 lg:px-12"
        aria-labelledby="about-heading"
      >
        <div className="max-w-screen-xl mx-auto text-center lg:text-left">
          <h2 id="about-heading" className="text-2xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="mb-4">{t('about.description')}</p>
          <ul className="space-y-6">
            <li className="flex flex-col items-center text-center space-y-4">
              <FaGlobe className="text-5xl text-yellow-500" aria-hidden="true" />
              <span className="text-lg font-semibold">{t('about.expertiseTitle')}</span>
              <span className="text-lg">{t('about.expertiseDescription')}</span>
            </li>
            <li className="flex flex-col items-center text-center space-y-4">
              <FaBuilding className="text-5xl text-yellow-500" aria-hidden="true" />
              <span className="text-lg font-semibold">{t('about.luxuryTitle')}</span>
            </li>
            <li className="flex flex-col items-center text-center space-y-4">
              <FaHandshake className="text-5xl text-yellow-500" aria-hidden="true" />
              <span className="text-lg font-semibold">{t('about.partnershipsTitle')}</span>
            </li>
            <li className="flex flex-col items-center text-center space-y-4">
              <FaHome className="text-5xl text-yellow-500" aria-hidden="true" />
              <span className="text-lg font-semibold">{t('about.innovativeTitle')}</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Hero;
