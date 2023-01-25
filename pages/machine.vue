<template>
  <div class="min-h-screen">
    <Header />
    <div class="h-[100px] bg-gray-200 flex items-center justify-around">
      <div
        v-for="machine in listOfMachines"
        :key="machine.id"
        @click="changeActiveMachine(machine.id)"
        class="w-full h-full border-r border-b border-black flex justify-center items-center cursor-pointer hover:bg-gray-300"
        :class="{
          'bg-gray-300 border-b-0': machine.active,
        }"
      >
        <p>{{ machine.name }}</p>
      </div>
    </div>
    <div class="flex flex-col">
      <MachineDashboard :machineData="machineData" class="pt-10" />
      <div class="flex justify-between px-36 mt-8">
        <button class="px-3 py-2 w-44 h-32 bg-slate-300 border border-black">
          Export Data to <span class="text-[#468e5e]">Google Sheet</span>
        </button>
        <div class="h-fit flex justify-center items-center">
          <div class="h-[200px] w-[200px] bg-red-300"></div>
          <p class="pl-4">Service Maintanace</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import MachineDashboard from "../components/MachineDashboard.vue";

export default {
  components: { Header, MachineDashboard },
  data() {
    return {
      listOfMachines: [
        {
          name: "Cutting Machine",
          id: 1,
          active: true,
        },
        {
          name: "Polish Machine",
          id: 2,
          active: false,
        },
      ],
      machineData: [
        {
          name: "ขณะนี้",
          value: 250,
        },
        {
          name: "ในวันนี้",
          value: 500,
        },
        {
          name: "ในเดือนนี้",
          value: 1000,
        },
        {
          name: "ในปีนี้",
          value: 2000,
        },
      ],
    };
  },

  methods: {
    changeActiveMachine(id) {
      this.listOfMachines.forEach((machine) => {
        if (machine.id === id) {
          machine.active = true;
        } else {
          machine.active = false;
        }
      });
    },
  },
};
</script>

<style></style>
