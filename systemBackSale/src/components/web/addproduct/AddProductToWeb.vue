
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/50 px-10 py-2 backdrop-blur-sm">
    <div class="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <!-- ================= HEADER ================= -->
      <div class="flex shrink-0 items-center justify-between bg-green-600 px-8 py-5">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
            <!-- Plus Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          <div>
            <h2 class="text-xl font-black tracking-tight text-white">
              Add New Product
            </h2>
            <p class="text-sm text-green-100">
              Add a new computer product to your inventory
            </p>
          </div>
        </div>

        <!-- CLOSE -->
        <button
          type="button"
          @click.prevent="closeAddProduct"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- ================= FORM ================= -->
      <form
        @submit.prevent="handleSubmit"
        class="flex min-h-0 flex-1 flex-col"
      >
        <!-- ================= CONTENT ================= -->
        <div class="min-h-0 flex-1 px-8 py-5  overflow-y-scroll">
          <div class="grid h-full grid-cols-[60%_40%] gap-8">

            <!-- ================================================= -->
            <!-- LEFT SIDE - 60% -->
            <!-- ================================================= -->
            <div class="min-w-0">

              <!-- ================= PRODUCT INFORMATION ================= -->
              <section
                class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600"
                  >
                    <!-- Product Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 class="font-bold text-slate-800">
                      Product Information
                    </h3>
                    <p class="text-xs text-slate-400">
                      Basic product details
                    </p>
                  </div>
                </div>

                <div class="space-y-4">
                  <!-- NAME -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Product Name
                      <span class="text-red-500">*</span>
                    </label>

                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="e.g. ASUS ROG Strix G16"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>

                  <!-- DESCRIPTION -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Description
                    </label>

                    <textarea
                      v-model="form.description"
                      rows="2"
                      placeholder="Enter product description..."
                      class="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    ></textarea>
                  </div>

                  <!-- CATEGORY / BRAND / MODEL -->
                  <div class="grid grid-cols-3 gap-4">
                    <!-- CATEGORY -->
                    <div>
                      <label
                        class="mb-1.5 block text-sm font-semibold text-slate-700"
                      >
                        Category
                      </label>

                      <select
                        v-model="form.category"
                        class="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      >
                        <option value="Gaming">Gaming</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Workstation">Workstation</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>

                    <!-- BRAND -->
                    <div>
                      <label
                        class="mb-1.5 block text-sm font-semibold text-slate-700"
                      >
                        Brand
                      </label>

                      <input
                        v-model="form.brand"
                        type="text"
                        placeholder="ASUS"
                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>

                    <!-- MODEL -->
                    <div>
                      <label
                        class="mb-1.5 block text-sm font-semibold text-slate-700"
                      >
                        Model
                      </label>

                      <input
                        v-model="form.model"
                        type="text"
                        placeholder="G16"
                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <!-- ================= SPECIFICATIONS ================= -->
              <section
                class="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600"
                  >
                    <!-- CPU Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect
                        width="16"
                        height="16"
                        x="4"
                        y="4"
                        rx="2"
                      />
                      <rect
                        width="6"
                        height="6"
                        x="9"
                        y="9"
                        rx="1"
                      />
                      <path
                        stroke-linecap="round"
                        d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 class="font-bold text-slate-800">
                      Specifications
                    </h3>
                    <p class="text-xs text-slate-400">
                      Hardware specifications
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <!-- CPU -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      CPU
                    </label>

                    <input
                      v-model="form.cpu"
                      type="text"
                      placeholder="Core i7"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>

                  <!-- RAM -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      RAM
                    </label>

                    <select
                      v-model="form.ram"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    >
                      <option value="">Select RAM</option>
                      <option value="8GB">8 GB</option>
                      <option value="16GB">16 GB</option>
                      <option value="32GB">32 GB</option>
                      <option value="64GB">64 GB</option>
                    </select>
                  </div>

                  <!-- SSD -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Storage
                    </label>

                    <select
                      v-model="form.ssd"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    >
                      <option value="">Select Storage</option>
                      <option value="256GB">256 GB SSD</option>
                      <option value="512GB">512 GB SSD</option>
                      <option value="1TB">1 TB SSD</option>
                      <option value="2TB">2 TB SSD</option>
                    </select>
                  </div>
                </div>
              </section>

              <!-- ================= PRICING ================= -->
             
            </div>

            <!-- ================================================= -->
            <!-- RIGHT SIDE - 40% -->
            <!-- ================================================= -->
             <div class="flex flex-col gap-4">
                  <section
                class=" rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600"
                  >
                    <!-- Dollar Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        stroke-linecap="round"
                        d="M12 7v10m3-7.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 class="font-bold text-slate-800">
                      Pricing
                    </h3>
                    <p class="text-xs text-slate-400">
                      Set product purchase and selling prices
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- COST PRICE -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Cost Price
                    </label>

                    <div class="relative">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400"
                      >
                        $
                      </span>

                      <input
                        v-model.number="form.costPrice"
                        type="number"
                        min="0"
                        placeholder="0.00"
                        class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>

                  <!-- SALE PRICE -->
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Sale Price
                      <span class="text-red-500">*</span>
                    </label>

                    <div class="relative ">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-600"
                      >
                        $
                      </span>

                      <input
                        v-model.number="form.salePrice"
                        type="number"
                        min="0"
                        placeholder="0.00"
                        class="w-full  rounded-xl border border-green-200 bg-green-50/40 py-2.5 pl-8 pr-4 text-sm font-semibold text-green-700 outline-none transition placeholder:text-green-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>
                </div>
              </section>


                <div class="flex  flex-col">
                <section class="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <!-- IMAGE HEADER -->
                    <div class="mb-4 flex items-center justify-between ">
                        <div class="flex items-center gap-3">
                            <div
                            class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600"
                            >
                            <!-- Image Icon -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                                />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 15l-5-5L5 21"
                                />
                            </svg>
                            </div>

                            <div>
                            <h3 class="font-bold text-slate-800">
                                Product Image
                            </h3>

                            <p class="text-xs text-slate-400">
                                Upload product photo
                            </p>
                            </div>
                        </div>

                    <span
                        class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600"
                    >
                        Optional
                    </span>
                    </div>
                    <div class="relative flex min-h-0 flex-1 items-center justify-center  rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-green-300 hover:bg-green-50/30 ">
                    <div v-if="imagePreview"
                        class="relative flex h-full w-full items-center justify-center p-5">
                        <img :src="imagePreview" alt="Product preview"
                            class="w-full h-[200px] rounded-xl object-contain"/>

                        <!-- REMOVE -->
                        <button
                        type="button"
                        @click="removeImage"
                        class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition hover:bg-red-50 hover:text-red-600"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        </button>
                    </div>

                    <!-- UPLOAD STATE -->
                    <div
                        v-else
                        class="flex flex-col items-center justify-center px-8 text-center"
                    >
                        <div
                        class="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-green-600"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.7"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16"
                            />

                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14 8h.01M5 20h14a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v14a1 1 0 001 1z"
                            />
                        </svg>
                        </div>

                        <h4 class="text-base font-bold text-slate-700">
                        Upload Product Image
                        </h4>

                        <p class="mt-1 max-w-xs text-sm leading-5 text-slate-400">
                        PNG, JPG, JPEG or WEBP
                        </p>

                        <p class="mb-5 text-xs text-slate-400">
                        Maximum file size 5MB
                        </p>

                        <button
                        type="button"
                        @click="openFilePicker"
                        class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md active:scale-[0.98]"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 16V4m0 0L8 8m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"
                            />
                        </svg>

                        Choose Image
                        </button>
                    </div>
                    </div>

                    <!-- HIDDEN INPUT -->
                    <input
                    ref="fileInput"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    class="hidden"
                    @change="handleImage"
                    />

                 
                </section>
                </div>
            </div>
          </div>
        </div>

        <!-- ================= FOOTER ================= -->
        <div
          class="flex shrink-0 items-center justify-between border-t border-slate-100 bg-white px-8 py-4"
        >
          <p class="text-xs text-slate-400">
            Fields marked with
            <span class="font-bold text-red-500">*</span>
            are required.
          </p>

          <div class="flex items-center gap-3">
            <!-- CANCEL -->
            <button
              type="button"
              @click="closeModal"
              class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <!-- ADD -->
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>

              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { web } from "../../../sharing/Sharing";
