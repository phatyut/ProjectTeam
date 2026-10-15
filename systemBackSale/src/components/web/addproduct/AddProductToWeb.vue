<template>
  <div class="fixed inset-0 z-50 overflow-y-auto bg-linear-to-br from-emerald-600 via-green-800 to-teal-950 text-white">
    <!-- soft colour blobs behind the glass -->
    <div class="pointer-events-none fixed -left-24 -top-24 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl"></div>
    <div class="pointer-events-none fixed -bottom-32 right-0 h-112 w-md rounded-full bg-teal-300/25 blur-3xl"></div>
    <div class="pointer-events-none fixed left-1/3 top-1/2 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl"></div>

    <div class="relative mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-8">
      <!-- header -->
      <header class="flex items-center gap-4">
        <button
          type="button"
          @click="close"
          aria-label="Back to products"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ isEdit ? 'Edit product' : 'Add product to web' }}</h1>
          <p class="text-sm text-white/70">Fill in the details. The card on the right shows how customers will see it.</p>
        </div>
      </header>

      <form @submit.prevent="handleSubmit" novalidate class="space-y-6">
        <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <!-- ================= LEFT: FORM ================= -->
          <div class="space-y-6">
            <!-- BASICS -->
            <section :class="glass">
              <h2 :class="sectionTitle">
                <span :class="iconBox"><i class="fa-solid fa-box"></i></span>
                Basics
              </h2>

              <div class="space-y-4">
                <div>
                  <label :class="label" for="title">Title <span class="text-lime-300">*</span></label>
                  <input
                    id="title"
                    v-model="form.title"
                    type="text"
                    placeholder="e.g. ASUS ROG Strix G16"
                    :class="[input, errors.title && 'border-red-300 bg-red-400/10']"
                    @input="errors.title = ''"
                  />
                  <p v-if="errors.title" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.title }}</p>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label :class="label" for="brand">Brand <span class="text-lime-300">*</span></label>
                    <input
                      id="brand"
                      v-model="form.brand"
                      type="text"
                      placeholder="ASUS"
                      :class="[input, errors.brand && 'border-red-300 bg-red-400/10']"
                      @input="errors.brand = ''"
                    />
                    <p v-if="errors.brand" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.brand }}</p>
                  </div>
                  <div>
                    <label :class="label" for="model">Model <span class="text-lime-300">*</span></label>
                    <input
                      id="model"
                      v-model="form.model"
                      type="text"
                      placeholder="G614JV"
                      :class="[input, errors.model && 'border-red-300 bg-red-400/10']"
                      @input="errors.model = ''"
                    />
                    <p v-if="errors.model" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.model }}</p>
                  </div>
                </div>

                <div>
                  <label :class="label" for="description">Description</label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="3"
                    placeholder="A short summary for the product page"
                    :class="[input, 'resize-none']"
                  ></textarea>
                </div>
              </div>
            </section>

            <!-- SPECS -->
            <section :class="glass">
              <h2 :class="sectionTitle">
                <span :class="iconBox"><i class="fa-solid fa-microchip"></i></span>
                Specifications
              </h2>

              <div class="space-y-4">
                <div>
                  <label :class="label" for="cpu">Processor <span class="text-lime-300">*</span></label>
                  <input
                    id="cpu"
                    v-model="form.cpu"
                    type="text"
                    placeholder="Core i7-13650HX"
                    :class="[input, errors.cpu && 'border-red-300 bg-red-400/10']"
                    @input="errors.cpu = ''"
                  />
                  <p v-if="errors.cpu" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.cpu }}</p>
                </div>

                <div id="ram">
                  <span :class="label">Memory <span class="text-lime-300">*</span></span>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="r in ramList"
                      :key="r"
                      type="button"
                      @click="form.ram = form.ram === r ? '' : r; errors.ram = ''"
                      :aria-pressed="form.ram === r"
                      :class="chip(form.ram === r)"
                    >
                      {{ r.replace('GB', ' GB') }}
                    </button>
                  </div>
                  <p v-if="errors.ram" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.ram }}</p>
                </div>

                <div>
                  <label :class="label" for="ssd">Storage (SSD) <span class="text-lime-300">*</span></label>
                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      v-for="s in ssdOptions"
                      :key="s.gb"
                      type="button"
                      @click="form.ssd = s.gb; errors.ssd = ''"
                      :aria-pressed="form.ssd === s.gb"
                      :class="chip(form.ssd === s.gb)"
                    >
                      {{ s.text }}
                    </button>
                    <div class="relative w-36">
                      <input
                        id="ssd"
                        v-model.number="form.ssd"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Other"
                        :class="[input, 'pr-10', errors.ssd && 'border-red-300 bg-red-400/10']"
                        @input="errors.ssd = ''"
                      />
                      <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/60">GB</span>
                    </div>
                  </div>
                  <p v-if="errors.ssd" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.ssd }}</p>
                  <p v-else class="mt-1.5 text-xs text-white/50">Size in GB. 1 TB is 1024.</p>
                </div>
              </div>
            </section>

            <!-- PRICING -->
            <section :class="glass">
              <h2 :class="sectionTitle">
                <span :class="iconBox"><i class="fa-solid fa-tag"></i></span>
                Price and deals
              </h2>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label :class="label" for="sale">Sale price <span class="text-lime-300">*</span></label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-lime-200">$</span>
                    <input
                      id="sale"
                      v-model.number="form.salePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      :class="[input, 'pl-8 text-base font-bold', errors.salePrice && 'border-red-300 bg-red-400/10']"
                      @input="errors.salePrice = ''"
                    />
                  </div>
                  <p v-if="errors.salePrice" class="mt-1.5 text-xs font-medium text-red-200">{{ errors.salePrice }}</p>
                  <p v-else class="mt-1.5 text-xs text-white/50">What customers pay.</p>
                </div>

                <div>
                  <label :class="label" for="deals">Deals</label>
                  <input id="deals" v-model.number="form.deals" type="number" min="0" step="1" placeholder="1" :class="input" />
                </div>

                <div>
                  <label :class="label" for="timeOfDeals">Deal ends</label>
                  <input id="timeOfDeals" v-model="form.timeOfDeals" type="date" :class="[input, 'scheme-dark']" />
                  <p class="mt-1.5 text-xs text-white/50">Leave empty for no end date.</p>
                </div>
              </div>
            </section>
          </div>

          <!-- ================= RIGHT: FLOATING GLASS PREVIEW ================= -->
          <aside class="lg:sticky lg:top-8">
            <div class="rounded-3xl border border-white/25 bg-white/15 p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <p class="mb-3 flex items-center gap-2 px-1 text-sm font-medium text-white/90">
                <span class="h-2 w-2 rounded-full bg-lime-300"></span>
                Live preview
              </p>

              <!-- image stage = upload -->
              <div
                role="button"
                tabindex="0"
                :aria-label="imagePreview ? 'Change product image' : 'Upload product image'"
                @click="openFilePicker"
                @keydown.enter.prevent="openFilePicker"
                @keydown.space.prevent="openFilePicker"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
                @drop.prevent="onDrop"
                class="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl transition focus-visible:outline-2 focus-visible:outline-white"
                :class="[
                  imagePreview ? 'bg-white/10' : 'border-2 border-dashed border-white/30 bg-white/5 hover:border-white/60 hover:bg-white/10',
                  dragging && 'border-lime-300 bg-lime-300/10',
                ]"
              >
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Product preview"
                  class="h-full w-full object-contain p-3 drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]"
                />

                <div v-else class="px-6 text-center">
                  <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                  </div>
                  <p class="mt-3 text-sm font-semibold">Drop a product photo here</p>
                  <p class="mt-1 text-xs text-white/60">or click to browse. PNG, JPG or WEBP, up to 5 MB.</p>
                </div>

                <template v-if="imagePreview">
                  <!-- Remove only appears for a newly chosen image; it goes back to the saved one when editing -->
                  <button
                    v-if="form.image"
                    type="button"
                    @click.stop="removeImage"
                    class="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-red-100 backdrop-blur transition hover:bg-red-500/40"
                  >
                    <i class="fa-solid fa-trash-can mr-1"></i>{{ isEdit ? 'Undo' : 'Remove' }}
                  </button>
                  <span class="absolute inset-x-0 bottom-0 bg-black/40 py-1.5 text-center text-xs font-medium opacity-0 backdrop-blur transition group-hover:opacity-100">
                    Click to change image
                  </span>
                </template>
              </div>

              <!-- image feedback: shown right under the picture so it is not missed -->
              <p v-if="form.image" class="mt-2 truncate px-1 text-xs text-lime-200" :title="form.image.name">
                <i class="fa-solid fa-circle-check mr-1"></i>New image selected: {{ form.image.name }}
              </p>
              <p v-if="imageError" class="mt-2 px-1 text-xs font-medium text-red-200">
                <i class="fa-solid fa-circle-exclamation mr-1"></i>{{ imageError }}
              </p>

              <!-- details as they will appear -->
              <div class="space-y-2 px-1 pb-1 pt-4">
                <div class="flex flex-wrap items-center gap-2 text-xs font-medium">
                  <span v-if="form.brand" class="rounded-full bg-white/20 px-2.5 py-1">{{ form.brand }}</span>
                  <span v-if="form.model" class="rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/20">{{ form.model }}</span>
                </div>

                <h3 class="text-2xl font-bold leading-tight tracking-tight" :class="form.title ? 'text-white' : 'text-white/30'">
                  {{ form.title || 'Product title' }}
                </h3>

                <div v-if="specChips.length" class="flex flex-wrap gap-1.5">
                  <span v-for="s in specChips" :key="s" class="rounded-lg bg-black/15 px-2 py-1 text-xs text-white/85">{{ s }}</span>
                </div>
                <p v-else class="text-xs text-white/40">Processor, memory and storage appear here.</p>

                <div class="flex flex-wrap items-end justify-between gap-3 border-t border-white/15 pt-3">
                  <span class="text-3xl font-extrabold tracking-tight" :class="form.salePrice ? 'text-white' : 'text-white/30'">
                    {{ money(form.salePrice) }}
                  </span>
                  <span class="rounded-full bg-lime-300/25 px-3 py-1 text-xs font-medium text-lime-100">
                    {{ dealText }}
                  </span>
                </div>
              </div>
            </div>

            <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleImage" />
          </aside>
        </div>

        <!-- action bar -->
        <div class="flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
          <p v-if="serverError" class="min-w-0 flex-1 truncate text-sm font-medium text-red-200" :title="serverError">
            <i class="fa-solid fa-circle-exclamation mr-1"></i>{{ serverError }}
          </p>
          <p v-else class="flex-1 text-xs text-white/60"><span class="font-bold text-lime-300">*</span> Required</p>

          <button
            type="button"
            @click="close"
            class="rounded-xl px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-green-900 shadow-lg shadow-black/20 transition hover:bg-lime-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <i v-if="submitting" class="fa-solid fa-spinner fa-spin"></i>
            <i v-else :class="isEdit ? 'fa-solid fa-check' : 'fa-solid fa-plus'"></i>
            {{ submitting ? 'Saving...' : isEdit ? 'Save changes' : 'Add to web' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref, computed, nextTick, onMounted, onUnmounted } from "vue";

const API_URL = "http://localhost:2026/api/web";
const IMG_BASE = "http://localhost:2026/uploadsWebsite/"; // where multer saves the images
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default {
  emits: ["close", "add"],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();

    // /website/addProductToWeb?id=...  means edit mode
    const productId = route.query.id || null;
    const isEdit = computed(() => !!productId);

    /* ---------- static options & shared classes ---------- */
    const ramOptions = ["8GB", "16GB", "32GB", "64GB"];
    const ssdOptions = [
      { gb: 256, text: "256 GB" },
      { gb: 512, text: "512 GB" },
      { gb: 1024, text: "1 TB" },
      { gb: 2048, text: "2 TB" },
    ];

    const glass = "rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl shadow-black/10 backdrop-blur-xl";
    const sectionTitle = "mb-5 flex items-center gap-3 text-lg font-semibold";
    const iconBox = "flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-base";
    const label = "mb-1.5 block text-sm font-medium text-white/90";
    const input =
      "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 hover:border-white/40 focus:border-white/70 focus:bg-white/15 focus:ring-4 focus:ring-white/15";

    const chip = (active) => [
      "rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-white",
      active
        ? "bg-white text-green-900 shadow-md shadow-black/15"
        : "border border-white/20 bg-white/10 text-white/90 hover:bg-white/20",
    ];

    /* ---------- state ---------- */
    const form = reactive({
      title: "",
      brand: "",
      model: "",
      description: "",
      cpu: "",
      ram: "",
      ssd: null, // size in GB
      salePrice: null,
      deals: 1,
      timeOfDeals: "", // yyyy-mm-dd
      image: null, // only a NEW file chosen in this form
    });

    const errors = reactive({ title: "", brand: "", model: "", cpu: "", ram: "", ssd: "", salePrice: "" });
    const serverError = ref("");
    const imageError = ref(""); // problems with the chosen image (type, size, missing)
    const submitting = ref(false);
    const dragging = ref(false);
    const fileInput = ref(null);
    const imagePreview = ref(null);
    const savedImageUrl = ref(null); // image already saved on the server (edit mode)

    /* ---------- derived values ---------- */
    const money = (n) => `$${Number(n || 0).toFixed(2)}`;

    // a saved value like "12GB" still shows up as a chip when editing
    const ramList = computed(() =>
      form.ram && !ramOptions.includes(form.ram) ? [...ramOptions, form.ram] : ramOptions
    );

    const ssdLabel = computed(() => {
      const n = Number(form.ssd);
      if (!n) return "";
      return n >= 1024 && n % 1024 === 0 ? `${n / 1024} TB SSD` : `${n} GB SSD`;
    });

    const specChips = computed(() =>
      [form.cpu.trim(), form.ram ? form.ram.replace("GB", " GB") : "", ssdLabel.value].filter(Boolean)
    );

    const dealText = computed(() => {
      const n = form.deals === "" || form.deals === null ? 0 : form.deals;
      const base = `${n} ${Number(n) === 1 ? "deal" : "deals"}`;
      if (!form.timeOfDeals) return base;
      return `${base}, ends ${new Date(form.timeOfDeals).toLocaleDateString()}`;
    });

    /* ---------- image ---------- */
    const revokePreview = () => {
      if (imagePreview.value?.startsWith("blob:")) URL.revokeObjectURL(imagePreview.value);
    };

    const openFilePicker = () => fileInput.value?.click();

    const setImage = (file) => {
      if (!file) return;

      if (!ALLOWED_TYPES.includes(file.type)) {
        imageError.value = "Choose a PNG, JPG or WEBP image.";
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        imageError.value = "That image is over 5 MB. Choose a smaller one.";
        return;
      }

      imageError.value = "";
      revokePreview();
      form.image = file;
      imagePreview.value = URL.createObjectURL(file);
    };

    const handleImage = (event) => {
      setImage(event.target.files?.[0]);
      event.target.value = ""; // lets the same file be picked again after removing it
    };

    const onDrop = (event) => {
      dragging.value = false;
      setImage(event.dataTransfer?.files?.[0]);
    };

    // drops the newly chosen image; in edit mode it goes back to the saved one
    const removeImage = () => {
      imageError.value = "";
      revokePreview();
      form.image = null;
      imagePreview.value = savedImageUrl.value;
    };

    /* ---------- edit mode: load the product ---------- */
    const loadProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/${productId}`);
        const p = res.data.data;

        ["title", "brand", "model", "description", "cpu", "ram", "ssd", "salePrice", "deals"].forEach((key) => {
          if (p[key] !== undefined && p[key] !== null) form[key] = p[key];
        });
        form.timeOfDeals = p.timeOfDeals ? String(p.timeOfDeals).slice(0, 10) : "";

        if (p.image) {
          savedImageUrl.value = IMG_BASE + p.image.split(/[\\/]/).pop();
          imagePreview.value = savedImageUrl.value;
        }
      } catch (error) {
        console.error("Load web product error:", error);
        serverError.value = error.response?.data?.message || "Could not load this product.";
      }
    };

    /* ---------- navigation ---------- */
    const close = () => {
      router.replace("/website");
    };

    const onKeydown = (e) => {
      if (e.key === "Escape" && !submitting.value) close();
    };
    onMounted(() => {
      window.addEventListener("keydown", onKeydown);
      if (productId) loadProduct();
    });

    /* ---------- submit ---------- */
    // every field marked * is required by the database model too
    const validate = () => {
      errors.title = form.title.trim() ? "" : "Enter a title.";
      errors.brand = form.brand.trim() ? "" : "Enter the brand.";
      errors.model = form.model.trim() ? "" : "Enter the model.";
      errors.cpu = form.cpu.trim() ? "" : "Enter the processor.";
      errors.ram = form.ram ? "" : "Choose the memory size.";
      errors.ssd = form.ssd > 0 ? "" : "Enter the storage size in GB.";
      errors.salePrice = form.salePrice > 0 ? "" : "Enter a sale price above 0.";

      const imageMissing = !isEdit.value && !form.image;
      imageError.value = imageMissing ? "Add a product photo." : "";

      const order = [
        ["title", "title"],
        ["brand", "brand"],
        ["model", "model"],
        ["cpu", "cpu"],
        ["ram", "ram"],
        ["ssd", "ssd"],
        ["salePrice", "sale"],
      ];
      const firstBad = order.find(([key]) => errors[key]);
      if (firstBad) {
        nextTick(() => {
          const el = document.getElementById(firstBad[1]);
          el?.scrollIntoView({ block: "center", behavior: "smooth" });
          el?.focus?.();
        });
      }
      return !firstBad && !imageMissing;
    };

    const handleSubmit = async () => {
      serverError.value = "";
      imageError.value = "";
      if (!validate()) return;

      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "image") return;
        // empty fields are sent as "" so the server can clear them when editing
        fd.append(key, value === null ? "" : value);
      });
      if (form.image) fd.append("image", form.image); // field name must be "image"

      submitting.value = true;
      try {
        // multipart header is set on purpose: a global JSON header on axios would make the server see an empty body
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = isEdit.value
          ? await axios.put(`${API_URL}/${productId}`, fd, config)
          : await axios.post(API_URL, fd, config);

        if (res.data?.connect === false) {
          serverError.value = res.data.message || "Could not save the product.";
          return;
        }
        emit("add", res.data?.data);
        close();
      } catch (error) {
        console.error("Save web product error:", error);
        serverError.value =
          error.response?.data?.message || "Could not save the product. Check the server and try again.";
      } finally {
        submitting.value = false;
      }
    };

    /* ---------- cleanup ---------- */
    onUnmounted(() => {
      window.removeEventListener("keydown", onKeydown);
      revokePreview();
    });

    return {
      ramList, ssdOptions,
      glass, sectionTitle, iconBox, label, input, chip,
      form, errors, serverError, imageError, submitting, dragging,
      fileInput, imagePreview, isEdit,
      money, specChips, dealText,
      openFilePicker, handleImage, onDrop, removeImage,
      close, handleSubmit,
    };
  },
};
</script>