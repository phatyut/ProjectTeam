<template>
  <div class="min-h-screen rounded-md bg-slate-100 p-4 md:p-8">
    <!-- Loading -->
    <div v-if="loading" class="mx-auto max-w-5xl rounded-3xl bg-white p-16 text-center text-slate-500 shadow-xl shadow-slate-300/40">
      <font-awesome-icon icon="fa-solid fa-spinner" spin class="mr-2" />
      Loading supplier...
    </div>

    <!-- Could not load -->
    <div v-else-if="loadError" class="mx-auto max-w-5xl rounded-3xl bg-white p-16 text-center shadow-xl shadow-slate-300/40">
      <p class="mb-4 text-red-600">{{ loadError }}</p>
      <button
        type="button"
        class="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        @click="router.push('/suppliers')"
      >
        Back to suppliers
      </button>
    </div>

    <div
      v-else-if="supplier"
      class="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-300/40 lg:grid-cols-5"
    >
      <!-- LEFT: photo + name -->
      <aside class="relative flex flex-col overflow-hidden bg-linear-to-br from-emerald-800 via-green-800 to-teal-900 p-8 text-white lg:col-span-2">
        <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"></div>
        <div class="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-emerald-400/10"></div>

        <div class="relative">
          <button
            type="button"
            class="mb-8 flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white"
            @click="router.push('/suppliers')"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            Back to suppliers
          </button>

          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
            <font-awesome-icon icon="fa-solid fa-truck" />
          </div>
          <h1 class="text-3xl font-bold leading-tight">Supplier Details</h1>
          <p class="mt-2 text-sm text-emerald-100/80">Everything saved for this supplier.</p>
        </div>

        <!-- Profile card -->
        <div class="relative my-auto py-10">
          <div class="rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/20 backdrop-blur">
            <div class="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl bg-white text-5xl font-bold text-green-800 shadow-xl">
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Supplier"
                class="h-full w-full object-cover"
              />
              <span v-else>{{ initials }}</span>
            </div>

            <h2 class="mt-5 break-words text-2xl font-bold">{{ supplier.businessName }}</h2>
            <p class="mt-1 text-sm text-emerald-100/80">{{ supplier.name }}</p>

            <a
              v-if="imageUrl"
              :href="imageUrl"
              target="_blank"
              rel="noopener"
              class="mt-4 inline-block text-xs font-semibold text-emerald-200 hover:text-white hover:underline"
            >
              Open full image
            </a>
          </div>
        </div>

        <!-- Quick contact -->
        <div v-if="contactHref" class="relative">
          <a
            :href="contactHref"
            class="flex items-center justify-center gap-2 rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
          >
            <font-awesome-icon icon="fa-solid fa-phone" />
            {{ contactHref.startsWith("mailto:") ? "Send email" : "Call supplier" }}
          </a>
        </div>
      </aside>

      <!-- RIGHT: all details -->
      <section class="p-6 md:p-10 lg:col-span-3">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-slate-800">Information</h2>
          <p class="text-sm text-slate-500">All fields saved in the database.</p>
        </div>

        <div class="space-y-4">
          <div
            v-for="item in details"
            :key="item.label"
            class="flex items-start gap-4 rounded-2xl bg-slate-50 p-4"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <font-awesome-icon :icon="item.icon" />
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wide text-slate-400">{{ item.label }}</p>
              <p class="mt-0.5 break-words text-base font-semibold text-slate-800">{{ item.value }}</p>
            </div>
          </div>
        </div>

        <!-- Record info -->
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-slate-200 p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-400">Created</p>
            <p class="mt-0.5 text-sm font-semibold text-slate-700">{{ formatDate(supplier.createdAt) }}</p>
          </div>
          <div class="rounded-2xl border border-slate-200 p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-400">Last updated</p>
            <p class="mt-0.5 text-sm font-semibold text-slate-700">{{ formatDate(supplier.updatedAt) }}</p>
          </div>
        </div>

        <div class="mt-4 rounded-2xl border border-slate-200 p-4">
          <p class="text-xs font-bold uppercase tracking-wide text-slate-400">Supplier ID</p>
          <p class="mt-0.5 break-all font-mono text-sm text-slate-600">{{ supplier._id }}</p>
        </div>

        <!-- Buttons -->
        <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-2xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            @click="openDeleteModal"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
            Delete
          </button>

          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-green-700 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-green-700/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-700/30"
            @click="goToEdit"
          >
            <font-awesome-icon icon="fa-solid fa-pen-fancy" />
            Edit Supplier
          </button>
        </div>
      </section>
    </div>

    <!-- Delete confirmation dialog -->
    <div
      v-if="showDelete"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      @click.self="closeDeleteModal"
    >
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </div>

        <h3 class="text-xl font-bold text-slate-800">Delete supplier?</h3>
        <p class="mt-2 text-sm text-slate-500">
          <span class="font-semibold text-slate-700">{{ supplier?.businessName }}</span>
          and its image will be removed. This action cannot be undone.
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
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const API_URL = "http://localhost:2026/api/suppliers";
const IMAGE_URL = "http://localhost:2026/uploadsSuppliers";

