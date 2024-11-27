<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';
import { useRouter, useRoute } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

// States for hotel, rooms, facilities, booking rules, and images
const hotel = ref(null);
const rooms = ref([]);
const facilities = ref([]);
const bookingRules = ref([]);
const images = ref([]);
const currentImage = ref(null); // Store the currently displayed large image
const router = useRouter();
const route = useRoute();

// Fetch hotel details and related data
const fetchHotelDetails = async () => {
  try {
    const hotelId = route.params.id;

    // Fetch hotel details
    const hotelResponse = await axiosInstance.get(`/api/hotels/${hotelId}/`);
    hotel.value = hotelResponse.data;

    // Fetch rooms based on the room ids from the hotel data
    const roomResponse = await axiosInstance.get(`/api/rooms/`);
    rooms.value = roomResponse.data.filter((room) =>
      hotel.value.rooms.includes(room.id)
    );

    // Fetch facilities based on hotel ID
    const facilityResponse = await axiosInstance.get(`/api/facilities/`);
    facilities.value = facilityResponse.data.filter(
      (facility) => facility.hotel_id === parseInt(hotelId)
    );

    // Fetch booking rules based on hotel ID
    const bookingResponse = await axiosInstance.get(`/api/booking-rules/`);
    bookingRules.value = bookingResponse.data.filter(
      (rule) => rule.hotel_id === parseInt(hotelId)
    );

    // Fetch hotel images based on hotel ID
    const imageResponse = await axiosInstance.get(`/api/hotel-images/`);
    images.value = imageResponse.data.filter(
      (image) => image.hotel === parseInt(hotelId)
    );

    if (images.value.length > 0) {
      currentImage.value = images.value[0]; // Set the first image as the large one
    }
  } catch (error) {
    console.error('There was an error fetching the hotel details:', error);
  }
};

// On component mounted, fetch hotel details and related data
onMounted(() => {
  fetchHotelDetails();
});

// Function to handle booking click and push room details to /booking route
const handleBookingClick = (room) => {
  const bookingData = {
    roomName: room.room_type,
    price: room.price_per_night,
    image: room.image,
    description: room.description,
    hotelName: hotel.value.name,
  };

  // Using router.push to navigate to /booking and pass data as query params
  router.push({
    path: '/booking',
    query: {
      roomId: room.id,
      roomName: bookingData.roomName,
      price: bookingData.price,
      image: bookingData.image,
      description: bookingData.description,
      hotelName: bookingData.hotelName,
    },
  });
};
</script>

<template>
  <div>
    <TheNavbar />
    <div v-if="hotel" class="mx-auto p-8">
      <!-- Hotel Details -->
      <div class="flex items-center gap-6">
        <!-- Image Section: Left Side (Large Image) -->
        <div class="flex-1">
          <div v-if="currentImage" class="w-full h-80 mb-3">
            <img :src="currentImage.image" alt="Hotel Image" class="w-full h-full object-cover rounded-md" />
          </div>
        </div>

        <!-- Content Section: Right Side -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold">{{ hotel.name }}</h1>
          <p class="text-lg mt-2">{{ hotel.location }}</p>
          <p class="mt-4 text-gray-700">Contact: {{ hotel.contact_details }}</p>
          <p class="mt-4 text-gray-700">Rooms Available: {{ rooms.length }}</p>

          <!-- Facilities -->
          <div v-if="facilities.length" class="mt-6">
            <h3 class="text-xl font-semibold">Facilities:</h3>
            <ul class="list-disc">
              <li v-for="facility in facilities" :key="facility.id" class="text-gray-700" v-html="facility.description">
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Image Thumbnails Section (Below the large image) -->
      <div class="flex gap-4 mt-6">
        <div v-for="image in images" :key="image.id" class="w-24 h-24 cursor-pointer" @click="changeImage(image)">
          <img :src="image.image" alt="Hotel Image" class="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <!-- Rooms Section -->
      <div v-if="rooms.length" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Available Rooms</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="room in rooms" :key="room.id" class="bg-white p-6 rounded-md shadow-md">
            <img :src="room.image" alt="Room Image" class="w-full h-56 object-cover rounded-md mb-4" />
            <h3 class="text-xl font-semibold">{{ room.room_type }}</h3>
            <p class="text-lg text-blue-700">Price per night: ${{ room.price_per_night }}</p>
            <p class="text-gray-700 mt-2" v-html="room.description"></p>

            <!-- Outline Button for Booking -->
            <button @click="handleBookingClick(room)"
              class="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div class="mt-12 mb-12">
        <h2 class="text-2xl font-semibold mb-6">Get Inspiration for Your Next Trip</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Image (Half Screen) -->
          <div class="relative col-span-1 md:col-span-1">
            <img src="@/assets/images/staycation/fallback.jpg" alt="Inspiration Image"
              class="w-full h-72 object-cover rounded-md" />
            <div class="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4">
              <h3 class="text-xl font-semibold">Exotic Beaches</h3>
              <p>Find peace and relaxation on serene sandy shores.</p>
            </div>
          </div>

          <!-- Right Images (Two Small Images Vertically) -->
          <div class="space-y-4 col-span-1 md:col-span-1">
            <div class="relative">
              <img src="@/assets/images/staycation/urban.jpg" alt="Inspiration Image"
                class="w-full h-36 object-cover rounded-md" />
              <div class="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                <h3 class="text-xl font-semibold">City Adventures</h3>
                <p>Explore the highest peaks and enjoy breathtaking views.</p>
              </div>
            </div>
            <div class="relative">
              <img src="@/assets/images/staycation/urban.jpg" alt="Inspiration Image"
                class="w-full h-36 object-cover rounded-md" />
              <div class="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                <h3 class="text-xl font-semibold">Cultural Escapes</h3>
                <p>Experience the rich heritage of new places.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Rules Section with Review Form -->
      <div v-if="bookingRules.length" class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left: Booking Rules -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">Booking Rules</h2>
          <div class="space-y-4">
            <div v-for="rule in bookingRules" :key="rule.id">
              <p class="text-gray-700" v-html="rule.description"></p>
            </div>
          </div>
        </div>

        <!-- Right: Review Form -->
        <div class="bg-white p-6 rounded-md shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Leave a Review</h2>
          <form>
            <!-- Name Field -->
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium">Your Location</label>
              <input type="text" id="name" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Your location" />
            </div>
            <!-- Review Field -->
            <div class="mb-4">
              <label for="review" class="block text-gray-700 font-medium">Your Review</label>
              <textarea id="review" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Share your experience here..." rows="4"></textarea>
            </div>
            <!-- Submit Button -->
            <button type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>
