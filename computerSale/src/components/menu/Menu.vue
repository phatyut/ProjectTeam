

<template>
  <div
    class="p-2 flex justify-center relative w-full items-center gap-6 font-medium bg-transparent z-20 text-[18px] text-white"
  >
    <!-- Menu -->
    <div
      class="flex gap-2 inset-shadow-[0px_0px_3px] bg-transparent shadow-2xl shadow-gray-200 inset-shadow-white p-1 *:px-5 *:rounded-full *:py-1 rounded-full" >
      <!-- Home -->
        <router-link to="/home"  @click="setActive('Home')" :class="activeMenu === 'Home'
                                ? 'bg-red-600 text-white'
                                : 'text-green-600 hover:text-white hover:bg-green-600'"
                    class="cursor-pointer transition-all flex justify-center items-center text-[15px]" >
                        Home
            </router-link>
      

      <!-- Shop -->
      <router-link to="/shop" @click="setActive('Shop')" :class="   activeMenu === 'Shop'
                    ? 'bg-red-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
             class="cursor-pointer transition-all flex justify-center items-center">  
                     Shop
      </router-link>

      <!-- Deals -->
      <div
        @click="setActive('Deals')"
        :class=" activeMenu === 'Deals'
                    ? 'bg-red-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
        class="cursor-pointer transition-all flex justify-center items-center">
             Deals
      </div>

      <!-- Support -->
      <div
        @click="setActive('Support')"
        :class=" activeMenu === 'Support'
                    ? 'bg-red-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
        class="cursor-pointer transition-all flex justify-center items-center">
             Support
      </div>
    </div>

    <!-- Search -->
    <div class="bg-green-900 rounded-md overflow-hidden">
      <input type="text" placeholder="Search..."
        class="bg-white text-gray-700 placeholder:text-green-500 placeholder:text-[14px] py-1 px-3 outline outline-none "/>
    </div>

  </div>
</template>
<script >
import { ref } from "vue";
export default{
    setup(){
        const activeMenu = ref("Home");
        const setActive = (menu) => {
          activeMenu.value = menu;
        };
        return {
            activeMenu,
            setActive
        }
    }
}
</script>