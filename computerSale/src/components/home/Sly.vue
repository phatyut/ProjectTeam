<template>
<div class=" px-5  pt-10 ">
    <div class=" h-80   rounded-2xl p-6  flex *:flex justify-between bg-slate-50  ">
        <div class="relative flex justify-between gap-6 flex-col  w-[60%]   ">
            <div class=" w-full text-white space-y-3 justify-center items-center   flex flex-col   ">
                <div class="w-full  flex flex-col items-center ">
                    <div class="font-eng  w-full flex text-4xl text-green-600 uppercase justify-center ">
                        Build your <span class="pl-2 text-blue-600">dream Pc</span>
                    </div>
                </div>
                <div class="text-black text-[18px] ">
                    Powerful performance for <br> work play and everythings.
                </div>
                <div class=" flex gap-3">

                    <!-- <button class="bg-green-600 px-3 py-2 rounded-md text-white font-eng ">Shop now</button> -->
                     <router-link to="/shop">
                         <button class="border-green-600/5 border px-3 py-2 rounded-md text-green-600 font-eng flex gap-2.5 hover:bg-green-600/5 ">
                            Shop now 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                                         <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                        </button>
                    </router-link>
                </div>
            </div>

            <div class="w-full *:h-full *:bg-slate-100 rounded-2xl  *:p-2  gap-3 *:rounded-md justify-center items-center  text-green-700  grid grid-cols-3  
            ">

                <div class=" flex gap-4  justify-center items-center ">
                    <div>
                        <font-awesome-icon icon="fa-regular fa-truck" class="text-[22px] text-green-600" />
                    </div>
                    <div class="">
                        <div class="font-eng">Fast delivery</div>
                        <div class="text-[15px] text-black">Free Shopping worldwide</div>
                    </div>

                </div>
                <div class=" flex gap-4 justify-center items-center ">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-9">
                            <path fill-rule="evenodd" d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z" clip-rule="evenodd" />
                        </svg>

                        <!-- <font-awesome-icon icon="fa-regular fa-truck" class="text-[22px] text-[#7FCB0A]" /> -->
                    </div>
                    <div class="">
                        <div class="font-eng">Warranty</div>
                        <div class="text-[15px] text-black">Becarefully selected products from trusted brands</div>
                    </div>

                </div>
                <div class=" flex gap-4 justify-center items-center ">
                    <div>
                        <font-awesome-icon icon="fa-regular fa-truck" class="text-[22px] text-[#7FCB0A]" />
                    </div>
                    <div class="">
                        <div class="font-eng">24/7 Support</div>
                        <div class="text-[15px] text-black">Free Shopping worldwide</div>
                    </div>

                </div>
            </div>
        </div>

        <div class=" w-[40%]     flex justify-center items-center"><img src="../../../public/img/pcgreen.png" alt="" class="h-full w-auto"></div>
    </div>
</div>
</template>

<!-- [#7FCB0A] -->
