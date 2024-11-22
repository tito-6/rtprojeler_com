import React from "react";
import ReactApexChart from "react-apexcharts";

class SylvanaAvailability extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [(244 / 244) * 100, (160 / 244) * 100, (84 / 244) * 100], // Yüzdeler: Toplam, Satılan, Mevcut
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
                const rawValues = ["Toplam: 244", "Satılan: 160", "Mevcut: 84"];
                if (seriesName === "Toplam Üniteler") {
                  return `${seriesName}: ${rawValues[opts.seriesIndex]}`; // Toplam için yüzde gösterilmez
                }
                const percentage =
                  opts.w.globals.series[opts.seriesIndex].toFixed(2); // Kesirli yüzde göster
                return `${seriesName}: ${percentage}% (${rawValues[opts.seriesIndex]})`; // Yüzde ve ham değerlerle birlikte yüzde sembolü göster
              },
            },
          },
        },
        colors: ["#1ab7ea", "#FF4560", "#00E396"], // Toplam, Satılan, Mevcut için Mavi, Kırmızı, Yeşil
        labels: ["Toplam Üniteler", "Satılan Üniteler", "Mevcut Üniteler"], // Özel etiketler
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
        {/* Karanlık ve aydınlık mod için özelleştirilebilir başlık */}
        <h2 className="text-center text-3xl font-bold mb-6 dark:text-white text-gray-900">
          Sylvana İstanbul Mevcut Durum
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

export default SylvanaAvailability;
