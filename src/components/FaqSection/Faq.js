import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Head from "next/head";
import { useTranslation } from 'next-i18next';

const Faq = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.questions.0.question"),
      answer: t("faq.questions.0.answer"),
    },
    {
      question: t("faq.questions.1.question"),
      answer: t("faq.questions.1.answer"),
    },
    {
      question: t("faq.questions.2.question"),
      answer: t("faq.questions.2.answer"),
    },
    {
      question: t("faq.questions.3.question"),
      answer: t("faq.questions.3.answer"),
    },
    {
      question: t("faq.questions.4.question"),
      answer: t("faq.questions.4.answer"),
    },
    {
      question: t("faq.questions.5.question"),
      answer: t("faq.questions.5.answer"),
    },
    {
      question: t("faq.questions.6.question"),
      answer: t("faq.questions.6.answer"),
    },
    {
      question: t("faq.questions.7.question"),
      answer: t("faq.questions.7.answer"),
    },
    {
      question: t("faq.questions.8.question"),
      answer: t("faq.questions.8.answer"),
    },
    {
      question: t("faq.questions.9.question"),
      answer: t("faq.questions.9.answer"),
    },
    {
      question: t("faq.questions.10.question"),
      answer: t("faq.questions.10.answer"),
    },
    {
      question: t("faq.questions.11.question"),
      answer: t("faq.questions.11.answer"),
    },
    {
      question: t("faq.questions.12.question"),
      answer: t("faq.questions.12.answer"),
    },
    {
      question: t("faq.questions.13.question"),
      answer: t("faq.questions.13.answer"),
    }
  ];

  return (
    <>
      <Head>
        {/* SEO-enhancing FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(({ question, answer }) => ({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": answer,
                },
              })),
            }),
          }}
        />
      </Head>
      <section
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-24 lg:py-32 text-center"
        aria-labelledby="faq-title"
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <h1
            id="faq-title"
            className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl mb-16"
          >
            {t("faq.title")}
          </h1>

          <Accordion collapseAll className="border-none">
            {faqs.map(({ question, answer }, index) => (
              <AccordionPanel key={index}>
                <AccordionTitle
                  className="text-xl text-gray-900 dark:text-gray-200"
                >
                  {question}
                </AccordionTitle>
                <AccordionContent>
                  <p className="text-left text-gray-700 dark:text-gray-400 mb-2">
                    {answer}
                  </p>
                </AccordionContent>
              </AccordionPanel>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Faq;
