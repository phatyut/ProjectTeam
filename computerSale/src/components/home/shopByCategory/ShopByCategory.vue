
<template>
  <div class="px-6 pt-2">
    <div class="flex flex-col gap-5">

      <!-- Header -->
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-2.5">
          <!-- <div class="w-[15px] h-[4px] bg-green-600"></div> -->

          <div class="uppercase font-bold text-black">
            Shop by Category
          </div>
        </div>

        <div
          class="text-green-600 font-eng text-[15px]
                 hover:underline cursor-pointer"
        >
          <button class="flex justify-center items-center gap-2">
            View all category

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="size-3.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Splide -->
      <div ref="splideElement" class="splide" aria-label="Shop by Category">

        <div class="splide__track">
          <ul class="splide__list">

            <!-- Laptop -->
            <li class="splide__slide">
              <div
                class="h-[140px] p-2 gap-5 flex
                       rounded-md overflow-hidden
                       bg-blue-50"
              >
                <div class="flex-1 flex justify-center items-center">
                  <img
                    src="../../../../public/img/pcgreen.png"
                    alt="Laptop"
                    class="w-[170px] object-contain"
                  />
                </div>

                <div
                  class="flex-1 flex justify-center
                         items-center gap-2 flex-col"
                >
                  <div class="font-bold">
                    Laptops
                  </div>

                  <button
                    class="text-[13px] font-bold
                           text-green-600 hover:underline"
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </li>

            <!-- Desktop -->
            <li class="splide__slide">
              <div
                class="h-35 p-2 gap-5 flex
                       rounded-md overflow-hidden
                       bg-green-50"
              >
                <div class="flex-1 flex justify-center items-center">
                  <img
                    src="../../../../public/img/pcgreen.png"
                    alt="Desktop"
                    class="w-35 object-contain"
                  />
                </div>

                <div
                  class="flex-1 flex justify-center
                         items-center gap-2 flex-col"
                >
                  <div class="font-bold">
                    Desktops
                  </div>

                  <button
                    class="text-[13px] font-bold
                           text-green-600 hover:underline"
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </li>

            <!-- Monitor -->
            <li class="splide__slide">
              <div
                class="h-35 p-2 gap-5 flex
                       rounded-md overflow-hidden
                       bg-purple-50"
              >
                <div class="flex-1 flex justify-center items-center">
                  <img
                    src="../../../../public/img/pcgreen.png"
                    alt="Monitor"
                    class="w-42.5 object-contain"
                  />
                </div>

                <div
                  class="flex-1 flex justify-center
                         items-center gap-2 flex-col"
                >
                  <div class="font-bold">
                    Monitors
                  </div>

                  <button
                    class="text-[13px] font-bold
                           text-green-600 hover:underline"
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </li>

            <!-- Accessories -->
            <li class="splide__slide">
              <div
                class="h-35 p-2 gap-5 flex
                       rounded-md overflow-hidden
                       bg-yellow-50"
              >
                <div class="flex-1 flex justify-center items-center">
                  <img
                    src="../../../../public/img/pcgreen.png"
                    alt="Accessories"
                    class="w-42.5 object-contain"
                  />
                </div>

                <div
                  class="flex-1 flex justify-center
                         items-center gap-2 flex-col"
                >
                  <div class="font-bold">
                    Accessories
                  </div>

                  <button
                    class="text-[13px] font-bold
                           text-green-600 hover:underline"
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </li>

          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

import '@splidejs/splide/css'

const splideElement = ref(null)

let splide = null

onMounted(() => {
  splide = new Splide(splideElement.value, {
    type: 'loop',
    drag: 'free',
    focus: 'center',

    perPage: 3,
    gap: '20px',

    arrows: false,
    pagination: false,

    autoScroll: {
      speed: 0.2,
      pauseOnHover: true,
      pauseOnFocus: false,
    },

    breakpoints: {
      1024: {
        perPage: 2,
      },

      640: {
        perPage: 1,
      },
    },
  })

  splide.mount({ AutoScroll })
})

onBeforeUnmount(() => {
  if (splide) {
    splide.destroy()
  }
})
</script>
