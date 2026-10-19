<template>
  <div class="min-h-screen rounded-md bg-slate-100 p-6">

    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Edit Stock</h1>
        <p class="mt-1 text-sm text-slate-500">Update product quantity, location and status</p>
      </div>
      <button @click="goBack"
        class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Back
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
      Loading stock...
    </div>

    <form v-else @submit.prevent="update" class="grid grid-cols-1 gap-6 lg:grid-cols-3">

      <!-- Image card -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-bold text-slate-800">Product Image</h2>

        <div class="flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
          <img v-if="preview" :src="preview" class="h-full w-full object-cover" />
          <font-awesome-icon v-else icon="fa-solid fa-box" class="text-6xl text-green-700" />
        </div>

        <label
          class="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 font-semibold text-green-700 transition hover:bg-green-100">
          <font-awesome-icon icon="fa-solid fa-image" />
          Change Image
          <input type="file" accept="image/*" class="hidden" @change="onImage" />
        </label>

        <p v-if="newImage" class="mt-2 truncate text-center text-xs text-slate-500">{{ newImage.name }}</p>
      </div>

      <!-- Form card -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h2 class="mb-4 text-lg font-bold text-slate-800">Stock Details</h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-600">Product</label>
            <input v-model.trim="form.product" type="text" required
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-600">Batch ID</label>
            <input v-model.trim="form.batchId" type="text" required
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-600">Location</label>
            <input v-model.trim="form.location" type="text" required
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-600">Category</label>
            <input v-model.trim="form.category" type="text" required
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-600">Price ($)</label>
            <input v-model.number="form.price" type="number" min="0" step="0.01"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-600">Quantity</label>
            <input v-model.number="form.quantity" type="number" min="0" required
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10" />
          </div>

          <div class="sm:col-span-2">
            <label class="mb-1 block text-sm font-semibold text-slate-600">Status</label>
            <select v-model="form.status" required
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10">
              <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
            </select>
            <p class="mt-1 text-xs text-slate-400">
              Header counts use the exact values "Low Stock" and "Out of Stock".
            </p>
          </div>
        </div>

        <p v-if="error" class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{{ error }}</p>

        <div class="mt-6 flex justify-end gap-3">
          <button type="button" @click="goBack"
            class="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" :disabled="saving"
            class="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />
            {{ saving ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const BASE = "http://localhost:2026";
    const id = route.params.id;

    const refreshStockCounts = inject("refreshStockCounts", async () => {});

    const statuses = ["In Stock", "Low Stock", "Out of Stock", "Reserved", "Damaged"];

    const form = reactive({
      product: "",
      batchId: "",
      location: "",
      category: "",
      price: 0,
      quantity: 0,
      status: "In Stock",
    });

    const loading = ref(true);
    const saving = ref(false);
    const error = ref("");
    const preview = ref("");
    const newImage = ref(null);

    const goBack = () => router.replace("/stocks");

    const getOne = async () => {
      try {
        const res = await axios.get(`${BASE}/api/stocks/${id}`);
        const s = res.data.data;
        form.product = s.product ?? "";
        form.batchId = s.batchId ?? "";
        form.location = s.location ?? "";
        form.category = s.category ?? "";
        form.price = s.price ?? 0;
        form.quantity = s.quantity ?? 0;
        form.status = s.status ?? "In Stock";
        preview.value = s.image ? `${BASE}/uploadsStock/${s.image}` : "";
      } catch (e) {
        console.error("Get stock error:", e);
        error.value = "Could not load this stock item.";
      } finally {
        loading.value = false;
      }
    };

    const onImage = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      newImage.value = file;
      preview.value = URL.createObjectURL(file);
    };

    const update = async () => {
      error.value = "";
      saving.value = true;
      try {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (newImage.value) fd.append("image", newImage.value);

        await axios.put(`${BASE}/api/stocks/${id}`, fd);
        await refreshStockCounts();
        router.replace("/stocks");
      } catch (e) {
        console.error("Update stock error:", e);
        error.value = e.response?.data?.message || "Update failed. Please try again.";
      } finally {
        saving.value = false;
      }
    };

    onMounted(getOne);

    return { form, statuses, loading, saving, error, preview, newImage, goBack, onImage, update };
  },
};
</script>