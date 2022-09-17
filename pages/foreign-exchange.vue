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
      :items="currency"
      :is-fx="true"
    />

    <!-- stock card-->
    <div
      v-if="stocks.length"
      class="flex items-center justify-center gap-3 flex-wrap my-4"
    >
      <StockMockupCard
        v-for="(item, index) in stocks"
        :key="index"
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
      :label="'Foreign currency Exchange'"
    />
  </div>
</template>

<script>
import foreignExchange from "../data/foreignExchange";
export default {
  name: "ForeignCurrencyPage",
  middleware: ["isUser"],
  data() {
    return {
      from_symbol: "",
      to_symbol: "",
      isLoading: false,
      errorMsg: "data not found",
      isErrorMsg: false,
      stocks: [],
      marketHistory: [],
      historyDates: [],
      prices: [],
      isCalling: false,
    };
  },
  computed: {
    currency() {
      return foreignExchange;
    },
  },
  methods: {
    deleteStock(stock) {
      this.stocks.filter((item) =>{
        if (item.from_symbol === stock.from_symbol && item.to_symbol === stock.to_symbol){
          this.stocks.splice(item, 1);
        }
      });

      this.marketHistory.filter((item) =>{
        if (item.from_symbol === stock.from_symbol && item.to_symbol === stock.to_symbol){
          this.marketHistory.splice(item, 1);
        }
      });

      this.prices.filter((item) =>{
        if (item.from_symbol === stock.from_symbol && item.to_symbol === stock.to_symbol){
          this.prices.splice(item, 1);
        }
      });

      this.isCalling = true;
      setTimeout(() => {
        this.isCalling = false;
      }, 300);
    },
    checkIfExist(data, array) {
      if (array.length) {
        const isExist = array.find(
          (item) =>
            item.from_symbol === this.from_symbol &&
            item.to_symbol === this.to_symbol
        );
        if (isExist) {
          isExist.data = data;
        } else {
          array.push({
            from_symbol: this.from_symbol,
            to_symbol: this.to_symbol,
            data: data,
          });
        }
      } else {
        array.push({
          from_symbol: this.from_symbol,
          to_symbol: this.to_symbol,
          data: data,
        });
      }
    },
    async fetchData(event) {
      this.historyDates = [];
      this.from_symbol = event.from_symbol;
      this.to_symbol = event.to_symbol;
      this.isLoading = true;
      await this.$axios
        .get(
          `/query?function=FX_DAILY&from_symbol=${event.from_symbol}&to_symbol=${event.to_symbol}&apikey=NRUUDHFS7BXY9FE2`
        )
        .then((res) => {
          this.isLoading = false;
          if (res && res.data) {
            this.checkIfExist(
              res.data["Time Series FX (Daily)"],
              this.marketHistory
            );
            const prices = [];
            for (const key in res.data["Time Series FX (Daily)"]) {
              prices.push(res.data["Time Series FX (Daily)"][key]["4. close"]);
            }
            this.checkIfExist(prices, this.prices);

            let items = res.data["Time Series FX (Daily)"];
            for (const property in items) {
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              let yesterdayDate = yesterday.toISOString().slice(0, 10);
              if (property === yesterdayDate) {
                const stock = {
                  from_symbol: this.from_symbol,
                  to_symbol: this.to_symbol,
                  open: items[property]["1. open"],
                  close: items[property]["4. close"],
                  high: items[property]["2. high"],
                  low: items[property]["3. low"],
                };
                if (
                  this.stocks.findIndex(
                    (item) =>
                      item.from_symbol === event.from_symbol &&
                      item.to_symbol === event.to_symbol
                  ) === -1
                ) {
                  this.stocks.push(stock);
                } else {
                  this.stocks.splice(
                    this.stocks.findIndex(
                      (item) =>
                        item.from_symbol === event.from_symbol &&
                        item.to_symbol === event.to_symbol
                    ),
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
    },
  },
};
</script>
