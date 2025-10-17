<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
    <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome Back</h2>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-5">
        <div>
          <label class="text-gray-600 mb-1 block font-medium" for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
        <div>
          <label class="text-gray-600 mb-1 block font-medium" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition"
        >
          Login
        </button>
      </form>     
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Swal from "sweetalert2";
const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();
const onSubmit = async () => {
  try {
    await authStore.login(username.value, password.value);
    Swal.fire("Success", "Logged in successfully", "success");
    router.push({ name: "tasks" });
  } catch (e) {
    Swal.fire("Error", "Invalid credentials", "error");
  }
};
</script>
