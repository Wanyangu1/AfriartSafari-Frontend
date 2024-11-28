<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const route = useRoute(); // Initialize useRoute to access the query params

const bookingDetails = ref({
  hotelName: route.query.hotelName || '',
  roomId: route.query.roomId || '', // Only the room ID now
  roomName: route.query.roomName || '',
  price: route.query.price || '',
  image: route.query.image || '',
  description: route.query.description || '',
});

const booking = ref({
  full_name: '',
  number_of_persons: 1,
  check_in_date: '',
  check_out_date: '',
  special_requests: '',
  payment_status: 'Pending', // Set default payment status
});

const submitBooking = async () => {
  try {
    // Prepare the booking data to send to the backend with just the room ID
    const bookingData = {
      full_name: booking.value.full_name,
      number_of_persons: booking.value.number_of_persons,
      check_in_date: booking.value.check_in_date,
      check_out_date: booking.value.check_out_date,
      special_requests: booking.value.special_requests,
      payment_status: booking.value.payment_status,
      room: bookingDetails.value.roomId, // Submit only the room ID
    };

    // Send the booking data to the backend via POST request
    const response = await axiosInstance.post('/api/bookings/', bookingData);

    if (response.status === 201) {
      alert('Booking successful!');
    }
  } catch (error) {
    console.error('Error submitting booking:', error);
    alert('Booking failed. Please try again.');
  }
};
</script>

<template>
  <div>
    <TheNavbar />
    <div class="max-w-6xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md flex gap-8">

      <!-- Hotel Details Section (Left) -->
      <div class="w-1/2">
        <h2 class="text-3xl font-semibold mb-4">{{ bookingDetails.roomName }} - {{ bookingDetails.hotelName }}</h2>
        <img :src="bookingDetails.image" alt="Room Image" class="w-full h-64 object-cover rounded-lg mb-4" />
        <p class="text-lg font-semibold text-gray-700">Price per night: ${{ bookingDetails.price }}</p>
        <p class="text-gray-600 mt-2">{{ bookingDetails.description }}</p>
      </div>

      <!-- Booking Form Section (Right) -->
      <div class="w-1/2">
        <h1 class="text-2xl font-bold text-center mb-6">Book Your Room</h1>

        <form @submit.prevent="submitBooking">
          <div class="mb-4">
            <label for="full_name" class="block text-sm font-semibold">Full Name</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-user p-2 text-gray-500"></i>
              <input v-model="booking.full_name" id="full_name" type="text"
                class="w-full p-2 border-none focus:outline-none" required />
            </div>
          </div>

          <div class="mb-4">
            <label for="number_of_persons" class="block text-sm font-semibold">Number of Persons</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-users p-2 text-gray-500"></i>
              <input v-model="booking.number_of_persons" id="number_of_persons" type="number"
                class="w-full p-2 border-none focus:outline-none" required />
            </div>
          </div>

          <div class="mb-4">
            <label for="check_in_date" class="block text-sm font-semibold">Check-in Date</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-calendar-alt p-2 text-gray-500"></i>
              <input v-model="booking.check_in_date" id="check_in_date" type="date"
                class="w-full p-2 border-none focus:outline-none" required />
            </div>
          </div>

          <div class="mb-4">
            <label for="check_out_date" class="block text-sm font-semibold">Check-out Date</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-calendar-day p-2 text-gray-500"></i>
              <input v-model="booking.check_out_date" id="check_out_date" type="date"
                class="w-full p-2 border-none focus:outline-none" required />
            </div>
          </div>

          <div class="mb-4">
            <label for="special_requests" class="block text-sm font-semibold">Special Requests</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-comment p-2 text-gray-500"></i>
              <textarea v-model="booking.special_requests" id="special_requests"
                class="w-full p-2 border-none focus:outline-none" placeholder="Any special requests?"
                rows="4"></textarea>
            </div>
          </div>

          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-6">
            <i class="fas fa-check-circle mr-2"></i> Book Now
          </button>
          <router-link to="/checkout"
            class="mt-4 inline-block px-4 py-2 rounded-md text-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300">
            Checkout
          </router-link>

        </form>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
/* Add any additional styles here if necessary */
</style>
