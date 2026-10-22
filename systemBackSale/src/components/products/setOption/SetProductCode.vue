<template>
  <div class="top-0 left-0 z-40 relative bg-slate-100/95 flex flex-col gap-2 items-center">
    <div class="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="p-6 flex justify-between items-start">
        <div class="flex gap-4">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 flex justify-center items-center text-2xl">
            <font-awesome-icon icon="fa-solid fa-layer-group" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-900">ProductCode</h2>
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
            maxlength="3"
            placeholder="Enter a code (max 3 letters)"
            class="flex-1 h-14 px-5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-400 uppercase placeholder:normal-case"
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
        <div class="max-h-[350px] overflow-y-auto flex flex-col gap-3 pr-1">
          <div
            v-for="item in batches"
            :key="item._id"
            class="shrink-0 h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 flex items-center text-slate-900 font-medium"
          >
            <!-- Edit mode -->
            <div v-if="editingId === item._id" class="flex items-center gap-2 w-full">
              <input
                v-model.trim="editName"
                type="text"
                maxlength="3"
                class="flex-1 min-w-0 h-9 px-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-400 uppercase"
                @keyup.enter="saveEdit(item)"
                @keyup.esc="cancelEdit"
              />
              <button class="text-emerald-600 hover:text-emerald-800 font-semibold" @click="saveEdit(item)">Save</button>
              <button class="text-slate-400 hover:text-slate-600" @click="cancelEdit">Cancel</button>
            </div>

            <!-- View mode -->
            <div v-else class="flex justify-between items-center w-full">
              <div class="truncate">{{ item.name }}</div>
              <div class="flex items-center gap-3 shrink-0">
                <button class="text-slate-400 hover:text-emerald-600" @click="startEdit(item)">Edit</button>
                <button class="text-slate-400 hover:text-red-500" @click="askDelete(item)">x</button>
              </div>
            </div>
          </div>
        </div>

        <p v-if="!batches.length" class="text-center text-slate-400">No data yet</p>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <Transition name="fade">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        @click.self="closeDelete"
      >
        <div class="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 text-center">
          <div class="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.35 9m-4.78 0L9.26 9m9.97-3.21c.34.05.68.11 1.02.17m-1.02-.17L18.16 19.67a2.25 2.25 0 01-2.24 2.08H8.08a2.25 2.25 0 01-2.24-2.08L4.77 5.79m14.46 0a48.1 48.1 0 00-3.48-.4m-12 .56c.34-.06.68-.12 1.02-.17m0 0a48.11 48.11 0 013.48-.4m7.5 0v-.92c0-1.18-.91-2.16-2.09-2.2a51.96 51.96 0 00-3.32 0c-1.18.04-2.09 1.02-2.09 2.2v.92m7.5 0a48.67 48.67 0 00-7.5 0"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900">Delete product code?</h3>
          <p class="mt-2 text-slate-500">
            <span class="font-semibold text-slate-700">"{{ deleteTarget.name }}"</span>
            will be removed permanently. This cannot be undone.
          </p>
          <div class="mt-7 flex gap-3">
            <button
              class="flex-1 h-12 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              :disabled="deleting"
              @click="closeDelete"
            >
              Cancel
            </button>
            <button
              class="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold shadow-lg shadow-red-600/30 transition"
              :disabled="deleting"
              @click="confirmDelete"
            >
              {{ deleting ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const API = "http://localhost:2026/api/setproductcode";

// The server sends the text in "error"; fall back to the axios message
const getErrorText = (e, fallback) =>
  e.response?.data?.error || e.response?.data?.message || e.message || fallback;

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
        error.value = getErrorText(e, "Failed to load data.");
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
          error.value = res.data.error;
          return;
        }
        batches.value.unshift(res.data.data); // show immediately
        name.value = "";
      } catch (e) {
        error.value = getErrorText(e, "Server error.");
      } finally {
        loading.value = false;
      }
    };

    // ---- Delete with confirmation modal ----
    const deleteTarget = ref(null);
    const deleting = ref(false);

    const askDelete = (item) => {
      error.value = "";
      deleteTarget.value = item;
    };

    const closeDelete = () => {
      if (deleting.value) return;
      deleteTarget.value = null;
    };

    const confirmDelete = async () => {
      if (!deleteTarget.value) return;
      const id = deleteTarget.value._id;
      deleting.value = true;
      try {
        await axios.delete(`${API}/${id}`);
        batches.value = batches.value.filter((b) => b._id !== id);
        deleteTarget.value = null;
      } catch (e) {
        deleteTarget.value = null;
        error.value = getErrorText(e, "Delete failed.");
      } finally {
        deleting.value = false;
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") closeDelete();
    };
    onMounted(() => window.addEventListener("keydown", onKey));
    onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

    // ---- Edit ----
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
          error.value = res.data.error;
          return;
        }
        item.name = res.data.data.name;
        cancelEdit();
      } catch (e) {
        error.value = getErrorText(e, "Update failed.");
      }
    };

    onMounted(getBatches);

    return {
      router,
      batches,
      name,
      loading,
      error,
      editingId,
      editName,
      deleteTarget,
      deleting,
      askDelete,
      closeDelete,
      confirmDelete,
      addBatch,
      startEdit,
      cancelEdit,
      saveEdit,
    };
  },
};
</script>