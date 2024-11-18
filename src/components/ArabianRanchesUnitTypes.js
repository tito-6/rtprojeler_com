import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";

// Dynamically import react-pdf components to optimize performance
const Document = dynamic(() => import("react-pdf").then(mod => mod.Document), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />,
});
const Page = dynamic(() => import("react-pdf").then(mod => mod.Page), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />,
});

// Configure PDF.js worker
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";


const ArabianRanchesUnitTypes = () => {
  const { t } = useTranslation("common");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  // Memoize the PDF file path
  const pdfFile = useMemo(() => "/arabian-ranches/QG_Arabian Ranches_Tower_C_+TH_Floor plans.pdf", []);

  // Handle successful PDF load
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  // Navigate to previous page
  const goToPreviousPage = useCallback(() => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }, []);

  // Navigate to next page
  const goToNextPage = useCallback(() => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  }, [numPages]);

  return (
    <section className="text-center my-12 px-4" aria-labelledby="unit-types-title">
      {/* Section Title */}
      <h2
        id="unit-types-title"
        className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
        role="heading"
        aria-level="2"
      >
        {t("ArabianRanchesUnitTypes.title")}
      </h2>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mb-4" aria-label="PDF Pagination Controls">
        <Button
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
          className="mr-2"
          aria-label={t("ArabianRanchesUnitTypes.previousPage")}
        >
          <FaChevronLeft />
        </Button>
        <span className="text-lg dark:text-white">
          {t("ArabianRanchesUnitTypes.page")} {pageNumber} {t("ArabianRanchesUnitTypes.of")} {numPages}
        </span>
        <Button
          onClick={goToNextPage}
          disabled={pageNumber === numPages}
          className="ml-2"
          aria-label={t("ArabianRanchesUnitTypes.nextPage")}
        >
          <FaChevronRight />
        </Button>
      </div>

      {/* PDF Document */}
      <div className="flex justify-center">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("PDF loading error:", error)}
          loading={<div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />}
          aria-label={t("ArabianRanchesUnitTypes.pdfDocument")}
        >
          <Page
            pageNumber={pageNumber}
            width={useMemo(() => Math.min(600, typeof window !== "undefined" ? window.innerWidth * 0.9 : 600), [])}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="rounded-lg shadow-lg"
          />
        </Document>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ArabianRanchesUnitTypes);
