<template>
  <ModalLayout>
    <div
      class="relative rounded-[10px] shadow-lg bg-white w-[524px] h-[250px] pt-[50px]"
    >
      <CloseButton
        class="absolute top-3 right-5 cursor-pointer"
        @click.native="$emit('closeModal')"
      />
      <div class="flex flex-col items-center justify-center w-full h-full">
        <p class="text-2xl font-semibold">Create New Machine</p>
        <input
          v-model="machineName"
          type="text"
          class="border border-black rounded-[10px] w-[300px] h-[40px] mt-[20px] px-3 py-2"
        />
        <button
          @click="createMachine"
          class="bg-custom-blue-100 rounded-[5px] w-[150px] h-[50px] mt-[20px]"
        >
          Create Machine
        </button>
      </div>
    </div>
  </ModalLayout>
</template>

<script>
import CloseButton from "./CloseButton.vue";
import ModalLayout from "./ModalLayout.vue";

export default {
  components: { ModalLayout, CloseButton },
  data() {
    return {
      machineName: null,
    };
  },
  methods: {
    async createMachine() {
      let machine = {
        machine_name: this.machineName,
        company_id: this.$store.state.user.userData.company_id,
      };
      let newMachine = await this.$store.dispatch(
        "machine/createMachine",
        machine
      );
      this.$router.push(`/machine/${newMachine._id}`);
    },
    emitCloseModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style></style>
