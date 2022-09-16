<template>
  <div class="bg-bg-light min-h-screen">
    <div class="nav-links bg-white flex items-center justify-center gap-4 mb-4 py-6 shadow">
      <nuxt-link to="/" exact class=" text-gray-400 capitalize">stock prices</nuxt-link>
      <nuxt-link to="/fx" exact class=" text-gray-400 capitalize">foreign currency exchange</nuxt-link>
    </div>
    <div class="xl:w-[90%] md:w-[95%] w-full mx-auto">
      <Nuxt />
    </div>
  </div>
</template>

<script>

export default {
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
