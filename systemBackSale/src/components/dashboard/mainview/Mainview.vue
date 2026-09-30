<template>
     <div class="relative grid grid-cols-7  gap-4 *:p-2 *:rounded-md *:bg-white ">
            <div class="relative  text-white  ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">{{ productCount }}</div>
                    <div class="text-green-900 text-center font-bold text-[13px]">Current Stock</div>
                </div>
            </div>
            <div class="relative text-white  ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[13px]">Low Stock</div>
                </div>
            </div>
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Products</div>
                </div>
            </div>
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Employees</div>
                </div>
            </div>
           
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Users</div>
                </div>
            </div>
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Orders</div>
                </div>
            </div>
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Suppliers</div>
                </div>
            </div>
           
            
        </div>
</template>
<script>
import { ref,inject } from 'vue';
export default{
    setup(){
          const productCount = inject("productCount",0);
        return {
            productCount
        }
    }
}
</script>