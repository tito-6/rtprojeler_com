import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the Contact component
const Contact = dynamic(() => import('@/components/Contact'), { suspense: true });

// Server-side translations
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function ContactPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>{t('contact.title')}</title>
        <meta name="description" content={t('contact.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <main className="flex-grow container mx-auto pt-16 pb-16 px-4 md:px-8">
        {/* Contact Section */}
        <section id="contact-section" className="py-12" aria-labelledby="contact-section">
          <Suspense fallback={<div>{t('loading.contact')}</div>}>
            <Contact />
          </Suspense>
        </section>
      </main>
    </>
  );
}
