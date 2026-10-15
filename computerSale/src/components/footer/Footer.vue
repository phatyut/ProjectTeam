<template>
  <footer class="bg-white text-gray-700 py-10">
    <div class="max-w-7xl mx-auto grid grid-cols-5 md:grid-cols-5 gap-8">
      
      <!-- Company Info -->
      <div>
        <h3 class="text-black font-semibold mb-4">Company Info</h3>
        <ul class="space-y-2 ">
          <li><a href="#" class="hover:underline">About Us</a></li>
          <li><a href="#" class="hover:underline">Careers</a></li>
          <li><a href="#" class="hover:underline">Store Locations</a></li>
        </ul>
      </div>

      <!-- Customer Support -->
      <div>
        <h3 class="text-black font-semibold mb-4">Customer Support</h3>
        <ul class="space-y-2 *:hover:underline *:transition-all *:duration-500">
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Warranty & Returns</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-black font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2 *:hover:underline *:transition-all *:duration-500">
          <li><a href="#">Laptops</a></li>
          <li><a href="#">Desktops</a></li>
          <li><a href="#">Components</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Deals</a></li>
        </ul>
      </div>

      <!-- Policies -->
      <div>
        <h3 class="text-black font-semibold mb-4">Policies</h3>
        <ul class="space-y-2 *:hover:underline *:transition-all *:duration-500  ">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Shipping Policy</a></li>
        </ul>
      </div>

      <!-- Payments -->
      <div>
        <h3 class="text-black font-semibold mb-4">Payments</h3>
        <div class="flex space-x-4 *:hover:cursor-pointer *:hover:scale-110 *:transition-all *:duration-300">
          <!-- Visa -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" class="h-8 w-auto">
            <rect width="48" height="32" fill="#1a1f71"/>
            <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="14" font-family="Arial">VISA</text>
          </svg>

          <!-- MasterCard -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" class="h-8 w-auto">
            <circle cx="18" cy="16" r="10" fill="#eb001b"/>
            <circle cx="30" cy="16" r="10" fill="#f79e1b"/>
          </svg>

          <!-- PayPal -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" class="h-8 w-auto">
            <rect width="48" height="32" fill="#003087"/>
            <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="12" font-family="Arial">PayPal</text>
          </svg>

          <!-- Apple Pay -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" class="h-8 w-auto">
            <text x="50%" y="55%" text-anchor="middle" fill="black" font-size="12" font-family="Arial"> Pay</text>
          </svg>

          <!-- Google Pay -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32" class="h-8 w-auto">
            <text x="50%" y="55%" text-anchor="middle" fill="#4285F4" font-size="12" font-family="Arial">G Pay</text>
          </svg>
        </div>
      </div>

    </div>

    <!-- Bottom Bar -->
    <div class="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
      © 2026 Micro computer. All rights reserved.
    </div>
  </footer>
</template>
