<template>
  <div class="fixed inset-0 z-50 overflow-y-scroll bg-slate-100/80 backdrop-blur-sm p-4 sm:p-8">
    <div class="w-[70%] mx-auto shadow-2xl rounded-3xl bg-white overflow-hidden my-4 border border-slate-200/60">
      
      <!-- Header Banner Matching Reference -->
      <div class="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 px-8 py-8 text-white">
        <div class="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none"></div>
        <div class="absolute right-20 -bottom-16 w-40 h-40 rounded-full bg-white/10 pointer-events-none"></div>
        
        <button
          type="button"
          @click="$emit('cancel')"
          class="relative text-sm text-white/80 hover:text-white mb-4 inline-flex items-center gap-2 transition"
        >
          ← Back
        </button>

        <div class="relative flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl shadow-sm border border-white/20">
              📦
            </div>
            <div>
              <h1 class="text-3xl font-extrabold tracking-tight">Add New Product</h1>
              <p class="text-white/80 text-sm mt-0.5">Register a new product item to your inventory</p>
            </div>
          </div>
          <button
            type="button"
            @click="$emit('cancel')"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-lg"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- ================= FORM ================= -->
      <form @submit.prevent="save" class="bg-white px-8 pt-8 pb-24 space-y-9 relative">
        
        <!-- 1. Product Information -->
        <section>
          <div class="flex items-center gap-3 mb-5">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-sm">1</span>
            <h2 class="text-lg font-bold text-slate-800">Product Information</h2>
          </div>
          
          <div class="grid sm:grid-cols-2 gap-5">
            <!-- Product Name -->
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Product Name</label>
              <input
                v-model.trim="newProduct.name"
                type="text"
                required
                placeholder="e.g. ASUS ROG Strix G16"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition"
              />
            </div>

            <!-- Model / Product Code -->
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Model</label>
              <select
                v-model="newProduct.productCode"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition"
              >
                <option value="" disabled>Select model code</option>
                <option v-for="item in productCodes" :key="item._id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-5 mt-5">
            <!-- Category -->
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Category</label>
              <select
                v-model="newProduct.category"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition"
              >
                <option value="" disabled>Select category</option>
                <option v-for="item in category" :key="item._id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <!-- Branch (Custom Autocomplete Dropdown) -->
            <div class="relative branch-wrapper">
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Branch</label>
              <input
                v-model.trim="branchSearch"
                @focus="showBranch = true"
                @input="filterBranch"
                id="branch"
                name="branch"
                type="text"
                required
                autocomplete="off"
                placeholder="e.g. Dell"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition"
              />
              <!-- Custom Dropdown List -->
              <div
                v-if="showBranch && filteredBranches.length > 0"
                class="absolute left-0 right-0 z-30 mt-1 max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl py-1"
              >
                <div
                  v-for="(b, index) in filteredBranches"
                  :key="index"
                  @click="selectBranch(b)"
                  class="cursor-pointer px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition"
                >
                  {{ b }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Pricing & Stock -->
        <section>
          <div class="flex items-center gap-3 mb-5">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-sm">2</span>
            <h2 class="text-lg font-bold text-slate-800">Pricing &amp; Cost</h2>
          </div>

          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Cost Price</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                <input
                  v-model.number="newProduct.costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                  class="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Sale Price</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                <input
                  v-model.number="newProduct.salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                  class="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Image Upload (Matching exact dashed layout) -->
        <section>
          <div class="flex items-center gap-3 mb-5">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-sm">3</span>
            <h2 class="text-lg font-bold text-slate-800">
              Image <span class="text-slate-400 text-sm font-normal">(optional)</span>
            </h2>
          </div>

          <label class="flex items-center gap-5 cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 p-5 transition">
            <div class="w-24 h-24 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" />
              <span v-else class="text-3xl">📷</span>
            </div>
            <div class="min-w-0">
              <p class="font-semibold text-slate-700">Click to upload an image</p>
              <p class="text-xs text-slate-400 mt-1">PNG, JPG, GIF or WEBP, up to 5 MB</p>
              <p v-if="fileName" class="mt-1 truncate text-xs font-medium text-emerald-700">{{ fileName }}</p>
            </div>
            <input type="file" accept="image/*" class="sr-only" @change="handleFileUpload" />
          </label>
        </section>

        <!-- Error notification -->
        <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
          {{ error }}
        </p>

        <!-- Fixed Bottom Action Bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 rounded-b-3xl px-8 py-4 flex items-center justify-between gap-3 shadow-lg">
          <!-- <button
            type="button"
            @click="promptDelete"
            class="px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition active:scale-95"
          >
            Delete Item
          </button> -->

          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="$emit('cancel')"
              class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60 inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-95"
            >
              <span>{{ saving ? "⏳" : "✓" }}</span>
              {{ saving ? "Saving..." : "Save Product" }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- ================= MODERN DELETE CONFIRMATION MODAL ================= -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 text-center border border-slate-100 transform transition-all">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 text-3xl mb-4 shadow-inner">
          🗑️
        </div>
        <h3 class="text-xl font-extrabold text-slate-800">Delete Product?</h3>
        <p class="mt-2 text-sm text-slate-500 leading-relaxed">
          Are you sure you want to delete <span class="font-bold text-slate-700">{{ newProduct.name || 'this item' }}</span>? This action cannot be undone.
        </p>

        <div class="mt-6 flex gap-3">
          <button
            type="button"
            @click="showDeleteModal = false"
            class="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 active:scale-95 shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="confirmDelete"
            class="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "AddProduct",
  emits: ["save", "cancel", "delete"],
  setup(props, { emit }) {
    const api = "http://localhost:2026/api/category";
    const apiproductCode = "http://localhost:2026/api/setproductcode";
    
    const category = ref([]);
    const productCodes = ref([]);
    const error = ref("");

    const BRANCH_KEY = "savedProductBranches";
    const loadBranches = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(BRANCH_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
      } catch {
        return [];
      }
    };

    // Branch dropdown state
    const branchSearch = ref("");
    const showBranch = ref(false);
    const branchList = ref(loadBranches());
    const filteredBranches = ref(branchList.value);

    const filterBranch = () => {
      showBranch.value = true;
      filteredBranches.value = branchList.value.filter((b) =>
        b.toLowerCase().includes(branchSearch.value.toLowerCase())
      );
    };

    const selectBranch = (b) => {
      branchSearch.value = b;
      newProduct.value.branch = b;
      showBranch.value = false;
    };

    const rememberBranch = (value) => {
      const v = (value || "").toString().trim();
      if (!v) return;
      const exists = branchList.value.some((l) => l.toLowerCase() === v.toLowerCase());
      if (exists) return;
      branchList.value.push(v);
      try {
        localStorage.setItem(BRANCH_KEY, JSON.stringify(branchList.value));
      } catch {
        // Storage unavailable
      }
    };

    // Modern Delete Modal State
    const showDeleteModal = ref(false);

    const promptDelete = () => {
      showDeleteModal.value = true;
    };

    const confirmDelete = () => {
      showDeleteModal.value = false;
      emit("delete", newProduct.value);
    };

    // Click outside to close custom dropdown
    const handleClickOutside = (event) => {
      if (!event.target.closest(".branch-wrapper")) {
        showBranch.value = false;
      }
    };

    const dbCategories = async () => {
      try {
        const resdata = await axios.get(api);
        category.value = resdata.data.data || [];
      } catch (e) {
        console.error(e);
        error.value = "Failed to load categories.";
      }
    };

    const dbProductCodes = async () => {
      try {
        const resdata = await axios.get(apiproductCode);
        productCodes.value = resdata.data.data || [];
      } catch (e) {
        console.error(e);
        error.value = "Failed to load product codes.";
      }
    };

    onMounted(() => {
      dbCategories();
      dbProductCodes();
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const newProduct = ref({
      name: "",
      productCode: "",
      category: "",
      costPrice: 0,
      salePrice: 0,
      branch: "",
      currentStock: 0,
      image: null,
    });

    const previewImage = ref(null);
    const fileName = ref("");
    const saving = ref(false);

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      newProduct.value.image = file;
      previewImage.value = URL.createObjectURL(file);
      fileName.value = file.name;
    };

    const save = async () => {
      error.value = "";
      saving.value = true;
      try {
        newProduct.value.branch = branchSearch.value;

        const formData = new FormData();
        Object.keys(newProduct.value).forEach((key) => {
          const value = newProduct.value[key];
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        const res = await axios.post("http://localhost:2026/api/products", formData);
        
        rememberBranch(newProduct.value.branch);

        emit("save", res.data.data);
      } catch (e) {
        console.error("Error creating product:", e);
        error.value =
          e.response?.data?.error ||
          e.response?.data?.message ||
          e.message ||
          "Failed to save product.";
      } finally {
        saving.value = false;
      }
    };

    return {
      newProduct,
      previewImage,
      fileName,
      saving,
      error,
      handleFileUpload,
      save,
      category,
      productCodes,
      branchSearch,
      showBranch,
      filteredBranches,
      filterBranch,
      selectBranch,
      showDeleteModal,
      promptDelete,
      confirmDelete,
    };
  },
};
</script>