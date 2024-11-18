// components/StructuredData.js
import Head from "next/head";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product", // Specify the item type as "Product" to clarify its role
    "name": "Your Product Name",
    "image": "https://www.yourwebsite.com/assets/images/your-product-image.webp",
    "description": "A comprehensive and engaging description of your product.",
    "offers": {
      "@type": "Offer",
      "url": "https://www.yourwebsite.com/offers",
      "priceCurrency": "USD",
      "price": "1000",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition", // Additional item property
      "seller": {
        "@type": "Organization",
        "name": "Your Company Name",
        "url": "https://www.yourwebsite.com",
      },
    },
    "brand": {
      "@type": "Brand",
      "name": "Your Brand Name",
    },
  };

  return (
    <Head>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Additional Meta Tags for SEO */}
      <meta name="description" content="Detailed description of your product and offer." />
      <meta property="og:title" content="Your Product Name - Special Offer" />
      <meta property="og:description" content="Exclusive offer on Your Product Name. Get it for only $1000." />
      <meta property="og:image" content="https://www.yourwebsite.com/assets/images/your-product-image.webp" />
      <meta property="og:url" content="https://www.yourwebsite.com/offers" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Your Product Name - Special Offer" />
      <meta name="twitter:description" content="Exclusive offer on Your Product Name. Only $1000." />
      <meta name="twitter:image" content="https://www.yourwebsite.com/assets/images/your-product-image.webp" />
    </Head>
  );
};

export default StructuredData;
