<template>
  <div class="p-[50px]">
    <p>สวัสดีคุณ {{ username }}</p>
    <div class="mt-[12px]">
      <div
        v-for="machine in machines"
        :key="machine._id"
        class="border border-black h-[64px] flex items-center pl-[20px] cursor-pointer"
        @click="$router.push(`/machine/${machine._id}`)"
      >
        {{ machine.machine_name }}
      </div>
    </div>
    <div v-if="machines.length == 0">
      <p>สร้าง Machine ของคุณเลย</p>
      <button @click="isCreateMachine = true">Create Machine</button>
      <CreateMachine v-if="isCreateMachine" />
    </div>
  </div>
</template>

<script>
import CreateMachine from "../../components/CreateMachine.vue";

export default {
  data() {
    return {
      username: null,
      machines: [],
      isCreateMachine: false,
    };
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
  components: { CreateMachine },
};
</script>

<style></style>
