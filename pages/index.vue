<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <p class="text-3xl mb-5">Logo Kubz</p>
    <div class="flex flex-col space-y-3">
      <input
        type="text"
        class="border border-black px-3 py-2"
        placeholder="username"
      />
      <input
        type="password"
        class="border border-black px-3 py-2"
        placeholder="password"
      />
      <button class="border border-black px-3 py-2">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
