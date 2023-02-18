<template>
  <div class="h-screen bg-custom-blue-50">
    <Header :title="title" />
    <div class="px-[70px] pt-[70px]" v-if="!isLoading">
      <div class="flex h-[100px] items-center">
        <p
          class="border border-black rounded-[20px] text-[28px] bg-white w-[320px] h-full flex justify-center items-center"
        >
          {{ machineData.data.machine_name }}
        </p>
        <div class="text-[20px] ml-4 flex items-center space-x-3">
          <div
            class="w-3 h-3 rounded-full bg-red-400"
            :class="
              machineData.data.machine_status == 'offline'
                ? 'bg-red-400'
                : 'bg-green-400'
            "
          ></div>
          <p
            v-if="machineData.data.machine_status == 'offline'"
            class="text-red-400"
          >
            Offline
          </p>
          <p v-else class="text-green-400">Online</p>
        </div>
      </div>
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
import dayjs from "dayjs";
import Chart from "../../components/Chart.vue";

export default {
  components: { Header, Chart },

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

    async readMachineData() {
      setInterval(async () => {
        let result = await this.$store.dispatch(
          "machine/getMachineNow",
          this.machineId
        );
        console.log("🚀 ~ file: _id.vue:142 ~ setInterval ~ result", result);
        this.machineData.machineValues[0].value =
          result.data.machine_data.latest_value;
        this.machineData.data.machine_status = result.data.machine_status;
        this.$forceUpdate();
      }, 3000);
    },
  },

  async mounted() {
    if (!(await this.$store.dispatch("user/isUserLoggedIn"))) {
      this.$router.push("/");
    }
    this.$store.dispatch("setIsCanGoBack", true);
    this.title = this.$store.state.user.userData.company_name;
    let machineId = this.$route.params.id;
    this.machineId = machineId;
    this.machineData = await this.$store.dispatch(
      "machine/getMachineData",
      machineId
    );
    this.isLoading = false;
    await this.readMachineData();
  },
};
</script>

<style></style>
