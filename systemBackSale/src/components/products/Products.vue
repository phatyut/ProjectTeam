<template>
  <div class="h-full flex flex-col gap-2  pt-1 ">
<!-- bg-slate-50 -->
    <!-- ================= HEADER ================= -->
    <div class=" overflow-hidden rounded-md bg-linear-to-r to-green-700 via-green-800 from-green-700 shadow-[0px_0px_3px]">
      <div class="flex flex-col gap-5 p-3
                   md:flex-row md:items-center md:justify-between">

        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl ring-1 ring-white/20">📦</div>
          <div>
            <h1 class="text-2xl font-bold text-white">
              Product Inventory
            </h1>

            <p class="mt-1 text-sm text-green-100">
              Manage your computer products and stock
            </p>
          </div>
        </div>

        <!-- Add Button -->
        <button
                @click="showAdd = true"
                class="flex items-center justify-center   bg-white/10  ring-1 ring-white/20 gap-2 rounded-xl  px-5 py-3 font-bold text-white
                      shadow-lg transition hover:bg-green-50 hover:shadow-xl active:scale-95  " >
              <span class="text-xl">＋</span>
              Add Product
        </button>
      </div>
    </div>



<div  class="h-[568px] flex flex-col rounded-md border border-slate-200 bg-white  ">
  <div class=" sticky top-0 px-5 py-2 md:px-3 bg-white rounded-md">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" >
      <!-- Title -->
      <div>
          <h2 class="text-lg font-bold text-slate-800">
              All Products
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            {{ filteredProducts.length }} products found
          </p>
      </div>

      <!-- Search + Filter -->
      <div class="flex flex-col gap-3 sm:flex-row">
        <!-- Search -->
          <div class="relative">
            <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
            </span>
            <input
                    v-model="search" type="text" placeholder="Search product..."
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition
                          focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 sm:w-64"/>
          </div>
          <!-- Category -->
          <select
                    v-model="categoryFilter"
                    class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none
                          focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100">
                          
            <option value="">All Categories</option>
            <option value="Desktop">Desktop</option>
            <option value="Laptop">Laptop</option>
            <option value="Monitor">Monitor</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Mouse">Mouse</option>
            <option value="Accessories">Accessories</option>
          </select>

        </div>
    </div>
  </div>


  <div class="h-[568px] w-full  border border-slate-200 bg-white  overflow-y-scroll">
    <div class="">
      <table class=" w-full">
        <!-- Header -->
        <thead>
          <tr class="border-b border-slate-200  bg-slate-100 to-green-700 sticky top-0">
                <th  class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider  text-slate-500">
                  Product
                </th>
                <th  class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Code
                </th>
                <th class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cost
                </th>

                <th class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sale Price
                </th>

                <th class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Branch
                </th>

                <th class="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Stock
                </th>

                <th class="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>
          </tr>
        </thead>
        <!-- Body -->



        <tbody>
          <tr  v-for="product in filteredProducts"  :key="product._id"
            class="border-b border-slate-100  transition hover:bg-slate-50 *:py-2 ">
            <!-- Product -->
            <td class="px-3">
              <div class="flex items-center gap-4">
                <!-- Image -->
                <div  class="flex  shrink-0 items-center justify-center rounded-xl  border border-slate-200 bg-slate-100" >
                  <img
                        v-if="product.image"
                        :src="`http://localhost:2026/uploads/${product.image}`"
                        class="h-10 w-10 object-cover"/>

                  <span v-else class="text-2xl">
                     💻
                  </span>
                </div>

                <!-- Name -->
                <div >
                  <p class="font-bold text-slate-800" >
                    {{ product.name }}
                  </p>

                  <p class="mt-1 text-xs text-slate-400">
                    Product ID: {{ product._id?.slice(-6) }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-2">
              <span class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600" >
                  {{ product.productCode }}
              </span>
            </td>
            <!-- Category -->
            <td class="px-2 ">
                <span  class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                      {{ product.category }}
                </span>
            </td>
            <!-- Cost -->
            <td class="px-2 ">
              <span class="font-semibold text-slate-600">
                ${{ product.costPrice }}
              </span>
            </td>
            <!-- Sale -->
            <td class="px-2 ">
              <span class="font-bold text-green-700">
                ${{ product.salePrice }}
              </span>
            </td>
            <!-- Branch -->
            <td class="px-2 ">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span class="text-sm text-slate-600">
                  {{ product.branch }}
                </span>
              </div>
            </td>
            <!-- Stock -->
            <td class="px-2 ">
              <div class="flex items-center gap-3">
                <span
                    class="text-sm font-bold"
                    :class="{
                              'text-red-600': product.currentStock === 0,
                              'text-orange-600':
                                product.currentStock > 0 &&
                                product.currentStock <= 5,
                              'text-green-700':
                                product.currentStock > 5
                            }">
                      {{ product.currentStock }}
                </span>
                <span
                      v-if="product.currentStock === 0"
                      class="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-600" >
                           Out
                </span>
                <span
                         v-else-if="product.currentStock <= 5"
                          class="rounded-full bg-orange-100  px-2.5 py-1 text-[11px]  font-bold text-orange-600">
                                 Low
                </span>
                <span
                         v-else
                          class="rounded-full bg-green-100  px-2.5 py-1 text-[11px]  font-bold text-green-600">
                               In Stock
                </span>
              </div>
            </td>
            <!-- Actions -->
            <td class="px-2  ">
              <div class="flex justify-center gap-2">
                <!-- Edit -->
                <button  @click="editProduct(product)"
                          title="Edit Product"
                          class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600
                                transition hover:bg-blue-100 hover:text-blue-700" >
                                    ✏️
                </button>
                <!-- Delete -->
                <button
                          @click="deleteProduct(product._id)"
                          title="Delete Product"
                          class="flex h-9 w-9 items-center  justify-center rounded-lg bg-red-50 text-red-600
                                transition hover:bg-red-100 hover:text-red-700" >
                              🗑️
                </button>
              </div>
            </td>
          </tr>
          <!-- Empty -->
          <tr v-if="filteredProducts.length === 0">
            <td  colspan="8" class="px-6 py-16 text-center">
              <div
                class="mx-auto flex h-16 w-16 items-center justify-center
                       rounded-2xl bg-slate-100 text-3xl" >
                            📦
              </div>
              <h3 class="mt-4 text-lg font-bold text-slate-700">
                  No products found
              </h3>
              <p class="mt-1 text-sm text-slate-400">
                  Try changing your search or category filter.
              </p>
            </td>
          </tr>
        </tbody>


      </table>
    </div>
    <!-- Footer -->
  </div>
  <div
       class="flex flex-col gap-3 border-t border-slate-200 bg-slate-50
         px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
    <p class="text-slate-500">
      Showing
        <span class="font-bold text-slate-700">
          {{ filteredProducts.length }}
        </span>
      products
    </p>
    <p class="text-slate-400">
      Product Inventory Management
    </p>
  </div>
