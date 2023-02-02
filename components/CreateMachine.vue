<template>
  <div>
    <input
      type="text"
      v-model="machineName"
      class="border border-black px-3 py-2"
    />
    <button @click="createMachine">Create Machine</button>
  </div>
</template>

<script>
export default {
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
  },
};
</script>

<style></style>
