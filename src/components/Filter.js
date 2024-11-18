import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Lazy load the dynamic component for better performance
const AutoSlider = dynamic(() => import('./AutoSlider'), {
  suspense: true,
  ssr: false,
});

// Afra Park Image Data
const afraInteriors = [
  { src: '/afra-park/images/interiors/Interiors1.webp', alt: 'Afra Park Interior Design 1' },
  { src: '/afra-park/images/interiors/Interiors2.webp', alt: 'Afra Park Interior Design 2' },
  { src: '/afra-park/images/interiors/Interiors3.webp', alt: 'Afra Park Interior Design 3' },
  { src: '/afra-park/images/interiors/Interiors4.webp', alt: 'Afra Park Interior Design 4' },
];

const afraExteriors = [
  { src: '/afra-park/images/exteriors/Exteriors1.webp', alt: 'Afra Park Exterior Design 1' },
  { src: '/afra-park/images/exteriors/Exteriors2.webp', alt: 'Afra Park Exterior Design 2' },
  { src: '/afra-park/images/exteriors/Exteriors3.webp', alt: 'Afra Park Exterior Design 3' },
  { src: '/afra-park/images/exteriors/Exteriors4.webp', alt: 'Afra Park Exterior Design 4' },
];

// Sylvana İstanbul Image Data
const sylvanaInteriors = [
  { src: '/sylvana-istanbul/images/interiors/1interiorssylvana.webp', alt: 'Sylvana Interior Design 1' },
  { src: '/sylvana-istanbul/images/interiors/2interiorssylvana.webp', alt: 'Sylvana Interior Design 2' },
  { src: '/sylvana-istanbul/images/interiors/3interiorssylvana.webp', alt: 'Sylvana Interior Design 3' },
  { src: '/sylvana-istanbul/images/interiors/4interiorssylvana.webp', alt: 'Sylvana Interior Design 4' },
];

const sylvanaExteriors = [
  { src: '/sylvana-istanbul/images/exteriors/1_exteriorssylvana.webp', alt: 'Sylvana Exterior Design 1' },
  { src: '/sylvana-istanbul/images/exteriors/2_exteriorssylvana.webp', alt: 'Sylvana Exterior Design 2' },
  { src: '/sylvana-istanbul/images/exteriors/3_exteriorssylvana.webp', alt: 'Sylvana Exterior Design 3' },
  { src: '/sylvana-istanbul/images/exteriors/4_exteriorssylvana.webp', alt: 'Sylvana Exterior Design 4' },
];

// Arabian Ranches Image Data
const arabianImages = [
  { src: '/arabian-ranches/images/arabianranches-01.webp', alt: 'Arabian Ranches Design 1' },
  { src: '/arabian-ranches/images/arabianranches-02.webp', alt: 'Arabian Ranches Design 2' },
  { src: '/arabian-ranches/images/arabianranches-03.webp', alt: 'Arabian Ranches Design 3' },
  { src: '/arabian-ranches/images/arabianranches-04.webp', alt: 'Arabian Ranches Design 4' },
  { src: '/arabian-ranches/images/arabianranches-05.webp', alt: 'Arabian Ranches Design 5' },
  { src: '/arabian-ranches/images/arabianranches-06.webp', alt: 'Arabian Ranches Design 6' },
  { src: '/arabian-ranches/images/arabianranches-07.webp', alt: 'Arabian Ranches Design 7' },
  { src: '/arabian-ranches/images/arabianranches-08.webp', alt: 'Arabian Ranches Design 8' },
  { src: '/arabian-ranches/images/arabianranches-09.webp', alt: 'Arabian Ranches Design 9' },
  { src: '/arabian-ranches/images/arabianranches-10.webp', alt: 'Arabian Ranches Design 10' },
];

const Filter = () => {
  const { t } = useTranslation('common');
  const [filter, setFilter] = useState('all');
  const [sliderDuration, setSliderDuration] = useState(40); // Default duration

  useEffect(() => {
    const handleResize = () => {
      setSliderDuration(window.innerWidth <= 768 ? 20 : 40);
    };

    handleResize(); // Call on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getImages = (project) => {
    if (project === 'afra') {
      return filter === 'interior' ? afraInteriors : filter === 'exterior' ? afraExteriors : [...afraInteriors, ...afraExteriors];
    }
    if (project === 'sylvana') {
      return filter === 'interior' ? sylvanaInteriors : filter === 'exterior' ? sylvanaExteriors : [...sylvanaInteriors, ...sylvanaExteriors];
    }
    return arabianImages;
  };

  return (
    <>
      <Head>
        <title>{t('filter_hero_title.title')}</title>
        <meta name="description" content={t('filter_hero_title.subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="bg-center bg-no-repeat text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white">
        <div className="px-4 mx-auto text-center pt-24 lg:pt-32">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            {t('filter_section.title')}
          </h1>
          <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-600 dark:text-gray-300">
            {t('filter_section.subtitle')}
          </p>

          {/* Filters */}
          <div className="flex justify-center mb-8">
            <ul className="flex flex-col sm:flex-row rounded-xl sm:rounded-full justify-center align-middle gap-3 text-sm bg-gray-200 dark:bg-gray-800 p-2">
              {['interior', 'exterior', 'all'].map((type) => (
                <li
                  key={type}
                  className={`px-4 py-2 rounded-full cursor-pointer select-none ${
                    filter === type
                      ? 'bg-gray-900 text-white'
                      : 'hover:bg-gray-900 hover:text-white text-gray-900 dark:text-white'
                  }`}
                  onClick={() => setFilter(type)}
                  aria-label={t(`filter.${type}_designs`)}
                >
                  {t(`filter.${type}_designs`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Sliders for Projects */}
          <div className="flex flex-col gap-8">
            {['afra', 'sylvana', 'arabian'].map((project) => (
              <div key={project}>
                <h2 className="text-2xl font-bold mb-2">{t(`${project}_title.title`)}</h2>
                <AutoSlider images={getImages(project)} duration={sliderDuration} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Filter;
