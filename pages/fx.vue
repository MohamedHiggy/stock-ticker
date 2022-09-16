<template>
  <div>
    <HeaderActionForm />
    <div class="flex items-center justify-start gap-4 flex-wrap">
      <StockMockupCard :stock="stock" />
    </div>
  </div>
</template>

<script>
export default {
    name: "StockPricesPage",
    data() {
      return {
        stock: {
          symbol: "MSFT",
          open: 89.9,
          close: 89.9,
          high: 89.9,
          low: 89.9,
        }
      }
    },
}
</script>
