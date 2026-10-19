<template>
    <div class="min-h-screen bg-slate-50">

        <!-- HERO + SEARCH -->
        <div class="bg-gradient-to-r from-green-900 via-green-800 to-green-600 px-6 py-12 text-center text-white">
            <h1 class="text-3xl font-bold">Help Center</h1>
            <p class="mt-2 text-green-100">Find guides and answers for every part of the POS system</p>

            <div class="relative mx-auto mt-6 max-w-2xl">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                    v-model="query"
                    type="text"
                    placeholder="Search for help... (e.g. receipt, stock, supplier)"
                    class="w-full rounded-xl py-3 pl-11 pr-10 text-slate-800 shadow-lg outline-none focus:ring-4 focus:ring-green-400/50"
                >
                <button
                    v-if="query"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    @click="query = ''"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>

        <div class="mx-auto max-w-6xl px-4 py-8">

            <!-- MODULE CARDS -->
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <button
                    class="flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition hover:-translate-y-1 hover:shadow-md"
                    :class="activeId === 'all' ? 'border-green-700 bg-green-900 text-white' : 'border-slate-200 bg-white text-slate-700'"
                    @click="activeId = 'all'"
                >
                    <i class="fa-solid fa-table-cells-large text-2xl"></i>
                    <span class="text-sm font-semibold">All Topics</span>
                </button>

                <button
                    v-for="s in sections"
                    :key="s.id"
                    class="flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition hover:-translate-y-1 hover:shadow-md"
                    :class="activeId === s.id ? 'border-green-700 bg-green-900 text-white' : 'border-slate-200 bg-white text-slate-700'"
                    @click="activeId = s.id"
                >
                    <i :class="s.icon" class="text-2xl"></i>
                    <span class="text-sm font-semibold">{{ s.title }}</span>
                    <span class="text-xs" :class="activeId === s.id ? 'text-green-100' : 'text-slate-400'">
                        {{ s.items.length }} articles
                    </span>
                </button>
            </div>

            <!-- ARTICLES -->
            <div class="mt-8 flex flex-col gap-8">

                <div v-if="filteredSections.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white py-14 text-center">
                    <i class="fa-regular fa-face-frown text-4xl text-slate-300"></i>
                    <p class="mt-3 font-semibold text-slate-600">No results for "{{ query }}"</p>
                    <p class="text-sm text-slate-400">Try a different word or contact support below.</p>
                </div>

                <section v-for="s in filteredSections" :key="s.id">
                    <div class="mb-3 flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-800">
                            <i :class="s.icon"></i>
                        </div>
                        <div>
                            <h2 class="text-lg font-bold text-slate-800">{{ s.title }}</h2>
                            <p class="text-sm text-slate-500">{{ s.desc }}</p>
                        </div>
                    </div>

                    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div
                            v-for="item in s.items"
                            :key="s.id + item.q"
                            class="border-b border-slate-100 last:border-b-0"
                        >
                            <button
                                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-green-50"
                                @click="toggle(s.id + item.q)"
                            >
                                <span class="font-medium text-slate-800">{{ item.q }}</span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-green-700 transition-transform duration-300"
                                    :class="{ 'rotate-180': openKey === s.id + item.q }"
                                ></i>
                            </button>

                            <div v-if="openKey === s.id + item.q" class="bg-green-50/50 px-5 pb-5 pt-1">
                                <ol class="flex flex-col gap-2 text-sm text-slate-600">
                                    <li v-for="(step, i) in item.a" :key="i" class="flex gap-3">
                                        <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-800 text-xs font-bold text-white">
                                            {{ i + 1 }}
                                        </span>
                                        <span>{{ step }}</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- SHORTCUTS -->
            <section class="mt-12">
                <h2 class="mb-3 text-lg font-bold text-slate-800">
                    <i class="fa-regular fa-keyboard mr-2 text-green-700"></i>Keyboard Shortcuts
                </h2>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="k in shortcuts"
                        :key="k.keys"
                        class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                    >
                        <span class="text-sm text-slate-600">{{ k.label }}</span>
                        <kbd class="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                            {{ k.keys }}
                        </kbd>
                    </div>
                </div>
            </section>

            <!-- TIPS -->
            <section class="mt-12 rounded-xl border border-green-200 bg-green-50 p-6">
                <h2 class="mb-3 text-lg font-bold text-green-900">
                    <i class="fa-regular fa-lightbulb mr-2"></i>Best Practices
                </h2>
                <ul class="grid grid-cols-1 gap-2 text-sm text-green-900 md:grid-cols-2">
                    <li v-for="t in tips" :key="t" class="flex gap-2">
                        <i class="fa-solid fa-circle-check mt-0.5 text-green-700"></i>
                        <span>{{ t }}</span>
                    </li>
                </ul>
            </section>

            <!-- CONTACT -->
            <section class="mt-12">
                <h2 class="mb-3 text-lg font-bold text-slate-800">Still need help?</h2>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div
                        v-for="c in contacts"
                        :key="c.label"
                        class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-700 hover:shadow-md"
                    >
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 text-white">
                            <i :class="c.icon"></i>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">{{ c.label }}</p>
                            <p class="font-semibold text-slate-800">{{ c.value }}</p>
                        </div>
                    </div>
                </div>
                <p class="mt-6 text-center text-xs text-slate-400">POS System version {{ version }}</p>
            </section>
        </div>
    </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
    name: "HelpPage",
    setup() {
        const query = ref("");
        const activeId = ref("all");
        const openKey = ref("");
        const version = "1.0.0";

        const toggle = (key) => {
            openKey.value = openKey.value === key ? "" : key;
        };

        // ---------------- CONTENT (edit the text to match your system) ----------------
        const sections = [
            {
                id: "start",
                title: "Getting Started",
                icon: "fa-solid fa-rocket",
                desc: "Login, roles and a tour of the system",
                items: [
                    {
                        q: "How do I log in and out?",
                        a: [
                            "Open the system and enter your email and password.",
                            "Click Login. You will be taken to your dashboard.",
                            "To leave, click your profile at the top and choose Logout.",
                        ],
                    },
                    {
                        q: "What can each role do?",
                        a: [
                            "Admin: full access to products, stock, suppliers, employees, website and reports.",
                            "Cashier: can use the sale page, print receipts and handle returns.",
                            "Stock keeper: can manage products, batches and stock only.",
                        ],
                    },
                    {
                        q: "How do I change my password?",
                        a: [
                            "Open your profile page.",
                            "Enter your current password and the new password.",
                            "Click Save. Use the new password the next time you log in.",
                        ],
                    },
                ],
            },
            {
                id: "sales",
                title: "Sales",
                icon: "fa-solid fa-cash-register",
                desc: "Selling, payments, receipts and returns",
                items: [
                    {
                        q: "How do I make a sale?",
                        a: [
                            "Go to the Sale page.",
                            "Search for a product, or click its card, and press Add to put it in the cart.",
                            "Change the quantity or remove items in the cart if needed.",
                            "Click Checkout, choose the payment method and confirm.",
                        ],
                    },
                    {
                        q: "How do I give a discount?",
                        a: [
                            "Add the products to the cart.",
                            "Enter the discount amount or percent in the discount box.",
                            "Check the new total, then complete the payment.",
                        ],
                    },
                    {
                        q: "How do I print or reprint a receipt?",
                        a: [
                            "After payment, click Print Receipt.",
                            "To reprint an old sale, open Sales History and find the sale.",
                            "Click the print icon next to it.",
                        ],
                    },
                    {
                        q: "How do I hold a sale and continue later?",
                        a: [
                            "Add items to the cart for the first customer.",
                            "Click Hold. The cart is saved and cleared.",
                            "Serve the next customer, then open Held Sales and click Resume.",
                        ],
                    },
                    {
                        q: "How do I process a return or refund?",
                        a: [
                            "Open Sales History and find the original sale.",
                            "Click Return and choose the items and quantity.",
                            "Confirm. The stock quantity is added back automatically.",
                        ],
                    },
                ],
            },
            {
                id: "products",
                title: "Products",
                icon: "fa-solid fa-box",
                desc: "Add and manage products and images",
                items: [
                    {
                        q: "How do I add a new product?",
                        a: [
                            "Go to Products and click Add Product.",
                            "Fill in the name, model, category, brand and prices (cost, sale, old price).",
                            "Choose an image to upload.",
                            "Click Save. The product appears on the Sale page.",
                        ],
                    },
                    {
                        q: "How do I edit or delete a product?",
                        a: [
                            "Open the product list and find the product.",
                            "Click Edit to change details or the image, then Save.",
                            "Click Delete and confirm to remove it.",
                        ],
                    },
                ],
            },
            {
                id: "stock",
                title: "Stock & Batches",
                icon: "fa-solid fa-warehouse",
                desc: "Quantities, locations and stock status",
                items: [
                    {
                        q: "How do I add stock?",
                        a: [
                            "Go to Stocks and click Add Stock.",
                            "Choose the product code, batch, location and category.",
                            "Enter the quantity and the status, then click Save.",
                        ],
                    },
                    {
                        q: "What do the stock statuses mean?",
                        a: [
                            "In stock: the quantity is enough to sell.",
                            "Low stock: the quantity is almost finished, so order more soon.",
                            "Out of stock: the quantity is 0 and the product cannot be sold.",
                        ],
                    },
                    {
                        q: "How do I edit a stock record?",
                        a: [
                            "Open the Stocks list and click the edit button on the row.",
                            "Change the quantity, location or status.",
                            "Click Update to save.",
                        ],
                    },
                ],
            },
            {
                id: "suppliers",
                title: "Suppliers",
                icon: "fa-solid fa-truck",
                desc: "Manage the companies you buy from",
                items: [
                    {
                        q: "How do I add a supplier?",
                        a: [
                            "Go to Suppliers and click Add Supplier.",
                            "Enter the name, business name, address and contact number.",
                            "Click Save. Business name and contact must be unique.",
                        ],
                    },
                    {
                        q: "How do I view, edit or delete a supplier?",
                        a: [
                            "Find the supplier in the list.",
                            "Click View to see all details, or Edit to change them.",
                            "Click Delete and confirm to remove the supplier.",
                        ],
                    },
                ],
            },
            {
                id: "employees",
                title: "Employees",
                icon: "fa-solid fa-users",
                desc: "Staff accounts, photos and roles",
                items: [
                    {
                        q: "How do I add an employee?",
                        a: [
                            "Go to Employees and click Add Employee.",
                            "Enter name, position, phone, age, salary, start date, email and password.",
                            "Choose the role and upload a photo, then click Save.",
                        ],
                    },
                    {
                        q: "How do I change an employee's photo?",
                        a: [
                            "Open the employee and click Edit.",
                            "Choose a new image file.",
                            "Click Update. The new photo replaces the old one.",
                        ],
                    },
                    {
                        q: "How do I reset an employee's password?",
                        a: [
                            "Open the employee's Edit page.",
                            "Type a new password in the password field.",
                            "Click Update and give the new password to the employee.",
                        ],
                    },
                ],
            },
            {
                id: "website",
                title: "Website Products",
                icon: "fa-solid fa-globe",
                desc: "Items shown on your online website",
                items: [
                    {
                        q: "How do I add an item to the website?",
                        a: [
                            "Go to Website and click Add Items To Web.",
                            "Fill in title, brand, model, CPU, RAM, SSD, sale price and description.",
                            "Set deals and the end time of the deal if there is a promotion.",
                            "Upload an image and click Save.",
                        ],
                    },
                    {
                        q: "Are website products the same as POS products?",
                        a: [
                            "No. Website items are stored separately and are only for display online.",
                            "Changing a POS product does not change the website item.",
                            "Edit both if the price or details change.",
                        ],
                    },
                ],
            },
            {
                id: "trouble",
                title: "Troubleshooting",
                icon: "fa-solid fa-screwdriver-wrench",
                desc: "Fix common problems quickly",
                items: [
                    {
                        q: "The image is not showing or not uploading",
                        a: [
                            "Check that the image is JPG, PNG or WEBP and not too large.",
                            "Make sure the server is running.",
                            "Refresh the page. If the image still fails, a default picture is shown.",
                        ],
                    },
                    {
                        q: "No data is loading / server not connected",
                        a: [
                            "Check your internet or network connection.",
                            "Make sure the backend server is running.",
                            "Refresh the page. If it continues, contact support.",
                        ],
                    },
                    {
                        q: "A product is not found on the Sale page",
                        a: [
                            "Check that the product was saved and has stock.",
                            "Search by the exact name or product code.",
                            "Clear the filters and try again.",
                        ],
                    },
                    {
                        q: "The receipt printer does not print",
                        a: [
                            "Check that the printer is on and has paper.",
                            "Check the cable or Wi-Fi connection.",
                            "Choose the correct printer in the print dialog and try again.",
                        ],
                    },
                    {
                        q: "I get a duplicate error when saving",
                        a: [
                            "This means the same value already exists, such as a supplier business name or contact number.",
                            "Search the list for the existing record.",
                            "Edit that record, or use a different value.",
                        ],
                    },
                ],
            },
        ];

        const shortcuts = [
            { label: "Focus search", keys: "Ctrl + K" },
            { label: "Checkout", keys: "F9" },
            { label: "Print receipt", keys: "Ctrl + P" },
            { label: "Hold sale", keys: "F6" },
            { label: "Clear cart", keys: "F4" },
            { label: "Close dialog", keys: "Esc" },
        ];

        const tips = [
            "Check low-stock items every week before they run out.",
            "Close the day by comparing cash in the drawer with the daily sales report.",
            "Back up your database regularly.",
            "Give each employee their own account. Never share passwords.",
            "Use clear product photos so cashiers can find items quickly.",
            "Update website prices when POS prices change.",
        ];

        const contacts = [
            { label: "Phone", value: "+855 00 000 000", icon: "fa-solid fa-phone" },
            { label: "Email", value: "support@yourcompany.com", icon: "fa-solid fa-envelope" },
            { label: "Telegram", value: "@yoursupport", icon: "fa-brands fa-telegram" },
        ];

        // ---------------- SEARCH + FILTER ----------------
        const filteredSections = computed(() => {
            const q = query.value.trim().toLowerCase();

            return sections
                .filter((s) => activeId.value === "all" || s.id === activeId.value)
                .map((s) => ({
                    ...s,
                    items: s.items.filter((item) => {
                        if (!q) return true;
                        return (
                            item.q.toLowerCase().includes(q) ||
                            item.a.some((step) => step.toLowerCase().includes(q)) ||
                            s.title.toLowerCase().includes(q)
                        );
                    }),
                }))
                .filter((s) => s.items.length > 0);
        });

        return {
            query,
            activeId,
            openKey,
            version,
            sections,
            shortcuts,
            tips,
            contacts,
            filteredSections,
            toggle,
        };
    },
};
</script>