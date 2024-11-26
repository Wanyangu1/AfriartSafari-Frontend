<script setup>
import { ref, onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const scrollContainer = ref(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
  }
};

const videoRef = ref(null);

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.playbackRate = 0.4;
  }
});
</script>

<template>
  <TheNavbar />

  <!-- Hero Section with Background Video -->
  <div class="relative h-96">
    <video ref="videoRef" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover">
      <source src="@/assets/images/staycation/video/stay1.mp4" type="video/mp4" />
      <img src="@/assets/images/staycation/fallback.jpg" alt="Fallback background image"
        class="absolute inset-0 w-full h-full object-cover" />
    </video>
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative h-full flex flex-col justify-center items-start text-white px-8 lg:px-16 space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold">Welcome to AfroartSafari</h1>
      <p class="text-xl md:text-xl font-semi max-w-xl">
        Discover handpicked destinations, luxurious stays, and seamless travel experiences designed to make every
        journey unforgettable.
      </p>
      <div class="space-y-4">
        <div class="flex space-x-4">
          <router-link to="/stays"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-blue-600 hover:text-white">
            Explore Stays
          </router-link>
          <router-link to="/flights"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-indigo-600 hover:text-white">
            Book Flights
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Bar Section -->
  <div class="py-8 bg-gray-50 px-4 md:px-16">
    <div class="max-w-3xl mx-auto flex items-center space-x-4">
      <input type="text" placeholder="Search for stays, destinations..."
        class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
      <button
        class="bg-transparent border-2 border-black text-indigo-600 py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-indigo-600 hover:text-white transition">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </button>
    </div>
  </div>

  <!-- Property Cards Section -->
  <section class="py-16 bg-gray-100">
    <div class="px-4">
      <h2 class="text-2xl font-bold mb-2">Property types unique to Zambia</h2>
      <p class="text-md mb-2 font-sans"> Stay in style for your next trip</p>

      <div class="relative">
        <!-- Left Arrow -->
        <button @click="scrollLeft"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div ref="scrollContainer" class="flex overflow-x-hidden space-x-6 py-4 px-1 snap-x scroll-smooth w-full">
          <!-- Property Cards -->
          <div class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img src="@/assets/images/staycation/urban.jpg" alt="Urban Resort" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">Urban Resort</h3>
              </div>
            </div>
          </div>

          <div class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img src="@/assets/images/staycation/fallback.jpg" alt="Beachfront Paradise"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">Beachfront Paradise</h3>
              </div>
            </div>
          </div>

          <div class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img src="@/assets/images/staycation/luxury.jpg" alt="Mountain View Lodge"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">Luxury Villa</h3>
              </div>
            </div>
          </div>

          <div class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img src="@/assets/images/staycation/deco.jpeg" alt="Poolside Resort" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">Art Deco Apartment</h3>
              </div>
            </div>
          </div>

          <div class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img src="@/assets/images/staycation/boutique.jpg" alt="Boutique Hotel"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">Boutique Hotel</h3>
              </div>
            </div>
          </div>

          <div class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img src="@/assets/images/staycation/safari.jpg" alt="Luxury Villa" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">Safari Lodge</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Arrow -->
        <button @click="scrollRight"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>

  <!-- Browse by Category Type Section -->
  <section class="py-16 bg-gray-200">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-bold mb-2">Browse by Category Type</h2>
      <p class="text-md font-sans mb-3"> Stay in style for your next trip</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Hotels Card -->
        <div class="shadow-md rounded-lg overflow-hidden">
          <img src="@/assets/images/staycation/hotels.jpeg" alt="Hotels" class="w-full h-40 object-cover" />
          <div class="p-4 text-center">
            <h3 class="text-xl font-bold">Hotels</h3>
          </div>
        </div>
        <!-- Resorts Card -->
        <div class="shadow-md rounded-lg overflow-hidden">
          <img src="@/assets/images/staycation/resort.jpeg" alt="Resorts" class="w-full h-40 object-cover" />
          <div class="p-4 text-center">
            <h3 class="text-xl font-bold">Resorts</h3>
          </div>
        </div>
        <!-- Villas Card -->
        <div class="shadow-md rounded-lg overflow-hidden">
          <img src="@/assets/images/staycation/villa.jpeg" alt="Villas" class="w-full h-40 object-cover" />
          <div class="p-2 text-center">
            <h3 class="text-xl font-bold">Villas</h3>
          </div>
        </div>
        <!-- Apartments Card -->
        <div class="shadow-md rounded-lg overflow-hidden">
          <img src="@/assets/images/staycation/apartments.jpeg" alt="Apartments" class="w-full h-40 object-cover" />
          <div class="p-4 text-center">
            <h3 class="text-xl font-bold">Apartments</h3>
          </div>
        </div>
      </div>
    </div>
  </section>


  <TheFooter />
</template>

<style scoped>
.scroll-container {
  max-width: calc(4 * 18rem);
  overflow-x: auto;
  scroll-behavior: smooth;
}
</style>
