<template>
  <div class="flex gap-5">
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': days }" aria-live="polite" aria-label="days"></span>
      </span>
      days
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': hours }" aria-live="polite" aria-label="hours"></span>
      </span>
      hours
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': minutes }" aria-live="polite" aria-label="minutes"></span>
      </span>
      min
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': seconds }" aria-live="polite" aria-label="seconds"></span>
      </span>
      sec
    </div>
  </div>





  <figure className="diff aspect-16/9" tabIndex={0}>
  <div className="diff-item-1" role="img" tabIndex={0}>
    <img alt="daisy" src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" />
  </div>
  <div className="diff-item-2" role="img">
    <img
      alt="daisy"
      src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" />
  </div>
  <div className="diff-resizer"></div>
</figure>




<figure className="hover-gallery max-w-60">
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
</figure>



<div className="megamenu p-2 border border-base-300">
  <span className="megamenu-active"></span>

  <button className="after:content-none" popoverTarget="e1">One</button>
  <div id="e1" popover="auto">
    <div className="p-4">Content for the first item</div>
  </div>

  <button className="after:content-none" popoverTarget="e2">Two</button>
  <div id="e2" popover="auto">
    <div className="p-4">Content for the second item</div>
  </div>
</div>

<div className="tooltip tooltip-open" data-tip="Home">
  <button className="btn">home</button>
</div>


<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-down"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>
<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>




<button :aria-expanded="isOpen" @click="toggleMenu">
  Menu
</button>
<div v-show="isOpen" aria-hidden="!isOpen">
  Dropdown content
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const days = ref(15)
const hours = ref(10)
const minutes = ref(24)
const seconds = ref(59)

// Simple countdown logic
onMounted(() => {
  setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else {
      seconds.value = 59
      if (minutes.value > 0) {
        minutes.value--
      } else {
        minutes.value = 59
        if (hours.value > 0) {
          hours.value--
        } else {
          hours.value = 23
          if (days.value > 0) {
            days.value--
          }
        }
      }
    }
  }, 1000)
})
</script>
