
<template>

  <div class="w-full bg-slate-50 rounded-lg border border-slate-200 p-2">

    <!-- Header -->
    <div class="flex items-center justify-between mb-5">

      <div>
        <h2 class="text-lg font-bold text-slate-800">
          Sales Overview
        </h2>

        <p class="text-sm text-slate-500">
          Monthly sales performance
        </p>
      </div>

      <!-- Year Select -->
      <div class="relative">

        <select
          v-model="selectedYear"
          @change="changeYear"
          class="appearance-none
                 px-4 pr-9 py-2
                 text-sm font-semibold
                 text-green-700
                 bg-green-50
                 border border-green-100
                 rounded-lg
                 outline-none
                 cursor-pointer
                 hover:bg-green-100
                 focus:ring-2
                 focus:ring-green-500/20
                 transition"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <!-- Arrow -->
        <div
          class="pointer-events-none absolute
                 right-3 top-1/2
                 -translate-y-1/2
                 text-green-600"
        >
          ▼
        </div>

      </div>

    </div>

    <!-- Chart -->
    <div class="relative w-full h-87.5">
      <canvas ref="salesChart"></canvas>
    </div>

  </div>

</template>


<script setup>

import { ref, onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";


/* -----------------------------
   Selected Year
------------------------------ */

const selectedYear = ref("2026");


/* -----------------------------
   Chart
------------------------------ */

const salesChart = ref(null);

let chartInstance = null;


/* -----------------------------
   Sales Data
------------------------------ */

const salesData = {

  2026: [
    1200,
    1900,
    1500,
    2400,
    2100,
    3200,
    2800,
    0,
    3100,
    4200,
    0,
    4800
  ],

  2025: [
    1000,
    1500,
    1800,
    2100,
    2300,
    2700,
    2500,
    3000,
    3400,
    3600,
    4100,
    4500
  ],

  2024: [
    800,
    1200,
    1400,
    1700,
    1900,
    2200,
    2400,
    2600,
    2900,
    3100,
    3500,
    3900
  ],

  2023: [
    600,
    900,
    1100,
    1300,
    1600,
    1800,
    2000,
    2300,
    2500,
    2800,
    3000,
    3300
  ]

};


/* -----------------------------
   Months
------------------------------ */

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];


/* -----------------------------
   Create Chart
------------------------------ */

const createChart = () => {

  chartInstance = new Chart(salesChart.value, {

    type: "line",

    data: {

      labels: months,

      datasets: [

        {

          label: "Sales",

          data: salesData[selectedYear.value],

          borderColor: "#16a34a",

          backgroundColor: "rgba(22, 163, 74, 0.10)",

          borderWidth: 3,

          pointBackgroundColor: "#16a34a",

          pointBorderColor: "#ffffff",

          pointBorderWidth: 2,

          pointRadius: 4,

          pointHoverRadius: 6,

          fill: true,

          tension: 0.4

        }

      ]

    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {
          display: false
        },

        tooltip: {

          backgroundColor: "#0f172a",

          padding: 12,

          displayColors: false,

          callbacks: {

            label: function (context) {

              return "$" + context.raw.toLocaleString();

            }

          }

        }

      },

      scales: {

        x: {

          grid: {
            display: false
          },

          border: {
            display: false
          },

          ticks: {
            color: "#64748b"
          }

        },

        y: {

          beginAtZero: true,

          border: {
            display: false
          },

          grid: {
            color: "#e2e8f0"
          },

          ticks: {

            color: "#64748b",

            callback: function (value) {

              return "$" + value.toLocaleString();

            }

          }

        }

      }

    }

  });

};


/* -----------------------------
   Change Year
------------------------------ */

const changeYear = () => {

  chartInstance.data.datasets[0].data =
    salesData[selectedYear.value];

  chartInstance.update();

};


/* -----------------------------
   Mounted
------------------------------ */

onMounted(() => {

  createChart();

});


/* -----------------------------
   Destroy Chart
------------------------------ */

onBeforeUnmount(() => {

  if (chartInstance) {
    chartInstance.destroy();
  }

});

</script>
```
