<template>
    <div class="min-h-screen rounded-md bg-slate-100 p-6">
        <div class="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <!-- Header -->
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h1 class="text-xl font-bold text-slate-800">Test Component</h1>
                    <p class="mt-1 text-sm text-slate-500">Pick an option and a date</p>
                </div>

                <!-- Live status dot -->
                <div class="relative flex h-3 w-3">
                    <span
                        v-if="loading"
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"
                    ></span>
                    <span
                        v-else-if="error"
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"
                    ></span>
                    <span
                        class="relative inline-flex h-3 w-3 rounded-full"
                        :class="loading ? 'bg-yellow-500' : error ? 'bg-red-600' : 'bg-green-600'"
                    ></span>
                </div>
            </div>

            <!-- Error message -->
            <p v-if="error" class="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {{ error }}
            </p>

            <!-- Select -->
            <div class="mb-4">
                <label for="test" class="mb-1.5 block text-sm font-semibold text-slate-700">Test</label>
                <select
                    id="test"
                    v-model="selectedTest"
                    :disabled="loading"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <option value="" disabled>
                        {{ loading ? "Loading..." : "Select a test" }}
                    </option>
                    <option v-for="test in tests" :key="test._id || test.name" :value="test.name">
                        {{ test.name }}
                    </option>
                </select>
            </div>

            <!-- Date -->
            <div class="mb-6">
                <label for="date" class="mb-1.5 block text-sm font-semibold text-slate-700">Date</label>
                <input
                    id="date"
                    v-model="date"
                    type="date"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10"
                />
            </div>

            <!-- Summary -->
            <div class="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                Selected:
                <span class="font-semibold">{{ selectedTest || "none" }}</span>
                on
                <span class="font-semibold">{{ date || "no date" }}</span>
            </div>

            <!-- Reload -->
            <button
                @click="getAll"
                :disabled="loading"
                class="mt-4 w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {{ loading ? "Loading..." : "Reload" }}
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const api = "http://localhost:2026/api/test";
        const tests = ref([]);
        const selectedTest = ref("");
        const date = ref("");
        const loading = ref(false);
        const error = ref("");

        const getAll = async () => {
            loading.value = true;
            error.value = "";
            try {
                const res = await axios.get(api);
                tests.value = res.data.data;
            } catch (err) {
                console.log(err);
                error.value = "Failed to load tests. Please try again.";
            } finally {
                loading.value = false;
            }
        };

        onMounted(getAll);

        return {
            tests,
            selectedTest,
            date,
            loading,
            error,
            getAll,
        };
    },
};
</script>