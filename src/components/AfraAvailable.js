"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "next-i18next";

const AfraAvailability = () => {
  const { t } = useTranslation("common");

  // Static data values - Update these values directly as needed
  const data = {
    totalUnits: 177,      // Example: 100 total units
    soldUnits: 30,        // Example: 30 units sold
    availableUnits: 70,   // Calculated as totalUnits - soldUnits
  };

  // Series corresponding to data
  const series = [
    data.totalUnits,      // Total Units
    data.soldUnits,       // Sold Units
    data.availableUnits,  // Available Units
  ];

  const options = {
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            formatter: function (val) {
              return Math.round(val);
            },
          },
        },
      },
    },
    colors: ["#1ab7ea", "#FF4560", "#00E396"],
    labels: [
      t("afraAvailability.totalUnits"),
      t("afraAvailability.soldUnits"),
      t("afraAvailability.availableUnits"),
    ],
    legend: {
      show: true,
      position: "left",
      horizontalAlign: "center",
      floating: false,
      fontSize: "16px",
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      labels: {
        colors: ["#1ab7ea", "#FF4560", "#00E396"],
        useSeriesColors: true,
      },
      formatter: (seriesName, opts) => {
        const values = [
          data.totalUnits,
          data.soldUnits,
          data.availableUnits,
        ];
        return `${seriesName}: ${values[opts.seriesIndex]}`;
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: true,
            position: "bottom",
          },
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  return (
    <div className="p-6 dark:bg-gray-900 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-3xl font-bold mb-6 dark:text-white text-gray-900">
        {t("afraAvailability.title")}
      </h2>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={390}
        />
      </div>
    </div>
  );
};

export default AfraAvailability;
