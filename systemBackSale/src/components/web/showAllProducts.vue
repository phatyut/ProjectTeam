<template>
  <div class="h-full w-full bg-[#f6f8f7] px-2 pt-2  ">

    <!-- ===================================================== -->
    <!-- TOP HEADER -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col   xl:flex-row xl:items-center xl:justify-between">
      <!-- TITLE -->
      <div class="flex items-center gap-3">
        <!-- LOGO -->
        <div  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-sm font-black text-white shadow-lg shadow-green-200">
          PC
        </div>
        <!-- TITLE -->
        <div>
          <h1 class="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
            Product Center
          </h1>
          <p class="mt-0.5 text-xs text-slate-400 sm:text-sm">
            Manage your computer inventory and pricing
          </p>
        </div>
      </div>


      <!-- ADD PRODUCT -->
      <button
        @click="testalert"
        class="group flex w-fit items-center gap-2 rounded-xl bg-gradient-to-br  from-[#006B2D] via-[#168C20] to-[#7FCB0A] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-600">
        <span class="text-lg transition duration-300 group-hover:rotate-90">
          +
        </span>
        Add Product
      </button>
    </div>


  


    <!-- ===================================================== -->
    <!-- TOOLBAR -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <!-- SEARCH -->
      <div class="flex h-10 w-full items-center rounded-lg border border-slate-200 bg-slate-50 px-3 lg:max-w-md">
          <svg
            class="mr-2 h-4 w-4 shrink-0 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>

          <input  v-model="search"  type="search"
            placeholder="Search computer..."
            class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
      </div>


      <!-- FILTER BUTTONS -->
      <div class="flex flex-wrap gap-2">
        <!-- ALL -->
        <button  @click="selectedCategory = 'All'"
          :class="
            selectedCategory === 'All'
              ? 'bg-green-600 text-white'
              : 'border border-slate-200 text-slate-500 hover:border-green-200 hover:bg-green-50 hover:text-green-700'
          "
          class="rounded-lg px-3 py-2 text-xs font-bold transition">
          All Products
        </button>


        <!-- GAMING -->
        <button
          @click="selectedCategory = 'Gaming'"
          :class="
            selectedCategory === 'Gaming'
              ? 'bg-green-600 text-white'
              : 'border border-slate-200 text-slate-500 hover:border-green-200 hover:bg-green-50 hover:text-green-700'
          "
          class="rounded-lg px-3 py-2 text-xs font-bold transition"
        >
          Gaming
        </button>


        <!-- LAPTOP -->
        <button
          @click="selectedCategory = 'Laptop'"
          :class="
            selectedCategory === 'Laptop'
              ? 'bg-green-600 text-white'
              : 'border border-slate-200 text-slate-500 hover:border-green-200 hover:bg-green-50 hover:text-green-700'
          "
          class="rounded-lg px-3 py-2 text-xs font-bold transition"
        >
          Laptop
        </button>


        <!-- DESKTOP -->
        <button
          @click="selectedCategory = 'Desktop'"
          :class="
            selectedCategory === 'Desktop'
              ? 'bg-green-600 text-white'
              : 'border border-slate-200 text-slate-500 hover:border-green-200 hover:bg-green-50 hover:text-green-700'
          "
          class="hidden rounded-lg px-3 py-2 text-xs font-bold transition sm:block"
        >
          Desktop
        </button>

      </div>

      <!-- <div class="bg-red-900">one</div> -->
    </div>






   <!-- ===================================================== -->
