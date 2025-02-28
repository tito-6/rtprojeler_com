"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SylvanaConstructionUpdateCharts = () => {
  const { t } = useTranslation("common");

  // Static progress percentage
  const staticProgressPercentage = 41; // Set progress to 29%
  const projelertartDate = useMemo(() => new Date("2024-01-01").getTime(), []);
  const [radialChartData] = useState([staticProgressPercentage]); // Static radial chart data
  const [realTimeChartData] = useState([
    { x: projelertartDate, y: 0 },
    { x: Date.now(), y: staticProgressPercentage }, // Static progress point
  ]);

  const radialOptions = useMemo(
    () => ({
      chart: { type: "radialBar" },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: { size: "70%", background: "transparent" },
          track: { background: "#f0f0f0", dropShadow: { enabled: false } },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#333",
              fontSize: "17px",
              text: t("sylvanaConstructionUpdateCharts.constructionProgress"),
            },
            value: {
              formatter: (val) => `${Math.round(val)}%`,
              color: "#333",
              fontSize: "36px",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#f1b452"],
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      stroke: { lineCap: "round" },
      labels: [t("sylvanaConstructionUpdateCharts.completed")],
    }),
    [t]
  );

  const realTimeOptions = useMemo(
    () => ({
      chart: {
        id: "realtime",
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: { speed: 1000 },
        },
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      xaxis: {
        type: "datetime",
        labels: { format: "MMM yyyy", style: { colors: "#333" } },
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: (value) => Math.round(value).toString(),
          style: { colors: "#333" },
        },
      },
      stroke: { curve: "smooth" },
      dataLabels: { enabled: false },
    }),
    []
  );

  return (
    <section
      className="construction-update bg-white dark:bg-gray-900 p-6 rounded-lg"
      aria-labelledby="construction-progress"
    >
      <div className="radial-chart">
        <h2
          id="construction-progress"
          className="text-center text-3xl font-bold mb-6 dark:text-gray-100 text-gray-900"
        >
          {t("sylvanaConstructionUpdateCharts.sylvanaConstructionProgress")}
        </h2>
        <ReactApexChart
          options={radialOptions}
          series={radialChartData}
          type="radialBar"
          height={350}
        />
      </div>

      <div className="real-time-chart mt-10">
        <h2 className="text-center text-3xl font-bold mb-6 dark:text-gray-100 text-gray-900">
          {t("sylvanaConstructionUpdateCharts.realTimeSylvanaProgress")}
        </h2>
        <ReactApexChart
          options={realTimeOptions}
          series={[{ data: realTimeChartData }]}
          type="line"
          height={350}
        />
      </div>
    </section>
  );
};

export default React.memo(SylvanaConstructionUpdateCharts);
