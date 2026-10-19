<template>
    <div class="w-full min-h-full bg-slate-50 p-4 md:p-6">

        <!-- Page header -->
        <div class="mb-5">
            <h1 class="text-2xl font-bold text-green-700">Reports</h1>
            <p class="text-sm text-slate-500">{{ activeTab.hint }}</p>
        </div>

        <!-- Tabs -->
        <div
            role="tablist"
            class="inline-flex max-w-full overflow-x-auto gap-1 p-1 mb-5 bg-white rounded-full border border-slate-200 shadow-sm"
        >
            <button
                v-for="tab in tabs"
                :key="tab.component"
                role="tab"
                type="button"
                :aria-selected="viewReport === tab.component"
                class="px-5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                :class="viewReport === tab.component
                    ? 'bg-green-700 text-white shadow'
                    : 'text-green-700 hover:bg-green-50'"
                @click="viewReport = tab.component"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- Body -->
        <section
            role="tabpanel"
            class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6 min-h-120"
        >
            <KeepAlive>
                <component :is="viewReport" />
            </KeepAlive>
        </section>

    </div>
</template>

<script>
import { ref, computed } from "vue";
import SaleReport from "./saleReport/SaleReport.vue";
import StockReport from "./stockReport/StockReport.vue";
import ProductsReport from "./productsReport/ProductsReport.vue";
import WebsiteReport from "./websiteReport/WebsiteReport.vue";

export default {
    components: {
        SaleReport,
        StockReport,
        ProductsReport,
        WebsiteReport,
    },
    setup() {
        const tabs = [
            { label: "Sale",     component: "SaleReport",     hint: "Orders and revenue over time." },
            { label: "Stock",    component: "StockReport",    hint: "What is in stock and what is running low." },
            { label: "Products", component: "ProductsReport", hint: "How each product is performing." },
            { label: "Website",  component: "WebsiteReport",  hint: "Visits and activity on your website." },
        ];

        const viewReport = ref("SaleReport");
        const activeTab = computed(() => tabs.find((t) => t.component === viewReport.value));

        return { tabs, viewReport, activeTab };
    },
};
</script>