<template>
  <div class="p-1 flex justify-center relative w-full items-center gap-15 font-medium bg-transparent z-20 text-[18px] text-white">
    <!-- Menu -->
    <div class="flex gap-2 *:px-3 *:rounded-full *:py-1.5 rounded-full">
      
      <!-- Home -->
      <router-link 
        to="/home"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
        exact-active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-house" />
        Home
      </router-link>

      <!-- Shop -->
      <router-link 
        to="/shop"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-suitcase" />
        Shop
      </router-link>

      <!-- Deals -->
      <router-link 
        to="/deals"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-tags" />
        Deals
      </router-link>

      <!-- Support -->
      <router-link 
        to="/support"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-headset" />
        Support
      </router-link>

      <!-- Contact -->
      <router-link 
        to="/contact"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-envelope" />
        Contact
      </router-link>

      <!-- About -->
      <router-link 
        to="/about"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-id-card" />
        About
      </router-link>
      <router-link 
        to="/test"
        class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
        active-class="bg-green-600 text-white"
      >
        <font-awesome-icon icon="fa-solid fa-id-card" />
        Test
      </router-link>

    </div>

    <!-- Search -->
    <div class="group flex overflow-hidden rounded-full w-77.5 border border-slate-200 p-1 bg-slate-100">
      <input 
        type="text" 
        placeholder="Search..." 
        class="placeholder:text-gray-900 text-[14px] px-3 w-full h-8.75 bg-slate-100 border border-slate-100 text-black"
      />
      <button class="hover:bg-blue-100 bg-slate-50 rounded-full py-1 px-1.5 opacity-90">
        🔍
      </button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    // No need for activeMenu or setActive anymore
    return {}
  }
}
</script>
