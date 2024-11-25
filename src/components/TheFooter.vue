<template>
  <footer class="bg-blue-900 text-white py-8">
    <div class="mb-12 max-w-screen-lg mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-10">

      <!-- Social Media Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">Follow Us</h3>
        <hr class="w-14 mb-3">
        <h4 class="font-bold mb-4">AfroartSafari.com</h4>
        <ul class="flex space-x-4">
          <li>
            <a href="https://facebook.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
        <img src="@/assets/images/logo.png" class="img-fluid rounded h-12 mt-2" alt="AfroartSafari Logo" />
      </div>

      <!-- About Us Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">About Us</h3>
        <hr class="w-14 mb-3">
        <ul class="space-y-1">
          <li>
            <router-link to="/about" class="hover:text-gray-300">About AfroartSafari</router-link>
          </li>
          <li>
            <router-link to="/careers" class="hover:text-gray-300">Careers</router-link>
          </li>
          <li>
            <router-link to="/sustainability" class="hover:text-gray-300">Sustainability</router-link>
          </li>
        </ul>
      </div>

      <!-- Services Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">Services</h3>
        <hr class="w-14 mb-3">
        <ul class="space-y-1">
          <li>
            <router-link to="/stays" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-bed"></i>
              <span>Stays</span>
            </router-link>
          </li>
          <li>
            <router-link to="/flights" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-plane"></i>
              <span>Flights</span>
            </router-link>
          </li>
          <li>
            <router-link to="/car-rentals" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-car"></i>
              <span>Car Rentals</span>
            </router-link>
          </li>
          <li>
            <router-link to="/airport-taxi" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-taxi"></i>
              <span>Airport Taxis</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contact Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">Contact</h3>
        <hr class="w-14 mb-3">
        <ul class="space-y-1">
          <li class="flex items-center space-x-2">
            <i class="fas fa-phone-alt"></i>
            <span>+1 234 567 890</span>
          </li>
          <li class="flex items-center space-x-2">
            <i class="fas fa-envelope"></i>
            <span>support@afriartsafari.com</span>
          </li>
          <li class="flex items-center space-x-2">
            <i class="fas fa-map-marker-alt"></i>
            <span>123 Safari Road, Lusaka, Zambia</span>
          </li>
        </ul>
      </div>
    </div>
    <hr class="my-5 border-gray-700">
    <div class="text-center text-sm">
      <p>&copy; 2024 AfroartSafari. All rights reserved.</p>
    </div>
  </footer>
</template>
<style scoped>
footer {
  background-color: #1e3a8a;
  color: #e5e7eb;
}

footer a:hover {
  color: #93c5fd;
}

footer hr {
  border-top: 2px solid #93c5fd;
}
</style>
