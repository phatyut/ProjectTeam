<template>
  <div class="top-0 left-0 z-40 w-screen h-screen fixed bg-slate-100/[0.8]  flex flex-col gap-2 justify-center items-center">
    <div>
      <button @click="router.replace('/stocks')">back</button>
    </div>

    <div class="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="p-6 flex justify-between items-start">
        <div class="flex gap-4">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50"></div>
          <div>
            <h2 class="text-2xl font-bold text-slate-900">BatchId</h2>
            <p class="text-slate-500">How products are grouped</p>
          </div>
        </div>

        <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-semibold">
          {{ batches.length }}
        </div>
      </div>

      <div class="border-t border-slate-100"></div>

      <!-- Content -->
      <div class="p-6 space-y-4">
        <!-- Input Row -->
        <div class="flex gap-3">
          <input
            v-model.trim="name"
            type="text"
            placeholder="Enter a category name"
            class="flex-1 h-14 px-5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-400"
            @keyup.enter="addBatch"
          />
          <button
            :disabled="loading"
            class="px-8 h-14 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-2xl transition"
            @click="addBatch"
          >
            {{ loading ? "..." : "Add" }}
          </button>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <!-- List -->
        <div
          v-for="item in batches"
          :key="item._id"
          class="h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 flex items-center text-slate-900 font-medium"
        >
          <!-- Edit mode -->
          <div v-if="editingId === item._id" class="flex items-center gap-2 w-full">
            <input
              v-model.trim="editName"
              type="text"
              class="flex-1 h-9 px-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-400"
              @keyup.enter="saveEdit(item)"
              @keyup.esc="cancelEdit"
            />
            <button class="text-emerald-600 hover:text-emerald-800 font-semibold" @click="saveEdit(item)">Save</button>
            <button class="text-slate-400 hover:text-slate-600" @click="cancelEdit">Cancel</button>
          </div>

          <!-- View mode -->
          <div v-else class="flex justify-between items-center w-full">
            <div>{{ item.name }}</div>
            <div class="flex items-center gap-3">
              <button class="text-slate-400 hover:text-emerald-600" @click="startEdit(item)">Edit</button>
              <button class="text-slate-400 hover:text-red-500" @click="removeBatch(item._id)">x</button>
            </div>
          </div>
        </div>

        <p v-if="!batches.length" class="text-center text-slate-400">No data yet</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const API = "http://localhost:2026/api/batches";

export default {
  setup() {
    const router = useRouter();
    const batches = ref([]);
    const name = ref("");
    const loading = ref(false);
    const error = ref("");
    const editingId = ref(null);
    const editName = ref("");

    const getBatches = async () => {
      try {
        const res = await axios.get(API);
        batches.value = res.data.data || [];
      } catch (e) {
        error.value = "Failed to load data.";
      }
    };

    const addBatch = async () => {
      error.value = "";
      if (!name.value) {
        error.value = "Please enter a name.";
        return;
      }
      loading.value = true;
      try {
        const res = await axios.post(API, { name: name.value });
        if (res.data.connect === false) {
          error.value = res.data.message;
          return;
        }
        batches.value.unshift(res.data.data); // show immediately
        name.value = "";
      } catch (e) {
        error.value = e.response?.data?.message || "Server error.";
      } finally {
        loading.value = false;
      }
    };

    const removeBatch = async (id) => {
      if (!confirm("Delete this item?")) return;
      try {
        await axios.delete(`${API}/${id}`);
        batches.value = batches.value.filter((b) => b._id !== id);
      } catch (e) {
        error.value = e.response?.data?.message || "Delete failed.";
      }
    };

    const startEdit = (item) => {
      error.value = "";
      editingId.value = item._id;
      editName.value = item.name;
    };

    const cancelEdit = () => {
      editingId.value = null;
      editName.value = "";
    };

    const saveEdit = async (item) => {
      error.value = "";
      if (!editName.value) {
        error.value = "Name cannot be empty.";
        return;
      }
      try {
        const res = await axios.put(`${API}/${item._id}`, { name: editName.value });
        if (res.data.connect === false) {
          error.value = res.data.message;
          return;
        }
        item.name = res.data.data.name;
        cancelEdit();
      } catch (e) {
        error.value = e.response?.data?.message || "Update failed.";
      }
    };

    onMounted(getBatches);

    return {
      router, batches, name, loading, error,
      editingId, editName,
      addBatch, removeBatch, startEdit, cancelEdit, saveEdit,
    };
  },
};
</script>