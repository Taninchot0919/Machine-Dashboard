<template>
  <ModalLayout>
    <div
      class="relative w-[750px] h-[300px] bg-white rounded-[10px] shadow-lg p-8 flex items-center"
    >
      <CloseButton
        class="absolute top-3 right-5 cursor-pointer"
        @click.native="$emit('closeModal')"
      />
      <div class="w-full items-center space-y-2">
        <p>Machine Name :</p>
        <input
          type="text"
          class="border px-3 py-2 w-full"
          v-model="machineData.machine_name"
        />
        <p>SpreadSheet Id :</p>
        <input
          type="text"
          class="border px-3 py-2 w-full"
          v-model="machineData.spread_sheet_id"
        />
        <button
          class="bg-custom-blue-200 text-white w-32 h-16 rounded-[5px]"
          @click="updateMachine"
        >
          Edit Machine
        </button>
        <button
          class="bg-red-600 text-white w-32 h-16 rounded-[5px]"
          @click="deleteMachine"
        >
          Delete Machine
        </button>
      </div>
    </div>
  </ModalLayout>
</template>

<script>
export default {
  name: "EditMachineModal",
  props: {
    machineData: {
      type: Object,
      default: {},
      required: true,
    },
  },
  methods: {
    async updateMachine() {
      let result = await this.$store.dispatch(
        "machine/updateMachine",
        this.machineData
      );
      if (result) {
        this.$nuxt.$router.go(0);
      }
    },
    async deleteMachine() {
      let result = await this.$store.dispatch(
        "machine/deleteMachine",
        this.machineData._id
      );
      if (result) {
        this.$nuxt.$router.go(0);
      }
    },
  },
};
</script>

<style></style>
