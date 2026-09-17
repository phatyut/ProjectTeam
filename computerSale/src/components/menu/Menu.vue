
<template>
  <div  class="p-1 flex justify-center relative w-full items-center gap-15 font-medium bg-transparent z-20 text-[18px] text-white">
    <!-- Menu -->
    <!-- <div class="flex gap-2 inset-shadow-[0px_0px_3px] bg-transparent shadow-2xl shadow-gray-200 inset-shadow-white p-1 *:px-5 *:rounded-full *:py-1 rounded-full" > -->
    <div class="flex gap-2     *:px-3 *:rounded-full *:py-1 rounded-full" >
      <!-- Home -->

    
      <router-link to="/home"  @click="setActive('Home')"
      :class="activeMenu === 'Home'
                                ? 'bg-green-600 text-white'
                                : 'text-green-600 hover:text-white hover:bg-green-600' "
                    class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center"  >
                    <!-- <div className="aura aura-md"> -->
                   <font-awesome-icon icon="fa-solid fa-house" />
                        Home
                      <!-- </div> -->
        </router-link>

      

      <!-- Shop -->
      <router-link to="/shop" @click="setActive('Shop')" 
                  :class="activeMenu === 'Shop'
                    ? 'bg-green-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
             class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center">  
              <font-awesome-icon icon="fa-solid fa-suitcase" />
                     Shop
      </router-link>
      <router-link to="/deals" @click="setActive('Deals')" 
                  :class="activeMenu === 'Deals'
                    ? 'bg-green-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
             class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center">  
                          <font-awesome-icon icon="fa-solid fa-tags" />

                     Deals
      </router-link>
      <router-link to="/support" @click="setActive('support')" 
                  :class="activeMenu === 'support'
                    ? 'bg-green-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
             class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center">  
             <font-awesome-icon icon="fa-solid fa-headset" />
                     Support
      </router-link>
      <router-link to="/contact" @click="setActive('contact')" 
                  :class="activeMenu === 'contact'
                    ? 'bg-green-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
             class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center">  
             <font-awesome-icon icon="fa-solid fa-headset" />
                     Contact
      </router-link>
      <router-link to="/about" @click="setActive('about')" 
                  :class="activeMenu === 'about'
                    ? 'bg-green-600 text-white'
                    : 'text-green-600 hover:text-white hover:bg-green-600'"
             class="cursor-pointer transition-all text-[15px] flex gap-1 font-bold justify-center items-center">  
                     <font-awesome-icon icon="fa-solid fa-id-card" />
                     About
      </router-link>

     
    </div>

    <!-- Search -->
    <div class=" group flex overflow-hidden rounded-full w-77.5  border border-slate-200 p-1 bg-slate-100">
      <!-- <input type="text" class="relative w-full"> -->
      <input type="text" placeholder="Search..." class=" placeholder:text-gray-900 text-[14px] px-3 w-full h-8.75 bg-slate-100 border border-slate-100 text-black "/>
        <button class=" hover:bg-blue-100 bg-slate-50 rounded-full py-1 px-1.5 opacity-90 ">
           🔍
        </button>
        
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