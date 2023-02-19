<template>
  <div class="p-[50px] bg-custom-blue-50 min-h-screen">
    <div></div>
    <div class="flex justify-between items-center">
      <p class="text-2xl">
        สวัสดีคุณ <span class="font-bold">{{ username }}</span>
      </p>
    </div>
    <div class="mt-[12px] space-y-3">
      <div
        v-for="machine in machines"
        :key="machine._id"
        class="relative text-2xl border border-black h-[64px] flex items-center pl-[20px] cursor-pointer bg-white font-semibold hover:text-custom-blue-200 hover:border-custom-blue-200"
        @click="$router.push(`/machine/${machine._id}`)"
      >
        <div class="w-full flex justify-between items-center">
          <p>{{ machine.machine_name }}</p>
          <div class="flex items-center text-sm space-x-5 text-black px-3">
            <p @click.stop="handleClickEditMachine(machine)">Edit Machine</p>
            <div
              class="bg-yellow-200 h-[32px] flex items-center justify-center px-[10px] cursor-pointer hover:bg-yellow-300"
              @click.stop="copyMachineAPI(machine._id)"
            >
              <p>Copy Machine API</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="machines.length == 0">
      <p>สร้าง Machine ของคุณเลย</p>
      <button @click="isCreateMachine = true">Create Machine</button>
    </div>
    <EditMachineModal
      v-if="isEditMachineModal"
      @closeModal="closeModal"
      :machineData="editedMachine"
    />
  </div>
</template>

<script>
import CreateMachine from "../../components/CreateMachine.vue";
import EditMachineModal from "../../components/EditMachineModal.vue";

export default {
  components: { CreateMachine, EditMachineModal },
  data() {
    return {
      username: null,
      machines: [],
      isCreateMachine: false,
      isEditMachineModal: false,
      editedMachine: null,
    };
  },
  methods: {
    closeModal() {
      this.isCreateMachine = false;
      this.isEditMachineModal = false;
    },
    copyMachineAPI(machineId) {
      navigator.clipboard.writeText(
        `${process.env.API_URL}/update-machine/${machineId}/:counter`
      );
    },
    async logout() {
      await this.$store.dispatch("user/logoutAction");
    },
    handleClickEditMachine(machine) {
      this.isEditMachineModal = true;
      this.editedMachine = Object.assign({}, machine);
    },
  },
  async mounted() {
    if (!this.$store.getters["user/getUser"]) {
      this.$router.push("/");
    }
    let userData = this.$store.getters["user/getUser"];
    this.username = userData.username;
    let { data: machines } = await this.$store.dispatch(
      "machine/getMachines",
      userData.company_id
    );
    this.machines = machines;
  },
};
</script>

<style></style>
