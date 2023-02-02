<template>
  <ModalLayout>
    <div
      class="relative shadow-lg w-[1024px] h-[500px] px-2 bg-white flex items-center justify-center"
    >
      <CloseButton
        @click.native="$emit('closeModal')"
        class="absolute top-3 right-5"
      />
      <BarChart :data="barChartData" :options="barChartOptions" />
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
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
        ],
        datasets: [
          {
            label: "Value",
            data: [2, 1, 16, 3, 4, 5, 0, 0, 4, 12, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            borderColor: "rgba(100, 255, 0, 1)",
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
          backgroundColor: "#17BF62",
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
