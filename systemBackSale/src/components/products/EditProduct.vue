<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-green-900/80 backdrop-blur-sm " >

    <!-- Modal -->
    <div
      class="w-[80%] min-w-3xl h-[92vh]  rounded-2xl bg-slate-50 shadow-2xl  p-2" >

      <!-- ================= HEADER ================= -->
      <div class="sticky top-0 z-20 flex items-center justify-between rounded-2xl
               bg-gradient-to-r from-green-700 via-green-800 to-green-700 px-6 py-5 text-white">

        <div class="flex items-center gap-4">

          <div
            class="flex h-12 w-12 items-center justify-center
                   rounded-xl bg-white/10 text-2xl
                   ring-1 ring-white/20"
          >
            ✏️
          </div>

          <div>
            <h2 class="text-xl font-bold">
              Edit Product
            </h2>

            <p class="mt-1 text-sm text-green-100">
              Update product information
            </p>
          </div>

        </div>


        <!-- Close -->
        <button
          type="button"
          @click="$emit('cancel')"
          class="flex h-9 w-9 items-center justify-center
                 rounded-full bg-white/10 text-lg
                 transition hover:bg-white/20"
        >
          ✕
        </button>

      </div>


      <!-- ================= FORM ================= -->
      <form
        @submit.prevent="save"
        class="p-6 "
      >

        <!-- ================= PRODUCT INFORMATION ================= -->
      <div class="flex  w-full justify-between  gap-8">
          <div class="relative w-[60%] ">
                <div class="">

                  <div class="mb-5 flex items-center gap-3">

                    <div
                      class="flex h-9 w-9 items-center justify-center
                            rounded-lg bg-green-700"
                    >
                      📦
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800">
                        Product Information
                      </h3>

                      <p class="text-xs text-slate-400">
                        Basic information about this product
                      </p>
                    </div>

                  </div>


                  <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <!-- Product Name -->
                    <div>

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Product Name
                      </label>

                      <input
                        v-model="productData.name"
                        type="text"
                        placeholder="Enter product name"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
                              text-slate-700 outline-none transition
                              placeholder:text-slate-400
                              focus:border-green-500
                              focus:bg-white
                              focus:ring-4 focus:ring-green-100"
                      />

                    </div>


                    <!-- Product Code -->
                    <div>

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Product Code
                      </label>

                      <input
                        v-model="productData.productCode"
                        type="text"
                        placeholder="e.g. PC-001"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
                              text-slate-700 outline-none transition
                              placeholder:text-slate-400
                              focus:border-green-500
                              focus:bg-white
                              focus:ring-4 focus:ring-green-100"
                      />

                    </div>


                    <!-- Category -->
                    <div>

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Category
                      </label>

                      <select
                        v-model="productData.category"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
                              text-slate-700 outline-none transition
                              focus:border-green-500
                              focus:bg-white
                              focus:ring-4 focus:ring-green-100"
                      >
                        <option value="">
                          Select category
                        </option>

                        <option value="Desktop">
                          Desktop
                        </option>

                        <option value="Laptop">
                          Laptop
                        </option>

                        <option value="Monitor">
                          Monitor
                        </option>

                        <option value="Keyboard">
                          Keyboard
                        </option>

                        <option value="Mouse">
                          Mouse
                        </option>

                        <option value="Accessories">
                          Accessories
                        </option>
                      </select>

                    </div>


                    <!-- Branch -->
                    <div class="">

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Branch
                      </label>

                      <select
                        v-model="productData.branch"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm 
                              text-slate-700 outline-none transition
                              focus:border-green-500
                              focus:bg-white
                              focus:ring-4 focus:ring-green-100"
                      >

                        <option value="">
                          Select branch
                        </option>

                        <option value="Phnom Penh">
                          Phnom Penh
                        </option>

                        <option value="Siem Reap">
                          Siem Reap
                        </option>

                        <option value="Battambang">
                          Battambang
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

                <!-- ================= PRICING ================= -->
                <div class="mt-8 border-t border-slate-100 pt-7 ">

                  <div class="mb-5 flex items-center gap-3">

                    <div
                      class="flex h-9 w-9 items-center justify-center
                            rounded-lg bg-green-700"
                    >
                      💰
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800">
                        Pricing & Stock
                      </h3>

                      <p class="text-xs text-slate-400">
                        Update price and inventory information
                      </p>
                    </div>

                  </div>


                  <div class="grid grid-cols-1 gap-5 md:grid-cols-3">

                    <!-- Cost -->
                    <div>

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Cost Price
                      </label>

                      <div class="relative">

                        <span
                          class="absolute left-4 top-1/2
                                -translate-y-1/2 text-slate-400"
                        >
                          $
                        </span>

                        <input
                          v-model="productData.costPrice"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4
                                text-sm outline-none transition
                                focus:border-green-500
                                focus:bg-white
                                focus:ring-4 focus:ring-green-100"
                        />

                      </div>

                    </div>


                    <!-- Sale -->
                    <div>

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Sale Price
                      </label>

                      <div class="relative">

                        <span
                          class="absolute left-4 top-1/2
                                -translate-y-1/2 text-slate-400"
                        >
                          $
                        </span>

                        <input
                          v-model="productData.salePrice"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4
                                text-sm outline-none transition
                                focus:border-green-500
                                focus:bg-white
                                focus:ring-4 focus:ring-green-100"
                        />

                      </div>

                    </div>


                    <!-- Stock -->
                    <div>

                      <label
                        class="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Current Stock
                      </label>

                      <input
                        v-model="productData.currentStock"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3
                              text-sm outline-none transition
                              focus:border-green-500
                              focus:bg-white
                              focus:ring-4 focus:ring-green-100"
                      />

                    </div>

                  </div>

                </div>

          </div>
          <!-- ================= IMAGE ================= -->
          <div class=" border-t border-slate-100 w-[40%] ">
  
            <div class="mb-5 flex items-center gap-3">
  
              <div
                class="flex h-9 w-9 items-center justify-center
                       rounded-lg bg-green-700"
              >
                🖼️
              </div>
  
              <div>
                <h3 class="font-bold text-slate-800">
                  Product Image
                </h3>
  
                <p class="text-xs text-slate-400">
                  Change the product image if needed
                </p>
              </div>
  
            </div>
  
  
            <div
              class="flex flex-col gap-5 rounded-2xl
                     border border-slate-200 bg-slate-50
                     p-5 sm:flex-row sm:items-center"
            >
  
              <!-- Image Preview -->
              <div
                class="flex h-32 w-32 shrink-0 items-center
                       justify-center overflow-hidden
                       rounded-2xl border border-slate-200
                       bg-white shadow-sm"
              >
  
                <!-- Existing image -->
                <img
                  v-if="
                    productData.image &&
                    typeof productData.image === 'string'
                  "
                  :src="`http://localhost:2026/uploads/${productData.image}`"
                  alt="Product Image"
                  class="h-full w-full object-cover"
                />
  
                <!-- New selected image -->
                <img
                  v-else-if="
                    productData.image &&
                    typeof productData.image !== 'string'
                  "
                  :src="previewImage"
                  alt="New Product Image"
                  class="h-full w-full object-cover"
                />
  
                <!-- No image -->
                <div
                  v-else
                  class="flex flex-col items-center
                         justify-center text-slate-400"
                >
                  <span class="text-3xl">
                    📷
                  </span>
  
                  <span class="mt-1 text-xs">
                    No Image
                  </span>
                </div>
  
              </div>
  
  
              <!-- Upload -->
              <div class="flex-1">
  
                <label
                  class="flex cursor-pointer flex-col
                         items-center justify-center
                         rounded-xl border-2 border-dashed
                         border-green-200 bg-white
                         px-5 py-6 text-center
                         transition hover:border-green-400
                         hover:bg-green-50"
                >
  
                  <div
                    class="mb-2 flex h-11 w-11
                           items-center justify-center
                           rounded-full bg-green-100
                           text-xl"
                  >
                    📤
                  </div>
  
                  <p class="font-semibold text-green-800">
                    Change Product Image
                  </p>
  
                  <p class="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP
                  </p>
  
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFileUpload"
                    class="hidden"
                  />
  
                </label>
  
              </div>
  
            </div>
  
          </div>
       </div>


        <!-- ================= ACTION BUTTONS ================= -->
        <div
          class="mt-8 flex flex-col-reverse gap-3
                 border-t border-slate-100 pt-6
                 sm:flex-row sm:justify-end"
        >

          <!-- Cancel -->
          <button
            type="button"
            @click="$emit('cancel')"
            class="rounded-xl border border-slate-200
                   bg-white px-6 py-3
                   font-semibold text-slate-600
                   transition hover:bg-slate-100
                   active:scale-95"
          >
            Cancel
          </button>


          <!-- Save -->
          <button
            type="submit"
            :disabled="saving"
            class="flex items-center justify-center gap-2
                   rounded-xl bg-green-700 px-7 py-3
                   font-semibold text-white
                   shadow-lg shadow-green-700/20
                   transition hover:bg-green-800
                   active:scale-95
                   disabled:cursor-not-allowed
                   disabled:opacity-60"
          >

            <span v-if="!saving">
              ✓
            </span>

            <span v-else>
              ⏳
            </span>

            {{ saving ? "Updating..." : "Update Product" }}

          </button>

        </div>

      </form>

    </div>

  </div>
