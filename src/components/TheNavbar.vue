<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from "@/axiosconfig/axiosInstance";
import useAuth from '@/composables/useAuth';

const isTopRightMenuOpen = ref(false);
const isBottomMenuOpen = ref(false);
const user = ref(null);

const { logout } = useAuth();

const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/profile");
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
  <div class="text-white" style="background-color: rgb(181, 101, 30);">
    <div class="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center relative">
      <div class="text-2xl font-bold">
        <span class="text-white">AfroartSafari.com</span>
      </div>

      <div class="hidden md:flex items-center space-x-6">
        <router-link to="https://www.oanda.com/currency-converter/en/?from=USD&to=EUR&amount=1"
          class="text-white font-semibold hover:text-gray-300">USD</router-link>
        <img class="rounded-full h-8 w-8" src="@/assets/images/usa.png">
        <router-link to="/support" class="text-white font-semibold hover:text-white">
          <i class="fas fa-question-circle"></i> Help
        </router-link>
        <router-link to="/list-property" class="text-white font-semibold hover:text-gray-300">List Your
          Property</router-link>

        <!-- Conditionally render Login/Signup or Welcome, Name and Logout -->
        <template v-if="user">
          <div class="flex items-center space-x-4">
            <div
              class="border border-white text-white px-4 py-1 rounded-md outline outline-2 outline-white font-semibold">
              <i class="fas fa-user"></i> {{ user.name }}
            </div>
            <button
              class="border border-white text-white px-4 py-1 rounded-md outline outline-2 outline-white font-semibold hover:bg-red-600 hover:border-red-600 transition duration-300"
              @click="logout">
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <router-link to="/login"
            class="border-2 border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">Login</router-link>
          <router-link to="/signup"
            class="border-2 border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">Signup</router-link>
        </template>
      </div>

      <button class="md:hidden absolute top-4 right-6 text-white text-xl"
        @click="isTopRightMenuOpen = !isTopRightMenuOpen">
        <i class="fas fa-bars"></i>
      </button>

      <div v-if="isTopRightMenuOpen"
        class="absolute mt-12 top-0 right-1 w-48 bg-blue-300 p-4 rounded-lg shadow-lg md:hidden">
        <router-link to="https://www.oanda.com/currency-converter/en/?from=USD&to=EUR&amount=1"
          class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
          <i class="fas fa-dollar-sign"></i>
          <span>USD</span>
        </router-link>
        <router-link to="/support"
          class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
          <i class="fas fa-question-circle"></i>
          <span>Help</span>
        </router-link>
        <router-link to="/list-property"
          class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
          <i class="fas fa-plus-circle"></i>
          <span>List Your Property</span>
        </router-link>

        <template v-if="user">
          <div class="block text-white py-2 flex flex-col items-start space-y-2">
            <div class="font-semibold">{{ user.name }}</div>
            <button
              class="border border-white text-white px-4 py-1 rounded-md outline outline-2 outline-white font-semibold hover:bg-red-600 hover:border-red-600 transition duration-300"
              @click="logout">
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <router-link to="/login"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </router-link>
          <router-link to="/signup"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-user-plus"></i>
            <span>Signup</span>
          </router-link>
        </template>
      </div>
    </div>

    <!-- Bottom menu for large screens -->
    <div class="px-6 py-2">
      <div class="max-w-screen-xl mx-auto flex justify-start space-x-6 hidden md:flex">
        <router-link to="/stays"
          class="text-white px-4 py-2 border border-white rounded-full flex items-center space-x-2 hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-bed"></i>
          <span>Stays</span>
        </router-link>

        <router-link to="/flights"
          class="text-white px-4 py-2 border border-white rounded-full flex items-center space-x-2 hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-plane"></i>
          <span>Flights</span>
        </router-link>

        <router-link to="/car-rentals"
          class="text-white px-4 py-2 border border-white rounded-full flex items-center space-x-2 hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-car"></i>
          <span>Car Rentals</span>
        </router-link>

        <router-link to="/attractions"
          class="text-white px-4 py-2 border border-white rounded-full flex items-center space-x-2 hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-camera-retro"></i>
          <span>Attractions</span>
        </router-link>

        <router-link to="/airport-taxi"
          class="text-white px-4 py-2 border border-white rounded-full flex items-center space-x-2 hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-taxi"></i>
          <span>Airport Taxis</span>
        </router-link>
      </div>

      <div class="md:hidden">
        <button class="text-white text-xl " @click="isBottomMenuOpen = !isBottomMenuOpen">
          <i class="fas fa-bars"></i>
        </button>
        <div v-if="isBottomMenuOpen"
          class="mt-28 absolute top-0 left-0 w-48 bg-blue-300 p-4 rounded-lg shadow-lg mt-12">
          <router-link to="/stays"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-bed"></i>
            <span>Stays</span>
          </router-link>

          <router-link to="/flights"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-plane"></i>
            <span>Flights</span>
          </router-link>

          <router-link to="/car-rentals"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-car"></i>
            <span>Car Rentals</span>
          </router-link>

          <router-link to="/attractions"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-camera-retro"></i>
            <span>Attractions</span>
          </router-link>

          <router-link to="/airport-taxi"
            class="block text-white py-2 flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-taxi"></i>
            <span>Airport Taxis</span>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styling if necessary */
</style>
