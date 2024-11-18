import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const PrivacyPolicySection = ({ title, content }) => {
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
        <div className="mt-2 px-4 text-gray-700 dark:text-gray-300">
          {content}
        </div>
      )}
    </div>
  );
};

const PrivacyPolicy = () => {
  const { t } = useTranslation("common");

  const sections = t("privacy_policy.sections", { returnObjects: true });

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("privacy_policy.title")}
      </h1>

      {sections.map((section, index) => (
        <PrivacyPolicySection
          key={index}
          title={section.title}
          content={<p>{section.content}</p>}
        />
      ))}
    </div>
  );
};

export default PrivacyPolicy;
