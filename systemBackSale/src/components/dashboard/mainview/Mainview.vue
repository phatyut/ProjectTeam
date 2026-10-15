<template>
     <div class="relative grid grid-cols-6  gap-4 *:p-2 *:rounded-md *:bg-white ">
            <div class="relative  text-white  ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">{{ 0 }}</div>
                    <div class="text-green-900 text-center font-bold text-[13px]">Current Stock</div>
                </div>
            </div>
            <div class="relative text-white  ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">0</div>
                    <div class="text-green-900 text-center font-bold text-[13px]">Low Stock</div>
                </div>
            </div>
            <div class="relative text-white hover:cursor-pointer hover:bg-slate-50 transition-all duration-200 " @click="toProducts">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">{{productCount}}</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Products</div>
                </div>
            </div>
            <div class="relative text-white hover:cursor-pointer hover:bg-slate-50 transition-all duration-200" @click="toEmployies">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">{{ usersCount }}</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Employees</div>
                </div>
            </div>
           
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">{{ 0 }}</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Users</div>
                </div>
            </div>
           
            <div class="relative text-white ">
                <div class=" flex flex-col h-full justify-between py-2">
                    <div class="text-green-900 text-center font-bold text-4xl">{{ suppliersCount }}</div>
                    <div class="text-green-900 text-center font-bold text-[14px]">Suppliers</div>
                </div>
            </div>
           
            
        </div>
</template>
<script>
import { ref,inject } from 'vue';
import { useRouter } from 'vue-router';
export default{
    setup(){
        const router = useRouter();
          const productCount = inject("productCount",0);
          const usersCount =inject("usersCount",0);
          const suppliersCount = inject("suppliersCount",0);



        //    function block 


         const toProducts = ()=>{
            router.replace("/products")
         }
        return {
            //  build in function of router in vue js

            router,

//  this block provide and inject from another pages
            productCount,
            usersCount,
            suppliersCount,

 // this block function 
            toProducts
        }
    }
}
</script>