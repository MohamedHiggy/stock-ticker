<template>
  <div class="bg-bg-light min-h-screen">
    <div
      v-if="user"
      class="
        nav-links
        bg-white
        flex
        items-center
        justify-center
        gap-4
        mb-4
        py-6
        shadow
      "
    >
      <nuxt-link to="/stock-prices" exact class="text-gray-400 capitalize"
        >stock prices</nuxt-link
      >
      <nuxt-link to="/foreign-exchange" exact class="text-gray-400 capitalize"
        >foreign currency exchange</nuxt-link
      >
      <button
        type="button"
        @click="logout"
        class="text-gray-800 font-semibold capitalize"
      >
        Logout
      </button>
    </div>
    <div class="xl:w-[90%] md:w-[95%] w-full mx-auto">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$store.dispatch("setUser", JSON.parse(user));
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss">
.nav-links {
  .nuxt-link-active {
    color: #333333;
    font-weight: 600;
  }
}
</style>
