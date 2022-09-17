<template>
  <div>
    <!-- Error Msg-->
    <p v-if="isErrorMsg" class="text-red-500 font-bold text-xl">
      {{ errorMsg }}
    </p>

    <!-- header actions btn, input, and select box-->
    <HeaderActionForm
      @addSymbol="fetchData"
      :isLoading="isLoading"
      :items="symbols"
    />

    <!-- stock card-->
    <div
      v-if="stocks.length"
      class="flex items-center justify-center gap-3 flex-wrap my-4"
    >
      <StockMockupCard
        v-for="item in stocks"
        :key="item.symbol"
        :stock="item"
        @deleteStock="deleteStock"
      />
    </div>

    <!-- Chart -->
    <TheChart
      v-show="stocks.length"
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
      symbol: "",
      stocks: [],
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
    deleteStock(stock) {
      this.stocks = this.stocks.filter((item) => item.symbol !== stock.symbol);
      this.prices = this.prices.filter((item) => item.symbol !== stock.symbol);
      this.marketHistory = this.marketHistory.filter(
        (item) => item.symbol !== stock.symbol
      );
      this.isCalling = true;
      setTimeout(() => {
        this.isCalling = false;
      }, 300);
    },
    checkIfExist(data, array) {
      if (array.length) {
        const isExist = array.find((item) => item.symbol === this.symbol);
        if (isExist) {
          isExist.data = data;
        } else {
          array.push({
            symbol: this.symbol,
            data: data,
          });
        }
      } else {
        array.push({
          symbol: this.symbol,
          data: data,
        });
      }
    },
    async fetchData(symbol) {
      if (symbol === this.symbol) {
        this.isErrorMsg = true;
        this.errorMsg = "the symbol is the same";
        setTimeout(() => {
          this.isErrorMsg = false;
        }, 3000);
      } else {
        this.historyDates = [];
        this.symbol = symbol;
        this.isLoading = true;
        await this.$axios
          .get(
            `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=NRUUDHFS7BXY9FE2`
          )
          .then((res) => {
            this.isLoading = false;
            if (res && res.data) {
              this.checkIfExist(
                res.data["Time Series (Daily)"],
                this.marketHistory
              );
              const prices = [];
              for (const key in res.data["Time Series (Daily)"]) {
                prices.push(res.data["Time Series (Daily)"][key]["4. close"]);
              }
              this.checkIfExist(prices, this.prices);

              let items = res.data["Time Series (Daily)"];
              for (const property in items) {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                let yesterdayDate = yesterday.toISOString().slice(0, 10);
                if (property === yesterdayDate) {
                  const stock = {
                    symbol: symbol,
                    open: items[property]["1. open"],
                    close: items[property]["4. close"],
                    high: items[property]["2. high"],
                    low: items[property]["3. low"],
                  };
                  if (
                    this.stocks.findIndex((item) => item.symbol === symbol) ===
                    -1
                  ) {
                    this.stocks.push(stock);
                  } else {
                    this.stocks.splice(
                      this.stocks.findIndex((item) => item.symbol === symbol),
                      1,
                      stock
                    );
                  }
                }
                let formattedYear = property.replace(
                  /(\d{4})-(\d{2})-(\d{2})/,
                  "$2/$3/$1"
                );
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
      }
    },
  },
};
</script>
