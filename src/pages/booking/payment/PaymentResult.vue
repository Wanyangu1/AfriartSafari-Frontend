<script setup>
import { ref, onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import axiosInstance from '@/axiosconfig/axiosInstance';
import html2pdf from 'html2pdf.js';

const paymentData = ref({});
const bookingData = ref({});

const getPaymentData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  paymentData.value = {
    payment_id: urlParams.get('payment_id'),
    payer_id: urlParams.get('payer_id'),
    amount: urlParams.get('amount'),
    currency: urlParams.get('currency'),
    Booking_code: urlParams.get('Booking_code'),
    status: urlParams.get('status'),
  };
};

const getBookingData = async () => {
  try {
    const bookingCode = paymentData.value.Booking_code;
    const response = await axiosInstance.get(`/api/bookings/${bookingCode}/`);
    bookingData.value = response.data;
  } catch (error) {
    console.error('Error fetching booking data:', error);
  }
};

const downloadReceipt = () => {
  const element = document.getElementById('receipt');
  const options = {
    filename: 'payment_receipt.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
  html2pdf().from(element).set(options).save();
};

onMounted(() => {
  getPaymentData();
  if (paymentData.value.Booking_code) {
    getBookingData();
  }
});
</script>

<template>
  <TheNavbar />
  <div class="mt-8 text-center">
    <button @click="downloadReceipt"
      class="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
      Download Receipt
    </button>
  </div>
  <div id="receipt"
    class="container mx-auto mt-8 mb-8 px-6 py-12 max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="flex justify-center mb-6">
      <img src="@/assets/images/logo.png" alt="AfroartSafari Logo" class="h-16" />
    </div>
    <div class="text-center mb-6">
      <h1 class="text-3xl mb-2 font-bold text-green-600">Payment Receipt</h1>
      <p class="text-xl text-gray-500">Payment Method: PayPal</p>
      <h2 class="mt-2 text-lg text-gray-700">AfroartSafari.com</h2>
    </div>
    <div class="text-gray-600 space-y-4">
      <div class="flex justify-between">
        <p><span class="font-semibold">Payment ID:</span> {{ paymentData.payment_id }}</p>
        <p><span class="font-semibold">Payer ID:</span> {{ paymentData.payer_id }}</p>
      </div>
      <div class="flex justify-between">
        <p><span class="font-semibold">Amount:</span> ${{ paymentData.amount }}</p>
        <p><span class="font-semibold">Currency:</span> {{ paymentData.currency }}</p>
      </div>
      <div class="flex justify-between">
        <p><span class="font-semibold">Booking Code:</span> {{ paymentData.Booking_code }}</p>
      </div>

      <!-- Booking Details -->
      <div class="mt-6">
        <h3 class="font-semibold text-lg mb-2">Booking Details</h3>
        <p><span class="font-semibold">Full Name:</span> {{ bookingData.full_name }}</p>
        <p><span class="font-semibold">Room:</span> {{ bookingData.room_details?.hotel }}</p>
        <p><span class="font-semibold">Room Type:</span> {{ bookingData.room_details?.room_type }}</p>
        <p><span class="font-semibold">Number of Persons:</span> {{ bookingData.number_of_persons }}</p>
        <p><span class="font-semibold">Special Requests:</span> {{ bookingData.special_requests }}</p>
        <p><span class="font-semibold">Check-In:</span> {{ bookingData.check_in_date }}</p>
        <p><span class="font-semibold">Check-Out:</span> {{ bookingData.check_out_date }}</p>
      </div>

      <div class="mt-4">
        <p class="text-sm text-gray-500">Payment status: <span class="text-green-600 font-medium">{{ paymentData.status
            }}</span></p>
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<style scoped>
@media print {
  body {
    font-family: Arial, sans-serif;
  }

  .container {
    width: 100%;
    max-width: none;
    padding: 2rem;
  }

  .h-16 {
    height: auto;
    width: 150px;
  }

  .text-center {
    text-align: center;
  }

  .text-xl {
    font-size: 1.5rem;
  }

  .font-semibold {
    font-weight: 600;
  }

  .text-green-600 {
    color: #16a34a;
  }

  .text-gray-600 {
    color: #4b5563;
  }

  .space-y-4>*+* {
    margin-top: 1rem;
  }

  .container {
    max-height: 900px;
    overflow: auto;
  }

  .h-16 {
    height: 60px;
  }
}
</style>
