<template>
  <div>
    <div class="w-full mx-auto rounded-xl">
      
      <div class="space-y-2">

        <!-- ALL PRODUCTS -->
        <button
          type="button"
          @click="selectBrand('all')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedBrand === 'all'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >
          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="brand"
              value="all"
              v-model="selectedBrand"
              class="accent-green-600 pointer-events-none"
            />

            <p class="font-bold text-gray-800">
              All Products
            </p>

          </div>

          <p class="text-green-700 font-bold">
            200
          </p>
        </button>


        <!-- LAPTOP -->
        <button
          type="button"
          @click="selectBrand('laptop')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedBrand === 'laptop'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >
          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="brand"
              value="laptop"
              v-model="selectedBrand"
              class="accent-green-600 pointer-events-none"
            />

            <p class="font-bold text-gray-800">
              Laptop
            </p>

          </div>

          <p class="text-green-700 font-bold">
            80
          </p>
        </button>


        <!-- DESKTOP -->
        <button
          type="button"
          @click="selectBrand('desktop')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedBrand === 'desktop'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >
          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="brand"
              value="desktop"
              v-model="selectedBrand"
              class="accent-green-600 pointer-events-none"
            />

            <p class="font-bold text-gray-800">
              Desktop
            </p>

          </div>

          <p class="text-green-700 font-bold">
            50
          </p>
        </button>


        <!-- MONITOR -->
        <button
          type="button"
          @click="selectBrand('monitor')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedBrand === 'monitor'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >
          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="brand"
              value="monitor"
              v-model="selectedBrand"
              class="accent-green-600 pointer-events-none"
            />

            <p class="font-bold text-gray-800">
              Monitor
            </p>

          </div>

          <p class="text-green-700 font-bold">
            30
          </p>
        </button>


        <!-- ACCESSORIES -->
        <button
          type="button"
          @click="selectBrand('accessories')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedBrand === 'accessories'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >
          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="brand"
              value="accessories"
              v-model="selectedBrand"
              class="accent-green-600 pointer-events-none"
            />

            <p class="font-bold text-gray-800">
              Accessories
            </p>

          </div>

          <p class="text-green-700 font-bold">
            40
          </p>
        </button>

      </div>

    </div>
  </div>
</template>


<script>
import { ref, onMounted, watch } from 'vue'

export default {
  setup() {

    // Selected brand
    const selectedBrand = ref('all')


    // Select brand
    const selectBrand = (brand) => {
      selectedBrand.value = brand
    }


    // Load from localStorage
    onMounted(() => {

      const savedBrand =
        localStorage.getItem('selectedBrand')

      if (savedBrand) {
        selectedBrand.value = savedBrand
      }

    })


    // Save to localStorage
    watch(
      selectedBrand,
      (newBrand) => {

        localStorage.setItem(
          'selectedBrand',
          newBrand
        )

      }
    )


    return {
      selectedBrand,
      selectBrand
    }
  }
}
</script>