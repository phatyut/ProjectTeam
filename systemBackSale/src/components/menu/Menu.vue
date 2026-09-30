<template>
<div class=" flex flex-col h-full gap-3    ">
    <div class=" h-full  rounded-md       bg-slate-50">
        <div class="text-center  font-eng text-[16px] border-b border-green-800 text-green-800  px-2 py-6">MICRO MENU</div>
        <div class="py-4 h-full   w-full flex flex-col gap-0.5   ">

            <div class="flex gap-1.5 px-3 justify-center items-center ">
                <routerLink to="/dashboard" class="relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md  "  
                            active-class=" text-white  transition-all duration-300"  
                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-chart-column" />
                    Dashboard

                </routerLink>
            </div>
            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/sales" class="relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md" 
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    Sale

                </routerLink>
            </div>

            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/stocks" class=" relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-city" />
                    Stocks

                </routerLink>
            </div>

            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/products" class=" relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-cubes" />
                    Products

                </routerLink>
            </div>

            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/website" class=" relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
                    Website

                </routerLink>
            </div>

            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/users" class=" relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-users" />
                    Customers

                </routerLink>
            </div>
            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/suppliers" class=" relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                                active-class=" text-white bg-green-800  transition-all duration-300"  
                                                exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-users-gear" />
                    Suppliers

                </routerLink>
            </div>
            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/orderReturn" class=" relative w-full py-2 font-medium  pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                                active-class=" text-white bg-green-800  transition-all duration-300"  
                                                exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-recycle" />
                    Orders/Refun

                </routerLink>
            </div>
            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/reports" class=" relative w-full py-2 font-medium pl-5  text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    <font-awesome-icon icon="fa-solid fa-file-pen" />
                    Reports

                </routerLink>
            </div>

            <div class="flex gap-1.5 px-3 justify-center items-center">
                <routerLink to="/invioce" class=" relative w-full py-2 font-medium  pl-5 text-green-800  hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md"
                                            active-class=" text-white bg-green-800  transition-all duration-300"  
                                            exact-active-class="bg-green-700 text-green-800 hover:bg-green-800 ">
                    Invioce

                </routerLink>
            </div>
           

        </div>
    </div>

</div>
</template>

<script>
import {
    ref
} from 'vue';
export default {
    setup() {
       
        return {
           
        }
    }
}
</script>
