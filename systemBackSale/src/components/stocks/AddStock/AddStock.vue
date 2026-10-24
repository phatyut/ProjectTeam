<template>
  <div class="w-screen fixed top-0 left-0 z-40 overflow-y-scroll h-screen bg-slate-50/95 py-8 px-4">
    <div class="max-w-4xl mx-auto">

      <!-- Header banner -->
      <div class="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 px-8 py-8 text-white">
        <div class="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10"></div>
        <div class="absolute right-20 -bottom-16 w-40 h-40 rounded-full bg-white/10"></div>
        <router-link to="/stocks"
          class="relative text-sm text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-arrow-left" /> Back
        </router-link>
        <div class="relative flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
            <font-awesome-icon icon="fa-solid fa-warehouse" />
          </div>
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight">Add New Stock</h1>
            <p class="text-white/80 text-sm">Record inventory for a product batch</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit"
        class="bg-white rounded-b-3xl shadow-xl px-8 pt-8 pb-28 space-y-9 relative">

        <!-- 1. Product -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">1</span>
            <h2 class="text-lg font-bold text-slate-800">Product</h2>
          </div>
          <div class="grid sm:grid-cols-1 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Product ID (Full or Last 8 Chars) / Name</label>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="onSearchInput"
                  required
                  placeholder="e.g. ID/Name fom Product"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition font-mono"
                />
                <button
                  type="button"
                  @click="checkProductId"
                  class="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition shrink-0 border border-slate-200">
                  Check
                </button>
              </div>

              <!-- Validation Feedback Message -->
              <p v-if="productStatus === 'ok'" class="text-xs font-medium text-emerald-600 mt-1.5 flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-circle-check" /> Product matched: <strong>{{ matchedProduct?.name || matchedProduct?.model }}</strong>
              </p>
              <p v-else-if="productStatus === 'no'" class="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-circle-xmark" /> Product does not exist in the database.
              </p>
              <p v-else-if="productStatus === 'multiple'" class="text-xs font-medium text-amber-600 mt-1.5 flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                {{ candidates.length }} products match. Pick one below (or paste the full ID).
              </p>

              <!-- Several matches: user must pick exactly one -->
              <div v-if="productStatus === 'multiple'" class="mt-3 max-h-64 overflow-y-auto rounded-xl border border-amber-200 bg-amber-50/50 divide-y divide-amber-100">
                <button
                  v-for="c in candidates"
                  :key="c._id"
                  type="button"
                  @click="selectCandidate(c)"
                  class="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-amber-100/60 transition"
                >
                  <img v-if="imageUrl(c.image)" :src="imageUrl(c.image)" alt="" class="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-white" />
                  <div v-else class="w-10 h-10 rounded-lg bg-slate-100 text-emerald-700 font-bold flex items-center justify-center">
                    {{ String(c.name || c.model || 'P').charAt(0).toUpperCase() }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-slate-800 truncate">{{ c.name || c.model }}</p>
                    <p class="text-[11px] text-slate-500 truncate">
                      {{ c.category }} · ${{ c.salePrice }}
                      <span v-if="c.productCode"> · Code: {{ c.productCode }}</span>
                    </p>
                  </div>
                  <span class="text-[11px] font-mono text-slate-400 shrink-0">…{{ String(c._id).slice(-8) }}</span>
                </button>
              </div>

              <!-- Display matched product details if available -->
              <div v-if="productStatus === 'ok' && matchedProduct" class="mt-3 flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                <img v-if="matchedProductImage" :src="matchedProductImage" alt="Product Image" class="w-16 h-16 object-cover rounded-lg border border-slate-200 bg-white" />
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-slate-700 truncate">Name: {{ matchedProduct.name || matchedProduct.model }} </p>
                  <p class="text-[11px] text-slate-500 truncate">
                    Category: <span class="font-medium text-slate-700">{{ matchedProduct.category }}</span>
                  </p>
                  <p class="text-[11px] text-emerald-600 font-medium">Full ID: {{ matchedProduct._id }}</p>
                  <p class="text-[11px] text-emerald-600 font-medium">Sale Price: ${{ matchedProduct.salePrice }}</p>
                </div>
              </div>

              <!-- Already in stock warning -->
              <div v-if="productStatus === 'ok' && existingStocks.length"
                class="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p class="text-sm font-semibold text-amber-700 flex items-center gap-2">
                  <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                  Already in stock: this product has {{ existingStocks.length }}
                  {{ existingStocks.length === 1 ? "batch" : "batches" }}.
                </p>
                <ul class="mt-2 space-y-1">
                  <li v-for="s in existingStocks" :key="s._id"
                    class="text-xs text-amber-800 flex flex-wrap gap-x-3">
                    <span class="font-mono font-semibold">Batch: {{ s.batchId }}</span>
                    <span>Qty: {{ s.quantity }}</span>
                    <span>Location: {{ s.location }}</span>
                    <span>{{ s.status }}</span>
                  </li>
                </ul>
                <p class="mt-2 text-[11px] text-amber-700">
                  You can still add a new batch with a different Batch ID.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Storage -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">2</span>
            <h2 class="text-lg font-bold text-slate-800">Storage</h2>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">StockID (Batch ID)</label>
              <input type="text" v-model="form.batchId" required placeholder="e.g. B-2026-001"
                :class="batchDuplicate ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-emerald-600 focus:ring-emerald-200'"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition" />
              <p v-if="batchDuplicate" class="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-circle-xmark" />
                This product already has Batch ID "{{ form.batchId }}" in stock.
              </p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Location</label>
              <input type="text" v-model="form.location" list="locationList" required
                autocomplete="off" placeholder="e.g. Warehouse A - Shelf 3"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
              <datalist id="locationList">
                <option v-for="loc in locationList" :key="loc" :value="loc" />
              </datalist>
            </div>
          </div>
        </section>

        <!-- 3. Status & quantity -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">3</span>
            <h2 class="text-lg font-bold text-slate-800">Status &amp; quantity</h2>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Quantity</label>
              <input type="number" v-model.number="form.quantity" min="0" required placeholder="0"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
            </div>

            <div>
              <div class="flex items-center gap-3">
                <label class="block text-sm font-semibold text-slate-600 mb-1.5">Status</label>
              </div>

              <div class="relative">
                <select
                  v-model="form.status"
                  required
                  class="w-full appearance-none rounded-xl bg-white border border-slate-200 py-3.5 pl-4 pr-12
                        text-sm font-semibold text-slate-700 outline-none transition cursor-pointer shadow-sm
                        hover:border-emerald-400 hover:bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="" disabled class="text-slate-400 py-3">Select status</option>
                  <option value="In Stock" class="py-2 text-slate-700">🟢 In Stock</option>
                  <option value="Low Stock" class="py-2 text-slate-700">🟡 Low Stock</option>
                  <option value="Out of Stock" class="py-2 text-slate-700" :disabled="islowquantity">🔴 Out of Stock</option>
                  <option value="Reserved" class="py-2 text-slate-700">🔵 Reserved</option>
                  <option value="Damaged" class="py-2 text-slate-700">🟠 Damaged</option>
                </select>

                <!-- Chevron Icon -->
                <svg
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none transition-transform"
                  fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <p v-if="islowquantity" class="text-xs text-slate-500 mt-1.5">
                Out of Stock is disabled because quantity is above 0.
              </p>
            </div>
          </div>
        </section>

        <!-- Action bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 rounded-b-3xl px-8 py-4 flex items-center justify-end gap-3">
          <router-link to="/stocks"
            class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-50">
            Cancel
          </router-link>
          <button type="submit" :disabled="loading || productStatus !== 'ok' || batchDuplicate"
            class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30">
            <font-awesome-icon :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-floppy-disk'" :spin="loading" />
            {{ loading ? "Saving..." : "Save stock" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const LOCATION_KEY = "savedStockLocations";
const API = "http://localhost:2026";

export default {
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const searchQuery = ref("");
    // null | "ok" | "no" | "multiple"
    const productStatus = ref(null);
    const matchedProduct = ref(null);
    const candidates = ref([]);
    // stock rows that already exist for the matched product
    const existingStocks = ref([]);

    const form = ref({
      batchId: "",
      location: "",
      quantity: "",
      status: "",
    });

    /* ---------- quantity rule for the "Out of Stock" option ---------- */

    // true  => quantity is above 0, so the Out of Stock option is disabled
    // false => quantity is 0 or empty, so it is enabled
    const islowquantity = computed(() => Number(form.value.quantity) > 0);

    // if Out of Stock was selected and the option becomes disabled, clear it
    watch(islowquantity, (disabled) => {
      if (disabled && form.value.status === "Out of Stock") {
        form.value.status = "";
      }
    });

    /* ---------- helpers ---------- */

    // lowercase, trim, collapse repeated inner spaces
    const norm = (v) =>
      (v ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ");

    // return ALL products that match, strongest rule first
    const findMatches = (rows, input) => {
      const q = norm(input);
      if (!q) return [];

      // 1. full ID is unique by definition
      const byFullId = rows.filter((p) => norm(p._id) === q);
      if (byFullId.length) return byFullId;

      // 2. other exact matches (last 8 of ID, code, last 8 of code, name, model)
      const exact = rows.filter((p) => {
        const id = norm(p._id);
        const code = norm(p.productCode);
        return (
          id.slice(-8) === q ||
          code === q ||
          (code && code.slice(-8) === q) ||
          norm(p.name) === q ||
          norm(p.model) === q
        );
      });
      if (exact.length) return exact;

      // 3. partial match on name / model
      return rows.filter(
        (p) => norm(p.name).includes(q) || norm(p.model).includes(q)
      );
    };

    // fetch products once and reuse
    let productsCache = null;
    const getProducts = async (force = false) => {
      if (productsCache && !force) return productsCache;
      const res = await axios.get(`${API}/api/products`);
      productsCache = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.products || [];
      return productsCache;
    };

    const imageUrl = (rawImg) => {
      if (!rawImg) return "";
      if (rawImg.startsWith("http") || rawImg.startsWith("blob")) return rawImg;
      if (rawImg.startsWith("/uploads")) return `${API}${rawImg}`;
      return `${API}/uploads/${rawImg}`;
    };

    /* ---------- "already in stock" check ---------- */

    // product may be a plain ID or a populated object
    const stockProductId = (s) => (s.product?._id || s.product || "").toString();

    // always fetch fresh so the answer is current
    const loadExistingStock = async (product) => {
      if (!product) {
        existingStocks.value = [];
        return;
      }
      try {
        const res = await axios.get(`${API}/api/stocks`);
        const rows = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.stocks || [];
        existingStocks.value = rows.filter(
          (s) => stockProductId(s) === product._id.toString()
        );
      } catch (error) {
        console.error("Error checking existing stock:", error);
        existingStocks.value = [];
      }
    };

    // same product + same Batch ID is a true duplicate
    const batchDuplicate = computed(() => {
      const b = norm(form.value.batchId);
      return !!b && existingStocks.value.some((s) => norm(s.batchId) === b);
    });

    /* ---------- product lookup ---------- */

    const resetMatch = () => {
      productStatus.value = null;
      matchedProduct.value = null;
      candidates.value = [];
      existingStocks.value = [];
    };

    const setMatched = async (product) => {
      productStatus.value = "ok";
      matchedProduct.value = product;
      candidates.value = [];
      await loadExistingStock(product);
    };

    const resolveProduct = async () => {
      const inputVal = searchQuery.value;
      if (!norm(inputVal)) {
        resetMatch();
        return;
      }

      try {
        let rows = await getProducts();
        let found = findMatches(rows, inputVal);

        // nothing in cache? the product may have been added recently, so refetch once
        if (!found.length) {
          rows = await getProducts(true);
          found = findMatches(rows, inputVal);
        }

        if (found.length === 1) {
          await setMatched(found[0]);
        } else if (found.length > 1) {
          productStatus.value = "multiple"; // user must choose one
          matchedProduct.value = null;
          candidates.value = found;
          existingStocks.value = [];
        } else {
          productStatus.value = "no";
          matchedProduct.value = null;
          candidates.value = [];
          existingStocks.value = [];
        }
      } catch (error) {
        console.error("Error validating product:", error);
        resetMatch();
        productStatus.value = "no";
      }
    };

    // user picked one product from the list
    const selectCandidate = async (product) => {
      searchQuery.value = product._id; // full ID is unique, so re-checking gives the same product
      await setMatched(product);
    };

    // "Check" button: run immediately
    const checkProductId = () => resolveProduct();

    // typing: clear the old match right away, then re-check after 300ms
    let debounceTimer = null;
    const onSearchInput = () => {
      resetMatch();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(resolveProduct, 300);
    };

    const matchedProductImage = computed(() =>
      matchedProduct.value ? imageUrl(matchedProduct.value.image || "") : ""
    );

    /* ---------- saved locations ---------- */

    const loadLocations = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(LOCATION_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
      } catch {
        return [];
      }
    };

    const locationList = ref(loadLocations());

    const rememberLocation = (value) => {
      const v = (value || "").toString().trim();
      if (!v) return;
      const exists = locationList.value.some(
        (l) => l.toLowerCase() === v.toLowerCase()
      );
      if (exists) return;

      locationList.value.push(v);
      try {
        localStorage.setItem(LOCATION_KEY, JSON.stringify(locationList.value));
      } catch {}
    };

    /* ---------- submit ---------- */

    const submit = async () => {
      clearTimeout(debounceTimer);

      // if not matched yet, try to resolve from the typed text
      if (productStatus.value !== "ok" || !matchedProduct.value) {
        if (!norm(searchQuery.value)) {
          alert("Please enter a valid product ID or name.");
          return;
        }
        await resolveProduct();
      }

      if (productStatus.value === "multiple") {
        alert("More than one product matches. Please pick one from the list.");
        return;
      }

      // final check
      if (productStatus.value !== "ok" || !matchedProduct.value) {
        alert(
          "Please enter a valid product ID or name that exists in the database and click 'Check'."
        );
        return;
      }

      // Out of Stock is not allowed while quantity is above 0
      if (islowquantity.value && form.value.status === "Out of Stock") {
        alert("Out of Stock is not allowed when quantity is above 0.");
        return;
      }

      // re-check stock right before saving, in case someone else just added it
      await loadExistingStock(matchedProduct.value);
      if (batchDuplicate.value) {
        alert(`This product already has Batch ID "${form.value.batchId}" in stock.`);
        return;
      }

      const payload = {
        product: matchedProduct.value._id,
        name:
          matchedProduct.value.name ||
          matchedProduct.value.model ||
          "Unnamed Product",
        category: matchedProduct.value.category || "General",
        salePrice:
          matchedProduct.value.salePrice || matchedProduct.value.price || 0,
        batchId: form.value.batchId,
        location: form.value.location,
        quantity: Number(form.value.quantity),
        status: form.value.status,
      };

      loading.value = true;
      try {
        await axios.post(`${API}/api/stocks`, payload);
        rememberLocation(form.value.location);
        router.replace("/stocks");
      } catch (err) {
        alert(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Server error"
        );
      } finally {
        loading.value = false;
      }
    };

    return {
      submit,
      islowquantity,
      loading,
      searchQuery,
      productStatus,
      matchedProduct,
      matchedProductImage,
      candidates,
      existingStocks,
      batchDuplicate,
      selectCandidate,
      imageUrl,
      checkProductId,
      onSearchInput,
      locationList,
      form,
    };
  },
};
</script>