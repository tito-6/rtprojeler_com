import { FaBookOpen, FaChartPie, FaHome, FaMap } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const SylvanaDocuments = () => {
  const { t } = useTranslation("common");

  const documents = [
    {
      title: t("sylvanaDocuments.catalog"), // Katalog
      link: "/sylvana-istanbul/sylvana-istanbul-catalogue-tr-en.pdf",
      icon: <FaBookOpen size={40} className="text-[#f1b653]" />
    },
    {
      title: t("sylvanaDocuments.infoSheet"), // Bilgi Sayfası
      link: "/sylvana-istanbul/sylvana-istanbul-factsheet.pdf",
      icon: <FaChartPie size={40} className="text-[#f1b653]" />
    },
    {
      title: t("sylvanaDocuments.unitTypes"), // Birim Tipleri Sayfası
      link: "/sylvana-istanbul/unit-types-sheet.pdf",
      icon: <FaHome size={40} className="text-[#f1b653]" />
    },
    {
      title: t("sylvanaDocuments.brochure"), // Broşür
      link: "/sylvana-istanbul/sylvana-istanbul-brochure.pdf",
      icon: <FaMap size={40} className="text-[#f1b653]" />
    }
  ];

  return (
    <section className="text-center my-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {t("sylvanaDocuments.title")}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {t("sylvanaDocuments.description")}
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col items-center border rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300"
            style={{
              minWidth: "200px",
              maxWidth: "200px",
              textAlign: "center"
            }}
          >
            <div className="mb-4">{doc.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
              {doc.title}
            </h3>
            <Link href={doc.link} locale={false} legacyBehavior>
              <a className="text-blue-500 underline flex items-center justify-center">
                {t("sylvanaDocuments.viewDocument")}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SylvanaDocuments;
