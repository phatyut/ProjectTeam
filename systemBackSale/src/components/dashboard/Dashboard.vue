<template>
    <div class="relative p-4 flex flex-col gap-6">

       

        <div class="flex flex-col gap-4 ">
            <Mainview></Mainview>
        </div>




        <div class="w-full h-100 flex gap-8">
            <div class="w-[75%] h-full rounded-md  "><Graphic/></div>
            <div class="w-[25%] h-full border-green-700 border">right</div>
        </div>
        
    
    </div>
</template>
<script>
import { inject } from "vue";
import Mainview from "./mainview/Mainview.vue";
import Graphic from "./graphic/Graphic.vue";
export default {
    components:{
                Mainview,
              Graphic},

  setup() {

    const productCount = inject("productCount");

    return {
      productCount
    };

  }

};
</script>