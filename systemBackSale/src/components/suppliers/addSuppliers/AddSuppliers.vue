<template>
  <div class="w-screen fixed top-0 left-0 z-40 overflow-y-scroll h-screen rounded-md bg-slate-100 p-4 md:p-8">
    <div class="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-300/40 lg:grid-cols-5">
      <!-- LEFT: brand + progress + live preview -->
      <aside class="relative flex flex-col justify-between overflow-hidden bg-linear-to-br from-emerald-800 via-green-800 to-teal-900 p-8 text-white lg:col-span-2">
        <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"></div>
        <div class="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-emerald-400/10"></div>

        <!-- TOP: back + title -->
        <div class="relative">
          <button
            type="button"
            class="mb-8 flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white"
            @click="router.back()"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            Back
          </button>

          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
            <font-awesome-icon icon="fa-solid fa-truck" />
          </div>
          <h1 class="text-3xl font-bold leading-tight">New Supplier</h1>
          <p class="mt-2 text-sm text-emerald-100/80">
            Add the people and businesses you buy from. Business name and contact must be unique.
          </p>
        </div>

        <!-- MIDDLE: progress + checklist + notes -->
        <div class="relative my-8 hidden space-y-7 lg:block">
          <!-- progress bar -->
          <div>
            <div class="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-emerald-200/70">
              <span>Form progress</span>
              <span>{{ completed }} / {{ requiredFields.length }} required</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-white/15">
              <div
                class="h-full rounded-full bg-emerald-300 transition-all duration-300"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>

          <!-- required fields checklist -->
          <ul class="space-y-3.5">
            <li v-for="item in requiredFields" :key="item.key" class="flex items-start gap-3">
              <font-awesome-icon
                v-if="form[item.key]"
                icon="fa-solid fa-circle-check"
                class="mt-0.5 w-5 text-emerald-300"
              />
              <span v-else class="mt-0.5 h-5 w-5 shrink-0 rounded-full ring-1 ring-white/40"></span>

              <div>
                <p class="text-sm font-semibold" :class="form[item.key] ? 'text-white' : 'text-emerald-50'">
                  {{ item.label }}
                </p>
                <p class="text-xs text-emerald-100/70">{{ item.hint }}</p>
              </div>
            </li>
          </ul>

          <!-- notes -->
          <div class="rounded-2xl bg-white/5 p-4 text-xs leading-relaxed text-emerald-100/80 ring-1 ring-white/10">
            <p class="mb-2 font-semibold text-emerald-50">Good to know</p>
            <ul class="list-disc space-y-1.5 pl-4">
              <li>Business name and contact cannot be used twice.</li>
              <li>The image is optional and can be PNG, JPG, GIF or WEBP, up to 5 MB.</li>
              <li>Use a phone number or email you can reach the supplier on.</li>
            </ul>
          </div>
        </div>

        <!-- BOTTOM: live preview card -->
        <div class="relative">
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-200/70">Live preview</p>

          <div class="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur">
            <div class="flex items-center gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-lg font-bold text-green-800">
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Supplier"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ initials }}</span>
              </div>
              <div class="min-w-0">
                <p class="truncate text-lg font-semibold">
                  {{ form.businessName || "Business name" }}
                </p>
                <p class="truncate text-sm text-emerald-100/80">
                  {{ form.name || "Name" }}
                </p>
              </div>
            </div>

            <div class="mt-4 space-y-2 border-t border-white/15 pt-4 text-sm text-emerald-50">
              <p class="flex items-start gap-3">
                <font-awesome-icon icon="fa-solid fa-phone" class="mt-1 w-4 text-emerald-300" />
                <span class="break-all">{{ form.contact || "Contact" }}</span>
              </p>
              <p class="flex items-start gap-3">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="mt-1 w-4 text-emerald-300" />
                <span>{{ form.address || "Address" }}</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      <!-- RIGHT: form -->
      <section class="p-6 md:p-10 lg:col-span-3">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-slate-800">Supplier details</h2>
          <p class="text-sm text-slate-500">Image is optional, all other fields are required.</p>
        </div>

        <!-- Messages -->
        <div
          v-if="errorMessage"
          class="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
          {{ errorMessage }}
        </div>
        <div
          v-if="successMessage"
          class="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-200"
        >
          <font-awesome-icon icon="fa-solid fa-circle-check" />
          {{ successMessage }}
        </div>

        <form class="space-y-6" novalidate @submit.prevent="submitSupplier">
          <!-- Image upload -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">Supplier Image</label>

            <input
              ref="fileInput"
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              class="hidden"
              @change="onFileChange"
            />

            <div
              class="flex cursor-pointer items-center gap-5 rounded-2xl border-2 border-dashed p-4 transition"
              :class="[
                errors.image ? 'border-red-300 bg-red-50/50' : dragging ? 'border-green-600 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-green-500 hover:bg-green-50/50',
              ]"
              @click="fileInput.click()"
              @dragover.prevent="dragging = true"
              @dragleave.prevent="dragging = false"
              @drop.prevent="onDrop"
            >
              <div class="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-3xl text-slate-300 ring-1 ring-slate-200">
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="h-full w-full object-cover"
                />
                <font-awesome-icon v-else icon="fa-solid fa-image" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-slate-700">
                  {{ imageFile ? imageFile.name : "Click to upload or drag and drop" }}
                </p>
                <p class="mt-1 text-xs text-slate-500">PNG, JPG, GIF or WEBP, up to 5 MB</p>

                <button
                  v-if="imageFile"
                  type="button"
                  class="mt-2 text-xs font-semibold text-red-600 hover:underline"
                  @click.stop="removeImage"
                >
                  Remove image
                </button>
              </div>
            </div>
            <p v-if="errors.image" class="mt-1.5 text-xs font-medium text-red-600">{{ errors.image }}</p>
          </div>

          <!-- Text fields -->
          <div v-for="field in textFields" :key="field.key">
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              {{ field.label }}
            </label>
            <div class="group relative">
              <span
                class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-green-700"
              >
                <font-awesome-icon :icon="field.icon" />
              </span>
              <input
                v-model.trim="form[field.key]"
                type="text"
                :placeholder="field.placeholder"
                class="w-full rounded-2xl border-2 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white"
                :class="errors[field.key]
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-transparent focus:border-green-600'"
              />
            </div>
            <p v-if="errors[field.key]" class="mt-1.5 text-xs font-medium text-red-600">
              {{ errors[field.key] }}
            </p>
          </div>

          <!-- Address -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">Address</label>
            <div class="group relative">
              <span
                class="pointer-events-none absolute left-4 top-4 text-slate-400 transition group-focus-within:text-green-700"
              >
                <font-awesome-icon icon="fa-solid fa-location-dot" />
              </span>
              <textarea
                v-model.trim="form.address"
                rows="3"
                placeholder="Street, city, province..."
                class="w-full resize-none rounded-2xl border-2 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white"
                :class="errors.address
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-transparent focus:border-green-600'"
              ></textarea>
            </div>
            <p v-if="errors.address" class="mt-1.5 text-xs font-medium text-red-600">
              {{ errors.address }}
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="rounded-2xl px-6 py-3 font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="submitting"
              @click="resetForm"
            >
              Clear
            </button>

            <button
              type="submit"
              class="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-green-700 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-green-700/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-700/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="submitting"
            >
              <font-awesome-icon v-if="submitting" icon="fa-solid fa-spinner" spin />
              <font-awesome-icon v-else icon="fa-solid fa-floppy-disk" />
              {{ submitting ? "Saving..." : "Save Supplier" }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const API_URL = "http://localhost:2026/api/suppliers";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB (matches the server)
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

export default {
  name: "AddSupplier",
  setup() {
    const router = useRouter();

    const emptyForm = () => ({
      name: "",
      businessName: "",
      address: "",
      contact: "",
    });

    // key must match the model field names
    const textFields = [
      { key: "name", label: "Name", icon: "fa-solid fa-user", placeholder: "Full name" },
      { key: "businessName", label: "Business Name", icon: "fa-solid fa-building", placeholder: "e.g. Green Valley Trading" },
      { key: "contact", label: "Contact", icon: "fa-solid fa-phone", placeholder: "Phone number or email" },
    ];

    // used by the progress block in the left panel
    const requiredFields = [
      { key: "name", label: "Name", hint: "The person you deal with" },
      { key: "businessName", label: "Business name", hint: "Must be unique" },
      { key: "contact", label: "Contact", hint: "Phone number or email, must be unique" },
      { key: "address", label: "Address", hint: "Street, city and province" },
    ];

    const form = reactive(emptyForm());
    const errors = reactive({ name: "", businessName: "", address: "", contact: "", image: "" });
    const submitting = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    let redirectTimer = null;

    // image state
    const fileInput = ref(null);
    const imageFile = ref(null);
    const imagePreview = ref("");
    const dragging = ref(false);

    const initials = computed(() => {
      const source = form.businessName || form.name;
      if (!source) return "?";
      return source
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
    });

    const completed = computed(() => requiredFields.filter((f) => form[f.key]).length);
    const progress = computed(() => Math.round((completed.value / requiredFields.length) * 100));

    const revokePreview = () => {
      if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    };

    const setImage = (file) => {
      errors.image = "";
      if (!file) return;

      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.image = "Only PNG, JPG, GIF or WEBP images are allowed.";
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        errors.image = "Image must be 5 MB or smaller.";
        return;
      }

      revokePreview();
      imageFile.value = file;
      imagePreview.value = URL.createObjectURL(file);
    };

    const onFileChange = (e) => {
      setImage(e.target.files[0]);
      e.target.value = ""; // allow choosing the same file again
    };

    const onDrop = (e) => {
      dragging.value = false;
      setImage(e.dataTransfer.files[0]);
    };

    const removeImage = () => {
      revokePreview();
      imageFile.value = null;
      imagePreview.value = "";
      errors.image = "";
    };

    const clearErrors = () => {
      Object.keys(errors).forEach((k) => (errors[k] = ""));
      errorMessage.value = "";
    };

    // image errors are only set when a bad file is picked (and that file is not kept),
    // so they must not block saving
    const validate = () => {
      clearErrors();

      if (!form.name) errors.name = "Name is required.";
      if (!form.businessName) errors.businessName = "BusinessName is required.";
      if (!form.address) errors.address = "Address is required.";
      if (!form.contact) errors.contact = "Contact is required.";

      return !(errors.name || errors.businessName || errors.address || errors.contact);
    };

    const resetForm = () => {
      Object.assign(form, emptyForm());
      removeImage();
      clearErrors();
      successMessage.value = "";
    };

    const submitSupplier = async () => {
      successMessage.value = "";
      if (!validate()) return;

      // field names must match upload.single("image") and the model
      const data = new FormData();
      data.append("name", form.name);
      data.append("businessName", form.businessName);
      data.append("address", form.address);
      data.append("contact", form.contact);
      if (imageFile.value) data.append("image", imageFile.value);

      submitting.value = true;
      try {
        // do not set Content-Type manually, axios adds the multipart boundary
        await axios.post(API_URL, data);
        successMessage.value = "Supplier added successfully.";
        Object.assign(form, emptyForm());
        removeImage();

        // keep the buttons disabled until we leave the page
        redirectTimer = setTimeout(() => router.push("/suppliers"), 1000);
      } catch (error) {
        // the server returns { success:false, message } (409 for duplicates)
        errorMessage.value = error.response?.data?.message || error.message;
        submitting.value = false;
      }
    };

    onBeforeUnmount(() => {
      clearTimeout(redirectTimer);
      revokePreview();
    });

    return {
      router,
      form,
      errors,
      textFields,
      requiredFields,
      completed,
      progress,
      initials,
      submitting,
      errorMessage,
      successMessage,
      fileInput,
      imageFile,
      imagePreview,
      dragging,
      onFileChange,
      onDrop,
      removeImage,
      resetForm,
      submitSupplier,
    };
  },
};
</script>