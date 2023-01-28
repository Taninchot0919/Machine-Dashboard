<template>
  <div
    class="h-[100px] flex justify-center items-center bg-slate-50 text-[24px]"
  >
    <p class="font-bold mr-2">{{ title }}</p>
    <p>Company</p>
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
