<template> 
  <div class="relative w-full h-auto flex flex-wrap  gap-2  ">
    <div class="flex justify-between px-3 relative h-37.5 w-full bg-green-500 ">
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
                      <input type="range" min="0" max="300" step="1" v-model="setRangePrice"  class="w-full h-0.5 accent-emerald-700" >
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
            <button class="py-1 px-5 font-bold bg-green-700 rounded-full text-gray-200 text-[13px] border border-slate-100   ">All</button>
            <button class="py-1 px-5 font-bold bg-slate-50 rounded-full text-gray-600 text-[13px] border border-slate-100   ">Gaming</button>
            <button class="py-1 px-5 font-bold bg-slate-50 rounded-full text-gray-600 text-[13px] border border-slate-100   ">Labtops</button>
            <button class="py-1 px-5 font-bold bg-slate-50 rounded-full text-gray-600 text-[13px] border border-slate-100   ">Desktops</button>
            <button class="py-1 px-5 font-bold bg-slate-50 rounded-full text-gray-600 text-[13px] border border-slate-100   ">Components</button>
            <button class="py-2 px-5 font-bold bg-slate-50 rounded-full text-gray-600  border border-slate-100   ">Accessaries</button>
          </div>
          <div class="py-2 flex px-5 font-bold bg-slate-50 rounded-full text-gray-600  border border-slate-100 " >
            <p>Sort by: </p> 
            <select name="" id="">
                <option value="">Newtest</option>
                <option value="">Newtest</option>
                <option value="">Newtest</option>
            </select>
        </div>
        </div>
        <div class="grid grid-cols-4 gap-5 w-full">
            <!-- Loop through products -->
            <AddItemsToShop
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
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddItemsToShop from '../../components/shop/AddToShop/AddItemsToShop.vue'
import { ref } from 'vue'

export default {
  components: { AddItemsToShop },
  setup() {
    // Array of products
    const setRangePrice=ref(0)
    const products = ref([
      {
        image: "/img/123.jpg",
        category: "Gaming",
        brand: "DELL",
        title: "Dell Gaming PC",
        cpu: "Core i7",
        ram: "16GB",
        ssd: "512GB",
        price: "$233",
        oldPrice: "$280",
        discount: "-17%"
      },
      {
        image: "/img/124.jpg",
        category: "Laptop",
        brand: "ASUS",
        title: "ASUS ROG Strix",
        cpu: "Ryzen 7",
        ram: "32GB",
        ssd: "1TB",
        price: "$999",
        oldPrice: "$1200",
        discount: "-20%"
      },
      {
        image: "/img/125.jpg",
        category: "Laptop",
        brand: "Apple",
        title: "MacBook Pro M3",
        cpu: "M3",
        ram: "16GB",
        ssd: "512GB",
        price: "$1499",
        oldPrice: "$1699",
        discount: "-12%"
      },
      {
        image: "/img/125.jpg",
        category: "Laptop",
        brand: "Apple",
        title: "MacBook Pro M3",
        cpu: "M3",
        ram: "16GB",
        ssd: "512GB",
        price: "$1499",
        oldPrice: "$1699",
        discount: "-12%"
      },
      {
        image: "/img/125.jpg",
        category: "Laptop",
        brand: "Apple",
        title: "MacBook Pro M3",
        cpu: "M3",
        ram: "16GB",
        ssd: "512GB",
        price: "$1499",
        oldPrice: "$1699",
        discount: "-12%"
      }
    ])

    return { products,setRangePrice }
  }
}
</script>
