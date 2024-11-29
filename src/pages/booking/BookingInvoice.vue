<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosconfig/axiosInstance';
import { differenceInDays } from 'date-fns'; // Install date-fns for date calculations
import html2pdf from 'html2pdf.js';

const bookingData = ref(null);
const totalCost = ref(0);
const isLoading = ref(true);
const errorMessage = ref('');
const bookingIds = ref([]);
const selectedBookingId = ref(null);

// Fetch all booking IDs
const fetchBookingIds = async () => {
  try {
    const response = await axiosInstance.get('/api/bookings/');
    bookingIds.value = response.data.map((booking) => booking.id);
  } catch (error) {
    errorMessage.value = 'Error fetching booking IDs.';
    error;
  }
};

// Fetch specific booking data by ID
const fetchBooking = async (id) => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/api/bookings/${id}/`);
    bookingData.value = response.data;

    // Calculate the total cost
    const pricePerNight = response.data.room_details.price_per_night;
    const numberOfPersons = response.data.number_of_persons;

    const checkInDate = new Date(response.data.check_in_date);
    const checkOutDate = new Date(response.data.check_out_date);

    const nights = differenceInDays(checkOutDate, checkInDate);
    totalCost.value = pricePerNight * numberOfPersons * nights;
    selectedBookingId.value = id;
  } catch (error) {
    errorMessage.value = 'Error fetching booking data.';
    error;
  } finally {
    isLoading.value = false;
  }
};

// Download Invoice as PDF
const downloadInvoice = () => {
  const invoiceElement = document.getElementById('invoice-content');
  const options = {
    filename: `Invoice_${selectedBookingId.value}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Add padding to the invoice content for a better appearance when downloading
  invoiceElement.style.padding = '20px';

  html2pdf().from(invoiceElement).set(options).save();
};

onMounted(() => {
  fetchBookingIds();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Booking ID Buttons -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button v-for="id in bookingIds" :key="id" @click="fetchBooking(id)" :class="{
        'bg-blue-500 text-white': selectedBookingId === id,
        'bg-white text-blue-500': selectedBookingId !== id,
      }" class="border border-blue-500 px-4 py-2 rounded shadow hover:bg-blue-500 hover:text-white transition">
        {{ id }}
      </button>
    </div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="text-center">
      <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
      <p class="text-gray-600">Loading booking data...</p>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="bg-red-100 text-red-700 p-4 rounded shadow-md">
      {{ errorMessage }}
    </div>

    <!-- Invoice Details -->
    <div v-if="!isLoading && bookingData" class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
      <!-- Invoice Content Wrapper -->
      <div id="invoice-content">
        <!-- Header -->
        <div class="flex items-center justify-between border-b pb-4 mb-6">
          <img src="@/assets/images/logo.png" alt="Company Logo" class="h-16">
          <h1 class="text-3xl font-bold">Invoice</h1>
          <div>
            <p class="text-sm text-gray-600">Date: {{ new Date().toLocaleDateString() }}</p>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="flex flex-wrap md:flex-nowrap gap-6">
          <div class="w-full md:w-1/2">
            <h3 class="text-lg font-semibold">Hotel Details</h3>
            <p>Hotel: {{ bookingData.room_details.hotel }}</p>
            <p>Room Type: {{ bookingData.room_details.room_type }}</p>
            <p>Price per Night: ${{ bookingData.room_details.price_per_night }}</p>
          </div>
          <div class="w-full md:w-1/2">
            <h3 class="text-lg font-semibold">Client Details</h3>
            <p>Name: {{ bookingData.full_name }}</p>
            <p>Email: {{ bookingData.email }}</p>
            <p>Special Requests: {{ bookingData.special_requests }}</p>
          </div>
        </div>

        <!-- Table -->
        <div>
          <h3 class="text-lg font-semibold">Booking Information</h3>
          <table class="w-full border-collapse border border-gray-300 mt-4">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 px-4 py-2">Field</th>
                <th class="border border-gray-300 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Number of Persons</td>
                <td class="border border-gray-300 px-4 py-2">{{ bookingData.number_of_persons }}</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Check-in Date</td>
                <td class="border border-gray-300 px-4 py-2">{{ bookingData.check_in_date }}</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Check-out Date</td>
                <td class="border border-gray-300 px-4 py-2">{{ bookingData.check_out_date }}</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Special Requests</td>
                <td class="border border-gray-300 px-4 py-2">{{ bookingData.special_requests }}</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Created At</td>
                <td class="border border-gray-300 px-4 py-2">{{ bookingData.created_at }}</td>
              </tr>
              <tr class="bg-yellow-100 font-bold">
                <td class="border border-gray-300 px-4 py-2">Total Cost</td>
                <td class="border border-gray-300 px-4 py-2">${{ totalCost }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Download Button -->
      <div class="text-center mt-6">
        <button @click="downloadInvoice"
          class="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600 transition">
          Download Invoice
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styling as needed */
</style>
