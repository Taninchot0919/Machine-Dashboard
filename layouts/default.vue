<template>
  <div class="">
    <Nuxt v-if="!isLoading" />
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("user/getUserDataFromLocalStorage");
    this.isLoading = false;
  },
};
</script>

<style></style>
