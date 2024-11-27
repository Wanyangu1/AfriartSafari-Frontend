<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <TheNavbar />

    <!-- Coming Soon Content -->
    <main class="flex-grow flex flex-col items-center justify-center bg-gray-100">
      <h1 class="text-4xl font-bold text-gray-700 mt-12">Coming Soon!</h1>
      <p class="text-lg text-gray-500 mt-4">We are working hard to launch our new website. Stay tuned!</p>
      <img src="@/assets/images/comingsoon.png" alt="Coming Soon" class="w-0.75 h-72 object-cover rounded-lg" />
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>
