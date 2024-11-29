<script setup>
import { ref, onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import axiosInstance from '@/axiosconfig/axiosInstance';

const hotels = ref([]);
const wishlist = ref([]);
const trendingDestinations = ref([]);

const toggleWishlist = (hotelId) => {
  if (wishlist.value.includes(hotelId)) {
    wishlist.value = wishlist.value.filter((id) => id !== hotelId);
  } else {
    wishlist.value.push(hotelId);
  }
};

const fetchHotels = async () => {
  try {
    const hotelResponse = await axiosInstance.get(`/api/hotels/`);
    const hotelsData = hotelResponse.data;

    const imageResponse = await axiosInstance.get(`/api/hotel-images/`);
    const hotelImagesData = imageResponse.data;

    hotels.value = hotelsData.map((hotel) => {
      const relatedImages = hotelImagesData.filter((image) => image.hotel === hotel.id);
      if (relatedImages.length > 0) {
        hotel.image = relatedImages[0].image;
      }
      return hotel;
    });

    trendingDestinations.value = hotelImagesData.slice(0, 5);
  } catch (error) {
    console.error('Error fetching hotels and images:', error);
  }
};

onMounted(fetchHotels);
</script>

<template>
  <div>
    <TheNavbar />
    <div class="mx-auto p-8">
      <h1 class="text-2xl font-semibold mb-4">All Services Listed</h1>
      <div v-if="hotels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="hotel in hotels" :key="hotel.id" class="relative bg-white shadow-md rounded-lg p-2">
          <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-xl"
            @click="toggleWishlist(hotel.id)">
            <i :class="[wishlist.includes(hotel.id) ? 'fas fa-heart' : 'far fa-heart', 'text-red-600']"></i>
          </button>
          <div v-if="hotel.image" class="mb-4">
            <img :src="hotel.image" alt="Hotel Image" class="w-full h-56 object-cover rounded-md" />
          </div>
          <h2 class="text-xl font-semibold">{{ hotel.name }}</h2>
          <p>{{ hotel.location }}</p>
          <p>Price per night: ${{ hotel.price_per_night }}</p>
          <router-link :to="'/services/' + hotel.id"
            class="mt-4 inline-block px-4 py-2 rounded-md text-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300">
            View Details
          </router-link>
        </div>
      </div>
      <div v-else class="text-center mt-8">
        <p>No hotels available at the moment.</p>
      </div>
    </div>

    <div class="mx-auto p-8 bg-gray-100">
      <h2 class="text-2xl font-semibold mb-6">Trending Destinations</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(destination, index) in trendingDestinations.slice(0, 5)" :key="'destination-' + index"
          class="relative">
          <img :src="destination.image" alt="Trending Image" class="w-full h-60 object-cover rounded-lg" />
          <div class="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
            {{ destination.title || 'Trending Destination' }}
          </div>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<style></style>
