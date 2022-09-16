<template>
  <div>
    <HeaderActionForm />
    <highstock :options="chartOptions" />
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
            symbol: "AAPL",
            watchers: ["options.series"],
            series: [],
            stock: {
                symbol: "MSFT",
                open: 89.9,
                close: 89.9,
                high: 89.9,
                low: 89.9,
            },
        };
    },
    computed: {
        chartOptions() {
            return {
                chart: {
                    type: "candlestick",
                },
                rangeSelector: {
                    selected: 4,
                },
                title: {
                    text: `${this.symbol} Stock Price`,
                },
                series: this.series,
            };
        },
    },
    mounted() {
        this.fetchTestData("AAPL");
        this.fetchData();
    },
    methods: {
        async fetchTestData(symbol) {
            const { price } = await fetch("/data.json").then((r) => r.json());
            this.series.push({
                name: symbol,
                data: price.map((entry) => {
                    return [
                        entry.epochTime.epochTime,
                        entry.open.val,
                        entry.high.val,
                        entry.low.val,
                        entry.close.val,
                    ];
                }),
            });
        },
        async fetchData() {
            const data = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo").then((r) => r.json());
            console.log(data);
        },
    },
};
</script>