</template>


<script>
import axios from "axios";
import { ref, watch } from "vue";

export default {
  name: "EditProduct",

  props: ["product"],

  emits: ["save", "cancel"],

  setup(props, { emit }) {

    const productData = ref({
      ...props.product,
    });

    const previewImage = ref(null);

    const saving = ref(false);


    // Watch for product changes
    watch(
      () => props.product,
      (newVal) => {

        productData.value = {
          ...newVal,
        };

        previewImage.value = null;

      },
      {
        deep: true,
      }
    );


    // ================= FILE UPLOAD =================

    const handleFileUpload = (e) => {

      const file = e.target.files[0];

      if (!file) return;

      productData.value.image = file;

      previewImage.value =
        URL.createObjectURL(file);

    };


    // ================= SAVE =================

  const save = async () => {
  try {

    const formData = new FormData();

    Object.keys(productData.value).forEach((key) => {

      const value = productData.value[key];

      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }

    });


    const res = await axios.put(
      `http://localhost:2026/api/products/${productData.value._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    // Tell Product.vue that update finished
    emit("save", res.data.data);

  } catch (error) {

    console.error(
      "Error updating product:",
      error
    );

  }
};

    return {
      productData,
      previewImage,
      saving,
      handleFileUpload,
      save,
    };

  },
};
</script>