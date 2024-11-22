// src/components/ArabianRanchesAvailability.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

class ArabianRanchesAvailability extends React.Component {
  constructor(props) {
    super(props);

    // Set total units and breakdown for the project
    const totalUnits = 452; // Total units: 80 Townhouses + 372 Apartments
    const soldUnits = 0; // Placeholder for sold units, update as needed
    const availableUnits = totalUnits - soldUnits;

    this.state = {
      series: [
        (totalUnits / totalUnits) * 100,
        (soldUnits / totalUnits) * 100,
        (availableUnits / totalUnits) * 100,
      ], // Percentages: Total, Sold, Available
      options: {
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
                show: false,
              },
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              offsetX: -8,
              fontSize: "16px",
              formatter: function (seriesName, opts) {
                const rawValues = [
                  `Total: ${totalUnits}`,
                  `Sold: ${soldUnits}`,
                  `Available: ${availableUnits}`,
                ];
                if (seriesName === "Total Units") {
                  return `${seriesName}: ${rawValues[opts.seriesIndex]}`; // No percentage for total
                }
                const percentage =
                  opts.w.globals.series[opts.seriesIndex].toFixed(2); // Show fractional percentage
                return `${seriesName}: ${percentage}% (${rawValues[opts.seriesIndex]})`; // Display percentage and raw values with percentage symbol
              },
            },
          },
        },
        colors: ["#1ab7ea", "#FF4560", "#00E396"], // Blue, red, green for Total, Sold, Available
        labels: ["Total Units", "Sold Out Units", "Available Units"], // Custom labels
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="p-6 dark:bg-gray-900 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold mb-6 dark:text-white text-gray-900">
          Arabian Ranches Availability
        </h2>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={390}
          />
        </div>
      </div>
    );
  }
}

export default ArabianRanchesAvailability;
