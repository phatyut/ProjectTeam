<template>
  <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-100">
    <!-- ================= TOP BAR ================= -->
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="router.push('/users')"
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            aria-label="Back to employees"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
          </button>
          <div>
            <h1 class="text-lg font-bold text-slate-900">Edit employee</h1>
            <p class="text-xs text-slate-500">Update profile, role and photo</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span
            v-if="hasChanges"
            class="hidden items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 sm:inline-flex"
          >
            <span class="h-2 w-2 rounded-full bg-amber-500"></span>
            Unsaved changes
          </span>
          <button
            type="submit"
            form="edit-employee-form"
            :disabled="saving || loading || !hasChanges"
            class="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <font-awesome-icon :icon="saving ? 'fa-solid fa-spinner' : 'fa-solid fa-check'" :spin="saving" />
            {{ saving ? "Saving..." : "Save changes" }}
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-350 px-4 py-8 sm:px-6 lg:px-8">
      <!-- ================= LOADING ================= -->
      <div v-if="loading" class="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div class="h-115 animate-pulse rounded-3xl bg-white"></div>
        <div class="h-115 animate-pulse rounded-3xl bg-white"></div>
      </div>

      <!-- ================= LOAD ERROR ================= -->
      <div v-else-if="loadError" class="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="text-xl" />
        </div>
        <h2 class="mt-4 text-lg font-bold text-slate-900">Could not load employee</h2>
        <p class="mt-1 text-sm text-slate-500">{{ loadError }}</p>
        <button
          type="button"
          @click="router.push('/users')"
          class="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Back to employees
        </button>
      </div>

      <!-- ================= CONTENT ================= -->
      <div v-else class="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <!-- ---------- LEFT: PROFILE CARD ---------- -->
        <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div class="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div class="relative h-28 bg-gradient-to-br from-green-900 via-green-700 to-emerald-500">
              <div class="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10"></div>
              <div class="absolute -bottom-14 left-6 h-32 w-32 rounded-full bg-emerald-300/10"></div>
            </div>

            <div class="px-6 pb-6">
              <!-- AVATAR -->
              <div class="-mt-14 flex justify-center">
                <div class="group relative">
                  <div class="h-28 w-28 overflow-hidden rounded-3xl bg-slate-100 shadow-xl ring-4 ring-white">
                    <img
                      v-if="displayImage"
                      :src="displayImage"
                      alt="Employee photo"
                      class="h-full w-full object-cover"
                      @error="imageBroken = true"
                    />
                    <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-slate-100 text-green-600">
                      <font-awesome-icon icon="fa-solid fa-user" class="text-4xl" />
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="openFile"
                    class="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-green-700 text-white shadow-lg ring-4 ring-white transition hover:bg-green-800"
                    aria-label="Change photo"
                  >
                    <font-awesome-icon icon="fa-solid fa-camera" class="text-sm" />
                  </button>
                </div>
              </div>

              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleImage"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              />

              <!-- NAME -->
              <div class="mt-6 text-center">
                <h2 class="truncate text-xl font-bold text-slate-900">
                  {{ form.name || "Employee name" }}
                </h2>
                <p class="mt-1 truncate text-sm text-slate-500">
                  {{ form.position || "Position" }}
                </p>
                <span
                  class="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                  :class="roleBadge"
                >
                  <font-awesome-icon :icon="roleIcon" />
                  {{ form.role || "No role" }}
                </span>
              </div>

              <!-- PHOTO ACTIONS -->
              <div class="mt-6 space-y-2">
                <button
                  type="button"
                  @click="openFile"
                  class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
                  {{ newImage ? "Choose a different photo" : "Change photo" }}
                </button>

                <button
                  v-if="newImage"
                  type="button"
                  @click="cancelNewImage"
                  class="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <font-awesome-icon icon="fa-solid fa-rotate-left" />
                  Keep current photo
                </button>

                <p class="pt-1 text-center text-xs text-slate-400">PNG, JPG, GIF or WEBP, up to 5MB</p>
              </div>

              <!-- QUICK FACTS -->
              <dl class="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                <div class="rounded-2xl bg-slate-50 p-3">
                  <dt class="text-xs font-medium text-slate-500">Age</dt>
                  <dd class="mt-0.5 font-bold text-slate-900">{{ form.age || "-" }}</dd>
                </div>
                <div class="rounded-2xl bg-slate-50 p-3">
                  <dt class="text-xs font-medium text-slate-500">Sex</dt>
                  <dd class="mt-0.5 font-bold text-slate-900">{{ form.sex || "-" }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>

        <!-- ---------- RIGHT: FORM ---------- -->
        <form id="edit-employee-form" @submit.prevent="updateEmployee" class="space-y-6">
          <!-- PERSONAL -->
          <section class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div class="mb-6 flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <font-awesome-icon icon="fa-solid fa-user" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900">Personal information</h3>
                <p class="text-xs text-slate-500">Name, contact and basic details</p>
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="md:col-span-2">
                <label for="name" class="mb-1.5 block text-sm font-semibold text-slate-700">Full name</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-user" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="name" v-model="form.name" type="text" required placeholder="Enter full name" :class="inputClass" />
                </div>
              </div>

              <div>
                <label for="phone" class="mb-1.5 block text-sm font-semibold text-slate-700">Phone number</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-phone" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="phone" v-model="form.phone" type="tel" required placeholder="012 345 678" :class="inputClass" />
                </div>
              </div>

              <div>
                <label for="age" class="mb-1.5 block text-sm font-semibold text-slate-700">Age</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-cake-candles" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="age" v-model="form.age" type="number" min="16" max="100" required placeholder="25" :class="inputClass" />
                </div>
              </div>

              <div class="md:col-span-2">
                <span class="mb-1.5 block text-sm font-semibold text-slate-700">Sex</span>
                <div class="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
                  <label v-for="option in sexOptions" :key="option.value" class="cursor-pointer">
                    <input v-model="form.sex" type="radio" :value="option.value" class="peer sr-only" />
                    <div
                      class="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-green-500"
                    >
                      <font-awesome-icon :icon="option.icon" />
                      {{ option.value }}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- JOB -->
          <section class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div class="mb-6 flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <font-awesome-icon icon="fa-solid fa-briefcase" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900">Job details</h3>
                <p class="text-xs text-slate-500">Position, pay and start date</p>
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="md:col-span-2">
                <label for="position" class="mb-1.5 block text-sm font-semibold text-slate-700">Position</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-briefcase" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="position" v-model="form.position" type="text" required placeholder="e.g. Sales Manager" :class="inputClass" />
                </div>
              </div>

              <div>
                <label for="salary" class="mb-1.5 block text-sm font-semibold text-slate-700">Salary</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-dollar-sign" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="salary" v-model="form.salary" type="number" min="0" step="any" required placeholder="0" :class="inputClass" />
                </div>
              </div>

              <div>
                <label for="startWork" class="mb-1.5 block text-sm font-semibold text-slate-700">Start date</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-calendar-days" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="startWork" v-model="form.startWork" type="date" min="2000-01-01" required :class="inputClass" />
                </div>
              </div>

              <div class="md:col-span-2">
                <span class="mb-1.5 block text-sm font-semibold text-slate-700">Role</span>
                <div class="grid gap-3 sm:grid-cols-3">
                  <label v-for="option in roleOptions" :key="option.value" class="cursor-pointer">
                    <input v-model="form.role" type="radio" :value="option.value" class="peer sr-only" />
                    <div
                      class="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-green-300 peer-checked:border-green-600 peer-checked:bg-green-50/60 peer-checked:ring-4 peer-checked:ring-green-600/10 peer-focus-visible:ring-4 peer-focus-visible:ring-green-600/30"
                    >
                      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                        <font-awesome-icon :icon="option.icon" />
                      </div>
                      <div>
                        <p class="font-bold text-slate-900">{{ option.value }}</p>
                        <p class="mt-0.5 text-xs text-slate-500">{{ option.hint }}</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- ACCOUNT -->
          <section class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div class="mb-6 flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <font-awesome-icon icon="fa-solid fa-lock" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900">Account</h3>
                <p class="text-xs text-slate-500">Sign-in email and password</p>
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label for="email" class="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-envelope" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="email" v-model="form.email" type="email" required placeholder="example@gmail.com" :class="inputClass" />
                </div>
              </div>

              <div>
                <label for="password" class="mb-1.5 block text-sm font-semibold text-slate-700">New password</label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-key" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    minlength="6"
                    autocomplete="new-password"
                    placeholder="Leave empty to keep current"
                    :class="[inputClass, 'pr-12']"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" />
                  </button>
                </div>
                <p class="mt-1.5 text-xs text-slate-500">Only fill this in if you want to change the password.</p>
              </div>
            </div>
          </section>

          <!-- BOTTOM ACTIONS (mobile friendly) -->
          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              @click="router.push('/users')"
              class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving || !hasChanges"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <font-awesome-icon :icon="saving ? 'fa-solid fa-spinner' : 'fa-solid fa-check'" :spin="saving" />
              {{ saving ? "Saving..." : "Save changes" }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const API_URL = "http://localhost:2026/api/employees";
const IMAGE_URL = "http://localhost:2026/uploadsEmployees";

export default {
  name: "EditEmployee",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const employeeId = route.params.id;

    const loading = ref(true);
    const loadError = ref("");
    const saving = ref(false);
    const showPassword = ref(false);

    const emptyForm = () => ({
      name: "",
      position: "",
      phone: "",
      age: "",
      salary: "",
      startWork: "",
      email: "",
      password: "",
      sex: "",
      role: "",
    });

    const form = ref(emptyForm());
    const original = ref(emptyForm());
    const currentImage = ref(null);
    const newImage = ref(null); // File chosen now
    const newImagePreview = ref(null); // Preview URL of the chosen file
    const imageBroken = ref(false);
    imageBroken.value = false;
    const fileInput = ref(null);

    // ---------- OPTIONS ----------
    const sexOptions = [
      { value: "Male", icon: "fa-solid fa-person" },
      { value: "Female", icon: "fa-solid fa-person-dress" },
    ];

    const roleOptions = [
      { value: "Admin", icon: "fa-solid fa-shield-halved", hint: "Full system access" },
      { value: "Manager", icon: "fa-solid fa-user-tie", hint: "Manage employees" },
      { value: "Staff", icon: "fa-solid fa-users", hint: "Basic system access" },
    ];

    const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10";
    // ---------- COMPUTED ----------
    const displayImage = computed(() => {
      if (newImagePreview.value) return newImagePreview.value;
      if (currentImage.value && !imageBroken.value) {
        return `${IMAGE_URL}/${currentImage.value}`;
      }
      return null;
    });

    const roleBadge = computed(() => {
      if (form.value.role === "Admin") return "bg-green-100 text-green-800";
      if (form.value.role === "Manager") return "bg-blue-100 text-blue-800";
      if (form.value.role === "Staff") return "bg-slate-100 text-slate-700";
      return "bg-slate-100 text-slate-500";
    });

    const roleIcon = computed(() => {
      const found = roleOptions.find((r) => r.value === form.value.role);
      return found ? found.icon : "fa-solid fa-circle-question";
    });

    const hasChanges = computed(() => {
      return (
        !!newImage.value ||
        JSON.stringify(form.value) !== JSON.stringify(original.value)
      );
    });

    // ---------- LOAD ----------
    const loadEmployee = async () => {
      loading.value = true;
      loadError.value = "";

      try {
        const res = await axios.get(`${API_URL}/${employeeId}`);
        const e = res.data.data;

        const loaded = {
          name: e.name ?? "",
          position: e.position ?? "",
          phone: e.phone ?? "",
          age: e.age ?? "",
          salary: e.salary ?? "",
          startWork: e.startWork ? String(e.startWork).slice(0, 10) : "",
          email: e.email ?? "",
          password: "",
          sex: e.sex ?? "",
          role: e.role ?? "",
        };

        form.value = { ...loaded };
        original.value = { ...loaded };
        currentImage.value = e.image || null;
      } catch (error) {
        loadError.value = error.response?.data?.message || error.message;
      } finally {
        loading.value = false;
      }
    };

    // ---------- IMAGE ----------
    const openFile = () => fileInput.value.click();

    const handleImage = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB");
        e.target.value = "";
        return;
      }

      if (newImagePreview.value) URL.revokeObjectURL(newImagePreview.value);

      newImage.value = file;
      newImagePreview.value = URL.createObjectURL(file);
    };

    const cancelNewImage = () => {
      if (newImagePreview.value) URL.revokeObjectURL(newImagePreview.value);
      newImage.value = null;
      newImagePreview.value = null;
      if (fileInput.value) fileInput.value.value = "";
    };

    // ---------- UPDATE ----------
    const updateEmployee = async () => {
      if (!form.value.sex) return alert("Please select sex");
      if (!form.value.role) return alert("Please select role");

      saving.value = true;

      try {
        const formData = new FormData();

        Object.keys(form.value).forEach((key) => {
          const value = form.value[key];

          // empty password means "keep the current one"
          if (key === "password" && !value) return;

          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        if (newImage.value) {
          formData.append("image", newImage.value);
        }

        await axios.put(`${API_URL}/${employeeId}`, formData);

        alert("Employee updated successfully");
        router.push("/users");
      } catch (error) {
        console.error("Error updating employee:", error);
        alert(error.response?.data?.message || error.message);
      } finally {
        saving.value = false;
      }
    };

    onMounted(loadEmployee);

    onBeforeUnmount(() => {
      if (newImagePreview.value) URL.revokeObjectURL(newImagePreview.value);
    });

    return {
      router,
      form,
      loading,
      loadError,
      saving,
      showPassword,
      fileInput,
      newImage,
      imageBroken,
      displayImage,
      sexOptions,
      roleOptions,
      inputClass,
      roleBadge,
      roleIcon,
      hasChanges,
      openFile,
      handleImage,
      cancelNewImage,
      updateEmployee,
    };
  },
};
</script>