import { reactive, ref, onUnmounted } from "vue";

export default {
  emits: ["close", "add"],
  setup() {
    const form = reactive({
      name: "",
      description: "",
      category: "Gaming",
      brand: "",
      model: "",
      cpu: "",
      ram: "",
      ssd: "",
      image: null,
      costPrice: null,
      salePrice: null,
    });

    const fileInput = ref(null);
    const imagePreview = ref(null);

    /* ================= IMAGE ================= */
    const openFilePicker = () => {
      fileInput.value?.click();
    };

    const handleImage = (event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please select PNG, JPG, JPEG or WEBP image.");
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB.");
        event.target.value = "";
        return;
      }

      if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }

      form.image = file;
      imagePreview.value = URL.createObjectURL(file);
    };

    const removeImage = () => {
      if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }

      imagePreview.value = null;
      form.image = null;

      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };

    /* ================= MODAL ================= */
    const closeModal = () => {
      
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = () => {
      if (!form.name.trim()) {
        alert("Please enter product name.");
        return;
      }

      if (!form.salePrice) {
        alert("Please enter sale price.");
        return;
      }
    };
    const closeAddProduct = ()=>{
      alert(web.viewAddProduct=false)
    }

    /* ================= CLEANUP ================= */
    onUnmounted(() => {
      if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
      }
    });

    return {
      form,
      fileInput,
      imagePreview,
      openFilePicker,
      handleImage,
      removeImage,
      closeModal,
      handleSubmit,
      web,
      closeAddProduct
    };
  },
};
</script>
