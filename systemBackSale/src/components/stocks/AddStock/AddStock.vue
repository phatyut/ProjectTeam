<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-100"
  >
    <div class="min-h-screen p-4 sm:p-6 lg:p-8">

      <!-- TOP BAR -->
      <div class="mx-auto mb-6 flex max-w-7xl items-center justify-between">
        <div>
          <p class="text-sm font-medium text-green-700">
            Inventory Management
          </p>

          <h1 class="text-2xl font-bold text-slate-900 sm:text-3xl">
            Add New Stock
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Receive products and update your inventory
          </p>
        </div>

        <button
          type="button"
          @click="cancel"
          class="flex h-11 w-11 items-center justify-center rounded-xl
                 border border-slate-200 bg-white text-slate-500
                 shadow-sm transition hover:bg-slate-50 hover:text-red-500"
        >
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>


      <!-- MAIN -->
      <div
        class="mx-auto grid max-w-7xl gap-6
               xl:grid-cols-[360px_minmax(0,1fr)]"
      >

        <!-- ================================================= -->
        <!-- LEFT SIDEBAR -->
        <!-- ================================================= -->
        <aside class="space-y-5">

          <!-- STOCK PREVIEW -->
          <div
            class="overflow-hidden rounded-3xl
                   bg-gradient-to-br from-green-950
                   via-green-900 to-green-700
                   text-white shadow-xl"
          >

            <!-- Header -->
            <div class="p-6">

              <div class="flex items-center gap-4">

                <div
                  class="flex h-14 w-14 items-center justify-center
                         rounded-2xl bg-white/10 ring-1 ring-white/20"
                >
                  <i class="fa-solid fa-boxes-stacked text-2xl"></i>
                </div>

                <div>
                  <p class="text-lg font-bold">
                    Stock Receipt
                  </p>

                  <p class="text-sm text-green-200">
                    New inventory
                  </p>
                </div>

              </div>
            </div>


            <!-- Product -->
            <div class="border-t border-white/10 px-6 py-5">

              <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-green-300">
                Product
              </p>

              <p class="truncate text-lg font-bold">
                {{ selectedProduct?.name || "Select a product" }}
              </p>

              <p
                v-if="selectedProduct?.productCode"
                class="mt-1 text-sm text-green-200"
              >
                {{ selectedProduct.productCode }}
              </p>

            </div>


            <!-- SUMMARY -->
            <div class="grid grid-cols-2 border-t border-white/10">

              <div class="border-r border-white/10 p-5">
                <p class="text-xs uppercase tracking-wider text-green-300">
                  Quantity
                </p>

                <p class="mt-1 text-2xl font-bold">
                  {{ form.quantity || 0 }}
                </p>
              </div>

              <div class="p-5">
                <p class="text-xs uppercase tracking-wider text-green-300">
                  Status
                </p>

                <span
                  class="mt-2 inline-flex rounded-full
                         bg-green-400/20 px-3 py-1 text-xs
                         font-semibold text-green-200"
                >
                  {{ form.status }}
                </span>
              </div>

            </div>


            <!-- COST -->
            <div class="space-y-4 border-t border-white/10 p-6">

              <div class="flex items-center justify-between">
                <span class="text-sm text-green-200">
                  Cost / unit
                </span>

                <span class="font-semibold">
                  ${{ money(form.costPrice) }}
                </span>
              </div>


              <div class="flex items-center justify-between">
                <span class="text-sm text-green-200">
                  Sale / unit
                </span>

                <span class="font-semibold">
                  ${{ money(form.salePrice) }}
                </span>
              </div>


              <div class="h-px bg-white/10"></div>


              <div class="flex items-center justify-between">
                <span class="text-sm text-green-200">
                  Total cost
                </span>

                <span class="text-lg font-bold">
                  ${{ totalCost }}
                </span>
              </div>


              <div class="flex items-center justify-between">
                <span class="text-sm text-green-200">
                  Expected revenue
                </span>

                <span class="text-lg font-bold">
                  ${{ totalRevenue }}
                </span>
              </div>


              <div
                class="rounded-2xl bg-white/10 p-4
                       ring-1 ring-white/10"
              >

                <div class="flex items-center justify-between">

                  <div>
                    <p class="text-xs text-green-200">
                      Expected profit
                    </p>

                    <p
                      class="mt-1 text-2xl font-bold"
                      :class="
                        profit < 0
                          ? 'text-red-300'
                          : 'text-emerald-300'
                      "
                    >
                      ${{ profit }}
                    </p>
                  </div>

                  <div
                    class="flex h-11 w-11 items-center justify-center
                           rounded-xl bg-white/10"
                  >
                    <i class="fa-solid fa-chart-line"></i>
                  </div>

                </div>

              </div>

            </div>

          </div>


          <!-- QUICK INFO -->
          <div
            class="rounded-3xl border border-slate-200
                   bg-white p-5 shadow-sm"
          >

            <div class="mb-4 flex items-center gap-3">

              <div
                class="flex h-10 w-10 items-center justify-center
                       rounded-xl bg-green-50 text-green-700"
              >
                <i class="fa-solid fa-circle-info"></i>
              </div>

              <div>
                <h3 class="font-bold text-slate-800">
                  Stock tips
                </h3>

                <p class="text-xs text-slate-500">
                  Inventory information
                </p>
              </div>

            </div>

            <ul class="space-y-3 text-sm text-slate-600">

              <li class="flex gap-2">
                <i class="fa-solid fa-check mt-0.5 text-green-600"></i>
                <span>Use the correct warehouse location.</span>
              </li>

              <li class="flex gap-2">
                <i class="fa-solid fa-check mt-0.5 text-green-600"></i>
                <span>Set a reorder level for low stock alerts.</span>
              </li>

              <li class="flex gap-2">
                <i class="fa-solid fa-check mt-0.5 text-green-600"></i>
                <span>Batch IDs help track received inventory.</span>
              </li>

            </ul>

          </div>

        </aside>


        <!-- ================================================= -->
        <!-- RIGHT FORM -->
        <!-- ================================================= -->
        <form
          @submit.prevent="submit"
          class="overflow-hidden rounded-3xl border
                 border-slate-200 bg-white shadow-sm"
        >

          <!-- FORM HEADER -->
          <div
            class="flex flex-col gap-4 border-b border-slate-200
                   p-6 sm:flex-row sm:items-center
                   sm:justify-between"
          >

            <div>

              <div class="flex items-center gap-2">

                <span
                  class="rounded-lg bg-green-50 px-2.5 py-1
                         text-xs font-bold text-green-700"
                >
                  STOCK
                </span>

                <span class="text-xs text-slate-400">
                  New inventory record
                </span>

              </div>

              <h2 class="mt-2 text-xl font-bold text-slate-900">
                Stock Information
              </h2>

              <p class="mt-1 text-sm text-slate-500">
                Enter the details of the inventory you received.
              </p>

            </div>

            <div
              class="flex h-12 w-12 items-center justify-center
                     rounded-2xl bg-green-50 text-green-700"
            >
              <i class="fa-solid fa-warehouse text-xl"></i>
            </div>

          </div>


          <!-- ERROR -->
          <div
            v-if="error"
            class="mx-6 mt-6 flex items-start gap-3 rounded-2xl
                   border border-red-200 bg-red-50 p-4 text-sm
                   text-red-700"
          >
            <i class="fa-solid fa-circle-exclamation mt-0.5"></i>

            <span>{{ error }}</span>
          </div>


          <!-- FORM CONTENT -->
          <div class="space-y-8 p-6">


            <!-- ================= PRODUCT ================= -->
            <section>

              <div class="mb-5 flex items-center gap-3">

                <div
                  class="flex h-9 w-9 items-center justify-center
                         rounded-xl bg-green-100 text-green-700"
                >
                  <i class="fa-solid fa-box"></i>
                </div>

                <div>
                  <h3 class="font-bold text-slate-800">
                    Product
                  </h3>

                  <p class="text-xs text-slate-500">
                    Select the product being received
                  </p>
                </div>

              </div>


              <div class="grid gap-5 md:grid-cols-2">

                <div class="md:col-span-2">

                  <label class="label">
                    Product
                    <span>*</span>
                  </label>

                  <div class="relative">

                    <i
                      class="fa-solid fa-box absolute left-4
                             top-1/2 -translate-y-1/2
                             text-slate-400"
                    ></i>

                    <select
                      v-model="form.product"
                      class="input pl-11"
                      required
                    >

                      <option value="" disabled>
                        Select product
                      </option>

                      <option
                        v-for="p in products"
                        :key="p._id"
                        :value="p._id"
                      >
                        {{ p.name }}
                        {{ p.productCode ? ` — ${p.productCode}` : "" }}
                      </option>

                    </select>

                  </div>

                </div>


                <!-- BATCH -->
                <div>

                  <label class="label">
                    Batch ID
                  </label>

                  <div class="relative">

                    <i
                      class="fa-solid fa-barcode absolute left-4
                             top-1/2 -translate-y-1/2
                             text-slate-400"
                    ></i>

                    <input
                      v-model="form.batchId"
                      type="text"
                      class="input pl-11"
                      placeholder="BAT-2026-001"
                    />

                  </div>

                </div>


                <!-- SERIAL -->
                <div>

                  <label class="label">
                    Serial Number
                  </label>

                  <div class="relative">

                    <i
                      class="fa-solid fa-fingerprint absolute left-4
                             top-1/2 -translate-y-1/2
                             text-slate-400"
                    ></i>

                    <input
                      v-model="form.serialNumber"
                      type="text"
                      class="input pl-11"
                      placeholder="SN-000123"
                    />

                  </div>

                </div>

              </div>

            </section>


            <!-- DIVIDER -->
            <div class="border-t border-slate-100"></div>


            <!-- ================= SUPPLIER ================= -->
            <section>

              <div class="mb-5 flex items-center gap-3">

                <div
                  class="flex h-9 w-9 items-center justify-center
                         rounded-xl bg-blue-50 text-blue-600"
                >
                  <i class="fa-solid fa-truck-field"></i>
                </div>

                <div>
                  <h3 class="font-bold text-slate-800">
                    Supplier & Location
                  </h3>

                  <p class="text-xs text-slate-500">
                    Where the stock came from and where it is stored
                  </p>
                </div>

              </div>


              <div class="grid gap-5 md:grid-cols-2">

                <!-- SUPPLIER -->
                <div>

                  <label class="label">
                    Supplier
                  </label>

                  <select
                    v-model="form.supplier"
                    class="input"
                  >

                    <option value="">
                      No supplier
                    </option>

                    <option
                      v-for="s in suppliers"
                      :key="s._id"
                      :value="s._id"
                    >
                      {{ s.name }}
                      {{ s.businessName ? ` — ${s.businessName}` : "" }}
                    </option>

                  </select>

                </div>


                <!-- WAREHOUSE -->
                <div>

                  <label class="label">
                    Warehouse
                  </label>

                  <div class="relative">

                    <i
                      class="fa-solid fa-warehouse absolute left-4
                             top-1/2 -translate-y-1/2
                             text-slate-400"
                    ></i>

                    <input
                      v-model="form.warehouse"
                      type="text"
                      class="input pl-11"
                      placeholder="Main Warehouse"
                    />

                  </div>

                </div>


                <!-- LOCATION -->
                <div>

                  <label class="label">
                    Storage Location
                  </label>

                  <div class="relative">

                    <i
                      class="fa-solid fa-location-dot absolute left-4
                             top-1/2 -translate-y-1/2
                             text-slate-400"
                    ></i>

                    <input
                      v-model="form.location"
                      type="text"
                      class="input pl-11"
                      placeholder="A-01-03"
                    />

                  </div>

                </div>


                <!-- RECEIVED DATE -->
                <div>

                  <label class="label">
                    Received Date
                    <span>*</span>
                  </label>

                  <div class="relative">

                    <i
                      class="fa-solid fa-calendar absolute left-4
                             top-1/2 -translate-y-1/2
                             text-slate-400"
                    ></i>

                    <input
                      v-model="form.receivedDate"
                      type="date"
                      class="input pl-11"
                      required
                    />

                  </div>

                </div>

              </div>

            </section>


            <!-- DIVIDER -->
            <div class="border-t border-slate-100"></div>


            <!-- ================= QUANTITY ================= -->
            <section>

              <div class="mb-5 flex items-center gap-3">

                <div
                  class="flex h-9 w-9 items-center justify-center
                         rounded-xl bg-orange-50 text-orange-600"
                >
                  <i class="fa-solid fa-cubes-stacked"></i>
                </div>

                <div>
                  <h3 class="font-bold text-slate-800">
                    Inventory
                  </h3>

                  <p class="text-xs text-slate-500">
                    Quantity and stock control
                  </p>
                </div>

              </div>


              <div class="grid gap-5 md:grid-cols-3">

                <!-- QUANTITY -->
                <div>

                  <label class="label">
                    Quantity
                    <span>*</span>
                  </label>

                  <input
                    v-model.number="form.quantity"
                    type="number"
                    min="1"
                    class="input"
                    required
                  />

                </div>


                <!-- REORDER -->
                <div>

                  <label class="label">
                    Reorder Level
                  </label>

                  <input
                    v-model.number="form.reorderLevel"
                    type="number"
                    min="0"
                    class="input"
                    placeholder="5"
                  />

                </div>


                <!-- STATUS -->
                <div>

                  <label class="label">
                    Status
                  </label>

                  <select
                    v-model="form.status"
                    class="input"
                  >
                    <option value="Available">
                      Available
                    </option>

                    <option value="Reserved">
                      Reserved
                    </option>

                    <option value="Damaged">
                      Damaged
                    </option>

                    <option value="Pending">
                      Pending
                    </option>
                  </select>

                </div>

              </div>

            </section>


            <!-- DIVIDER -->
            <div class="border-t border-slate-100"></div>


            <!-- ================= PRICING ================= -->
            <section>

              <div class="mb-5 flex items-center gap-3">

                <div
                  class="flex h-9 w-9 items-center justify-center
                         rounded-xl bg-emerald-50 text-emerald-600"
                >
                  <i class="fa-solid fa-dollar-sign"></i>
                </div>

                <div>
                  <h3 class="font-bold text-slate-800">
                    Pricing
                  </h3>

                  <p class="text-xs text-slate-500">
                    Set purchase and selling prices
                  </p>
                </div>

              </div>


              <div class="grid gap-5 md:grid-cols-2">

                <!-- COST -->
                <div>

                  <label class="label">
                    Cost Price / Unit
                    <span>*</span>
                  </label>

                  <div class="relative">

                    <span
                      class="absolute left-4 top-1/2
                             -translate-y-1/2
                             font-semibold text-slate-400"
                    >
                      $
                    </span>

                    <input
                      v-model.number="form.costPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      class="input pl-10"
                      required
                    />

                  </div>

                </div>


                <!-- SALE -->
                <div>

                  <label class="label">
                    Sale Price / Unit
                    <span>*</span>
                  </label>

                  <div class="relative">

                    <span
                      class="absolute left-4 top-1/2
                             -translate-y-1/2
                             font-semibold text-slate-400"
                    >
                      $
                    </span>

                    <input
                      v-model.number="form.salePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      class="input pl-10"
                      required
                    />

                  </div>

                </div>

              </div>

            </section>


            <!-- DIVIDER -->
            <div class="border-t border-slate-100"></div>


            <!-- ================= NOTE ================= -->
            <section>

              <label class="label">
                Internal Note
              </label>

              <textarea
                v-model="form.note"
                rows="4"
                class="input resize-none"
                placeholder="Add an optional note about this stock..."
              ></textarea>

            </section>

          </div>


          <!-- FOOTER -->
          <div
            class="flex flex-col-reverse gap-3 border-t
                   border-slate-200 bg-slate-50 p-6
                   sm:flex-row sm:justify-end"
          >

            <button
              type="button"
              @click="cancel"
              class="rounded-xl border border-slate-300
                     bg-white px-6 py-3 font-semibold
                     text-slate-600 transition
                     hover:bg-slate-100"
            >
              Cancel
            </button>


            <button
              type="submit"
              :disabled="loading"
              class="flex items-center justify-center
                     rounded-xl bg-green-700 px-7 py-3
                     font-semibold text-white shadow-lg
                     shadow-green-700/20 transition
                     hover:bg-green-800
                     disabled:cursor-not-allowed
                     disabled:opacity-60"
            >

              <i
                v-if="!loading"
                class="fa-solid fa-boxes-stacked mr-2"
              ></i>

              <i
                v-else
                class="fa-solid fa-spinner fa-spin mr-2"
              ></i>

              {{ loading ? "Saving Stock..." : "Add Stock" }}

            </button>

          </div>

        </form>

      </div>

    </div>
  </div>
