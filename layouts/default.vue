<template>
  <div class="bg-bg-light min-h-screen">
    <div v-if="user" class="
        nav-links
        bg-white
        flex
        items-center
        justify-between
        mb-4
        px-12
        py-6
        shadow
      ">
      <div class="flex items-center justify-start gap-3">
        <nuxt-link to="/stock-prices" class="text-gray-400 capitalize">stock prices</nuxt-link>
        <nuxt-link to="/foreign-exchange" class="text-gray-400 capitalize">foreign currency exchange</nuxt-link>
      </div>
      <div class="flex items-center justify-start gap-3">
        <button type="button" @click="logout"
          class="text-gray-800 font-semibold capitalize px-4 py-1 bg-gray-100 rounded-lg">
          Logout
        </button>
        <p class="text-gray-teal font-semibold capitalize">welcome {{user.name}}</p>
      </div>
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
      this.$store.dispatch("updateUser", JSON.parse(user));
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
