<template>
  <div class="h-full w-full bg-[#f6f8f7] px-2 pt-2 rounded-md ">
    <!-- testing and delete -->
    <div class="mb-6 flex flex-col   xl:flex-row xl:items-center xl:justify-between">
      <!-- TITLE -->
      <div class="flex items-center gap-3">
        <!-- LOGO -->
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-sm font-black text-white shadow-lg shadow-green-200">
          PC
        </div>
        <div>
          <h1 class="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
            Product Center 
          </h1>
          <p class="mt-0.5 text-xs text-slate-400 sm:text-sm">
            Manage the computers shown on your website
          </p>
        </div>
      </div>
     

      <!-- BUTTONS -->
      <div class="flex gap-2">
        <button
          class="flex w-fit items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#006B2D] via-[#168C20] to-[#7FCB0A] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
          @click="btnsetmore"
        >
          Set More
        </button>

        <button @click="AddItemsToWeb"
          class="group flex w-fit items-center gap-2 rounded-xl bg-gradient-to-br from-[#006B2D] via-[#168C20] to-[#7FCB0A] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          <span class="text-lg transition duration-300 group-hover:rotate-90">+</span>
          Add Product
        </button>
      </div>
    </div>

    <!-- SEARCH + FILTER -->
    <div class="mb-6 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div class="flex h-10 w-full items-center rounded-lg border border-slate-200 bg-slate-50 px-3 lg:max-w-md">
        <svg class="mr-2 h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
        <input
          v-model.trim="search"
          type="search"
          placeholder="Search computer..."
          class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
       <div>
        <p class="flex justify-center items-center text-green-700 font-bold"><span>{{ filteredProducts.length }}</span></p>
        <div class="text-gray-400 text-[14px]">Total items</div>
    
      </div>

      <!-- brand buttons come from the products themselves -->
        <div class="relative w-full sm:w-35">
            <select v-model="selectedBrand"  class="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-9 text-xs font-bold text-slate-600 transition hover:border-green-200 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
              <option v-for="b in brands" :key="b" :value="b">
                {{ b === 'All' ? 'All Products' : b }}
              </option>
            </select>

            <!-- custom arrow -->
            <svg
              class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
    </div>

    <!-- shows only when product images fail to load -->
    <p v-if="imageFailures" class="mb-3 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
      {{ imageFailures }} image(s) could not load. Open the image address from the browser console (F12) in a new tab
      to check that the server serves the /uploadsWebsite folder.
    </p>

    <!-- PRODUCT TABLE -->
    <div class="overflow-x-auto rounded-t-2xl border border-slate-200 bg-white shadow-sm h-117.5 overflow-y-scroll">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-xs font-bold uppercase text-slate-400 border-b border-slate-200 sticky top-0">
          <tr>
            <th scope="col" class="px-6 py-4">Product</th>
            <th scope="col" class="px-6 py-4">Specs (CPU / RAM / SSD)</th>
            <th scope="col" class="px-6 py-4 text-right">Sale Price</th>
            <th scope="col" class="px-6 py-4 text-center">Deals</th>
            <th scope="col" class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="5" class="py-12 text-center text-slate-400">Loading...</td>
          </tr>

          <tr v-else-if="errorMsg">
            <td colspan="5" class="py-12 text-center text-red-600">{{ errorMsg }}</td>
          </tr>

          <template v-else>
            <tr v-for="product in filteredProducts" :key="product._id" class="transition hover:bg-slate-50/80">
              <!-- PRODUCT & IMAGE -->
              <td class="px-6 py-4 font-bold text-slate-800">
                <div class="flex items-center gap-3">
                  <img
                    :src="imageOf(product.image, product.updatedAt)"
                    :alt="product.title"
                    class="h-12 w-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    @error="onImgError"
                  />
                  <div class="min-w-0">
                    <span class="block truncate max-w-xs" :title="product.title">{{ product.title }}</span>
                    <span class="block truncate text-xs font-normal text-slate-400">{{ brandModel(product) }}</span>
                  </div>
                </div>
              </td>

              <!-- SPECS -->
              <td class="px-6 py-4">
                <div class="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-600">
                  <span class="rounded bg-slate-100 px-2 py-0.5">{{ product.cpu }}</span>
                  <span class="rounded bg-slate-100 px-2 py-0.5">{{ product.ram }}</span>
                  <span class="rounded bg-slate-100 px-2 py-0.5">{{ ssdLabel(product.ssd) }}</span>
                </div>
              </td>

              <!-- SALE PRICE -->
              <td class="px-6 py-4 text-right font-black text-green-600">
                ${{ money(product.salePrice) }}
              </td>

              <!-- DEALS -->
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {{ product.deals }}
                </span>
                <p v-if="dealEnd(product)" class="mt-1 text-xs" :class="dealEnd(product).over ? 'text-red-500' : 'text-slate-400'">
                  {{ dealEnd(product).over ? 'Ended' : 'Ends' }} {{ dealEnd(product).text }}
                </p>
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
              <td colspan="5" class="py-12 text-center">
                <div class="text-4xl">🔍</div>
                <h3 class="mt-2 text-base font-bold text-slate-700">No products found</h3>
                <p class="mt-0.5 text-xs text-slate-400">Try adjusting your search filter or add a product.</p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- VIEW WINDOW -->
    <div
      v-if="selected"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-green-950/60 p-4 backdrop-blur-sm"
      @click.self="selected = null"
    >
      <div class="relative my-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl" role="dialog" aria-modal="true" :aria-label="selected.title">
        <div class="relative flex h-60 items-center justify-center bg-slate-100 p-6">
          <img :src="imageOf(selected.image, selected.updatedAt)" alt="" class="h-full w-full object-contain" @error="onImgError" />
          <span class="absolute left-4 top-4 rounded-full bg-green-900 px-3 py-1 text-sm font-medium text-white">{{ selected.brand }}</span>
          <button
            type="button"
            class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow ring-1 ring-slate-200 hover:text-red-600"
            aria-label="Close"
            @click="selected = null"
          >
            <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg>
          </button>
        </div>

        <div class="flex flex-col gap-4 p-6">
          <div>
            <h2 class="text-2xl font-bold leading-tight text-slate-900">{{ selected.title }}</h2>
            <p class="text-slate-500">{{ brandModel(selected) }}</p>
          </div>

          <p v-if="selected.description" class="text-sm text-slate-600">{{ selected.description }}</p>

          <dl class="grid grid-cols-3 gap-3 text-sm">
            <div class="rounded-xl border border-slate-200 px-3 py-2"><dt class="text-xs text-slate-500">CPU</dt><dd class="truncate font-semibold" :title="selected.cpu">{{ selected.cpu }}</dd></div>
            <div class="rounded-xl border border-slate-200 px-3 py-2"><dt class="text-xs text-slate-500">RAM</dt><dd class="truncate font-semibold">{{ selected.ram }}</dd></div>
            <div class="rounded-xl border border-slate-200 px-3 py-2"><dt class="text-xs text-slate-500">SSD</dt><dd class="truncate font-semibold">{{ ssdLabel(selected.ssd) }}</dd></div>
          </dl>
        </div>

        <div class="flex items-center justify-between bg-green-900 px-6 py-5 text-white">
          <div>
            <p class="text-sm text-green-200">Sale price</p>
            <p class="text-3xl font-bold">${{ money(selected.salePrice) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-green-200">Deals</p>
            <p class="text-lg font-semibold">{{ selected.deals }}</p>
            <p v-if="dealEnd(selected)" class="text-xs text-green-300">{{ dealEnd(selected).over ? 'Ended' : 'Ends' }} {{ dealEnd(selected).text }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { computed, ref, onMounted, onBeforeUnmount,watch,inject } from "vue";

const API = "http://localhost:2026/api/web";

// multer saves website product images in  backend/public/uploadsWebsite  (DB stores the filename only)
const IMG_BASE = "http://localhost:2026/uploadsWebsite/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
  setup() {
    const router = useRouter();
    const products = ref([]);
    const loading = ref(false);
    const errorMsg = ref("");
    const search = ref("");
    const selectedBrand = ref("All");
    const selected = ref(null); // product shown in the view window
    const imageFailures = ref(0); // how many product images failed to load
    const webCount = inject("webCount")

    // ---- load from database ----
    const getProducts = async () => {
      loading.value = true;
      errorMsg.value = "";
      try {
        const res = await axios.get(API);
        products.value = res.data.data || [];
      } catch (error) {
        console.error("Get website error:", error);
        errorMsg.value = error.response?.data?.message || error.message;
      } finally {
        loading.value = false;
      }
    };
    onMounted(getProducts);

    // brand buttons come from the products themselves
    const brands = computed(() => [
      "All",
      ...new Set(products.value.map((p) => p.brand).filter(Boolean)),
    ]);

    // ---- search + brand filter ----
    const filteredProducts = computed(() => {
      const q = search.value.toLowerCase();
      return products.value.filter((p) => {
        const matchBrand = selectedBrand.value === "All" || p.brand === selectedBrand.value;
        const matchSearch =
          !q ||
          [p.title, p.brand, p.model, p.cpu, p.ram, p.description].some((v) =>
            v?.toLowerCase().includes(q)
          );
        return matchBrand && matchSearch;
      });
    });

    // ---- helpers ----
    // "version" (updatedAt) is added to the address, so a changed product never shows a cached old picture
    const imageOf = (image, version) => {
      if (!image) return FALLBACK;
      if (/^https?:\/\//.test(image)) return image;   // already a full URL
      const url = IMG_BASE + image.split(/[\\/]/).pop(); // drops any folder prefix
      return version ? `${url}?v=${new Date(version).getTime()}` : url;
    };

    // show the fallback if an image fails (only once, to avoid a loop)
    const onImgError = (e) => {
      if (e.target.src.endsWith(FALLBACK)) return;
      console.log("image failed:", e.target.src);
      imageFailures.value++;
      e.target.src = FALLBACK;
    };

    const money = (n) => Number(n || 0).toLocaleString();

    const brandModel = (p) => [p.brand, p.model].filter(Boolean).join(" ");

    // ssd is stored as a number of GB: 256 -> "256 GB", 1024 -> "1 TB"
    const ssdLabel = (gb) => {
      const n = Number(gb);
      if (!n) return "-";
      return n >= 1024 && n % 1024 === 0 ? `${n / 1024} TB` : `${n} GB`;
    };

    // when the deal ends (null when no end date is set)
    const dealEnd = (p) => {
      if (!p.timeOfDeals) return null;
      const d = new Date(p.timeOfDeals);
      return { text: d.toLocaleDateString(), over: d < new Date() };
    };

    // ---- actions ----
    const btnsetmore = () => router.replace("/website/setmore");
    const AddItemsToWeb = () => router.push("/website/addProductToWeb");

    const viewProduct = (product) => {
      selected.value = product;
    };

    const editProduct = (product) => {
      router.push({ path: "/website/addProductToWeb", query: { id: product._id } });
    };

    const deleteProduct = async (product) => {
      if (!confirm(`Delete ${product.title}?`)) return;
      try {
        await axios.delete(`${API}/${product._id}`);
        products.value = products.value.filter((p) => p._id !== product._id);
      } catch (error) {
        alert(error.response?.data?.message || "Delete failed.");
      }
    };

    // Esc closes the view window
    const onKey = (e) => {
      if (e.key === "Escape") selected.value = null;
    };
    onMounted(() => window.addEventListener("keydown", onKey));
    onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
    watch(filteredProducts,(countWeb)=>{webCount.value = countWeb.length})

    return {
      router,
      search,
      selectedBrand,
      brands,
      filteredProducts,
      loading,
      errorMsg,
      selected,
      imageFailures,
      imageOf,
      onImgError,
      money,
      brandModel,
      ssdLabel,
      dealEnd,
      btnsetmore,
      AddItemsToWeb,
      viewProduct,
      editProduct,
      deleteProduct,
    };
  },
};
</script>