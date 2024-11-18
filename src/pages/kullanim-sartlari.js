"use client"; // Ensures it's treated as a client-side component

import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TermsSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold text-lg py-2 px-4 border-b border-gray-300 dark:border-gray-700 dark:text-gray-200 focus:outline-none"
      >
        {title}
        <span className="float-right">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 px-4 text-gray-700 dark:text-gray-300">{content}</div>
      )}
    </div>
  );
};

const TermsOfUse = () => {
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("termsOfUse.title")}
      </h1>

      <TermsSection
        title={t("termsOfUse.introductionTitle")}
        content={<p>{t("termsOfUse.introductionContent")}</p>}
      />

      <TermsSection
        title={t("termsOfUse.privacySummaryTitle")}
        content={<p>{t("termsOfUse.privacySummaryContent")}</p>}
      />

      <TermsSection
        title={t("termsOfUse.websiteUsageTitle")}
        content={
          <>
            <p>{t("termsOfUse.websiteUsageContent")}</p>
            <ul>
              <li>{t("termsOfUse.websiteUsageList.item1")}</li>
              <li>{t("termsOfUse.websiteUsageList.item2")}</li>
              <li>{t("termsOfUse.websiteUsageList.item3")}</li>
            </ul>
            <p>{t("termsOfUse.websiteUsageContent2")}</p>
          </>
        }
      />

      <TermsSection
        title={t("termsOfUse.dataUsageTitle")}
        content={
          <>
            <p>{t("termsOfUse.dataUsageContent")}</p>
            <ul>
              <li>{t("termsOfUse.dataUsageList.item1")}</li>
              <li>{t("termsOfUse.dataUsageList.item2")}</li>
              <li>{t("termsOfUse.dataUsageList.item3")}</li>
            </ul>
            <p>{t("termsOfUse.dataUsageContent2")}</p>
          </>
        }
      />

      <TermsSection
        title={t("termsOfUse.disclaimerTitle")}
        content={<p>{t("termsOfUse.disclaimerContent")}</p>}
      />

      <TermsSection
        title={t("termsOfUse.privacySecurityTitle")}
        content={<p>{t("termsOfUse.privacySecurityContent")}</p>}
      />

      <TermsSection
        title={t("termsOfUse.rightToChangeTitle")}
        content={<p>{t("termsOfUse.rightToChangeContent")}</p>}
      />

      <TermsSection
        title={t("termsOfUse.contactTitle")}
        content={<p>{t("termsOfUse.contactContent")}</p>}
      />
    </div>
  );
};

export default TermsOfUse;

// Server-side translations for i18next
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
