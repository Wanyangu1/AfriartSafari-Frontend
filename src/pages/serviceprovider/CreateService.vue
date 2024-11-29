<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheNavbar />

    <main class="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 class="text-4xl font-bold text-gray-700 mt-12 text-center sm:text-5xl">Coming Soon!</h1>
      <p class="text-lg text-gray-500 mt-4 text-center sm:text-xl">We are working hard to launch our new website. Stay
        tuned!</p>
      <img src="@/assets/images/comingsoon.png" alt="Coming Soon"
        class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-auto object-cover rounded-lg mt-6" />
    </main>

    <TheFooter />
  </div>
</template>

<style></style>
