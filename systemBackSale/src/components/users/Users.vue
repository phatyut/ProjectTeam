<template>
  <div class="min-h-screen rounded-md bg-slate-100 p-6">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-800">Employees</h1>

      <button
        class="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
        @click="router.push('/users/addEmployee')"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Add People
      </button>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <!-- Toolbar -->
      <div class="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Employee List</h2>
          <p class="text-sm text-slate-500">Manage current employees</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <div class="relative">
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              v-model="search"
              type="text"
              placeholder="Search name or position..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 sm:w-64"
            />
          </div>

          <select
            v-model="roleFilter"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:bg-white"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-237.5">
          <thead class="bg-slate-50">
            <tr class="border-b border-slate-200 text-left">
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Image</th>
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Name</th>
              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Position</th>
              <th class="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">Phone</th>
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Age</th>
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Sex</th>
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Role</th>
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="8" class="px-5 py-12 text-center text-sm text-slate-500">Loading employees...</td>
            </tr>

            <tr v-else-if="errorMessage">
              <td colspan="8" class="px-5 py-12 text-center text-sm text-red-600">{{ errorMessage }}</td>
            </tr>

            <tr v-else-if="filteredEmployees.length === 0">
              <td colspan="8" class="px-5 py-12 text-center text-sm text-slate-500">No employees found</td>
            </tr>

            <tr
              v-else
              v-for="employee in paginatedEmployees"
              :key="employee._id"
              class="border-b border-slate-100 transition hover:bg-slate-50"
            >
              <!-- Image -->
              <td class="px-5 py-4">
                <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-green-50">
                  <img
                    v-if="employee.image"
                    :src="`${IMAGE_URL}/${employee.image}`"
                    alt="Employee"
                    class="h-full w-full object-cover"
                  />
                  <font-awesome-icon v-else icon="fa-solid fa-user" class="text-xl text-green-700" />
                </div>
              </td>

              <td class="px-5 py-4 text-sm font-medium text-slate-600">{{ employee.name }}</td>

              <td class="px-5 py-4">
                <span class="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  {{ employee.position }}
                </span>
              </td>

              <td class="px-5 py-4 text-right font-semibold text-slate-700">{{ employee.phone }}</td>

              <td class="px-5 py-4 text-center">
                <span class="font-bold text-slate-800">{{ employee.age }}</span>
              </td>

              <td class="px-5 py-4 text-center">
                <span class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                  {{ employee.sex }}
                </span>
              </td>

              <td class="px-5 py-4 text-center">
                <span class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                  {{ employee.role }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-1 py-4">
                <div class="flex justify-center gap-1">
                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    title="View"
                    @click="goToView(employee._id)"
                  >
                    <font-awesome-icon icon="fa-solid fa-arrows-to-eye" />
                  </button>

                  <!-- EDIT: opens the update page -->
                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-lg text-green-700 hover:bg-green-100"
                    title="Edit"
                    @click="goToEdit(employee._id)"
                  >
                    <font-awesome-icon icon="fa-solid fa-pen-fancy" />
                  </button>

                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                    @click="deleteEmployee(employee)"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer / Pagination -->
      <div class="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <p class="text-sm text-slate-500">
            Showing
            <span class="font-semibold text-slate-700">{{ rangeStart }}-{{ rangeEnd }}</span>
            of
            <span class="font-semibold text-slate-700">{{ filteredEmployees.length }}</span>
            employees
          </p>

          <select
            v-model.number="pageSize"
            class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm outline-none focus:border-green-600"
          >
            <option :value="5">5 / page</option>
            <option :value="10">10 / page</option>
            <option :value="20">20 / page</option>
            <option :value="50">50 / page</option>
          </select>
        </div>

        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Prev
          </button>

          <button
            v-for="p in visiblePages"
            :key="p"
            type="button"
            class="min-w-9 rounded-lg px-3 py-1.5 text-sm font-semibold transition"
            :class="p === currentPage
              ? 'bg-green-700 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>

          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted, watch, inject } from "vue";
import { useRouter } from "vue-router";

const API_URL = "http://localhost:2026/api/employees";
const IMAGE_URL = "http://localhost:2026/uploadsEmployees";

export default {
  name: "EmployeeList",
  setup() {
    const usersCount = inject("usersCount");
    const router = useRouter();
    const employees = ref([]);
    const loading = ref(true);
    const errorMessage = ref("");
    const search = ref("");
    const roleFilter = ref("");

    const loadEmployees = async () => {
      loading.value = true;
      errorMessage.value = "";
      try {
        const res = await axios.get(API_URL);
        employees.value = res.data.data;
      } catch (error) {
        errorMessage.value = error.response?.data?.message || error.message;
      } finally {
        loading.value = false;
      }
    };

    const filteredEmployees = computed(() => {
      const text = search.value.trim().toLowerCase();
      return employees.value.filter((e) => {
        const matchText =
          !text ||
          e.name?.toLowerCase().includes(text) ||
          e.position?.toLowerCase().includes(text);
        const matchRole = !roleFilter.value || e.role === roleFilter.value;
        return matchText && matchRole;
      });
    });

    // ---- Pagination ----
    const currentPage = ref(1);
    const pageSize = ref(10);

    const totalPages = computed(() =>
      Math.max(1, Math.ceil(filteredEmployees.value.length / pageSize.value))
    );

    const paginatedEmployees = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return filteredEmployees.value.slice(start, start + pageSize.value);
    });

    const rangeStart = computed(() =>
      filteredEmployees.value.length === 0
        ? 0
        : (currentPage.value - 1) * pageSize.value + 1
    );

    const rangeEnd = computed(() =>
      Math.min(currentPage.value * pageSize.value, filteredEmployees.value.length)
    );

    // show up to 5 page numbers around the current page
    const visiblePages = computed(() => {
      const total = totalPages.value;
      const maxButtons = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2));
      let end = start + maxButtons - 1;
      if (end > total) {
        end = total;
        start = Math.max(1, end - maxButtons + 1);
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) currentPage.value = page;
    };

    // go back to page 1 when filters or page size change
    watch([search, roleFilter, pageSize], () => {
      currentPage.value = 1;
    });

    // if the current page no longer exists (e.g. after deleting the last row on it)
    watch(totalPages, (total) => {
      if (currentPage.value > total) currentPage.value = total;
    });

    // ---- Navigation ----
    const goToView = (id) => {
      router.push(`/users/viewEmployee/${id}`);
    };

    const goToEdit = (id) => {
      router.replace(`/users/editEmployee/${id}`);
    };

    // ---- Delete ----
    const deleteEmployee = async (employee) => {
      if (!confirm(`Delete ${employee.name}?`)) return;

      try {
        await axios.delete(`${API_URL}/${employee._id}`);
        employees.value = employees.value.filter((e) => e._id !== employee._id);
      } catch (error) {
        alert(error.response?.data?.message || error.message);
      }
    };

    // keep the shared count in sync with the filtered total
    watch(
      filteredEmployees,
      (newEmployees) => {
        usersCount.value = newEmployees.length;
      },
      { immediate: true }
    );

    onMounted(loadEmployees);

    return {
      router,
      IMAGE_URL,
      employees,
      loading,
      errorMessage,
      search,
      roleFilter,
      filteredEmployees,
      usersCount,
      // pagination
      paginatedEmployees,
      currentPage,
      pageSize,
      totalPages,
      visiblePages,
      rangeStart,
      rangeEnd,
      goToPage,
      // actions
      goToView,
      goToEdit,
      deleteEmployee,
    };
  },
};
</script>