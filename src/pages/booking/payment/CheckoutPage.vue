<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const route = useRoute();
const roomId = ref(route.query.roomId); // Get roomId from the query params
const totalAmount = ref(Number(route.query.price) || 0.0); // Populate price from query params
const bookingId = ref(route.query.bookingId); // Get bookingId from the query params

const bookingDetails = ref(null);
const isLoading = ref(true); // Loading state for the booking details
const errorMessage = ref('');

// Fetch booking details using the booking ID
const fetchBookingDetails = async () => {
  try {
    const response = await axiosInstance.get(`/api/bookings/${bookingId.value}/`);
    bookingDetails.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    errorMessage.value = 'Failed to fetch booking details. Please try again.';
    isLoading.value = false;
  }
};

// Initialize the fetch operation when the component is mounted
onMounted(() => {
  if (bookingId.value) {
    fetchBookingDetails();
  } else {
    errorMessage.value = 'Booking ID not provided.';
    isLoading.value = false;
  }
});

// Function to initiate payment
const initiatePayment = async () => {
  try {
    const response = await axiosInstance.post('/create_payment/', {
      total_amount: totalAmount.value,
      room_id: roomId.value,
      booking_id: bookingId.value,
    });

    if (response.data.approval_url) {
      window.location.href = response.data.approval_url;
    }
  } catch (error) {
    console.error('Payment initiation failed:', error);
    alert('Failed to initiate payment. Please try again.');
  }
};
</script>

<template>
  <TheNavbar />
  <div class="flex justify-center min-h-screen bg-gray-100">
    <div class="p-4 mt-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- Hotel Image and Description (Left Column) -->
      <div v-if="!isLoading && bookingDetails && bookingDetails.room_details" class="space-y-6">
        <img :src="bookingDetails.room_details.image" alt="Room Image" class="w-full h-64 object-cover rounded-lg" />
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ bookingDetails.room_details.hotel }}</h3>
          <p class="text-gray-700">{{ bookingDetails.room_details.description }}</p>
        </div>
      </div>

      <!-- Booking Details and Payment Form (Right Column) -->
      <div class="space-y-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-1">Booking Summary</h2>

        <div v-if="isLoading" class="text-center text-gray-600">Loading booking details...</div>
        <div v-else-if="errorMessage" class="text-center text-red-500">{{ errorMessage }}</div>

        <div v-else class="text-md text-gray-700">
          <ul>
            <li><strong>Room Type:</strong> {{ bookingDetails.room_details.room_type }}</li>
            <li><strong>Full Name:</strong> {{ bookingDetails.full_name }}</li>
            <li><strong>Persons:</strong> {{ bookingDetails.number_of_persons }}</li>
            <li><strong>Check-In:</strong> {{ bookingDetails.check_in_date }}</li>
            <li><strong>Check-Out:</strong> {{ bookingDetails.check_out_date }}</li>
            <li><strong>Special Requests:</strong> {{ bookingDetails.special_requests }}</li>
          </ul>
          <div class="mt-6">
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Total Amount: USD</label>
            <input id="amount" type="number" v-model="totalAmount"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 font-semibold text-md text-blue-700"
              readonly />
          </div>

          <!-- Payment Button -->
          <button @click="initiatePayment" type="submit"
            class="w-full md:w-3/4 mt-6 focus:outline-none border-2 border-gray-500 font-semibold rounded-lg">
            Proceed with Payment
            <img src="@/assets/images/paypal.png" alt="Pay with PayPal" class="w-3/4 h-14 ml-8 rounded-lg" />
          </button>

        </div>
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<style scoped>
/* Responsive grid for different screen sizes */
.grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
