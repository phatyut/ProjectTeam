<template>
<div class="relative w-full h-full  rounded-md ">
    <!-- <div class="flex w-full justify-between h-auto gap-2 bg-green-700 rounded-md p-3">
        <div class=" p-1  rounded-full font-eng text-white text-xl">Controllers Website</div>
        <div class="flex justify-center items-center rounded-md bg-white overflow-hidden">
            <input type="search" placeholder="search ..." class=" h-full w-75 rounded-l-md pl-2 outline-none">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-[20px] text-gray-700 bg-gray-200 p-2.5"/>
        </div>
        <div class=" *:p-2  *:bg-green-600 *:text-white *:inset-shadow-white *:inset-shadow-[0px_0px_0px] *:shadow-[0px_0px_30px] *:shadow-gray-600/20 *:rounded-md">
            <button class="font-eng text-[12px]">
                Add Product
            </button>
        </div>
    </div> -->

    <div class="relative flex justify-center w-full h-full items-center"><showAllProducts></showAllProducts></div>
</div>
</template>
<script>
import showAllProducts from './showAllProducts.vue';
export default{
    components:{showAllProducts}
}
</script>