</div>
    <AddProduct  v-if="showAdd"  @save="handleAdd"  @cancel="showAdd = false"/>
    <EditProduct v-if="selectedProduct" :product="selectedProduct" @save="handleEdit"  @cancel="selectedProduct = null" />
  </div>
</template>


<script>
import axios from "axios";
import { ref, computed, onMounted,inject ,watch} from "vue";

import AddProduct from "./AddProduct.vue";
import EditProduct from "./EditProduct.vue";

export default {
  name: "Product",
  components: { AddProduct, EditProduct,},
  setup() {
    const productCount = inject("productCount");
    const products = ref([]);
    const showAdd = ref(false);
    const selectedProduct = ref(null);
    const search = ref("");
    const categoryFilter = ref("");

    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:2026/api/products");
                    products.value = res.data.data;
      } catch (error) {
          console.error("Get products error:", error);
      }
    };
    // ================= SEARCH =================
   const filteredProducts = computed(() => {
  return products.value.filter((product) => {

    const searchText = search.value.toLowerCase().trim();

    const matchesSearch =!searchText ||
      product.name?.toLowerCase().includes(searchText) ||
      product.productCode?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText);

    const matchesCategory =
      !categoryFilter.value ||
      product.category === categoryFilter.value;

    return matchesSearch && matchesCategory;
  });
});
    // ================= TOTAL STOCK =================
    const totalStock = computed(() => {
          return products.value.reduce( (total, product) => total + Number(product.currentStock || 0), 0 ); 
        });
    // ================= LOW STOCK =================
    const lowStock = computed(() => {
      return products.value.filter( product =>
          Number(product.currentStock || 0) > 0 &&
          Number(product.currentStock || 0) <= 5
      ).length;
    });
    // ================= OUT OF STOCK =================
    const outOfStock = computed(() => {
      return products.value.filter(
        product => Number(product.currentStock || 0) === 0 ).length;
    });
    // ================= ADD =================
    const handleAdd = (newProduct) => {
      products.value.push(newProduct);
      showAdd.value = false;
    };
    // ================= EDIT =================
    const editProduct = (product) => { selectedProduct.value = { ...product, }};
    const handleEdit = (updatedProduct) => {
      const index = products.value.findIndex( product => product._id === updatedProduct._id);
      if (index !== -1) {  products.value[index] = updatedProduct; }
      selectedProduct.value = null;
    };
    // ================= DELETE =================
    const deleteProduct = async (id) => {
      try {
            await axios.delete(`http://localhost:2026/api/products/${id}`);
        products.value = products.value.filter(product => product._id !== id);
      } catch (error) {
        console.error("Delete product error:", error);
      }
    };

   watch(filteredProducts,(newProducts) => {productCount.value = newProducts.length;},
  {
    immediate: true
  }
);
    onMounted(getProducts);
    
    return {
      products,
      showAdd,
      selectedProduct,
      search,
      categoryFilter,
      filteredProducts,
      totalStock,
      lowStock,
      outOfStock,
      productCount,

      handleAdd,
      editProduct,
      handleEdit,
      deleteProduct,

    };

  },
};
</script>