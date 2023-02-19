<template>
  <div
    v-if="!isLoading && isUsersLoggedIn"
    class="w-full h-20 flex items-center justify-between text-xl font-semibold px-10"
  >
    <div
      class="hover:text-custom-blue-200 cursor-pointer"
      @click="$router.push('/machine')"
    >
      <p>Machine Dashboard</p>
    </div>
    <div class="flex justify-end space-x-5">
      <p
        class="cursor-pointer hover:bg-custom-blue-100 px-3 py-2 rounded-[5px]"
        v-if="userData.role == 'admin'"
      >
        Add Member
      </p>
      <p
        class="cursor-pointer hover:bg-custom-blue-100 px-3 py-2 rounded-[5px]"
        @click="isCreateMachine = true"
      >
        Create New Machine
      </p>
      <p
        class="cursor-pointer hover:bg-custom-blue-100 px-3 py-2 rounded-[5px]"
        @click="logout"
      >
        Logout
      </p>
    </div>
    <CreateMachine
      v-if="isCreateMachine"
      @closeModal="isCreateMachine = false"
    />
  </div>
</template>

<script>
import CreateMachine from "./CreateMachine.vue";

export default {
  name: "Navbar",
  components: { CreateMachine },
  data() {
    return {
      userData: null,
      isLoading: true,
      isCreateMachine: false,
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
