<template>
  <div class="fixed inset-0 z-50 overflow-y-auto bg-gray-200">
    <main class="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div class="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <aside class="space-y-6">
          <!-- PROFILE -->
          <div class="overflow-hidden rounded-4xl border border-slate-200 bg-white">
            <!-- GREEN COVER -->
            <div class="relative h-40 overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-green-500">
              <div class="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/10"></div>
              <div class="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-green-300/10"></div>
              <div class="relative z-10 p-6 text-white">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <font-awesome-icon icon="fa-solid fa-id-card" />
                </div>
                <p class="mt-4 text-xs font-bold uppercase tracking-widest text-green-100">
                  Employee Profile
                </p>
              </div>
            </div>

            <!-- PROFILE BODY -->
            <div class="relative px-4 pb-6">
              <!-- IMAGE -->
              <div class="-mt-20 flex justify-center">
                <div class="relative">
                  <div class="h-52 w-52 overflow-hidden rounded-4xl bg-slate-100 shadow-2xl ring-1 ring-slate-200 sm:h-60 sm:w-60">
                    <img v-if="imagePreview" :src="imagePreview" alt="Employee" class="h-full w-full object-cover" />

                    <div v-else class="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-green-50 to-slate-100 text-green-700">
                      <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-lg">
                        <font-awesome-icon icon="fa-solid fa-user" class="text-5xl text-green-600" />
                      </div>
                      <p class="mt-4 text-sm font-bold">No Photo</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- NAME PREVIEW -->
              <div class="mt-8 text-center">
                <h2 class="truncate text-2xl font-bold text-slate-900">
                  {{ form.name || "Employee Name" }}
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  {{ form.position || "Employee Position" }}
                </p>
              </div>

              <!-- UPLOAD -->
              <div class="mt-6">
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  @change="handleImage"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                />
                <button
                  type="button"
                  @click="openFile"
                  class="flex w-full items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-3.5 text-sm font-bold text-green-700 transition hover:bg-green-100"
                >
                  <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
                  Choose Employee Photo
                </button>

                <button
                  v-if="imagePreview"
                  type="button"
                  @click="removeImage"
                  class="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                  Remove Photo
                </button>

                <p class="mt-3 text-center text-xs text-slate-400">
                  PNG · JPG · JPEG · WEBP · GIF<br />
                  Maximum 5MB
                </p>
              </div>

              <!-- QUICK INFO -->
              <div class="mt-7 grid grid-cols-2 gap-3">
                <div class="rounded-2xl bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sex</p>
                  <p class="mt-1 font-bold text-slate-800">{{ form.sex || "—" }}</p>
                </div>
                <div class="rounded-2xl bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Age</p>
                  <p class="mt-1 font-bold text-slate-800">{{ form.age || "—" }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ROLE PREVIEW -->
          <div class="rounded-4xl border border-slate-200 bg-white p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Access Level</p>
                <p class="mt-1 text-lg font-bold text-slate-900">
                  {{ form.role || "Not selected" }}
                </p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <font-awesome-icon icon="fa-solid fa-shield-halved" />
              </div>
            </div>
          </div>
        </aside>

        <!-- ================================================= -->
        <!-- FORM -->
        <!-- ================================================= -->
        <section class="rounded-4xl border border-slate-200 bg-white">
          <form @submit.prevent="saveEmployee" class="p-5 sm:p-7 lg:p-10">
            <!-- FORM HEADER -->
            <div class="mb-8 flex flex-col justify-between gap-4 border-b border-slate-100 pb-7 sm:flex-row sm:items-center">
              <div>
                <div class="flex items-center gap-2">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <font-awesome-icon icon="fa-solid fa-user-pen" />
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Employee Information</h2>
                </div>
                <p class="mt-2 text-sm text-slate-500">
                  Fill in the employee information to create a new profile.
                </p>
              </div>
              <div class="rounded-xl bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
                New Record
              </div>
            </div>

            <!-- PERSONAL INFORMATION -->
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <font-awesome-icon icon="fa-solid fa-user" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-900">Personal Information</h3>
                  <p class="text-xs text-slate-400">Basic employee details</p>
                </div>
              </div>

              <!-- NAME -->
              <div>
                <label class="mb-2 block text-sm font-bold text-slate-700">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-user" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Enter employee full name"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <!-- POSITION -->
              <div>
                <label class="mb-2 block text-sm font-bold text-slate-700">
                  Position <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <font-awesome-icon icon="fa-solid fa-briefcase" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    v-model="form.position"
                    type="text"
                    required
                    placeholder="e.g. Sales Manager"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <!-- PHONE / AGE -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700">
                    Phone Number <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-phone" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="form.phone"
                      type="tel"
                      required
                      placeholder="012 345 678"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700">
                    Age <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="form.age"
                      type="number"
                      min="16"
                      max="100"
                      required
                      placeholder="25"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>
              </div>

              <!-- SALARY / START WORK -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700">
                    Salary <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-money-bill-1-wave" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="form.salary"
                      type="number"
                      min="0"
                      step="any"
                      required
                      placeholder="0$"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700">
                    Start Work <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="form.startWork"
                      type="date"
                      min="2000-01-01"
                      required
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>
              </div>

              <!-- EMAIL / PASSWORD -->
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-envelope" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700">
                    Password <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-unlock-keyhole" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="form.password"
                      type="password"
                      minlength="6"
                      required
                      placeholder="At least 6 characters"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>
              </div>

              <!-- SEX -->
              <div>
                <label class="mb-3 block text-sm font-bold text-slate-700">
                  Sex <span class="text-red-500">*</span>
                </label>
                <div class="grid gap-4 sm:grid-cols-2">
                  <!-- MALE -->
                  <label class="cursor-pointer">
                    <input v-model="form.sex" type="radio" value="Male" class="peer hidden" />
                    <div
                      class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-4 peer-checked:ring-blue-500/10 hover:border-blue-300"
                    >
                      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <font-awesome-icon icon="fa-solid fa-person" />
                      </div>
                      <div>
                        <p class="font-bold text-slate-800">Male</p>
                        <p class="mt-1 text-xs text-slate-500">Male employee</p>
                      </div>
                    </div>
                  </label>

                  <!-- FEMALE -->
                  <label class="cursor-pointer">
                    <input v-model="form.sex" type="radio" value="Female" class="peer hidden" />
                    <div
                      class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-checked:ring-4 peer-checked:ring-pink-500/10 hover:border-pink-300"
                    >
                      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                        <font-awesome-icon icon="fa-solid fa-person-dress" />
                      </div>
                      <div>
                        <p class="font-bold text-slate-800">Female</p>
                        <p class="mt-1 text-xs text-slate-500">Female employee</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- ROLE -->
              <div>
                <label class="mb-3 block text-sm font-bold text-slate-700">
                  Employee Role <span class="text-red-500">*</span>
                </label>

                <div class="grid gap-4 md:grid-cols-3">
                  <!-- ADMIN -->
                  <label class="cursor-pointer">
                    <input v-model="form.role" type="radio" value="Admin" class="peer hidden" />
                    <div
                      class="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:ring-4 peer-checked:ring-green-500/10 hover:border-green-300"
                    >
                      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <font-awesome-icon icon="fa-solid fa-shield-halved" />
                      </div>
                      <p class="mt-4 font-bold text-slate-800">Admin</p>
                      <p class="mt-1 text-xs text-slate-500">Full system access</p>
                    </div>
                  </label>

                  <!-- MANAGER -->
                  <label class="cursor-pointer">
                    <input v-model="form.role" type="radio" value="Manager" class="peer hidden" />
                    <div
                      class="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:ring-4 peer-checked:ring-green-500/10 hover:border-green-300"
                    >
                      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <font-awesome-icon icon="fa-solid fa-user-tie" />
                      </div>
                      <p class="mt-4 font-bold text-slate-800">Manager</p>
                      <p class="mt-1 text-xs text-slate-500">Manage employees</p>
                    </div>
                  </label>

                  <!-- STAFF -->
                  <label class="cursor-pointer">
                    <input v-model="form.role" type="radio" value="Staff" class="peer hidden" />
                    <div
                      class="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:ring-4 peer-checked:ring-green-500/10 hover:border-green-300"
                    >
                      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <font-awesome-icon icon="fa-solid fa-users" />
                      </div>
                      <p class="mt-4 font-bold text-slate-800">Staff</p>
                      <p class="mt-1 text-xs text-slate-500">Basic system access</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- FOOTER ACTIONS -->
            <div class="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-7 sm:flex-row sm:justify-end">
              <button
                type="button"
                @click="router.push('/users')"
                class="rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-700 to-green-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                <font-awesome-icon icon="fa-solid fa-user-plus" />
                {{ saving ? "Saving..." : "Create Employee" }}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AddEmployee",
  setup() {
    const router = useRouter();

    const form = ref({
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
      image: null,
    });

    const fileInput = ref(null);
    const imagePreview = ref(null);
    const saving = ref(false);

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

      if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);

      form.value.image = file;
      imagePreview.value = URL.createObjectURL(file);
    };

    const removeImage = () => {
      if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
      form.value.image = null;
      imagePreview.value = null;
      fileInput.value.value = "";
    };

    // ---------- SAVE ----------
    const saveEmployee = async () => {
      if (!form.value.sex) return alert("Please select sex");
      if (!form.value.role) return alert("Please select role");

      saving.value = true;

      try {
        const formData = new FormData();

        Object.keys(form.value).forEach((key) => {
          const value = form.value[key];
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        const res = await axios.post(
          "http://localhost:2026/api/employees",
          formData
        );

        console.log(res.data);
        alert("Employee created successfully");
        router.push("/users");
      } catch (error) {
        console.error("Error creating employee:", error);
        alert(error.response?.data?.message || error.message);
      } finally {
        saving.value = false;
      }
    };

    return {
      form,
      fileInput,
      imagePreview,
      saving,
      openFile,
      handleImage,
      removeImage,
      saveEmployee,
      router,
    };
  },
};
</script>