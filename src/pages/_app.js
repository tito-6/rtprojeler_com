import '../styles/globals.css';
import '../lib/i18n'; // Ensure i18n is initialized here
import dynamic from 'next/dynamic';
import { appWithTranslation } from 'next-i18next';

// Dynamically import MainLayout to reduce the initial JavaScript bundle size
const MainLayout = dynamic(() => import('../components/MainLayout'), { ssr: false });

// Dynamically import the WhatsApp button to ensure better performance
const WhatsAppButton = dynamic(() => import('../components/WhatsApp.js'), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      {/* WhatsApp button should be rendered globally */}
      <WhatsAppButton />
    </>
  );
}

export default appWithTranslation(MyApp);


/**
 * Author: Ahmad Alkhalid
 * Contact: ahmadalkhalid533@gmail.com
 * Date: 2024-11-18
 * Project: rtprojeler.com - Next.js Project
 * Description: Handles offer submissions, sends data to Strapi and MySQL.
 * Project Overview: Real estate website using Next.js, React, and i18next with a focus on achieving 100/100 Lighthouse scores for Performance, Accessibility, Best Practices, and SEO.

Features:

Multi-Page Structure:
Home, Projects, Construction Updates, Contact, Offers, Blog.
Optimizations:
Lottie animations, dynamic imports, optimized images.
SEO includes metadata, schema.org JSON-LD, Open Graph tags.
i18next for internationalization using getStaticProps and serverSideTranslations.
VPS hosting on Hostinger and Strapi CMS.
Challenge: Struggling with Lighthouse Performance scores despite current optimizations.
 */
