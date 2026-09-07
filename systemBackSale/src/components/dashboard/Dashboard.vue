<template>
    <div class="relative p-4 flex flex-col gap-4">

       

        <div class="flex flex-col gap-4 ">
            <Mainview></Mainview>
        </div>
        
    
    </div>
</template>
<script>
import { inject } from "vue";
import Mainview from "./mainview/Mainview.vue";
export default {
    components:{Mainview},

  setup() {

    const productCount = inject("productCount");

    return {
      productCount
    };

  }

};
</script>