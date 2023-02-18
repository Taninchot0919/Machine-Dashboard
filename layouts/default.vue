<template>
  <div class="">
    <Navbar v-if="!isLoading" />
    <Nuxt v-if="!isLoading" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "default",
  components: { Navbar },
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
