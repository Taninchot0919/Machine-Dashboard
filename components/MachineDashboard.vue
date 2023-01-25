<template>
  <div class="flex justify-center items-center">
    <div
      v-for="data in machineData"
      :key="data.name"
      class="bg-white border border-black rounded-lg aspect-square w-3/4 h-3/4 m-2 flex flex-col items-center justify-center text-3xl"
    >
      <p class="mb-8">{{ data.name }}</p>
      <p class="font-bold">{{ data.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MachineMonitor",
  props: {
    machineData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
