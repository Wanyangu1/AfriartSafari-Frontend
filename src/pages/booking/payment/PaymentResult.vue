<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">{{ message }}</h1>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const message = ref('');
const error = ref('');

onMounted(async () => {
  const paymentId = route.query.paymentId;
  const payerId = route.query.PayerID;

  if (!paymentId || !payerId) {
    message.value = 'Invalid payment information.';
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/execute_payment/', {
      params: { paymentId, PayerID: payerId },
    });
    message.value = 'Payment Successful! Thank you for your purchase.';
  } catch (err) {
    message.value = 'Payment Failed.';
    error.value = 'Please try again.';
  }
});
</script>
