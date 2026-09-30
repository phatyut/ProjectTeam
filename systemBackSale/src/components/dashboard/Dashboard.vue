<template>
    <div class="relative p-4 flex flex-col  gap-6 ">

       

        <div class="flex flex-col gap-4 ">
            <Mainview></Mainview>
        </div>




        <div class="w-full h-auto relative flex gap-4  ">
            <div class="w-[75%] h-full relative rounded-md  ">
                    <Graphic/>
              </div>
            <div class="w-[25%] h-full  ">
                    <ViewWeeks/>

            </div>
        </div>
        <div class="w-full h-auto relative flex gap-4  ">
            <div class="w-[75%] h-full relative rounded-md  ">
                    <Graphic/>
              </div>
            <div class="w-[25%] h-full  ">
                    <ViewWeeks/>

            </div>
        </div>
        
    
    </div>
</template>
<script>
import { inject } from "vue";
import Mainview from "./mainview/Mainview.vue";
import Graphic from "./graphic/Graphic.vue";
import ViewWeeks from "./viewWeeks/ViewWeeks.vue";
export default {
    components:{
                Mainview,
                Graphic,
                ViewWeeks
              },

  setup() {

    const productCount = inject("productCount");

    return {
      productCount
    };

  }

};
</script>