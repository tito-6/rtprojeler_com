// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="tr">
        <Head>
          {/* Google tag (gtag.js) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-WDFNTXHMDD"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WDFNTXHMDD');
              `,
            }}
          />

          {/* General Meta Tags */}
          <meta
            name="description"
            content="Reportage Türkiye: Lüks gayrimenkul projeleri ve yatırım fırsatları İstanbul, Bahçeşehir, ve Dubai'de."
          />
          <meta
            name="keywords"
            content="luxury villas, real estate investment Turkey, Bahçeşehir villas, Sylvana Istanbul, Afra Park, Reportage Türkiye, İstanbul property, Turkish citizenship by investment, buy villa in Bahçeşehir, investment opportunities in Dubai"
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Reportage Türkiye | Lüks Gayrimenkul Projeleri" />
          <meta property="og:description" content="İstanbul, Bahçeşehir, Dubai gibi şehirlerdeki lüks gayrimenkul projeleri ve yatırım fırsatları." />
          <meta property="og:image" content="/assets/images/og-image.webp" />
          <meta property="og:url" content="https://rtprojeler.com" />
          <meta property="og:type" content="website" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Reportage Türkiye | Lüks Gayrimenkul Projeleri" />
          <meta name="twitter:description" content="İstanbul, Bahçeşehir, Dubai gibi şehirlerdeki lüks gayrimenkul projeleri ve yatırım fırsatları." />
          <meta name="twitter:image" content="/assets/images/og-image.webp" />

          {/* Structured Data for Enhanced SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "RealEstateListing",
                "name": "Reportage Türkiye",
                "url": "https://rtprojeler.com",
                "description": "Lüks gayrimenkul projeleri ve yatırım fırsatları İstanbul, Bahçeşehir, Dubai'de.",
                "keywords": "luxury villas, real estate investment Turkey, Bahçeşehir villas, Sylvana Istanbul, Afra Park, Reportage Türkiye, İstanbul property",
                "offers": [
                  {
                    "@type": "Offer",
                    "name": "Sylvana Istanbul",
                    "availability": "InStock",
                    "priceCurrency": "USD",
                    "url": "https://sylvanaistanbul.com"
                  },
                  {
                    "@type": "Offer",
                    "name": "Afra Park Bahçeşehir",
                    "availability": "InStock",
                    "priceCurrency": "USD",
                    "url": "https://afrapark.com"
                  },
                  {
                    "@type": "Offer",
                    "name": "Luxury Villas in Dubai",
                    "availability": "InStock",
                    "priceCurrency": "AED",
                    "url": "https://reportageuae.com"
                  }
                ]
              }),
            }}
          />

          {/* Preload Key Fonts */}
          <link
            rel="preload"
            href="/fonts/custom-font.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
