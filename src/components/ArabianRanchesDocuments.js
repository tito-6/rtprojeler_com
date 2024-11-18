import { FaBookOpen, FaChartPie, FaHome, FaMap } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const arabianRanchesDocuments = [
  {
    titleKey: "masterPlan",
    link: "/arabian-ranches/Arabian Ranches - MP - QG.pdf",
    icon: <FaMap size={40} className="text-[#f1b653]" />,
  },
  {
    titleKey: "catalog",
    link: "/arabian-ranches/Arabian Ranches catalogue 3.pdf",
    icon: <FaBookOpen size={40} className="text-[#f1b653]" />,
  },
  {
    titleKey: "floorPlans",
    link: "/arabian-ranches/QG_Arabian Ranches_Tower_C_+TH_Floor plans.pdf",
    icon: <FaChartPie size={40} className="text-[#f1b653]" />,
  },
  {
    titleKey: "presentation",
    link: "/arabian-ranches/Sea Breeze Presentation ENG.pdf",
    icon: <FaHome size={40} className="text-[#f1b653]" />,
  },
];

const ArabianRanchesDocuments = () => {
  const { t } = useTranslation("common");

  return (
    <section className="text-center my-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {t("arabianRanchesDocuments.title")}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {t("arabianRanchesDocuments.description")}
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {arabianRanchesDocuments.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col items-center border rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300"
            style={{
              minWidth: "200px",
              maxWidth: "200px",
              textAlign: "center",
            }}
          >
            <div className="mb-4">{doc.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
              {t(`arabianRanchesDocuments.${doc.titleKey}`)}
            </h3>
            <Link href={doc.link} legacyBehavior>
              <a
                className="text-blue-500 underline flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("arabianRanchesDocuments.viewDocument")}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArabianRanchesDocuments;
