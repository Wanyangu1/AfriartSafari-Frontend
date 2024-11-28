<template>
  <div>
    <button @click="initiatePayment">Pay Now</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const totalAmount = ref(100.00)  // Example dynamic total amount (from cart, etc.)

const initiatePayment = async () => {
  try {
    // Send the dynamic amount to your Django backend
    const response = await axios.post('http://127.0.0.1:8000/create_payment/', {
      total_amount: totalAmount.value,
    })

    if (response.data.approval_url) {
      // Redirect the user to PayPal
      window.location.href = response.data.approval_url
    }
  } catch (error) {
    console.error('Payment initiation failed:', error)
  }
}
</script>
