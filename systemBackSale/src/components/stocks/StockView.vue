<template>
<div class="min-h-screen bg-slate-100 rounded-md p-6">

    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Stock Inventory</h1>
            <p class="mt-1 text-sm text-slate-500">Monitor your products and stock levels</p>
        </div>
        <div class="flex gap-2">
            <button @click="router.replace('/stocks/setoptionStock')" class="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800">
                <font-awesome-icon icon="fa-solid fa-plus" />
                Set Option
            </button>
            <button @click="router.replace('/stocks/AddStocks')" class="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800">
                <font-awesome-icon icon="fa-solid fa-plus" />
                Add Stock
            </button>
        </div>
    </div>

    <!-- Summary Cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-slate-500">Total Products</p>
                    <h2 class="mt-2 text-2xl font-bold text-slate-800">{{ stocks.length }}</h2>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <font-awesome-icon icon="fa-solid fa-boxes-stacked" />
                </div>
            </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-slate-500">In Stock</p>
                    <h2 class="mt-2 text-2xl font-bold text-green-700">{{ count('In Stock') }}</h2>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <font-awesome-icon icon="fa-solid fa-circle-check" />
                </div>
            </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-slate-500">Low Stock</p>
                    <h2 class="mt-2 text-2xl font-bold text-yellow-600">{{ count('Low Stock') }}</h2>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                </div>
            </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-slate-500">Out of Stock</p>
                    <h2 class="mt-2 text-2xl font-bold text-red-600">{{ count('Out of Stock') }}</h2>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <font-awesome-icon icon="fa-solid fa-circle-xmark" />
                </div>
            </div>
        </div>

    </div>

    <!-- Stock Table -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <!-- Table Header -->
        <div class="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h2 class="text-lg font-bold text-slate-800">Stock List</h2>
                <p class="text-sm text-slate-500">Manage current product quantities</p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
                <div class="relative">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input v-model.trim="search" type="text" placeholder="Search product..." class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 sm:w-64" />
                </div>

                <select v-model="categoryFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:bg-white">
                    <option value="">All Categories</option>
                    <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                </select>
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full min-w-237.5">

                <thead class="bg-slate-50">
                    <tr class="border-b border-slate-200 text-left">
                        <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Product</th>
                        <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">batchId</th>
                        <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Location</th>
                        <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">Category</th>
                        <th class="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">Price</th>
                        <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Quantity</th>
                        <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Status</th>
                        <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!filtered.length">
                        <td colspan="8" class="px-5 py-12 text-center text-slate-400">No stock found</td>
                    </tr>

                    <tr v-for="stock in paginated" :key="stock._id" class="border-b border-slate-100 transition hover:bg-slate-50">

                        <td class="px-5 py-4">
                            <div class="flex items-center gap-3">
                                <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                                    <img v-if="stock.image" :src="`${BASE}/uploadsStock/${stock.image}`" class="h-full w-full object-cover" />
                                    <font-awesome-icon v-else icon="fa-solid fa-box" class="text-xl text-green-700" />
                                </div>
                                <p class="font-semibold text-slate-800">{{ stock.product }}</p>
                            </div>
                        </td>

                        <td class="px-5 py-4 text-sm font-medium text-slate-600">{{ stock.batchId }}</td>
                        <td class="px-5 py-4 text-sm font-medium text-slate-600">{{ stock.location }}</td>

                        <td class="px-5 py-4">
                            <span class="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                {{ stock.category }}
                            </span>
                        </td>

                        <td class="px-5 py-4 text-right font-semibold text-slate-700">${{ stock.price }}</td>

                        <td class="px-5 py-4 text-center">
                            <span class="font-bold text-slate-800">{{ stock.quantity }}</span>
                        </td>

                        <td class="px-5 py-4 text-center">
                            <span :class="badge(stock.status)" class="rounded-full px-3 py-1.5 text-xs font-semibold">
                                {{ stock.status }}
                            </span>
                        </td>

                        <td class="px-5 py-4">
                            <div class="flex justify-center gap-2">
                                <button class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700 hover:bg-green-100">
                                    <font-awesome-icon icon="fa-solid fa-eye" />
                                </button>
                                <button @click="router.replace(`/stocks/editStock/${stock._id}`)" class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                                    <font-awesome-icon icon="fa-solid fa-pen" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

        <!-- Footer / Pagination -->
        <div class="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-slate-500">
                Showing
                <span class="font-semibold text-slate-700">
                    {{ filtered.length ? (page - 1) * perPage + 1 : 0 }}–{{ Math.min(page * perPage, filtered.length) }}
                </span>
                of <span class="font-semibold text-slate-700">{{ filtered.length }}</span> products
            </p>

            <div class="flex items-center gap-2">
                <select v-model.number="perPage" class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm outline-none">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                </select>

                <button @click="goTo(page - 1)" :disabled="page === 1"
                    class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
                    Prev
                </button>

                <button v-for="p in pages" :key="p" @click="goTo(p)"
                    :class="p === page ? 'bg-green-700 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'"
                    class="h-9 w-9 rounded-lg text-sm font-semibold">
                    {{ p }}
                </button>

                <button @click="goTo(page + 1)" :disabled="page === totalPages"
                    class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
                    Next
                </button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    ref,
    computed,
    onMounted,
    watch,
    inject
} from "vue";
import {
    useRouter
} from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const BASE = "http://localhost:2026";
        const stocks = ref([]);
        const search = ref("");
        const categoryFilter = ref("");
        const stockCount = inject("stockCount");
        const lowStockCount = inject("lowStockCount");
        const outOfStockCount = inject("outOfStockCount");

        // pagination state
        const page = ref(1);
        const perPage = ref(10);

        const getAll = async () => {
            const res = await axios.get(`${BASE}/api/stocks`);
            stocks.value = res.data.data;
        };

        const categories = computed(() => [...new Set(stocks.value.map((s) => s.category))]);

        const filtered = computed(() => {
            const q = search.value.toLowerCase();
            return stocks.value.filter(
                (s) =>
                (!q || [s.product, s.batchId, s.location].some((v) => String(v).toLowerCase().includes(q))) &&
                (!categoryFilter.value || s.category === categoryFilter.value)
            );
        });

        const totalPages = computed(() =>
            Math.max(1, Math.ceil(filtered.value.length / perPage.value))
        );

        const paginated = computed(() => {
            const start = (page.value - 1) * perPage.value;
            return filtered.value.slice(start, start + perPage.value);
        });

        // show at most 5 page buttons around the current page
        const pages = computed(() => {
            const total = totalPages.value;
            const start = Math.max(1, Math.min(page.value - 2, total - 4));
            const end = Math.min(total, start + 4);
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        });

        const goTo = (p) => {
            if (p >= 1 && p <= totalPages.value) page.value = p;
        };

        const count = (status) => stocks.value.filter((s) => s.status === status).length;

        const badge = (status) =>
            ({
                "In Stock": "bg-green-100 text-green-700",
                "Low Stock": "bg-yellow-100 text-yellow-700",
                "Out of Stock": "bg-red-100 text-red-700",
                Reserved: "bg-blue-100 text-blue-700",
                Damaged: "bg-orange-100 text-orange-700",
            })[status] || "bg-slate-100 text-slate-600";

        onMounted(getAll);

        watch(stocks, (newstock) => {
            stockCount.value = newstock.length;
        });

        // go back to page 1 when filters or page size change
        watch([search, categoryFilter, perPage], () => {
            page.value = 1;
        });

        return {
            router,
            BASE,
            stocks,
            search,
            categoryFilter,
            categories,
            filtered,
            paginated,
            page,
            perPage,
            totalPages,
            pages,
            goTo,
            stockCount,
            lowStockCount,
            outOfStockCount,
            count,
            badge
        };
    },
};
</script>