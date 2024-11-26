<script setup>
import { ref, onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import axiosInstance from '@/axiosconfig/axiosInstance';

const hotels = ref([]); // Reactive hotels array

// Fetch hotels and their associated images
const fetchHotels = async () => {
  try {
    // Fetch hotels first
    const hotelResponse = await axiosInstance.get(`/api/hotels/`);
    const hotelsData = hotelResponse.data;

    // Fetch all hotel images once
    const imageResponse = await axiosInstance.get(`/api/hotel-images/`);
    const hotelImagesData = imageResponse.data;

    // For each hotel, fetch associated images based on hotel ID
    const hotelImagesPromises = hotelsData.map((hotel) => {
      // Filter images that match the current hotel by ID
      const relatedImages = hotelImagesData.filter(image => image.hotel === hotel.id);

      // Set the first image as the main image of the hotel
      if (relatedImages && relatedImages.length > 0) {
        hotel.image = relatedImages[0].image; // Assuming the image URL is in 'image' field
      }
      return hotel;
    });

    // Wait for all hotel images to be fetched and then update the hotels array
    hotels.value = await Promise.all(hotelImagesPromises);

  } catch (error) {
    console.error('There was an error fetching the hotels and images:', error);
  }
};

onMounted(fetchHotels);
</script>

<template>
  <div>
    <TheNavbar />
    <div class="mx-auto p-8">
      <h1 class="text-3xl font-bold mb-4">Hotel List</h1>
      <div v-if="hotels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div v-for="hotel in hotels" :key="hotel.id" class="bg-white shadow-md rounded-lg p-2">
          <!-- Display the first hotel image if it exists -->
          <div v-if="hotel.image" class="mb-4">
            <img :src="hotel.image" alt="Hotel Image" class="w-full h-56 object-cover rounded-md" />
          </div>

          <!-- Display hotel name, location, and additional information -->
          <h2 class="text-xl font-semibold">{{ hotel.name }}</h2>
          <p>{{ hotel.location }}</p>
          <p>Price per night: ${{ hotel.price_per_night }}</p>

          <!-- Beautiful Outline Button for View Details with Tailwind -->
          <router-link :to="'/services/' + hotel.id"
            class="mt-4 inline-block px-4 py-2 rounded text-lg font-semibold border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300">
            View Details
          </router-link>
        </div>
      </div>
      <div v-else class="text-center mt-8">
        <p>No hotels available at the moment.</p>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
