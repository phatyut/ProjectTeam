<template>
<div class="relative w-full h-full  rounded-md ">
    <div class="relative flex justify-center w-full h-full items-center">
        <showAllProducts></showAllProducts>
    </div>
</div>
</template>
<script>
import showAllProducts from './showAllProducts.vue';
export default{
    components:{showAllProducts}
}
</script>
