

import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

const ForecastChart = ({ data = [], type, darkMode }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const ctx = chartRef.current.getContext("2d")

    // Destroy previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const labels = data.map((item) =>
      type === "hourly" && item.datetime ? item.datetime.split(" ")[1] : item.date || "N/A",
    )

    const temperatureData = data.map((item) => (type === "hourly" ? item.temperature || 0 : item.avg_temperature || 0))

    const humidityData = data.map((item) => (type === "hourly" ? item.humidity || 0 : item.avg_humidity || 0))

    const pressureData = data.map((item) => (type === "hourly" ? item.pressure || 0 : item.avg_pressure || 0))

    const chartType = type === "hourly" ? "line" : "bar"

    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatureData,
            borderColor: "rgba(59,130,246,1)",
            backgroundColor: "rgba(59,130,246,0.2)",
            fill: true,
            tension: 0.4,
            yAxisID: "y",
            type: "line",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: "Humidity (%)",
            data: humidityData,
            backgroundColor: "rgba(34,197,94,0.4)",
            borderColor: "rgba(34,197,94,1)",
            yAxisID: "y1",
            type: chartType,
          },
          {
            label: "Pressure (hPa)",
            data: pressureData,
            backgroundColor: "rgba(245,158,11,0.3)",
            borderColor: "rgba(245,158,11,1)",
            yAxisID: "y2",
            type: chartType,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          tooltip: {
            mode: "nearest",
            callbacks: {
              label: (context) => {
                const unit = context.dataset.label.includes("Humidity")
                  ? "%"
                  : context.dataset.label.includes("Pressure")
                    ? " hPa"
                    : "°C"
                return `${context.dataset.label}: ${context.parsed.y}${unit}`
              },
            },
          },
          legend: {
            labels: {
              color: darkMode ? "#fff" : "#333",
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: darkMode ? "#ccc" : "#555",
              font: {
                size: 12,
              },
            },
            grid: {
              color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Temperature (°C)",
              color: "rgba(59,130,246,1)",
            },
            ticks: {
              color: darkMode ? "#ccc" : "rgba(59,130,246,1)",
            },
            grid: {
              color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
              color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
            title: {
              display: true,
              text: "Humidity (%)",
              color: "rgba(34,197,94,1)",
            },
            ticks: {
              color: darkMode ? "#ccc" : "rgba(34,197,94,1)",
            },
          },
          y2: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
              color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
            offset: true,
            title: {
              display: true,
              text: "Pressure (hPa)",
              color: "rgba(245,158,11,1)",
            },
            ticks: {
              color: darkMode ? "#ccc" : "rgba(245,158,11,1)",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, type, darkMode])

  return (
    <div
      className={`mt-6 ${darkMode ? "bg-indigo-900/30" : "bg-white/70"} backdrop-blur-md rounded-xl p-4 shadow-md h-80 border border-white/20`}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default ForecastChart;
