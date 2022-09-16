<template>
  <div
    class="border border-gray-200 bg-gray-100 rounded-xl p-4 flex items-center justify-between gap-1 flex-wrap min-w-56 w-56">
    <div class="flex flex-col font-bold">
      <p class="text-3xl text-green-500">{{stock.close}}</p>
      <p class="text-2xl text-gray-800">{{stock.symbol}}</p>
    </div>
    <div class="flex flex-col capitalize">
      <p>open: {{stock.open}}</p>
      <p>close: {{stock.close}}</p>
      <p>High: {{stock.high}}</p>
      <p>Low: {{stock.low}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: Object,
      required: true,
      default: () => { },
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
