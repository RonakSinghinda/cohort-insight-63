// Chart.js options for dark theme
export const commonDarkOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "rgba(255,255,255,0.8)" } },
    tooltip: {
      backgroundColor: "rgba(10,15,30,0.95)",
      titleColor: "#fff",
      bodyColor: "rgba(255,255,255,0.9)",
      borderColor: "rgba(255,255,255,0.04)",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: "rgba(255,255,255,0.75)" },
      grid: { color: "rgba(255,255,255,0.03)" },
    },
    y: {
      ticks: { color: "rgba(255,255,255,0.75)" },
      grid: { color: "rgba(255,255,255,0.03)" },
    },
  },
};

// Sample dataset color
export const barDataset = {
  backgroundColor: "rgba(38, 110, 255, 0.95)", // electric blue
  borderColor: "rgba(38, 110, 255, 1)",
  borderWidth: 0,
};

// Recharts-specific options (for compatibility with Recharts used in the project)
export const rechartsDarkTheme = {
  textColor: "rgba(255,255,255,0.75)",
  gridColor: "rgba(255,255,255,0.03)",
  tooltipBg: "rgba(10,15,30,0.95)",
  tooltipBorder: "rgba(255,255,255,0.04)",
};

