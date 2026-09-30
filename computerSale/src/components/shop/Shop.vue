<template>
 <div class="relative w-full h-auto flex flex-wrap  gap-2  ">
     <div class="flex justify-between px-3 relative h-37.5 w-full bg-green-700 ">
         <div>one</div>
         <div>one</div>
         <div class="border border-red-600">
             one
         </div>

     </div>
     <div class="flex w-full gap-4 ">
         <div class="w-[20%] h-full  px-2">
             <div class="sticky top-16">
                 <div class="  rounded-md flex flex-col gap-3">
                     <div class="bg-slate-50 p-3 rounded-md border border-slate-100">
                         <div class=" flex  items-center gap-3">
                             <div>
                                 <font-awesome-icon icon="fa-solid fa-layer-group" />
                             </div>
                             <div class="font-bold"> Categories</div>
                         </div>
                         <div class="pt-4  flex flex-col gap-1.5 ">
                             <div class="flex justify-between bg-green-100 *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class="">All Products</p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class="">All Products</p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class="">All Products</p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class="">All Products</p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class="">All Products</p>
                                 <p class="text-green-500">200</p>
                             </div>
                         </div>
                     </div>

                     <!--setprice  -->

                     <div class="flex flex-col gap-6 bg-slate-50 border border-slate-100 rounded-md p-3">
                         <div class=" flex  items-center gap-3">
                             <div>
                                 <font-awesome-icon icon="fa-solid fa-layer-group" />
                             </div>
                             <div class="font-bold"> Price Rang</div>
                         </div>
                         <div class="flex w-full  gap-2 items-center">
                             <p class="text-[14px] text-green-700 p-2 font-bold">$0</p>
                             <input type="range" min="0" max="1000" step="1" v-model="setRangePrice" class="w-full h-0.5 accent-emerald-700">
                             <p class="text-[14px] text-green-700 p-2 font-bold">${{ setRangePrice }}</p>
                         </div>
                     </div>

                     <div class="bg-slate-50 rounded-md border border-slate-100 p-3">
                         <div class=" flex  items-center gap-3">
                             <div>
                                 <font-awesome-icon icon="fa-solid fa-layer-group" />
                             </div>
                             <div class="font-bold"> Brand</div>
                         </div>
                         <div class="flex flex-col w-full  gap-2">
                             <div class="flex justify-between w-full  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class=""><input type="radio" name="setBrand"></p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between w-full  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class=""><input type="radio" name="setBrand"></p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between w-full  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class=""><input type="radio" name="setBrand"></p>
                                 <p class="text-green-500">200</p>
                             </div>
                             <div class="flex justify-between w-full  *:font-bold text-gray-500 p-2 border-slate-100 border rounded-lg text-[12px]">
                                 <p class=""><input type="radio" name="setBrand"></p>
                                 <p class="text-green-500">200</p>
                             </div>
                         </div>
                     </div>

                 </div>
             </div>
         </div>
         <div class=" flex flex-col gap-3 w-full  ">
             <div class="flex justify-between items-center">
                 <div class=" py-3 flex gap-2 rounded-md  ">
                     <button class="py-2 px-5 font-bold  rounded-full text-gray-200 text-[13px] border border-slate-100 " @click="clickChnageStyle('all')" :class="btnChangeStyle==='all'?'bg-green-700':'bg-slate-50 text-gray-900'" >All</button>
                     <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll"  @click="clickChnageStyle('gaming')" :class="btnChangeStyle==='gaming'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Gaming</button>
                     <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll"  @click="clickChnageStyle('Labtops')" :class="btnChangeStyle==='Labtops'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Labtops</button>
                     <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll"  @click="clickChnageStyle('Desktops')" :class="btnChangeStyle==='Desktops'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Desktops</button>
                     <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll"  @click="clickChnageStyle('Components')" :class="btnChangeStyle==='Components'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Components</button>
                     <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll"  @click="clickChnageStyle('Accessaries')" :class="btnChangeStyle==='Accessaries'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Accessaries</button>
                 </div>
                 <div class="py-2 flex px-5 font-bold bg-slate-50 rounded-full text-gray-600  border border-slate-100 ">
                     <p>Sort by: </p>
                     <select name="" id="">
                         <option value="">Newtest</option>
                         <option value="">Newtest</option>
                         <option value="">Newtest</option>
                     </select>
                 </div>
             </div>
             <div class="grid grid-cols-4 gap-5 w-full text-black">
                 <div class="" v-for="items in webs" :key="items._id">
                     <div class="group w-72.5 overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                         <!-- IMAGE -->
                         <div class="relative h-45 overflow-hidden bg-slate-50">
                             <img :src="image" :alt="title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />

                             <!-- Category -->
                             <span class="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white ">
                                 {{ items.title }}
                             </span>

                             <!-- Favorite -->
                             <button class="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:text-red-500">
                                 ♥
                             </button>
                         </div>

                         <!-- CONTENT -->
                         <div class="p-4">
                            <div class="flex justify-between items-center">
                              <p class="text-xs font-semibold uppercase tracking-wider text-green-600">
                                  {{ items.model }}
                              </p>
                              <p class="text-xs font-semibold uppercase tracking-wider text-green-600">
                                  {{ items.model }}
                              </p>
                              

                            </div>
                             <h2 class="mt-1 text-lg font-bold text-slate-800">
                                 {{ items.brand }}
                             </h2>

                             <div class="mt-3 grid grid-cols-3 gap-2">
                                 <div class="rounded-lg bg-slate-50 p-2 text-center">
                                     <p class="text-[10px] text-slate-400">CPU</p>
                                     <p class="text-xs font-bold text-slate-700">{{ items.cpu }}</p>
                                 </div>
                                 <div class="rounded-lg bg-slate-50 p-2 text-center">
                                     <p class="text-[10px] text-slate-400">RAM</p>
                                     <p class="text-xs font-bold text-slate-700">{{ items.ram }}G</p>
                                 </div>
                                 <div class="rounded-lg bg-slate-50 p-2 text-center">
                                     <p class="text-[10px] text-slate-400">SSD</p>
                                     <p class="text-xs font-bold text-slate-700">{{ items.ssd }}G</p>
                                 </div>
                             </div>

                             <!-- PRICE -->
                             <div class="mt-4 flex items-center justify-between">
                                 <div>
                                     <p class="text-2xl font-extrabold text-green-700">{{ (items.salePrice / items.deals+1).toFixed(2) }}$</p>
                                     <p class="text-xs text-slate-400 line-through" >{{ items.deals }}$</p>
                                 </div>
                                 <span class="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                                     {{ Math.ceil(items.deals)}}%
                                 </span>
                             </div>

                             <div class="mt-4 flex gap-2">
                                 <button class="flex-1 rounded-lg bg-green-600 py-2 text-sm font-bold text-white transition hover:bg-green-700">
                                     BUY
                                 </button>
                                 <button class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-green-500 hover:text-green-600">
                                     More
                                 </button>
                             </div>
                         </div>
                     </div>

                 </div>

             </div>

         </div>
     </div>
 </div>
