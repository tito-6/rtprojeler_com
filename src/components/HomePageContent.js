import Flag from "react-world-flags"; 
import { FaBuilding, FaVideo, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from "react";

const HomePageContent = () => {
  const { t } = useTranslation("common");
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.pause();
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-16 lg:py-20 text-center">
        <div className="px-4 mx-auto text-center max-w-screen-xl pt-20 lg:pt-20 lg:pb-12">
          <div className="py-3 px-3 mb-4 rounded-lg border-4 border-white bg-white dark:bg-white w-fit mx-auto">
            <img
              src="/assets/images/logo.webp"
              alt={t("hero.logoAlt")}
              className="h-32 w-32 object-contain"
              loading="lazy"
              width={128}
              height={128}
            />
          </div>
          <h2 className="text-4xl font-extrabold mb-5">{t("hero.title")}</h2>
          <p className="text-lg mb-1 font-semibold">{t("hero.aboutTitle")}</p>
          <p className="text-lg mb-5 italic">{t("hero.reportageTurkey")}</p>
          <div className="mb-5">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-gray-700 hover:bg-gray-900 shadow-lg transition-transform transform hover:scale-105 mx-auto"
              aria-label={t("hero.watchVideo")}
            >
              <FaVideo className="mr-2" /> {t("hero.watchVideo")}
            </a>
          </div>
          <h3 className="text-2xl font-bold">{t("hero.globalExpertTitle")}</h3>
          <p className="mt-3 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("hero.globalExpertDescription")}
          </p>
        </div>
      </section>

      

      {/* projeler Section */}
      <section className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-16 lg:py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-5">
          <FaBuilding className="inline-block mb-2 mr-2 text-yellow-500" />
          {t("projeler.title")}
        </h2>

        {/* Sylvana Istanbul Project */}
        <div className="mb-6">
          <img
            src="/assets/images/sylvana-istanbul-logo.webp"
            alt={t("projeler.sylvana.title")}
            className="w-32 mx-auto mb-4 dark:invert"
            loading="lazy"
            width={128}
            height={64}
          />
          <h3 className="text-2xl font-bold">{t("projeler.sylvana.title")}</h3>
          <p className="mt-3 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("projeler.sylvana.description")}
          </p>
        </div>

        <div className="mb-6">
          <iframe
            className="w-full h-[300px] mx-auto"
            src="https://kuula.co/share/collection/7X2tB?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1"
            allowFullScreen
            frameBorder="0"
            title={t("projeler.sylvana.virtualTourTitle")}
            loading="lazy"
          ></iframe>
        </div>

        <Link
          href="/projeler/sylvana-istanbul-bahcesehir"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-gray-700 hover:bg-gray-900 shadow-lg transition-transform transform hover:scale-105 mx-auto"
        >
          {t("projeler.sylvana.moreInfo")}
        </Link>

        {/* Afra Park Istanbul Project */}
        <div className="mt-8 mb-6">
          <img
            src="/assets/images/afra-park-istanbul-bahcesehir-logo.webp"
            alt={t("projeler.afraPark.title")}
            className="w-32 mx-auto mb-4 dark:invert"
            loading="lazy"
            width={128}
            height={64}
          />
          <h3 className="text-2xl font-bold">{t("projeler.afraPark.title")}</h3>
          <p className="mt-3 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("projeler.afraPark.description")}
          </p>
        </div>

        <div className="mb-6">
          <iframe
            className="w-full h-[300px] mx-auto"
            src="https://kuula.co/share/collection/7X3mZ?logo=bWVkaWEvMTQ4MDA1LzY0MDktYzhlMi02YTBhLWUxOTEucG5n&info=0&logosize=160&fs=1&vr=0&gyro=0&autorotate=-0.03&thumbs=-1&inst=0&keys=0&iosfs=1"
            allowFullScreen
            frameBorder="0"
            title={t("projeler.afraPark.virtualTourTitle")}
            loading="lazy"
          ></iframe>
        </div>

        <Link
          href="/projeler/afra-park-istanbul-bahcesehir"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-gray-700 hover:bg-gray-900 shadow-lg transition-transform transform hover:scale-105 mx-auto"
        >
          {t("projeler.afraPark.moreInfo")}
        </Link>
      </section>
      {/* Arabian Ranches Project Section */}
      <section
        ref={sectionRef}
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-16 lg:py-20 text-center"
      >
        <h2 className="text-4xl font-extrabold mb-5">{t("arabianRanches.title")}</h2>
        <p className="text-lg max-w-3xl mx-auto mb-5">{t("arabianRanches.description")}</p>
        
        <div className="relative pb-[56.25%] h-0 overflow-hidden w-full h-auto mb-6">
      <iframe
        src="https://www.youtube.com/embed/YXz4pTnEuFs?start=6&rel=0&modestbranding=1&iv_load_policy=3&controls=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
        <div className="text-lg max-w-3xl mx-auto leading-relaxed">
          <p>{t("arabianRanches.details")}</p>
        </div>

        <Link
          href="/projeler/arabian-ranches"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-gray-700 hover:bg-gray-900 shadow-lg transition-transform transform hover:scale-105 mx-auto mt-5"
        >
          {t("arabianRanches.moreInfo")}
        </Link>
      </section>

      {/* Our Community Section */}
      <section className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-16 lg:py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-5">
          <FaUsers className="inline-block mb-2 mr-2 text-yellow-500" />
          {t("community.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
          {(t("community.locations", { returnObjects: true }) || []).map((location, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 relative"
            >
              <Flag code={location.flagCode} className="w-12 mx-auto mb-4" alt={`${location.name} Flag`} />
              <h3 className="text-xl font-semibold">{location.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{location.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePageContent;
