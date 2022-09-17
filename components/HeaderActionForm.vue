<template>
  <div class="flex items-center justify-start gap-4 flex-wrap mb-10">
    <input
      v-if="!isFx"
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
    <SelectInput
      :items="items"
      :symbol="isFx ? from_symbol : symbol"
      @setData="isFx ? (from_symbol = $event.symbol) : (symbol = $event.symbol)"
    />
    <SelectInput
      v-if="isFx"
      :items="items"
      :symbol="to_symbol"
      @setData="to_symbol = $event.symbol"
    />
    <button
      class="
        w-36
        bg-gray-600
        rounded-lg
        px-6
        py-2
        text-white
        flex
        items-center
        justify-center
        gap-2
      "
      type="button"
      @click="addSymbol"
    >
      Get data
      <svg
        v-if="isLoading"
        class="w-4 h-4 text-white animate-spin dark:text-white fill-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFx: {
      type: Boolean,
      default: false,
      required: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      symbol: "MSFT",
      from_symbol: "USD",
      to_symbol: "EUR",
    };
  },
  created() {
    this.checkRouter();
  },
  watch: {
    $route(e) {
      if (e.params && !this.isLoading) {
        this.addSymbol();
      }
    },
  },
  methods: {
    checkRouter() {
      let searchParams = new URLSearchParams(window.location.search);
      let symbol = searchParams.get("symbol");
      let fromSymbol = searchParams.get("from_symbol");
      let toSymbol = searchParams.get("to_symbol");
      if (!this.isFx && symbol) {
        this.symbol = symbol;
        this.addSymbol();
      }
      if (this.isFx && fromSymbol && toSymbol) {
        this.from_symbol = fromSymbol;
        this.to_symbol = toSymbol;
        this.addSymbol();
      }
      if (!fromSymbol && !toSymbol && !symbol) {
        this.addSymbol();
      }
    },
    addSymbol() {
      const payload = {};
      if (!this.isFx && this.symbol) payload.symbol = this.symbol;
      if (this.isFx && this.from_symbol) payload.from_symbol = this.from_symbol;
      if (this.isFx && this.to_symbol) payload.to_symbol = this.to_symbol;
      this.$router.push({ path: this.$route.path, query: payload });
      if (this.isFx) {
        const payload = {
          from_symbol: this.from_symbol,
          to_symbol: this.to_symbol,
        };
        this.$emit("addSymbol", payload);
      } else {
        this.$emit("addSymbol", this.symbol);
      }
    },
  },
};
</script>