</template>

<script>
// import AddItemsToShop from './AddToShop/AddItemsToShop.vue'
import {
    ref,
    onMounted
} from 'vue'
import axios from "axios"
export default {
    setup() {
        // Array of products
        const setRangePrice = ref(0);
        const webs = ref([]);

        const getItemsWeb = async () => {
            try {
                const getAll = await axios.get("http://localhost:2026/api/web");
                webs.value = getAll.data.data

            } catch (error) {
                console.log(error)
            }
        }

        const btnChangeStyle =ref("all");
        const clickChnageStyle =(menu)=>{
            btnChangeStyle.value = menu
        }


        onMounted(getItemsWeb);
        return {
            setRangePrice,
            webs,
            btnChangeStyle,
            clickChnageStyle


            
        }

    }
}
</script>

<!-- <AddItemsToShop
              v-for="(product, index) in products"
              :key="index"
              :image="product.image"
              :category="product.category"
              :brand="product.brand"
              :title="product.title"
              :cpu="product.cpu"
              :ram="product.ram"
              :ssd="product.ssd"
              :price="product.price"
              :oldPrice="product.oldPrice"
              :discount="product.discount"
            /> -->

 <!-- //const products = ref([
      // {
      //   image: "/img/123.jpg",
      //   category: "Gaming",
      //   brand: "DELL",
      //   title: "Dell Gaming PC",
      //   cpu: "Core i7",
      //   ram: "16GB",
      //   ssd: "512GB",
      //   price: "$233",
      //   oldPrice: "$280",
      //   discount: "-17%"
      // },

   // ]) -->
