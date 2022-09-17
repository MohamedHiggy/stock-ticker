<template>
  <div class="grid place-items-center h-screen">
    <div class="mx-auto w-96 bg-white  shadow-xl rounded px-8 py-6">
      <form @submit.prevent="login">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            v-model="username"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="
              bg-blue-500
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="submit"
            :disabled="!username"
            :class="[!username ? 'bg-opacity-20 cursor-not-allowed' : '']"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: ["guard"],
  data() {
    return {
      username: "",
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.$store.dispatch("checkIfUserExist", this.username);
    },
  },
};
</script>
