<template>
    <div>
         <div class="flex flex-col ">
          <div class="w-full h-auto grid grid-cols-3 gap-8 p-8 *:border *:border-slate-200 *:bg-white *:rounded-xl *:p-6">
          <!-- Brands Section -->
          <div class="relative w-full h-full flex flex-col gap-6">
            <!-- Title -->
            <h2 class="text-xl font-bold text-green-700 tracking-wide">Brands</h2>

            <!-- Input + Button -->
            <div class="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Enter brand name..."
                class="w-full bg-slate-50 border border-slate-300   shadow-sm py-3 px-4 rounded-lg text-sm outline-none transition"
              >
              <button 
                class="px-5 py-3 text-[13px] rounded-lg bg-slate-50 border border-green-700  text-green-700 font-bold shadow-md hover:from-green-700 hover:to-green-600 transition">
                ADD
              </button>
            </div>

            <!-- Items List -->
            <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col gap-3 shadow-inner ">
              <div  v-for="(item,index) in setItems"  :key="item" 
                class="flex justify-between items-center px-3 py-2 gap-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <!-- Item Text -->
                <div class="flex gap-2 text-slate-700 font-medium">
                  <span class="text-green-600 font-bold">{{ index+1 }}.</span>
                  <span>{{ item }}</span>
                </div>

                <!-- Delete Icon -->
                <button class="p-1 rounded-full bg-slate-200 hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-slate-600 hover:text-red-600 transition" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="relative w-full h-full flex flex-col gap-6">
            <!-- Title -->
            <h2 class="text-xl font-bold text-green-700 tracking-wide">Categories</h2>

            <!-- Input + Button -->
            <div class="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Enter brand name..."
                class="w-full bg-slate-50 border border-slate-300   shadow-sm py-3 px-4 rounded-lg text-sm outline-none transition"
              >
              <button 
                class="px-5 py-3 text-[13px] rounded-lg bg-slate-50 border border-green-700  text-green-700 font-bold shadow-md hover:from-green-700 hover:to-green-600 transition">
                ADD
              </button>
            </div>

            <!-- Items List -->
            <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col gap-3 shadow-inner ">
              <div  v-for="(item,index) in setItems"  :key="item" 
                class="flex justify-between items-center px-3 py-2 gap-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <!-- Item Text -->
                <div class="flex gap-2 text-slate-700 font-medium">
                  <span class="text-green-600 font-bold">{{ index+1 }}.</span>
                  <span>{{ item }}</span>
                </div>

                <!-- Delete Icon -->
                <button class="p-1 rounded-full bg-slate-200 hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-slate-600 hover:text-red-600 transition" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>



          
          <div class="relative w-full h-full flex flex-col gap-6">
            <!-- Title -->
            <h2 class="text-xl font-bold text-green-700 tracking-wide">Models</h2>

            <!-- Input + Button -->
            <div class="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Enter brand name..."
                class="w-full bg-slate-50 border border-slate-300   shadow-sm py-3 px-4 rounded-lg text-sm outline-none transition"
              >
              <button 
                class="px-5 py-3 text-[13px] rounded-lg bg-slate-50 border border-green-700  text-green-700 font-bold shadow-md hover:from-green-700 hover:to-green-600 transition">
                ADD
              </button>
            </div>

            <!-- Items List -->
            <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col gap-3 shadow-inner ">
              <div  v-for="(item,index) in setItems"  :key="item" 
                class="flex justify-between items-center px-3 py-2 gap-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <!-- Item Text -->
                <div class="flex gap-2 text-slate-700 font-medium">
                  <span class="text-green-600 font-bold">{{ index+1 }}.</span>
                  <span>{{ item }}</span>
                </div>

                <!-- Delete Icon -->
                <button class="p-1 rounded-full bg-slate-200 hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-slate-600 hover:text-red-600 transition" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
         
        </div>
          <div class="w-full h-auto grid grid-cols-3 gap-8 p-8 *:border *:border-slate-200 *:bg-white *:rounded-xl *:p-6">
          <!-- Brands Section -->
          <div class="relative w-full h-full flex flex-col gap-6">
            <!-- Title -->
            <h2 class="text-xl font-bold text-green-700 tracking-wide">Brands</h2>

            <!-- Input + Button -->
            <div class="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Enter brand name..."
                class="w-full bg-slate-50 border border-slate-300   shadow-sm py-3 px-4 rounded-lg text-sm outline-none transition"
              >
              <button 
                class="px-5 py-3 text-[13px] rounded-lg bg-slate-50 border border-green-700  text-green-700 font-bold shadow-md hover:from-green-700 hover:to-green-600 transition">
                ADD
              </button>
            </div>

            <!-- Items List -->
            <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col gap-3 shadow-inner ">
              <div  v-for="(item,index) in setItems"  :key="item" 
                class="flex justify-between items-center px-3 py-2 gap-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <!-- Item Text -->
                <div class="flex gap-2 text-slate-700 font-medium">
                  <span class="text-green-600 font-bold">{{ index+1 }}.</span>
                  <span>{{ item }}</span>
                </div>

                <!-- Delete Icon -->
                <button class="p-1 rounded-full bg-slate-200 hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-slate-600 hover:text-red-600 transition" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="relative w-full h-full flex flex-col gap-6">
            <!-- Title -->
            <h2 class="text-xl font-bold text-green-700 tracking-wide">Categories</h2>

            <!-- Input + Button -->
            <div class="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Enter brand name..."
                class="w-full bg-slate-50 border border-slate-300   shadow-sm py-3 px-4 rounded-lg text-sm outline-none transition"
              >
              <button 
                class="px-5 py-3 text-[13px] rounded-lg bg-slate-50 border border-green-700  text-green-700 font-bold shadow-md hover:from-green-700 hover:to-green-600 transition">
                ADD
              </button>
            </div>

            <!-- Items List -->
            <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col gap-3 shadow-inner ">
              <div  v-for="(item,index) in setItems"  :key="item" 
                class="flex justify-between items-center px-3 py-2 gap-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <!-- Item Text -->
                <div class="flex gap-2 text-slate-700 font-medium">
                  <span class="text-green-600 font-bold">{{ index+1 }}.</span>
                  <span>{{ item }}</span>
                </div>

                <!-- Delete Icon -->
                <button class="p-1 rounded-full bg-slate-200 hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-slate-600 hover:text-red-600 transition" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="relative w-full h-full flex flex-col gap-6">
            <!-- Title -->
            <h2 class="text-xl font-bold text-green-700 tracking-wide">Models</h2>

            <!-- Input + Button -->
            <div class="flex gap-3 items-center">
              <input 
                type="text" 
                placeholder="Enter brand name..."
                class="w-full bg-slate-50 border border-slate-300   shadow-sm py-3 px-4 rounded-lg text-sm outline-none transition"
              >
              <button 
                class="px-5 py-3 text-[13px] rounded-lg bg-slate-50 border border-green-700  text-green-700 font-bold shadow-md hover:from-green-700 hover:to-green-600 transition">
                ADD
              </button>
            </div>

            <!-- Items List -->
            <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col gap-3 shadow-inner ">
              <div  v-for="(item,index) in setItems"  :key="item" 
                class="flex justify-between items-center px-3 py-2 gap-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <!-- Item Text -->
                <div class="flex gap-2 text-slate-700 font-medium">
                  <span class="text-green-600 font-bold">{{ index+1 }}.</span>
                  <span>{{ item }}</span>
                </div>

                <!-- Delete Icon -->
                <button class="p-1 rounded-full bg-slate-200 hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 text-slate-600 hover:text-red-600 transition" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
         
        </div>

        
        
      </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { web } from '../../../../sharing/Sharing';
export default{
    setup(){
      const setItems =ref(["Dell","ASUS"]);

        return {
            web,
            setItems
        }
    }
}
</script>