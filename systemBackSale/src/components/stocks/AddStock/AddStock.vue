<template>
  <div class="w-screen fixed top-0 left-0 z-40 overflow-y-scroll h-screen bg-slate-50 py-8 px-4">
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
            <h2 class="text-lg font-bold text-slate-800">Product </h2>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Product</label>
              <input type="text" name="product" required placeholder="e.g. ASUS ROG Strix G16"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Category</label>
              <input type="text" name="category" list="categoryList" required placeholder="e.g. Laptop"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
              <datalist id="categoryList">
                <option value="Laptop" />
                <option value="Desktop" />
                <option value="Accessory" />
                <option value="Monitor" />
                <option value="Storage" />
                <option value="Network" />
              </datalist>
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
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">batchId</label>
              <input type="text" name="batchId" required placeholder="e.g. B-2026-001"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Location</label>
              <input type="text" name="location" required placeholder="e.g. Warehouse A - Shelf 3"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
            </div>
          </div>
        </section>

        <!-- 3. Image -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">3</span>
            <h2 class="text-lg font-bold text-slate-800">
              Image <span class="text-slate-400 text-sm font-normal">(optional)</span>
            </h2>
          </div>

          <label class="flex items-center gap-5 cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 p-5 transition">
            <div class="w-24 h-24 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
              <img v-if="preview" :src="preview" class="w-full h-full object-cover" />
              <font-awesome-icon v-else icon="fa-solid fa-image" class="text-3xl text-slate-300" />
            </div>
            <div>
              <p class="font-semibold text-slate-700">Click to upload an image</p>
              <p class="text-xs text-slate-400 mt-1">PNG, JPG, GIF or WEBP, up to 5 MB</p>
            </div>
            <input type="file" name="image" accept="image/png,image/jpeg,image/gif,image/webp"
              class="sr-only" @change="onFile" />
          </label>
        </section>

        <!-- 4. Price & quantity -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">4</span>
            <h2 class="text-lg font-bold text-slate-800">Price &amp; quantity</h2>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Price</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                <input type="number" name="price" min="0" step="0.01" required placeholder="0.00"
                  class="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1.5">Quantity</label>
              <input type="number" name="quantity" min="0" required placeholder="0"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 focus:ring-emerald-200 transition" />
            </div>
          </div>
        </section>

        <!-- 5. Status -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">5</span>
            <h2 class="text-lg font-bold text-slate-800">Status</h2>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">

            <label class="cursor-pointer">
              <input type="radio" name="status" value="In Stock" required class="peer sr-only" />
              <div class="border border-slate-200 hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-200 rounded-xl py-3 px-2 flex flex-col items-center gap-1.5 transition">
                <font-awesome-icon icon="fa-solid fa-circle-check" class="text-lg text-emerald-600" />
                <span class="text-xs font-semibold text-slate-700">In Stock</span>
              </div>
            </label>

            <label class="cursor-pointer">
              <input type="radio" name="status" value="Low Stock" class="peer sr-only" />
              <div class="border border-slate-200 hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-200 rounded-xl py-3 px-2 flex flex-col items-center gap-1.5 transition">
                <font-awesome-icon icon="fa-solid fa-battery-quarter" class="text-lg text-yellow-500" />
                <span class="text-xs font-semibold text-slate-700">Low Stock</span>
              </div>
            </label>

            <label class="cursor-pointer">
              <input type="radio" name="status" value="Out of Stock" class="peer sr-only" />
              <div class="border border-slate-200 hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-200 rounded-xl py-3 px-2 flex flex-col items-center gap-1.5 transition">
                <font-awesome-icon icon="fa-solid fa-circle-xmark" class="text-lg text-red-500" />
                <span class="text-xs font-semibold text-slate-700">Out of Stock</span>
              </div>
            </label>

            <label class="cursor-pointer">
              <input type="radio" name="status" value="Reserved" class="peer sr-only" />
              <div class="border border-slate-200 hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-200 rounded-xl py-3 px-2 flex flex-col items-center gap-1.5 transition">
                <font-awesome-icon icon="fa-solid fa-bookmark" class="text-lg text-blue-500" />
                <span class="text-xs font-semibold text-slate-700">Reserved</span>
              </div>
            </label>

            <label class="cursor-pointer">
              <input type="radio" name="status" value="Damaged" class="peer sr-only" />
              <div class="border border-slate-200 hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-200 rounded-xl py-3 px-2 flex flex-col items-center gap-1.5 transition">
                <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="text-lg text-orange-500" />
                <span class="text-xs font-semibold text-slate-700">Damaged</span>
              </div>
            </label>

          </div>
        </section>

        <!-- Action bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 rounded-b-3xl px-8 py-4 flex items-center justify-end gap-3">
          <router-link to="/stocks"
            class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-50">
            Cancel
          </router-link>
          <button type="submit" :disabled="loading"
            class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60 inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30">
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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const preview = ref("");

    const onFile = (e) => {
      const file = e.target.files[0];
      preview.value = file ? URL.createObjectURL(file) : "";
    };

    const submit = async (e) => {
      const data = new FormData(e.target); // includes the image file
      loading.value = true;
      try {
        await axios.post("http://localhost:2026/api/stocks", data); // axios sets multipart automatically
        router.replace("/stocks");
      } catch (err) {
        alert(err.response?.data?.message || "Server error");
      } finally {
        loading.value = false;
      }
    };

    return { submit, loading, preview, onFile };
  },
};
</script>