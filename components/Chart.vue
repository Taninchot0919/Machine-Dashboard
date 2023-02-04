<template>
  <ModalLayout>
    <div
      class="relative shadow-lg w-[1024px] h-[500px] px-2 bg-white flex items-center justify-center"
    >
      <CloseButton
        @click.native="$emit('closeModal')"
        class="absolute top-3 right-5"
      />
      <BarChart
        :data="barChartData"
        :options="barChartOptions"
        class="w-full h-full"
      />
    </div>
  </ModalLayout>
</template>

<script>
import BarChart from "~/components/BarChart.vue";
import CloseButton from "./CloseButton.vue";
export default {
  props: {
    chartDetails: {
      type: Object,
    },
  },
  components: { BarChart, CloseButton },
  data() {
    return {
      barChartData: {
        labels: this.chartDetails.data.labels,
        datasets: [
          {
            label: "Value",
            data: this.chartDetails.data.values,
            backgroundColor: "#c6e2ff",
            borderColor: "#c6e2ff",
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.chartDetails.title,
          fontSize: 24,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "#3155ce",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          // yAxes: [
          //   {
          //     ticks: {
          //       beginAtZero: true,
          //       max: 5,
          //       min: 0,
          //       stepSize: 1,
          //     },
          //     gridLines: {
          //       display: true,
          //     },
          //   },
          // ],
        },
      },
    };
  },
};
</script>

<style scoped></style>
