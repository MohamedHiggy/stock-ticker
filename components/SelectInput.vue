<template>
  <div class="dropdown inline-block relative">
    <button type="button" class="
        bg-gray-300
        text-gray-700
        font-semibold
        py-2
        px-4
        rounded
        inline-flex
        items-center
      ">
      <span class="mr-1">{{ symbol }}</span>
      <svg class="fill-current h-4 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </button>
    <ul class="
        w-[300px]
        dropdown-menu
        absolute
        hidden
        text-gray-700
        pt-2
        z-10
        shadow
        h-80
        overflow-y-auto
      ">
      <li v-for="item in items" :key="item.symbol" class="cursor-pointer" @click="setData(item)">
        <p class="
            rounded-t
            bg-gray-50
            hover:bg-gray-400
            py-2
            px-4
            block
            whitespace-no-wrap
          ">
          {{ item.symbol }} - {{ item.name }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      default: '',
    },
  },
  methods: {
    setData(event) {
      this.$emit('setData', event);
    },
  },
}
</script>

<style lang="scss" scoped>
  .dropdown:hover .dropdown-menu {
    display: block;
  }
  </style>
