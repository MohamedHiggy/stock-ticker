<template>
  <div class="w-[1200px] mx-auto">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  props: {
    historyDates: {
      type: Array,
      required: true,
    },
    prices: {
      type: Array,
      required: true,
    },
    isCalling: {
      type: Boolean,
      required: true,
      default: false,
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    isCalling(e) {
      if (e) {
        this.updateChart();
      }
    },
  },
  methods: {
    updateChart() {
      const myChart = document.getElementById("myChart");
      const labels = this.historyDates;
      let newPrices = [];
      this.prices.forEach((price) => {
        newPrices.push({
          label: price.symbol ? price.symbol : price.from_symbol + " to " + price.to_symbol,
          data: price.data,
          fill: false,
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 1)`,
          tension: 0,
          borderWidth: 2,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
      const data = {
        labels: labels,
        datasets: newPrices,
      };
      // to avoid multiple chart instances on the same canvas
      const chartWithKey = Chart.getChart("myChart");
      if (chartWithKey != undefined) {
        chartWithKey.destroy();
      }
      // update chart
      this.myChart = new Chart(myChart, {
        type: "line",
        data: data,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
