<template>
    <div class=" flex flex-col h-full gap-3  ">
        <div class=" h-full  rounded-md  overflow-hidden   bg-slate-100"  >
           <div class="text-center  font-eng text-[16px] text-slate-100 bg-gradient-to-br  from-[#006B2D] via-[#168C20] to-[#7FCB0A] px-2 py-4">MICRO MENU</div>
           <div  class="pt-3    w-full flex flex-col gap-1 *:text-green-700  ">
                <div class="flex gap-1.5 pl-1.5 justify-center items-center">
                    <div class="h-5 w-6 rounded-full bg-gradient-to-br  from-[#006B2D] via-[#168C20] to-[#7FCB0A]"></div>
                    <div class="w-full hover:border-l-white  p-2.5 pl-3 bg-green-700  rounded-l-full text-white  ">
                        <routerLink to="/dashboard" class="relative w-full font-medium ">Dashboard</routerLink>
                    </div>
                </div>

                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Sales</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Stocks</routerLink>
               </div> 
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="/products" class="relative w-full ">Products</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="/website" class="relative w-full ">WebSite</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="/users" class="relative w-full ">Customers</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Supplier</routerLink>
                </div>
                <!-- <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Products</routerLink>
                </div> -->
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Orders</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Reports</routerLink>
                </div>
                
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Expenses</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Invioce</routerLink>
                </div>
                <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Repairs</routerLink>
                </div>
                <!-- <div class="w-full  font-semibold p-2.5 hover:bg-white hover:text-green-900 border-l-2 border-gray-50 text-gray-50 hover:rounded-l-full   ">
                    <routerLink to="" class="relative w-full ">Settings</routerLink>
                </div>
               -->
                
            </div>
       </div>
    </div>
</template>