<template>
  <div class="  ">
    <div class="w-full  mx-auto rounded-xl  ">
      <div class="space-y-2">
        <!-- ALL PRODUCTS -->
        <button
          type="button" @click="selectCategory('all')"
          :class="['group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedCategory === 'all'? 'border-green-500 bg-green-50': 'border-gray-300 bg-white hover:bg-slate-100']">
          <div class="flex gap-2 items-center">
            <input type="radio" name="category" value="all"  v-model="selectedCategory" class="accent-green-600 pointer-events-none"/>
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
          type="button"  @click="selectCategory('laptop')"
          :class="['group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',
            selectedCategory === 'laptop'? 'border-green-500 bg-green-50': 'border-gray-300 bg-white hover:bg-slate-100']">
          <div class="flex gap-2 items-center">
            <input
              type="radio"
              name="category"
              value="laptop"
              v-model="selectedCategory"
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
          @click="selectCategory('desktop')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',

            selectedCategory === 'desktop'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >

          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="category"
              value="desktop"
              v-model="selectedCategory"
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
          @click="selectCategory('monitor')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',

            selectedCategory === 'monitor'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >

          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="category"
              value="monitor"
              v-model="selectedCategory"
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
          @click="selectCategory('accessories')"
          :class="[
            'group w-full flex justify-between items-center p-2.5 border rounded-lg text-[12px] transition-all duration-200 cursor-pointer',

            selectedCategory === 'accessories'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:bg-slate-100'
          ]"
        >

          <div class="flex gap-2 items-center">

            <input
              type="radio"
              name="category"
              value="accessories"
              v-model="selectedCategory"
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
    const selectedCategory = ref('all')
    const selectCategory = (category) => {
      selectedCategory.value = category
    }
    onMounted(() => {
      const savedCategory =localStorage.getItem('selectedCategory')
      if (savedCategory) {
        selectedCategory.value = savedCategory
      }
    })
    watch(
      selectedCategory,
      (newCategory) => {
        localStorage.setItem(
          'selectedCategory',
          newCategory
        )
      }
    )
    return {
      selectedCategory,
      selectCategory
    }
  }
}
</script>