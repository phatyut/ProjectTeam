<template>
  <div class="h-full flex flex-col gap-2 pt-1 relative">

    <!-- ================= TOAST NOTIFICATION (Auto-dismiss 2s) ================= -->
    <Transition
        enter-active-class="transform transition ease-out duration-300"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="toast.show" class="fixed top-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-lg z-50 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl border border-slate-100 w-auto">
            <div :class="toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold">
                {{ toast.type === 'success' ? '✓' : '✕' }}
            </div>
            <div class="flex-1">
                <h4 class="text-sm font-bold text-slate-800">{{ toast.title }}</h4>
                <p class="text-xs text-slate-500">{{ toast.message }}</p>
            </div>
            <button @click="toast.show = false" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>
    </Transition>

    <!-- ================= HEADER ================= -->
    <div class="overflow-hidden rounded-md bg-linear-to-r to-green-700 via-green-800 from-green-700 shadow-[0px_0px_3px]">
      <div class="flex flex-col gap-5 p-3 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl ring-1 ring-white/20">📦</div>
          <div>
            <h1 class="text-2xl font-bold text-white">Product Inventory</h1>
            <p class="mt-1 text-sm text-green-100">Manage your computer products and stock</p>
          </div>
        </div>

        <div class="flex gap-2.5">
          <button
            class="flex items-center justify-center bg-white/10 ring-1 ring-white/20 gap-2 rounded-xl px-5 py-3 font-bold text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl active:scale-95"
            @click="router.replace('/products/setoptionStock')"
          >
            Set Option
          </button>

          <button
            @click="showAdd = true"
            class="flex items-center justify-center bg-white/10 ring-1 ring-white/20 gap-2 rounded-xl px-5 py-3 font-bold text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl active:scale-95"
          >
            <span class="text-xl">＋</span>
            Add Product
          </button>
        </div>
      </div>
    </div>

    <!-- ================= MAIN CONTAINER ================= -->
    <div class="flex-1 flex flex-col rounded-md border border-slate-200 bg-white overflow-hidden">
      <!-- Search & Filter Header -->
      <div class="sticky top-0 px-5 py-3 bg-white rounded-md z-10 border-b border-slate-100">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <!-- Title -->
          <div>
            <h2 class="text-lg font-bold text-slate-800">All Products</h2>
            <p class="mt-0.5 text-xs text-slate-500">Showing {{ paginatedProducts.length }} of {{ filteredProducts.length }} products found</p>
          </div>

          <!-- Search + Filter -->
          <div class="flex flex-col gap-3 sm:flex-row">
            <div class="relative">
              <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                v-model="search"
                type="text"
                placeholder="Search name, code or ID..."
                class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 sm:w-64"
              />
            </div>

            <!-- Category -->
            <select
              v-model="categoryFilter"
              class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
              <option value="">All categories</option>
              <option v-for="item in category" :key="item._id" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div class="flex-1 w-full overflow-y-auto">
        <table class="w-full border-collapse">
          <!-- Header -->
          <thead>
            <tr class="border-b border-slate-200">
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Branch</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Cost Price</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Sale Price</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Stock</th>
              <th class="sticky top-0 bg-slate-100 px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr
              v-for="product in paginatedProducts"
              :key="product._id"
              class="border-b border-slate-100 transition hover:bg-slate-50 *:py-2"
            >
              <!-- Product -->
              <td class="px-5">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
                    <img
                      v-if="product.image"
                      :src="`http://localhost:2026/uploads/${product.image}`"
                      class="h-full w-full object-cover"
                    />
                    <span v-else class="text-xl">💻</span>
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-sm">{{ product.name }}</p>
                    <p class="text-[10px] text-slate-400">
                       <span class="uppercase">{{ product.productCode }}</span>
                    </p>
                  </div>
                </div>
              </td>

              <!-- Code -->
              <td class="px-2">
                <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  
                  {{ product._id?.slice(-8) }}
                </span>
              </td>

              <!-- Branch -->
              <td class="px-2">
                <div class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-green-500"></span>
                  <span class="text-sm text-slate-600">{{ product.branch }}</span>
                </div>
              </td>

              <!-- Category -->
              <td class="px-2">
                <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {{ product.category }}
                </span>
              </td>

              <!-- Cost -->
              <td class="px-2">
                <span class="font-semibold text-slate-600 text-sm">${{ product.costPrice }}</span>
              </td>

              <!-- Sale -->
              <td class="px-2">
                <span class="font-bold text-green-700 text-sm">${{ product.salePrice }}</span>
              </td>

              <!-- Stock -->
              <td class="px-2">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="stockClass(product.currentStock)"
                >
                  {{ product.currentStock ?? 0 }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-2">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editProduct(product)"
                    title="Edit Product"
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                  >
                    ✏️
                  </button>
                  <button
                    @click="promptDelete(product)"
                    title="Delete Product"
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-if="paginatedProducts.length === 0">
              <td colspan="8" class="px-6 py-16 text-center">
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">📦</div>
                <h3 class="mt-4 text-lg font-bold text-slate-700">No products found</h3>
                <p class="mt-1 text-sm text-slate-400">Try changing your search or category filter.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ================= PAGINATION FOOTER BAR ================= -->
      <div class="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3.5 text-sm sm:flex-row sm:items-center sm:justify-between shrink-0">
        <!-- Results info -->
        <p class="text-xs text-slate-500 font-medium">
          Showing <span class="font-bold text-slate-700">{{ paginationStart }}</span> to 
          <span class="font-bold text-slate-700">{{ paginationEnd }}</span> of 
          <span class="font-bold text-slate-700">{{ filteredProducts.length }}</span> results
        </p>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-2.5">
          <!-- Rows Per Page Selector -->
          <div class="relative inline-flex items-center">
            <select 
              v-model.number="itemsPerPage" 
              @change="currentPage = 1"
              class="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs font-semibold text-slate-700 shadow-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 cursor-pointer"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            <span class="pointer-events-none absolute right-2.5 text-xs text-slate-400">▼</span>
          </div>

          <!-- Prev Button -->
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-400 shadow-sm transition hover:bg-slate-50 hover:text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <!-- Numbered Page Buttons -->
          <template v-for="page in totalPages" :key="page">
            <button
              @click="currentPage = page"
              class="min-w-[36px] h-[36px] flex items-center justify-center rounded-xl text-xs font-bold transition shadow-sm"
              :class="currentPage === page ? 'bg-green-600 text-white shadow-green-600/20' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next Button -->
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-400 shadow-sm transition hover:bg-slate-50 hover:text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddProduct v-if="showAdd" @save="handleAdd" @cancel="showAdd = false" />
    <EditProduct
      v-if="selectedProduct"
      :product="selectedProduct"
      @save="handleEdit"
      @cancel="selectedProduct = null"
    />

    <!-- ================= MODERN DELETE CONFIRMATION MODAL ================= -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-center border border-slate-100 transform transition-all">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl mb-4">
          ⚠️
        </div>
        <h3 class="text-xl font-bold text-slate-800">Delete Product?</h3>
        <p class="mt-2 text-sm text-slate-500">
          Are you sure you want to delete <span class="font-semibold text-slate-700">{{ productToDelete?.name || 'this product' }}</span>? This action cannot be undone.
        </p>

        <div class="mt-6 flex gap-3 justify-center">
          <button
            type="button"
            @click="showDeleteModal = false"
            class="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="confirmDelete"
            class="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, computed, onMounted, inject, watch } from "vue";
import AddProduct from "./AddProduct.vue";
import EditProduct from "./EditProduct.vue";

export default {
  name: "Product",
  components: {
    AddProduct,
    EditProduct,
  },
  setup() {
    const apiproduct = "http://localhost:2026/api/products";
    const apicategory = "http://localhost:2026/api/category";
    const router = useRouter();

    const productCount = inject("productCount", null);

    const products = ref([]);
    const category = ref([]);
    const showAdd = ref(false);
    const selectedProduct = ref(null);
    const search = ref("");
    const categoryFilter = ref("");

    // Pagination states
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Modern Delete Modal State
    const showDeleteModal = ref(false);
    const productToDelete = ref(null);

    // Toast Alert State
    const toast = ref({
      show: false,
      type: "success",
      title: "",
      message: ""
    });

    const showToast = (title, message, type = "success") => {
      toast.value = { show: true, type, title, message };
      setTimeout(() => {
        toast.value.show = false;
      }, 2000); // Disappears after 2 seconds
    };

    const getProducts = async () => {
      try {
        const res = await axios.get(apiproduct);
        products.value = res.data.data || [];
      } catch (error) {
        console.error("Get products error:", error);
      }
    };

    const getCategory = async () => {
      try {
        const res = await axios.get(apicategory);
        category.value = res.data.data || [];
      } catch (error) {
        console.error("Get category error:", error);
      }
    };

    const filteredProducts = computed(() => {
      const searchText = search.value.toLowerCase().trim();
      return products.value.filter((product) => {
        const matchesSearch =
          !searchText ||
          product.name?.toLowerCase().includes(searchText) ||
          product.productCode?.toLowerCase().includes(searchText) ||
          product.category?.toLowerCase().includes(searchText) ||
          product._id?.toLowerCase().includes(searchText);
        const matchesCategory =
          !categoryFilter.value || product.category === categoryFilter.value;
        return matchesSearch && matchesCategory;
      });
    });

    // Reset pagination back to page 1 whenever search query or category filter changes
    watch([search, categoryFilter], () => {
      currentPage.value = 1;
    });

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1);

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredProducts.value.slice(start, end);
    });

    const paginationStart = computed(() => {
      if (filteredProducts.value.length === 0) return 0;
      return (currentPage.value - 1) * itemsPerPage.value + 1;
    });

    const paginationEnd = computed(() => {
      return Math.min(currentPage.value * itemsPerPage.value, filteredProducts.value.length);
    });

    const totalStock = computed(() =>
      products.value.reduce((total, p) => total + Number(p.currentStock || 0), 0)
    );

    const lowStock = computed(
      () =>
        products.value.filter((p) => {
          const s = Number(p.currentStock || 0);
          return s > 0 && s <= 5;
        }).length
    );

    const outOfStock = computed(
      () => products.value.filter((p) => Number(p.currentStock || 0) === 0).length
    );

    const stockClass = (stock) => {
      const s = Number(stock || 0);
      if (s === 0) return "bg-red-100 text-red-600";
      if (s <= 5) return "bg-amber-100 text-amber-700";
      return "bg-slate-100 text-slate-700";
    };

    const handleAdd = (newProduct) => {
      products.value.unshift(newProduct);
      showAdd.value = false;
      currentPage.value = 1;
    };

    const editProduct = (product) => {
      selectedProduct.value = { ...product };
    };

    const handleEdit = (updatedProduct) => {
      const index = products.value.findIndex((p) => p._id === updatedProduct._id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
      selectedProduct.value = null;
    };

    // ================= DELETE MODAL ACTIONS =================
    const promptDelete = (product) => {
      productToDelete.value = product;
      showDeleteModal.value = true;
    };

    const confirmDelete = async () => {
      if (!productToDelete.value) return;
      try {
        await axios.delete(`${apiproduct}/${productToDelete.value._id}`);
        products.value = products.value.filter((p) => p._id !== productToDelete.value._id);
        showDeleteModal.value = false;
        productToDelete.value = null;

        // Show success alert toast for 2 seconds
        showToast("Deleted Successfully", "The product has been removed.", "success");

        // If current page becomes empty after deletion, step back one page
        if (paginatedProducts.value.length === 0 && currentPage.value > 1) {
          currentPage.value--;
        }
      } catch (error) {
        console.error("Delete product error:", error);
        showToast("Delete Failed", "Could not delete the product.", "error");
      }
    };

    watch(
      filteredProducts,
      (newProducts) => {
        if (productCount) productCount.value = newProducts.length;
        if (currentPage.value > totalPages.value) {
          currentPage.value = totalPages.value || 1;
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      getProducts();
      getCategory();
    });

    return {
      router,
      products,
      category,
      showAdd,
      selectedProduct,
      search,
      categoryFilter,
      filteredProducts,
      paginatedProducts,
      currentPage,
      itemsPerPage,
      totalPages,
      paginationStart,
      paginationEnd,
      totalStock,
      lowStock,
      outOfStock,
      productCount,
      stockClass,
      handleAdd,
      editProduct,
      handleEdit,
      promptDelete,
      confirmDelete,
      showDeleteModal,
      productToDelete,
      toast,
    };
  },
};
</script>