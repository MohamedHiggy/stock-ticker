<template>
  <div class="flex items-center justify-start gap-4 flex-wrap mb-10">
    <input
      type="text"
      v-model="symbol"
      class="
        w-52
        font-light
        px-6
        py-2
        rounded-[10px]
        border border-[#ACB2BF]
        focus:outline-none
        placeholder:text-[#ACB2BF]
        text-base
        placeholder:text-sm placeholder:tracking-[0.75px]
        text-[#ACB2BF]
      "
    />
    <button
      class="w-36 rounded-lg px-6 py-2 text-white"
      type="button"
      :class="[
        !symbol
          ? 'bg-gray-400 cursor-not-allowed bg-opacity-20'
          : 'bg-gray-600 ',
      ]"
      :disabled="!symbol"
      @click="addSymbol"
    >
      Add
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symbol: "AAPL",
    };
  },
  methods: {
    addSymbol() {
      console.log("addSymbol", this.symbol);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
