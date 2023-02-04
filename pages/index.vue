<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-custom-blue-50"
  >
    <div
      class="w-[800px] h-[600px] bg-white rounded-[20px] p-[70px] flex flex-col justify-center items-center"
    >
      <p class="w-[186px] h-[125px] bg-red-50 mb-[65px]">LOGO</p>
      <form class="space-y-[45px] w-full flex flex-col" @submit.prevent="login">
        <input
          v-model="username"
          type="text"
          class="border border-[#A7DBA] w-full h-[60px] px-[32px] py-[12px] text-[24px] rounded-[10px]"
          placeholder="Enter your username"
        />
        <input
          v-model="password"
          type="password"
          class="border border-[#A7DBA] w-full h-[60px] px-[32px] py-[12px] text-[24px] rounded-[10px]"
          placeholder="Enter your password"
        />
        <button
          class="border bg-custom-blue-200 flex justify-center items-center text-white w-full h-[60px] px-[32px] py-[12px] text-[24px] rounded-[10px]"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      username: "Taninchot",
      password: "P@ssw0rd",
    };
  },
  methods: {
    async login() {
      let result = await this.$axios.$post("/login", {
        username: this.username,
        password: this.password,
      });
      this.$store.dispatch("user/loginAction", result);
      this.$router.push("/machine");
    },
  },

  async mounted() {
    if (await this.$store.dispatch("user/isUserLoggedIn")) {
      this.$router.push("/machine");
    }
  },
};
</script>
