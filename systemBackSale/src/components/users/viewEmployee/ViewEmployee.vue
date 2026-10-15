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
            <h1 class="text-lg font-bold text-slate-900">Employee details</h1>
            <p class="text-xs text-slate-500">Full profile information</p>
          </div>
        </div>

        <button
          v-if="employee"
          type="button"
          @click="goToEdit"
          class="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
        >
          <font-awesome-icon icon="fa-solid fa-pen-fancy" />
          Edit employee
        </button>
      </div>
    </header>

    <main class="mx-auto max-w-350 px-4 py-8 sm:px-6 lg:px-8">
      <!-- ================= LOADING ================= -->
      <div v-if="loading" class="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div class="h-115 animate-pulse rounded-3xl bg-white"></div>
        <div class="h-115 animate-pulse rounded-3xl bg-white"></div>
      </div>

      <!-- ================= LOAD ERROR ================= -->
      <div
        v-else-if="loadError"
        class="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200"
      >
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
      <div v-else-if="employee" class="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
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
                <div class="h-28 w-28 overflow-hidden rounded-3xl bg-slate-100 shadow-xl ring-4 ring-white">
                  <img
                    v-if="employee.image && !imageBroken"
                    :src="`${IMAGE_URL}/${employee.image}`"
                    alt="Employee photo"
                    class="h-full w-full object-cover"
                    @error="imageBroken = true"
                  />
                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-slate-100 text-green-600"
                  >
                    <font-awesome-icon icon="fa-solid fa-user" class="text-4xl" />
                  </div>
                </div>
              </div>

              <!-- NAME -->
              <div class="mt-6 text-center">
                <h2 class="truncate text-xl font-bold text-slate-900">{{ employee.name }}</h2>
                <p class="mt-1 truncate text-sm text-slate-500">{{ employee.position }}</p>
                <span
                  class="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                  :class="roleBadge"
                >
                  <font-awesome-icon :icon="roleIcon" />
                  {{ employee.role || "No role" }}
                </span>
              </div>

              <!-- QUICK FACTS -->
              <dl class="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                <div class="rounded-2xl bg-slate-50 p-3">
                  <dt class="text-xs font-medium text-slate-500">Age</dt>
                  <dd class="mt-0.5 font-bold text-slate-900">{{ employee.age || "-" }}</dd>
                </div>
                <div class="rounded-2xl bg-slate-50 p-3">
                  <dt class="text-xs font-medium text-slate-500">Sex</dt>
                  <dd class="mt-0.5 font-bold text-slate-900">{{ employee.sex || "-" }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>

        <!-- ---------- RIGHT: DETAILS ---------- -->
        <div class="space-y-6">
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

            <dl class="grid gap-4 md:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <dt class="text-xs font-medium text-slate-500">Full name</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ employee.name || "-" }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <dt class="text-xs font-medium text-slate-500">Phone number</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ employee.phone || "-" }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <dt class="text-xs font-medium text-slate-500">Age</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ employee.age || "-" }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <dt class="text-xs font-medium text-slate-500">Sex</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ employee.sex || "-" }}</dd>
              </div>
            </dl>
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

            <dl class="grid gap-4 md:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <dt class="text-xs font-medium text-slate-500">Position</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ employee.position || "-" }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <dt class="text-xs font-medium text-slate-500">Salary</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ formatSalary(employee.salary) }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <dt class="text-xs font-medium text-slate-500">Start date</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ formatDate(employee.startWork) }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <dt class="text-xs font-medium text-slate-500">Role</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ employee.role || "-" }}</dd>
              </div>
            </dl>
          </section>

          <!-- ACCOUNT -->
          <section class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div class="mb-6 flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <font-awesome-icon icon="fa-solid fa-lock" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900">Account</h3>
                <p class="text-xs text-slate-500">Sign-in email</p>
              </div>
            </div>

            <dl class="grid gap-4">
              <div class="rounded-2xl bg-slate-50 p-4">
                <dt class="text-xs font-medium text-slate-500">Email</dt>
                <dd class="mt-1 break-all font-semibold text-slate-900">{{ employee.email || "-" }}</dd>
              </div>
            </dl>
          </section>

          <!-- BOTTOM ACTIONS -->
          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              @click="router.push('/users')"
              class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Back to list
            </button>
            <button
              type="button"
              @click="goToEdit"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              <font-awesome-icon icon="fa-solid fa-pen-fancy" />
              Edit employee
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const API_URL = "http://localhost:2026/api/employees";
const IMAGE_URL = "http://localhost:2026/uploadsEmployees";

export default {
  name: "ViewEmployee",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const employeeId = route.params.id;

    const employee = ref(null);
    const loading = ref(true);
    const loadError = ref("");
    const imageBroken = ref(false);

    const roleIcons = {
      Admin: "fa-solid fa-shield-halved",
      Manager: "fa-solid fa-user-tie",
      Staff: "fa-solid fa-users",
    };

    const roleBadge = computed(() => {
      const role = employee.value?.role;
      if (role === "Admin") return "bg-green-100 text-green-800";
      if (role === "Manager") return "bg-blue-100 text-blue-800";
      if (role === "Staff") return "bg-slate-100 text-slate-700";
      return "bg-slate-100 text-slate-500";
    });

    const roleIcon = computed(
      () => roleIcons[employee.value?.role] || "fa-solid fa-circle-question"
    );

    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    const formatSalary = (value) => {
      if (value === null || value === undefined || value === "") return "-";
      return `$${Number(value).toLocaleString()}`;
    };

    const loadEmployee = async () => {
      loading.value = true;
      loadError.value = "";

      try {
        const res = await axios.get(`${API_URL}/${employeeId}`);
        employee.value = res.data.data;
      } catch (error) {
        loadError.value = error.response?.data?.message || error.message;
      } finally {
        loading.value = false;
      }
    };

    const goToEdit = () => {
      router.push(`/users/editEmployee/${employeeId}`);
    };

    onMounted(loadEmployee);

    return {
      router,
      IMAGE_URL,
      employee,
      loading,
      loadError,
      imageBroken,
      roleBadge,
      roleIcon,
      formatDate,
      formatSalary,
      goToEdit,
    };
  },
};
</script>