</template>


<script>
import {
  reactive,
  ref,
  computed,
  onMounted,
} from "vue";

import { useRouter } from "vue-router";
import axios from "axios";

const API = "http://localhost:2026/api";

export default {
  name: "AddStock",

  setup() {
    const router = useRouter();

    const products = ref([]);
    const suppliers = ref([]);

    const loading = ref(false);
    const error = ref("");

    const form = reactive({
      product: "",
      supplier: "",

      batchId: "",
      serialNumber: "",

      warehouse: "",
      location: "",

      quantity: 1,
      reorderLevel: 5,

      costPrice: 0,
      salePrice: 0,

      receivedDate: new Date()
        .toISOString()
        .slice(0, 10),

      status: "Available",

      note: "",
    });


    /* ==============================
       SELECTED PRODUCT
    ============================== */

    const selectedProduct = computed(() => {
      return products.value.find(
        (p) => p._id === form.product
      );
    });


    /* ==============================
       SELECTED SUPPLIER
    ============================== */

    const selectedSupplier = computed(() => {
      return suppliers.value.find(
        (s) => s._id === form.supplier
      );
    });


    /* ==============================
       TOTALS
    ============================== */

    const totalCost = computed(() => {
      return (
        (form.quantity || 0) *
        (form.costPrice || 0)
      ).toFixed(2);
    });


    const totalRevenue = computed(() => {
      return (
        (form.quantity || 0) *
        (form.salePrice || 0)
      ).toFixed(2);
    });


    const profit = computed(() => {
      return (
        Number(totalRevenue.value) -
        Number(totalCost.value)
      ).toFixed(2);
    });


    /* ==============================
       MONEY FORMAT
    ============================== */

    const money = (value) => {
      return Number(value || 0).toFixed(2);
    };


    /* ==============================
       RESPONSE LIST
    ============================== */

    const pickList = (res) => {
      return Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
    };


    /* ==============================
       LOAD PRODUCTS / SUPPLIERS
    ============================== */

    const loadOptions = async () => {
      try {
        const [p, s] = await Promise.all([
          axios.get(`${API}/products`),
          axios.get(`${API}/suppliers`),
        ]);

        products.value = pickList(p);
        suppliers.value = pickList(s);

      } catch (e) {

        error.value =
          "Failed to load products or suppliers.";

      }
    };


    /* ==============================
       SUBMIT
    ============================== */

    const submit = async () => {

      error.value = "";
      loading.value = true;

      try {

        const payload = {
          ...form,
        };

        if (!payload.supplier) {
          delete payload.supplier;
        }

        const res = await axios.post(
          `${API}/stock`,
          payload
        );

        if (res.data?.connect === false) {

          error.value =
            res.data.message ||
            "Could not add stock.";

          return;
        }

        router.push("/stocks");

      } catch (e) {

        error.value =
          e.response?.data?.message ||
          "Server error.";

      } finally {

        loading.value = false;

      }
    };


    /* ==============================
       CANCEL
    ============================== */

    const cancel = () => {
      router.replace("/stocks");
    };


    onMounted(loadOptions);


    return {
      products,
      suppliers,

      form,

      loading,
      error,

      selectedProduct,
      selectedSupplier,

      totalCost,
      totalRevenue,
      profit,

      money,

      submit,
      cancel,
    };
  },
};
</script>


<style scoped>

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
}

.label span {
  color: #ef4444;
}

.input {
  width: 100%;
  min-height: 46px;

  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;

  background-color: #ffffff;

  padding: 0.65rem 0.9rem;

  font-size: 0.875rem;
  color: #0f172a;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.input:hover {
  border-color: #cbd5e1;
}

.input:focus {
  border-color: #16a34a;

  box-shadow:
    0 0 0 3px
    rgba(22, 163, 74, 0.12);
}

.input::placeholder {
  color: #94a3b8;
}

select.input {
  cursor: pointer;
}

textarea.input {
  min-height: auto;
}

</style>