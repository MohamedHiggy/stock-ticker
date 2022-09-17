<template>
  <div>
    <!-- Error Msg-->
    <p v-if="isErrorMsg" class="text-red-500 font-bold text-xl">
      {{ errorMsg }}
    </p>

    <!-- header actions btn, input, and select box-->
    <HeaderActionForm @addSymbol="fetchData" :isLoading="isLoading" :items="symbols" />

    <!-- stock card-->
    <div v-if="stock" class="flex items-center justify-center my-4">
      <StockMockupCard :stock="stock" />
    </div>

    <!-- Chart -->
    <TheChart
      :historyDates="historyDates"
      :prices="prices"
      :isCalling="isCalling"
      :label="'Stock Prices'"
    />
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
      marketHistory: [],
      historyDates: [],
      prices: [],
      isCalling: false,
    };
  },
  computed: {
    symbols() {
      return symbolsExamples;
    },
  },
  methods: {
    async fetchData(symbol) {
      if (this.marketHistory.length > 0) {
        this.marketHistory = [];
        this.historyDates = [];
        this.prices = [];
      }
      this.symbol = symbol;
      this.isLoading = true;
      await this.$axios
        .get(
          `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=NRUUDHFS7BXY9FE2`
        )
        .then((res) => {
          this.isLoading = false;
          if (res && res.data) {
            this.marketHistory = res.data["Time Series (Daily)"];
            for (const property in this.marketHistory) {
              let price = this.marketHistory[property]["4. close"];
              this.prices.unshift(price);
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              let yesterdayDate = yesterday.toISOString().slice(0, 10);
              if (property === yesterdayDate) {
                this.stock = {
                  symbol: symbol,
                  open: this.marketHistory[property]["1. open"],
                  close: this.marketHistory[property]["4. close"],
                  high: this.marketHistory[property]["2. high"],
                  low: this.marketHistory[property]["3. low"],
                };
              }
              let formattedYear = property.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
              this.historyDates.unshift(formattedYear);
              this.isCalling = true;
              setTimeout(() => {
                this.isCalling = false;
              }, 300);
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
