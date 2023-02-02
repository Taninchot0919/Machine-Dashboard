<template>
  <div class="p-[50px] bg-custom-blue-50 min-h-screen">
    <div class="flex justify-between items-center">
      <p class="text-2xl">
        สวัสดีคุณ <span class="font-bold">{{ username }}</span>
      </p>
      <button
        @click="isCreateMachine = true"
        class="bg-custom-blue-200 font-bold text-white px-3 py-2 text-2xl rounded-[10px] w-[280px] h-[88px]"
      >
        Create new Machine
      </button>
    </div>
    <div class="mt-[12px] space-y-3">
      <div
        v-for="machine in machines"
        :key="machine._id"
        class="relative text-2xl border border-black h-[64px] flex items-center pl-[20px] cursor-pointer bg-white font-semibold hover:text-custom-blue-200 hover:border-custom-blue-200"
        @click="$router.push(`/machine/${machine._id}`)"
      >
        <div class="flex justify-between items-center">
          <p>{{ machine.machine_name }}</p>
          <div
            class="absolute right-[15px] text-sm bg-yellow-200 h-[32px] flex items-center justify-center px-[10px] cursor-pointer hover:bg-yellow-300"
            @click.stop="copyMachineAPI(machine._id)"
          >
            <p>Copy Machine API</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="machines.length == 0">
      <p>สร้าง Machine ของคุณเลย</p>
      <button @click="isCreateMachine = true">Create Machine</button>
    </div>
    <CreateMachine v-if="isCreateMachine" @closeModal="closeModal" />
  </div>
</template>

<script>
import CreateMachine from "../../components/CreateMachine.vue";

export default {
  components: { CreateMachine },
  data() {
    return {
      username: null,
      machines: [],
      isCreateMachine: false,
    };
  },
  methods: {
    closeModal() {
      this.isCreateMachine = false;
    },
    copyMachineAPI(machineId) {
      navigator.clipboard.writeText(
        `${process.env.API_URL}update-machine/${machineId}/:counter`
      );
    },
  },
  async mounted() {
    if (!this.$store.state.user) {
      this.$router.push("/");
    }
    let userData = this.$store.state.user.userData;
    this.username = this.$store.state.user.userData.username;
    let { data: machines } = await this.$store.dispatch(
      "machine/getMachines",
      userData.company_id
    );
    this.machines = machines;
  },
};
</script>

<style></style>
