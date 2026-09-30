<template>
<div class="relative w-full h-full   gap-2  flex flex-col  p-1">

    <div class="h-17.5 rounded-sm bg-slate-50 sticky top-1 z-20 ">
        <Account></Account>
    </div>

    <div class=" w-full h-full flex gap-2  ">
        <div class=" lg:w-[18%] h-full sticky top-20 ">
            <Menu> </Menu>
        </div>

        <div class="relative w-full h-full flex flex-col  rounded-md">           
                <router-view></router-view>
        </div>
    </div>

   

</div>
</template>

<script>
import axios from "axios";
import { ref, provide, onMounted } from "vue";
import { pagelogin } from "./sharing/Sharing";


export default {


  setup() {

    const productCount = ref(0);

    const getProductCount = async () => {
      try {
         const res = await axios.get("http://localhost:2026/api/products");
               productCount.value = res.data.data.length;
          } catch (error) {
            console.error( "Get product count error:", error);
       }
    };

    provide("productCount", productCount);
    onMounted(getProductCount);
      return {
        productCount,
        pagelogin
      };
  }

};
</script>
