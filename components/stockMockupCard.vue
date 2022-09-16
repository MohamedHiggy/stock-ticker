<template>
  <div
    class="
      border border-gray-200
      bg-gray-100
      rounded-xl
      p-4
      flex
      items-center
      justify-between
      gap-1
      flex-wrap
      min-w-80
      w-80
    "
  >
    <div class="flex flex-col font-bold">
      <p
        class="text-3xl"
        :class="[isLessThen ? 'text-red-500' : 'text-green-500']"
      >
        {{ stock.close.slice(0, -2) }}
      </p>
      <p class="text-2xl text-gray-800">{{ stock.symbol }}</p>
    </div>
    <div class="flex flex-col capitalize">
      <p>open: {{ stock.open.slice(0, -2) }}</p>
      <p>close: {{ stock.close.slice(0, -2) }}</p>
      <p>High: {{ stock.high.slice(0, -2) }}</p>
      <p>Low: {{ stock.low.slice(0, -2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    isLessThen() {
      return this.stock.close < this.stock.open;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
