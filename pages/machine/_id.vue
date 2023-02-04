<template>
  <div class="h-screen bg-custom-blue-50">
    <Header :title="title" />
    <div class="px-[70px] pt-[70px]" v-if="!isLoading">
      <p
        class="border border-black rounded-[20px] text-[28px] bg-white w-[320px] h-[100px] flex justify-center items-center"
      >
        {{ machineData.data.machine_name }}
      </p>
      <div class="mt-[56px]">
        <p class="mb-[10px] text-xl">Date : {{ nowDate }}</p>
        <div class="flex justify-between">
          <div
            v-for="(data, index) in machineData.machineValues"
            :key="index"
            @click="showChartData(data.name)"
            class="w-[280px] h-[280px] bg-white text-[36px] text-[#A7ADBA] flex flex-col justify-center items-center space-y-[40px] cursor-pointer"
          >
            <p>{{ data.name }}</p>
            <p>{{ data.value }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-[40px]">
        <button
          class="w-[280px] h-[88px] bg-white rounded-[10px] border-2 border-custom-blue-200 font-semibold text-[24px] text-custom-blue-200"
        >
          Service Maintanance
        </button>
        <button
          class="w-[280px] h-[88px] rounded-[10px] font-semibold text-[24px] text-white bg-custom-blue-200"
        >
          Export Data
        </button>
      </div>
    </div>
    <Chart
      v-if="isShowChart"
      @closeModal="isShowChart = false"
      :chartDetails="chartDetails"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MachineDashboard from "@/components/MachineDashboard.vue";
import dayjs from "dayjs";
import Chart from "../../components/Chart.vue";

export default {
  components: { Header, MachineDashboard, Chart },

  data() {
    return {
      listOfMachines: [],
      machineData: [],
      title: null,
      machineId: null,
      isLoading: true,
      nowDate: dayjs().format("DD-MM-YYYY"),
      isShowChart: false,
      chartDetails: {
        title: null,
        data: null,
      },
    };
  },

  methods: {
    async changeActiveMachine(id) {
      this.listOfMachines.map((machine) => {
        if (machine._id == id) {
          machine.active = true;
        } else {
          machine.active = false;
        }
        return machine;
      });
      this.machineData = await this.$store.dispatch(
        "machine/getMachineData",
        id
      );
      this.machineId = id;
      this.$forceUpdate();
    },

    async showChartData(chartName) {
      let findByCondition = "";
      switch (chartName) {
        case "Now":
          this.chartDetails.title = "Days";
          findByCondition = "day";
          break;
        case "Yesterday":
          this.chartDetails.title = "Days";
          findByCondition = "day";
          break;
        case "Last Month":
          this.chartDetails.title = "Months";
          findByCondition = "month";
          break;
        case "Last Year":
          this.chartDetails.title = "Years";
          findByCondition = "year";
          break;
        default:
          break;
      }
      let chartData = await this.$store.dispatch("machine/getChartData", {
        machineId: this.machineId,
        findByCondition: findByCondition,
      });
      this.chartDetails.data = chartData;
      this.isShowChart = true;
    },

    // async readMachineData() {
    //   setInterval(async () => {
    //     this.machineData = await this.$store.dispatch(
    //       "machine/getMachineData",
    //       this.machineId
    //     );
    //     this.$forceUpdate();
    //   }, 1000);
    // },
  },

  async mounted() {
    if (!(await this.$store.dispatch("user/isUserLoggedIn"))) {
      this.$router.push("/");
    }
    this.title = this.$store.state.user.userData.company_name;
    let machineId = this.$route.params.id;
    this.machineId = machineId;
    this.machineData = await this.$store.dispatch(
      "machine/getMachineData",
      machineId
    );
    this.isLoading = false;
    // await this.readMachineData();
  },
};
</script>

<style></style>