<!-- PRODUCT TABLE -->
<!-- ===================================================== -->
<div class="overflow-x-auto rounded-t-2xl border border-slate-200 bg-white shadow-sm h-117.5 overflow-y-scroll">
  <table class="w-full text-left text-sm text-slate-600">
    <thead class="bg-slate-50 text-xs font-bold uppercase text-slate-400 border-b border-slate-200 sticky top-0">
      <tr>
        <th scope="col" class="px-6 py-4">Product</th>
        <th scope="col" class="px-6 py-4">Category</th>
        <th scope="col" class="px-6 py-4">Specs (CPU / RAM / SSD)</th>
        <th scope="col" class="px-6 py-4 text-right">Cost Price</th>
        <th scope="col" class="px-6 py-4 text-right">Sale Price</th>
        <th scope="col" class="px-6 py-4 text-center">Status</th>
        <th scope="col" class="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y   divide-slate-100  ">
      <tr  v-for="product in filteredProducts"  :key="product.id"   class="transition hover:bg-slate-50/80">
        <!-- PRODUCT & IMAGE -->
        <td class="px-6 py-4 font-bold text-slate-800">
          <div class="flex items-center gap-3">
            <img :src="product.image"  :alt="product.name" 
              class="h-12 w-12 rounded-lg object-cover bg-slate-100 shrink-0"  />
            <span class="truncate max-w-xs" :title="product.name">
              {{ product.name }}
            </span>
          </div>
        </td>

        <!-- CATEGORY -->
        <td class="px-6 py-4">
          <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-green-700">
            {{ product.category }}
          </span>
        </td>

        <!-- SPECS -->
        <td class="px-6 py-4">
          <div class="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span class="rounded bg-slate-100 px-2 py-0.5">{{ product.cpu }}</span>
            <span class="rounded bg-slate-100 px-2 py-0.5">{{ product.ram }}</span>
            <span class="rounded bg-slate-100 px-2 py-0.5">{{ product.ssd }}</span>
          </div>
        </td>

        <!-- COST PRICE -->
        <td class="px-6 py-4 text-right font-semibold text-slate-500">
          ${{ product.costPrice.toLocaleString() }}
        </td>

        <!-- SALE PRICE -->
        <td class="px-6 py-4 text-right font-black text-green-600">
          ${{ product.salePrice.toLocaleString() }}
        </td>

        <!-- STATUS -->
        <td class="px-6 py-4 text-center">
          <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            ● In Stock
          </span>
        </td>

        <!-- ACTIONS -->
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button 
              @click="viewProduct(product)" 
              class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              View
            </button>
            <button 
              @click="editProduct(product)" 
              class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
            >
              Edit
            </button>
            <button 
              @click="deleteProduct(product)" 
              class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      <!-- EMPTY STATE -->
      <tr v-if="filteredProducts.length === 0">
        <td colspan="7" class="py-12 text-center">
          <div class="text-4xl">🔍</div>
          <h3 class="mt-2 text-base font-bold text-slate-700">No products found</h3>
          <p class="mt-0.5 text-xs text-slate-400">Try adjusting your search filter.</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>


<div class="fixed top-0 left-0 z-50 w-screen h-screen " v-if="web.viewAddProduct" >
  <AddProductToWeb/>
</div>

  </div>
</template>


<script >
import { web } from "../../sharing/Sharing.js";
import AddProductToWeb from "./addproduct/AddProductToWeb.vue";
import { computed, ref } from "vue";
export default{
  components:{AddProductToWeb},
  setup(){
const search = ref("");
const selectedCategory = ref("All");
const products = ref([
  {
    id: 1,
    name: "ASUS ROG Strix G16",
    category: "Gaming",
    cpu: "i7",
    ram: "16GB",
    ssd: "1TB",
    image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800",
    costPrice: 850,
    salePrice: 999,
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "Laptop",
    cpu: "M3",
    ram: "16GB",
    ssd: "512GB",
    image:"https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
    costPrice: 1200,
    salePrice: 1499,
  },
  
  {
    id: 2,

    name: "MacBook Pro M3",

    category: "Laptop",

    cpu: "M3",

    ram: "16GB",

    ssd: "512GB",

    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",

    costPrice: 1200,

    salePrice: 1499,
  },

  {
    id: 3,

    name: "Dell XPS 15",

    category: "Laptop",

    cpu: "i7",

    ram: "32GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800",

    costPrice: 900,

    salePrice: 1199,
  },

  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },
  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },
  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },
  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },
  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },
  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },
  {
    id: 4,

    name: "Lenovo Legion 5",

    category: "Gaming",

    cpu: "Ryzen 7",

    ram: "16GB",

    ssd: "1TB",

    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",

    costPrice: 780,

    salePrice: 949,
  },

  
]);


// =====================================================
// FILTER PRODUCTS
// =====================================================

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchCategory =
      selectedCategory.value === "All" ||
      product.category === selectedCategory.value;
    return matchSearch && matchCategory;
  });
});


// =====================================================
// TOTAL COST
// =====================================================

const totalCost = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.costPrice,
    0
  );
});


// =====================================================
// TOTAL PROFIT
// =====================================================

const totalProfit = computed(() => {
  return products.value.reduce(
    (total, product) =>
      total + (product.salePrice - product.costPrice),
    0
  );
});


// =====================================================
// IN STOCK
// =====================================================

const inStock = computed(() => {
  return products.value.length;
});


// =====================================================
// ADD PRODUCT
// =====================================================

const addProduct = () => {
  console.log("Add Product");

  // Later you can open your Add Product modal here.
};


// =====================================================
// VIEW PRODUCT
// =====================================================

const viewProduct = (product) => {
  console.log("View:", product);
};


// =====================================================
// EDIT PRODUCT
// =====================================================

const editProduct = (product) => {
  console.log("Edit:", product);
};


// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = (product) => {

  const confirmDelete = confirm(
    `Delete ${product.name}?`
  );

  if (!confirmDelete) {
    return;
  }

  products.value = products.value.filter(
    (item) => item.id !== product.id
  );
};


const testalert =()=>{
  alert(web.viewAddProduct = true)
 
}

return{
  search,
  selectedCategory,
  products,
  filteredProducts,
  totalCost,
  totalProfit,
  inStock,
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
  web,
  testalert


}

  }
}
</script>