<template>
    <!-- <div> <div className="aura">
  <div className="card bg-base-100">
    <div className="card-body">
     <router-link to="/product">Products</router-link>
    </div>
  </div>
</div></div> -->
<div class="" :style="{width:width,height:height}">
  <div>{{ width }}</div>
  <div>{{ height }}</div>
</div>

</template>
<script>
import { ref } from 'vue';
export default{
    setup() {
      const width =ref( screen.width);
      const height =ref( screen.height);
        const test = ref(1);
        return {
            test,
            width,
            height
        }
    }
}
</script>