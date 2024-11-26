<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';
import { useRoute } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

// States for hotel, rooms, facilities, booking rules, and images
const hotel = ref(null);
const rooms = ref([]);
const facilities = ref([]);
const bookingRules = ref([]);
const images = ref([]);  // Store images fetched from the API
const currentImage = ref(null);  // Store the currently displayed large image
const route = useRoute();

// Fetch hotel details
const fetchHotelDetails = async () => {
  try {
    const hotelId = route.params.id;
    const response = await axiosInstance.get(`/api/hotels/${hotelId}/`);
    hotel.value = response.data;
    fetchRooms(response.data.rooms); // Fetch rooms based on the room ids
    fetchFacilities(response.data.id); // Fetch facilities based on hotel id
    fetchBookingRules(response.data.id); // Fetch booking rules based on hotel id
    fetchHotelImages(hotelId); // Fetch hotel images
  } catch (error) {
    console.error('There was an error fetching the hotel details:', error);
  }
};

// Fetch room details based on room IDs
const fetchRooms = async (roomIds) => {
  try {
    const response = await axiosInstance.get(`/api/rooms/`);
    rooms.value = response.data.filter(room => roomIds.includes(room.id));
  } catch (error) {
    console.error('There was an error fetching the rooms:', error);
  }
};

// Fetch facilities based on hotel ID
const fetchFacilities = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/api/facilities/`);
    facilities.value = response.data.filter(facility => facility.hotel_id === hotelId);
  } catch (error) {
    console.error('There was an error fetching the facilities:', error);
  }
};

// Fetch booking rules based on hotel ID
const fetchBookingRules = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/api/booking-rules/`);
    bookingRules.value = response.data.filter(rule => rule.hotel_id === hotelId);
  } catch (error) {
    console.error('There was an error fetching the booking rules:', error);
  }
};

// Fetch hotel images based on hotel ID
const fetchHotelImages = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/api/hotel-images/?hotel=${hotelId}`);
    images.value = response.data;
    if (images.value.length > 0) {
      currentImage.value = images.value[0]; // Set the first image as the large one
    }
  } catch (error) {
    console.error('There was an error fetching the hotel images:', error);
  }
};

// On component mounted, fetch hotel details and related data
onMounted(() => {
  fetchHotelDetails();
});

// Function to handle image click and swap the large image
const changeImage = (image) => {
  currentImage.value = image;
};
</script>

<template>
  <div>
    <TheNavbar />
    <div v-if="hotel" class="mx-auto p-8">
      <!-- Hotel Details -->
      <div class="flex items-center gap-6 ">
        <!-- Image Section: Left Side (Large Image) -->
        <div class="flex-1">
          <div v-if="currentImage" class="w-full h-80 mb-4">
            <img :src="currentImage.image" alt="Hotel Image" class="w-full h-full object-cover rounded-md" />
          </div>
        </div>

        <!-- Content Section: Right Side -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold">{{ hotel.name }}</h1>
          <p class="text-lg mt-2">{{ hotel.location }}</p>
          <p class="mt-4 text-gray-700">Contact: {{ hotel.contact_details }}</p>
          <p class="mt-4 text-gray-700">Rooms Available: {{ rooms.length }}</p> <!-- Number of rooms available -->

          <!-- Facilities -->
          <div v-if="hotel.facilities && hotel.facilities.length" class="mt-6">
            <h3 class="text-xl font-semibold">Facilities:</h3>
            <ul class="list-disc">
              <div v-for="facility in facilities" :key="facility.id">
                <!-- Use v-html to render HTML content such as <br> -->
                <p class="text-gray-700" v-html="facility.description"></p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <!-- Image Thumbnails Section (Below the large image) -->
      <div class="flex gap-4 mt-1">
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
            <p class="text-lg text-gray-700">Price per night: ${{ room.price_per_night }}</p>
            <!-- Use v-html to render room description with line breaks -->
            <p class="text-gray-700 mt-2" v-html="room.description"></p>
          </div>
        </div>
      </div>

      <!-- Booking Rules Section -->
      <div v-if="bookingRules.length" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Booking Rules</h2>
        <div class="space-y-4">
          <div v-for="rule in bookingRules" :key="rule.id" class="bg-white p-6 rounded-md shadow-md">
            <h3 class="text-xl font-semibold">Rule Type: {{ rule.rule_type }}</h3>
            <!-- Use v-html to render booking rule description with line breaks -->
            <p class="text-gray-700" v-html="rule.description"></p>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
