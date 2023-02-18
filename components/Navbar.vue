<template>
  <div
    v-if="!isLoading && isUsersLoggedIn"
    class="w-full h-10 flex items-center justify-between text-xl font-semibold px-10"
  >
    <div
      class="w-full hover:text-custom-blue-200 cursor-pointer"
      v-if="isCanGoBack"
      @click="goBack"
    >
      Back
    </div>
    <div class="w-full flex justify-end space-x-5">
      <p
        class="hover:text-custom-blue-200 cursor-pointer"
        v-if="userData.role == 'admin'"
      >
        Add Member
      </p>
      <p class="hover:text-custom-blue-200 cursor-pointer">
        Create New Machine
      </p>
      <p class="hover:text-custom-blue-200 cursor-pointer" @click="logout">
        Logout
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      userData: null,
      isLoading: true,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logoutAction");
    },
    goBack() {
      this.$store.dispatch("setIsCanGoBack", false);
      this.$router.push("/machine");
    },
  },
  async mounted() {
    this.isLoading = false;
  },
  computed: {
    isCanGoBack() {
      return this.$store.getters["getIsCanGoBack"];
    },
    isUsersLoggedIn() {
      this.userData = this.$store.getters["user/getUser"];
      return this.$store.getters["user/getUser"];
    },
  },
};
</script>

<style></style>
