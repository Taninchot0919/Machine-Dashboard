<template>
  <div
    class="h-[100px] flex justify-center items-center bg-slate-50 text-[24px]"
  >
    <div
      class="flex hover:text-custom-blue-200 cursor-pointer"
      @click="$router.push('/machine')"
    >
      <p class="font-bold mr-2">{{ title }}</p>
      <p>Company</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style></style>
