<template>
  <div class="min-h-screen rounded-md bg-slate-100 p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-800">Suppliers</h1>{{ suppliers.length }}

      <button
        class="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
        @click="goToAdd">
        <font-awesome-icon icon="fa-solid fa-plus" />
        Add Supplier
      </button>
    </div>

    <!-- Success message after delete -->
    <div v-if="toastMessage"
      class="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 ring-1 ring-green-200">
      {{ toastMessage }}
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <!-- Toolbar -->
      <div class="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Suppliers List</h2>
          <p class="text-sm text-slate-500">Manage the people and businesses you buy from</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <!-- Search -->
          <div class="relative">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input v-model="search" type="text" placeholder="Search name, business, contact..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 sm:w-72"/>
          </div>

          <!-- Image filter -->
          <select
            v-model="imageFilter"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:bg-white"
          >
            <option value="">All Suppliers</option>
            <option value="true">With image</option>
            <option value="false">Without image</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-237.5">
          <thead class="bg-slate-50">
            <tr class="border-b border-slate-200 text-left">
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Image</th>
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Name</th>
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Business</th>
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Contact</th>
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Address</th>
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="px-5 py-12 text-center text-sm text-slate-500">Loading suppliers...</td>
            </tr>

            <tr v-else-if="errorMessage">
              <td colspan="6" class="px-5 py-12 text-center text-sm text-red-600">{{ errorMessage }}</td>
            </tr>

            <tr v-else-if="suppliers.length === 0">
              <td colspan="6" class="px-5 py-12 text-center text-sm text-slate-500">No suppliers found</td>
            </tr>

            <tr
              v-else
              v-for="supplier in suppliers"
              :key="supplier._id"
              class="border-b border-slate-100 transition hover:bg-slate-50"
            >
              <!-- Image -->
              <td class="px-5 py-4">
                <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-green-50">
                  <img
                    v-if="supplier.image"
                    :src="`${IMAGE_URL}/${supplier.image}`"
                    alt="Supplier"
                    class="h-full w-full object-cover"
                  />
                  <font-awesome-icon v-else icon="fa-solid fa-user" class="text-xl text-green-700" />
                </div>
              </td>

              <!-- Name -->
              <td class="px-5 py-4 text-sm font-medium text-slate-600">{{ supplier.name }}</td>

              <!-- Business -->
              <td class="px-5 py-4">
                <span class="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  {{ supplier.businessName }}
                </span>
              </td>

              <!-- Contact -->
              <td class="px-5 py-4 text-sm font-semibold text-slate-700">{{ supplier.contact }}</td>

              <!-- Address -->
              <td class="max-w-64 truncate px-5 py-4 text-sm text-slate-600" :title="supplier.address">
                {{ supplier.address }}
              </td>

              <!-- Actions -->
              <td class="px-1 py-4">
                <div class="flex justify-center gap-1">
                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    title="View"
                    @click="goToView(supplier._id)"
                  >
                    <font-awesome-icon icon="fa-solid fa-arrows-to-eye" />
                  </button>

                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-lg text-green-700 hover:bg-green-100"
                    title="Edit"
                    @click="goToEdit(supplier._id)"
                  >
                    <font-awesome-icon icon="fa-solid fa-pen-fancy" />
                  </button>

                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                    @click="openDeleteModal(supplier)"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer / Pagination -->
      <div class="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <p class="text-sm text-slate-500">
            Showing
            <span class="font-semibold text-slate-700">{{ rangeStart }}-{{ rangeEnd }}</span>
            of
            <span class="font-semibold text-slate-700">{{ total }}</span>
            suppliers
          </p>

          <select
            v-model.number="pageSize"
            class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm outline-none focus:border-green-600"
          >
            <option :value="5">5 / page</option>
            <option :value="10">10 / page</option>
            <option :value="20">20 / page</option>
            <option :value="50">50 / page</option>
          </select>
        </div>

        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Prev
          </button>

          <button v-for="p in visiblePages" :key="p" type="button"
            class="min-w-9 rounded-lg px-3 py-1.5 text-sm font-semibold transition"
            :class="p === currentPage ? 'bg-green-700 text-white'
                                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'"
            @click="goToPage(p)">
            {{ p }}
          </button>

          <button type="button" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
            class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Delete confirmation dialog -->
    <div v-if="supplierToDelete"  @click.self="closeDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </div>
        <h3 class="text-xl font-bold text-slate-800">Delete supplier?</h3>
        <div class="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-50">
            <img v-if="supplierToDelete.image" alt="Supplier"
                 class="h-full w-full object-cover" :src="`${IMAGE_URL}/${supplierToDelete.image}`" />
            <font-awesome-icon v-else icon="fa-solid fa-user" class="text-xl text-green-700" />
          </div>
          <div class="min-w-0">
            <p class="truncate font-semibold text-slate-800">{{ supplierToDelete.businessName }}</p>
            <p class="truncate text-sm text-slate-500">{{ supplierToDelete.name }}</p>
          </div>
        </div>

        <p class="mt-4 text-sm text-slate-500">
          This will also remove its image. This action cannot be undone.
        </p>

        <p
          v-if="deleteError"
          class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {{ deleteError }}
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-xl px-5 py-2.5 font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="deleting"
            @click="closeDeleteModal"
          >
            Cancel
          </button>

          <button
            type="button"
            class="rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="deleting"
            @click="confirmDelete"
          >
            {{ deleting ? "Deleting..." : "Yes, delete" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, watch, onMounted, onBeforeUnmount,inject } from "vue";
import { useRouter } from "vue-router";

const API_URL = "http://localhost:2026/api/suppliers";
const IMAGE_URL = "http://localhost:2026/uploadsSuppliers";

export default {
  name: "SupplierList",
  setup() {
    const suppliersCount =inject("suppliersCount")
    const router = useRouter();
    const suppliers = ref([]);
    const loading = ref(true);
    const errorMessage = ref("");
    // filters
    const search = ref("");
    const imageFilter = ref("");
    // pagination (the server does the paging)
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const totalPages = ref(1);
    // delete dialog
    const supplierToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref("");
    const toastMessage = ref("");

    let requestId = 0; // ignore answers that arrive late
    let searchTimer = null;
    let toastTimer = null;

    const loadSuppliers = async () => {
      const myRequest = ++requestId;
      loading.value = true;
      errorMessage.value = "";

      try {
        const res = await axios.get(API_URL, {
          params: {
            page: currentPage.value,
            limit: pageSize.value,
            search: search.value.trim() || undefined,
            hasImage: imageFilter.value || undefined,
          },
        });

        if (myRequest !== requestId) return;

        // the server replies { connect, data: [...], pagination: {...} }
        suppliers.value = res.data.data;

        const p = res.data.pagination;
        total.value = p.total;
        totalPages.value = p.totalPages;
        currentPage.value = p.page; // the server corrects the page if needed
      } catch (error) {
        if (myRequest !== requestId) return;
        errorMessage.value = error.response?.data?.message || error.message;
      } finally {
        if (myRequest === requestId) loading.value = false;
      }
    };

    // ---- footer helpers
    const rangeStart = computed(() =>
      total.value === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1
    );
    const rangeEnd = computed(() =>
      Math.min(currentPage.value * pageSize.value, total.value)
    );

    // up to 5 page numbers around the current page
    const visiblePages = computed(() => {
      const last = totalPages.value;
      const maxButtons = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2));
      let end = start + maxButtons - 1;
      if (end > last) {
        end = last;
        start = Math.max(1, end - maxButtons + 1);
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value || page === currentPage.value) return;
      currentPage.value = page;
      loadSuppliers();
    };

    // search: wait until the user stops typing, then go back to page 1
    watch(search, () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        currentPage.value = 1;
        loadSuppliers();
      }, 300);
    });

    // filter or page size changed: go back to page 1
    watch([imageFilter, pageSize], () => {
      currentPage.value = 1;
      loadSuppliers();
    });

    watch(suppliers,(newtotal)=>{suppliersCount.value = newtotal.length},{immediate:true})


    // ---- navigation (change these paths to match your router)
    const goToAdd = () => router.push("/suppliers/addsuppliers");
    const goToView = (id) => router.push(`/suppliers/viewsuppliers/${id}`);
    const goToEdit = (id) => router.push(`/suppliers/editsuppliers/${id}`);

    // ---- delete
    const showToast = (message) => {
      toastMessage.value = message;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => (toastMessage.value = ""), 3000);
    };

    const openDeleteModal = (supplier) => {
      deleteError.value = "";
      supplierToDelete.value = supplier;
    };

    const closeDeleteModal = () => {
      if (deleting.value) return; // do not close while the request is running
      supplierToDelete.value = null;
      deleteError.value = "";
    };

    const confirmDelete = async () => {
      const supplier = supplierToDelete.value;
      if (!supplier) return;

      deleting.value = true;
      deleteError.value = "";

      try {
        await axios.delete(`${API_URL}/${supplier._id}`);

        supplierToDelete.value = null;
        showToast(`${supplier.businessName} was deleted.`);
        await loadSuppliers(); // reload, the server moves back a page if this one is now empty
      } catch (error) {
        deleteError.value = error.response?.data?.message || error.message;
      } finally {
        deleting.value = false;
      }
    };

    onMounted(loadSuppliers);

    onBeforeUnmount(() => {
      clearTimeout(searchTimer);
      clearTimeout(toastTimer);
    });

    return {
      suppliersCount,
      IMAGE_URL,
      suppliers,
      loading,
      errorMessage,
      search,
      imageFilter,
      currentPage,
      pageSize,
      total,
      totalPages,
      rangeStart,
      rangeEnd,
      visiblePages,
      goToPage,
      goToAdd,
      goToView,
      goToEdit,
      supplierToDelete,
      deleting,
      deleteError,
      toastMessage,
      openDeleteModal,
      closeDeleteModal,
      confirmDelete,
    };
  },
};
</script>