export default {
  name: "ViewSupplier",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;

    const supplier = ref(null);
    const loading = ref(true);
    const loadError = ref("");

    // delete dialog
    const showDelete = ref(false);
    const deleting = ref(false);
    const deleteError = ref("");

    // ---------- load
    const loadSupplier = async () => {
      loading.value = true;
      loadError.value = "";

      try {
        const res = await axios.get(`${API_URL}/${id}`);
        supplier.value = res.data.data; // the server replies { connect, data }
      } catch (error) {
        loadError.value = error.response?.data?.message || error.message;
      } finally {
        loading.value = false;
      }
    };

    // ---------- computed
    const imageUrl = computed(() =>
      supplier.value?.image ? `${IMAGE_URL}/${supplier.value.image}` : ""
    );

    const initials = computed(() => {
      const source = supplier.value?.businessName || supplier.value?.name;
      if (!source) return "?";
      return source
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
    });

    const details = computed(() => {
      if (!supplier.value) return [];
      return [
        { label: "Name", value: supplier.value.name, icon: "fa-solid fa-user" },
        { label: "Business Name", value: supplier.value.businessName, icon: "fa-solid fa-building" },
        { label: "Contact", value: supplier.value.contact, icon: "fa-solid fa-phone" },
        { label: "Address", value: supplier.value.address, icon: "fa-solid fa-location-dot" },
      ];
    });

    // email -> mailto, phone number -> tel, anything else -> no button
    const contactHref = computed(() => {
      const contact = (supplier.value?.contact || "").trim();
      if (!contact) return "";
      if (contact.includes("@")) return `mailto:${contact}`;
      if (/^[+\d\s()-]{6,}$/.test(contact)) return `tel:${contact.replace(/[\s()-]/g, "")}`;
      return "";
    });

    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleString();
    };

    // ---------- actions
    const goToEdit = () => router.push(`/suppliers/editsuppliers/${id}`);

    const openDeleteModal = () => {
      deleteError.value = "";
      showDelete.value = true;
    };

    const closeDeleteModal = () => {
      if (deleting.value) return;
      showDelete.value = false;
      deleteError.value = "";
    };

    const confirmDelete = async () => {
      deleting.value = true;
      deleteError.value = "";

      try {
        await axios.delete(`${API_URL}/${id}`);
        router.push("/suppliers"); // the supplier is gone, go back to the list
      } catch (error) {
        deleteError.value = error.response?.data?.message || error.message;
        deleting.value = false;
      }
    };

    onMounted(loadSupplier);

    return {
      router,
      supplier,
      loading,
      loadError,
      imageUrl,
      initials,
      details,
      contactHref,
      formatDate,
      goToEdit,
      showDelete,
      deleting,
      deleteError,
      openDeleteModal,
      closeDeleteModal,
      confirmDelete,
    };
  },
};
</script>