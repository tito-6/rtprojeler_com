"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "next-i18next";
import axios from "axios";

const SylvanaAvailability = () => {
  const { t } = useTranslation("common");

  const [data, setData] = useState({
    totalUnits: 0,
    soldUnits: 0,
    availableUnits: 0,
  });
  const [series, setSeries] = useState([0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sylvana-availabilities`
        );

        console.log("Fetched Data:", response.data);

        if (response?.data?.data?.length > 0) {
          // Access the first element in the data array directly
          const fetchedData = response.data.data[0];

          if (
            fetchedData &&
            typeof fetchedData.totalUnits === "number" &&
            typeof fetchedData.soldUnits === "number"
          ) {
            const availableUnits = fetchedData.totalUnits - fetchedData.soldUnits;

            // Update the state with fetched data
            setData({
              totalUnits: fetchedData.totalUnits,
              soldUnits: fetchedData.soldUnits,
              availableUnits,
            });

            // Set the series to update the chart
            setSeries([
              fetchedData.totalUnits, // Total Units
              fetchedData.soldUnits, // Sold Units
              availableUnits, // Available Units
            ]);
          } else {
            console.error("Attributes missing or invalid in fetchedData:", fetchedData);
          }
        } else {
          console.error("Unexpected response structure or no data available");
        }
      } catch (error) {
        console.error("Error fetching availability data from Strapi:", error);
      }
    };

    fetchData();
  }, []);

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
      t("SylvanaAvailability.totalUnits"),
      t("SylvanaAvailability.soldUnits"),
      t("SylvanaAvailability.availableUnits"),
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
        {t("SylvanaAvailability.title")}
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

export default SylvanaAvailability;
