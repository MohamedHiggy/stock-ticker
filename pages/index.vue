<template>
  <div>
    <p v-if="isErrorMsg" class="text-red-500 font-bold text-xl">
      {{ errorMsg }}
    </p>
    <HeaderActionForm
      @addSymbol="fetchData"
      :isLoading="isLoading"
      :items="symbols"
    />
    <div v-if="stock" class="flex items-center justify-center mt-4">
      <StockMockupCard :stock="stock" />
    </div>
  </div>
</template>

<script>
import symbolsExamples from "../data/symbolsExamples";
export default {
  name: "StockPricesPage",
  data() {
    return {
      symbol: "MSFT",
      stock: null,
      isLoading: false,
      errorMsg: "data not found",
      isErrorMsg: false,
      stockMarketHistory: [],
    };
  },
  mounted() {
    this.fetchData(this.symbol);
  },
  computed: {
    symbols() {
      return symbolsExamples;
    },
  },
  methods: {
    async fetchData(symbol) {
      this.symbol = symbol;
      this.isLoading = true;
      await this.$axios
        .get(
          `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=NRUUDHFS7BXY9FE2`
        )
        .then((res) => {
          this.isLoading = false;
          if (res && res.data) {
            this.stockMarketHistory = res.data["Time Series (Daily)"];
            for (const property in this.stockMarketHistory) {
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              let yesterdayDate = yesterday.toISOString().slice(0, 10);
              if (property === yesterdayDate) {
                this.stock = {
                  symbol: symbol,
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
