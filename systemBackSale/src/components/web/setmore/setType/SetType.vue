<template>
<div class="mx-auto w-full max-w-6xl space-y-6 p-1">
    <!-- header -->
    <header>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Product options</h1>
        <p class="text-sm text-slate-500">
            The brands, categories and models you can pick when adding a product to the web.
        </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <section v-for="g in groups" :key="g.key" class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <!-- card header -->
            <div class="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <i :class="['fa-solid', g.icon]"></i>
                </span>
                <div class="min-w-0 flex-1">
                    <h2 class="font-semibold text-slate-900">{{ g.title }}</h2>
                    <p class="truncate text-xs text-slate-500">{{ g.hint }}</p>
                </div>
                <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {{ g.items.length }}
                </span>
            </div>

            <!-- add form -->
            <form @submit.prevent="add(g)" class="px-5 pt-4" novalidate>
                <label :for="`add-${g.key}`" class="sr-only">Add a {{ g.singular }}</label>
                <div class="flex gap-2">
                    <input :id="`add-${g.key}`" v-model="g.draft" type="text" :placeholder="`Enter a ${g.singular} name`" @input="g.error = ''" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15" :class="g.error && 'border-red-400 bg-red-50/50'" />
                    <button type="submit" class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                        <i class="fa-solid fa-plus text-xs"></i> Add
                    </button>
                </div>
                <p v-if="g.error" class="mt-1.5 text-xs font-medium text-red-600">{{ g.error }}</p>
            </form>

            <!-- list -->
            <div class="flex-1 px-5 pb-5 pt-4">
                <ul v-if="g.items.length" class="max-h-72 space-y-1.5 overflow-y-auto pr-1">
                    <li v-for="item in g.items" :key="item" class="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-4 pr-2 transition hover:border-emerald-300 hover:bg-emerald-50/60">
                        <span class="truncate text-sm font-medium text-slate-800">{{ item }}</span>
                        <button type="button" @click="remove(g, item)" :aria-label="`Remove ${item}`" class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-100 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500">
                            <i class="fa-solid fa-xmark text-sm"></i>
                        </button>
                    </li>
                </ul>

                <div v-else class="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
                    <p class="text-sm font-medium text-slate-600">No {{ g.title.toLowerCase() }} yet</p>
                    <p class="mt-0.5 text-xs text-slate-400">Type a name above and press Enter.</p>
                </div>
            </div>
        </section>
    </div>
    <ul v-for="test in tests">
        <li>{{test.model}}</li>
        <li>{{test.category}}</li>
        <li>{{test.brand}}</li>
    </ul>
</div>
</template>

<script>
import axios from "axios";
import { ref,onMounted } from "vue";
import {reactive} from "vue";

export default {
    setup() {
        const tests=ref({})
        const testitems = async()=>{
            try{
                const res = await axios.get("http://localhost:2026/api/setOption");
                tests.value= res.data.data

            }catch(error){
                console.log(error)
            }
        };
        onMounted(testitems)
        // One config per card. The three cards share the same markup and logic.
        const groups = reactive([{
                key: "brands",
                title: "Brands",
                singular: "brand",
                hint: "Who makes the product",
                icon: "fa-industry",
                items: ["Dell", "ASUS"],
                draft: "",
                error: "",
            },
            {
                key: "categories",
                title: "Categories",
                singular: "category",
                hint: "How products are grouped",
                icon: "fa-layer-group",
                items: ["Gaming", "Laptop", "Desktop", "Workstation", "Accessories"],
                draft: "",
                error: "",
            },
            {
                key: "models",
                title: "Models",
                singular: "model",
                hint: "Specific product lines",
                icon: "fa-barcode",
                items: [],
                draft: "",
                error: "",
            },
        ]);

        const add = (g) => {
            const name = g.draft.trim();

            if (!name) {
                g.error = `Enter a ${g.singular} name.`;
                return;
            }
            if (g.items.some((i) => i.toLowerCase() === name.toLowerCase())) {
                g.error = `${name} is already in ${g.title}.`;
                return;
            }

            g.items.unshift(name); // newest first, so it is visible straight away
            g.draft = "";
            g.error = "";
            // TODO: save to your API here, e.g. axios.post(`/api/${g.key}`, { name })
        };

        const remove = (g, item) => {
            g.items = g.items.filter((i) => i !== item);
            // TODO: delete from your API here
        };

        return {
            groups,
            add,
            remove,
            tests
        };
    },
};
</script>
