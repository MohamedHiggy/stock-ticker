<template>
  <div>
    <p v-if="isErrorMsg" class="text-red-500 font-bold text-xl">
      {{ errorMsg }}
    </p>
    <HeaderActionForm @addSymbol="fetchData" :isLoading="isLoading" :items="currency" :is-fx="true" />
    <div v-if="stock" class="flex items-center justify-center mt-4">
      <StockMockupCard :stock="stock" />
    </div>
  </div>
</template>

<script>
import foreignExchange from "../data/foreignExchange";
export default {
  name: "StockPricesPage",
  data() {
    return {
      from_symbol: "USD",
      to_symbol: "EUR",
      stock: null,
      isLoading: false,
      errorMsg: "data not found",
      isErrorMsg: false,
      stockMarketHistory: [],
    };
  },
  mounted() {
    this.fetchData({
      from_symbol: this.from_symbol,
      to_symbol: this.to_symbol,
    });
  },
  computed: {
    currency() {
      return foreignExchange;
    },
  },
  methods: {
    async fetchData(event) {
      this.from_symbol = event.from_symbol;
      this.to_symbol = event.to_symbol;
      this.isLoading = true;
      await this.$axios
        .get(
          `/query?function=FX_DAILY&from_symbol=${event.from_symbol}&to_symbol=${event.to_symbol}&outputsize=full&apikey=NRUUDHFS7BXY9FE2`
        )
        .then((res) => {
          this.isLoading = false;
          if (res && res.data) {
            this.stockMarketHistory = res.data["Time Series FX (Daily)"];
            for (const property in this.stockMarketHistory) {
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              let yesterdayDate = yesterday.toISOString().slice(0, 10);
              if (property === yesterdayDate) {
                this.stock = {
                  from_symbol: this.from_symbol,
                  to_symbol: this.to_symbol,
                  open: this.stockMarketHistory[property]["1. open"],
                  close: this.stockMarketHistory[property]["4. close"],
                  high: this.stockMarketHistory[property]["2. high"],
                  low: this.stockMarketHistory[property]["3. low"],
                };
              }
            }
          }
          if (res && res.data["Error Message"]) {
            this.isErrorMsg = true;
            setTimeout(() => {
              this.isErrorMsg = false;
            }, 3000);
          }
          if (res && res.data["Note"]) {
            this.isErrorMsg = true;
            this.errorMsg = "API limit reached 5 calls per minute";
            setTimeout(() => {
              this.isErrorMsg = false;
            }, 3000);
          }
        });
    },
  },
};
</script>
