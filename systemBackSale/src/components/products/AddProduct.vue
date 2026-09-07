<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center bg-green-800 backdrop-blur-sm p-4">
    <div class="w-full max-w-[80%] max-h-[92vh]  px-2 bg-slate-50 shadow-2xl rounded-2xl pt-2 overflow-hidden inset-shadow-[0px_0px_5px] inset-shadow-slate-100">
      <div class="sticky top-0 z-20 flex items-center justify-between bg-green-700 shadow-[0px_0px_1px] shadow-black rounded-2xl  px-5  py-5 text-white">
        <div class="flex items-center gap-4">
          <div  class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl ring-1 ring-white/20">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </div>

          <div>
              <h2 class="text-xl font-bold">
                Add New Product
              </h2>

              <p class="mt-1 text-sm text-green-100">
                Add a new product to your inventory
              </p>
          </div>

        </div>


        <!-- Close -->
        <button
                type="button"
                @click="$emit('cancel')"
                class="flex h-9 w-9 items-center justify-center
                      rounded-full bg-white/10 text-lg
                      transition hover:bg-white/20 " >
                ✕
        </button>
      </div>


      <!-- ================= FORM ================= -->
      <form
        @submit.prevent="save" class="p-6">
        <div class="flex gap-8   justify-between">

          <div class="flex flex-col" >
              <div class="">
                <div class="mb-5 flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center  rounded-lg bg-green-700" >
                      📦
                  </div>
                  <div>
                    <h3 class="font-bold text-slate-800">
                      Product Information
                    </h3>
                    <p class="text-xs text-slate-400">
                      Enter basic information about the product
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <!-- Product Name -->
                  <div>
                      <label  class="mb-2 block text-sm font-semibold text-slate-700">
                          Product Name
                      </label>
                      <input  v-model="newProduct.name"  required
                              type="text" placeholder="Enter product name"
                              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition
                                    placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-700" >
                      Product Code
                    </label>
                    <input
                      v-model="newProduct.productCode"  type="text"
                      placeholder="e.g. PC-001" required
                      class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
                            text-slate-700 outline-none transition placeholder:text-slate-400
                            focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-700">
                          Category
                    </label>
                    <select v-model="newProduct.category" required
                      class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition
                            focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100">
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
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-700">
                          Branch
                    </label>
                    <select v-model="newProduct.branch" required
                            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition
                                  focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100">
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
              <div class="mt-8 border-t border-slate-100 pt-7">
                <div class="mb-5 flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700">💰 </div>
                  <div>
                    <h3 class="font-bold text-slate-800">
                      Pricing & Stock
                    </h3>
                    <p class="text-xs text-slate-400">
                      Set pricing and available inventory
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <!-- Cost Price -->
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-700">
                      Cost Price
                    </label>
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"> $ </span>
                      <input  v-model="newProduct.costPrice" type="number" min="0" step="0.01"
                        placeholder="0.00" required
                        class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-sm outline-none transition
                              focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"/>
                    </div>
                  </div>
                  <!-- Sale Price -->
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-700">
                      Sale Price
                    </label>
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"> $</span>
                      <input v-model="newProduct.salePrice" type="number"
                            min="0" step="0.01"  placeholder="0.00" required
                            class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-sm outline-none transition
                                  focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
                    </div>
                  </div>
                  <!-- Stock -->
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-700">
                      Current Stock
                    </label>
                    <input
                      v-model="newProduct.currentStock" type="number"
                      min="0" placeholder="0" required
                      class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition
                            focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
                  </div>
                </div>
              </div>
          </div>

<!-- parse -->
          <div class="  w-[45%]  ">
            <div class="mb-5 flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700" > 🖼️ </div>
              <div>
                <h3 class="font-bold text-slate-800">
                  Product Image
                </h3>
                <p class="text-xs text-slate-400">
                  Upload an image for this product
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
              <!-- Image Preview -->
              <div class="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden 
                       rounded-2xl border border-slate-200 bg-white shadow-sm" >
  
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  alt="Product Preview" class="h-full w-full object-cover"/>
  
                <div v-else class="flex flex-col items-center justify-center text-slate-400" >
                  <span class="text-3xl ">
                    📷
                  </span>
                  <span class="mt-1 text-xs">
                    Preview
                  </span>
                </div>
              </div>
              <!-- Upload Area -->
              <div class="flex-1">
                <label  class="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed
                         border-green-200 bg-white px-5 py-7 text-center transition hover:border-green-400 hover:bg-green-50" >
                  <div class="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-xl">📤 </div>
                  <p class="font-semibold text-green-800">
                    Click to upload image
                  </p>
                  <p class="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP
                  </p>
                  <input type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
                </label>
              </div>
            </div>
          </div>
          <!-- ================= BUTTONS ================= -->
        </div>




        <div  class="mt-8 flex flex-col-reverse gap-3 border-t  border-slate-100 pt-6 sm:flex-row sm:justify-end" >
        <!-- Cancel -->
          <button type="button" @click="$emit('cancel')"
                   class="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95">
                 Cancel
          </button>
          <!-- Save -->
          <button type="submit" :disabled="saving"
                  class="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3 font-semibold text-white shadow-lg shadow-green-700/20
                        transition hover:bg-green-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">

            <span v-if="!saving"> ✓  </span>
            <span v-else> ⏳ </span>
                 {{ saving ? "Saving..." : "Save Product" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "AddProduct",

  emits: ["save", "cancel"],

  setup(props, { emit }) {

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

    const saving = ref(false);


    // ================= FILE UPLOAD =================

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      newProduct.value.image = file;
      previewImage.value =
        URL.createObjectURL(file);

    };


    // ================= SAVE =================

   const save = async () => {
  try {

    const formData = new FormData();

    Object.keys(newProduct.value).forEach((key) => {
      const value = newProduct.value[key];

      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });


    const res = await axios.post(
      "http://localhost:2026/api/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    // Tell Product.vue that saving finished
    emit("save", res.data.data);

  } catch (error) {

    console.error(
      "Error creating product:",
      error
    );

  }
};


    return {
      newProduct,
      previewImage,
      saving,
      handleFileUpload,
      save,
    };

  },
};
</script>