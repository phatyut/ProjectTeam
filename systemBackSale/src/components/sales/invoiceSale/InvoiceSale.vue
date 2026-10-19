<template>
    <div class="print-area relative w-full h-full bg-slate-50 p-2 ">

        <!-- ================= SCREEN VIEW (unchanged look, hidden when printing) ================= -->
        <div class="print:hidden">
            <div class="flex justify-between items-center ">
                <div>
                    <img src="../../../../public/imgs/microcomputer.png" alt="" class="h-37.5">
                </div>

                <div class="flex flex-col gap-1 text-sm">
                    <label class="flex items-center gap-2 justify-between">
                        Date
                        <input v-model="issueDate" type="date" class="border-b border-dotted">
                    </label>
                    <label class="flex items-center gap-2 justify-between">
                        Due date
                        <input v-model="dueDate" type="date" class="border-b border-dotted">
                    </label>
                </div>
            </div>

            <p v-if="!items.length" class="py-10 text-center text-slate-400">
                No items yet. Click Add on a product.
            </p>

            <div class="max-h-104 overflow-y-auto">
                <div
                    class=" flex items-center justify-between px-2 hover:bg-slate-100"
                    v-for="product in items"
                    :key="product._id"
                >
                    <div><img :src="imageOf(product.image)" alt="" class="h-18 w-18 object-contain" @error="onImgError"></div>
                    <div class="flex-1 px-2 min-w-0">
                        <div class="uppercase font-bold text-green-700 truncate">{{ product.name }}</div>
                        <div class="text-[12px] truncate">{{ product.branch }}</div>
                    </div>
                    <div class="px-2">
                        <p class="font-eng text-green-700">{{ lineTotal(product) }}$</p>
                    </div>
                    <div class="flex rounded-full gap-5 justify-center items-center shadow-2xs shadow-green-700 p-1">
                        <button class="px-0.5 bg-slate-200 rounded-full *:text-green-700" @click="$emit('decrease', product._id)"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                        <p class="font-bold">{{ product.qty }}</p>
                        <button class="px-1 bg-green-700 rounded-full *:text-white" @click="$emit('increase', product._id)"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                    </div>
                    <div class="pl-2">
                        <button class="font-eng *:text-green-700 rounded-full" @click="$emit('remove', product._id)">
                            <font-awesome-icon icon="fa-solid fa-trash-can" class="hover:text-red-600 hover:cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between px-2 bg-slate-50 p-2">
                <div class="uppercase font-bold">Total:</div>
                <div class="font-eng text-green-700">{{ total }}$</div>
            </div>
        </div>

        <!-- ================= PRINT VIEW (invoice layout) ================= -->
        <div class="invoice hidden print:block">

            <header class="invoice-head">
                <img src="../../../../public/imgs/microcomputer.png" alt="Micro Computer" class="invoice-logo">
                <div class="invoice-meta">
                    <h1>Invoice</h1>
                    <dl>
                        <div><dt>Invoice no.</dt><dd>{{ invoiceNo }}</dd></div>
                        <div v-if="issueDate"><dt>Date</dt><dd>{{ formatDate(issueDate) }}</dd></div>
                        <div v-if="dueDate"><dt>Due date</dt><dd>{{ formatDate(dueDate) }}</dd></div>
                    </dl>
                </div>
            </header>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th class="col-item">Item</th>
                        <th class="col-num">Price</th>
                        <th class="col-qty">Qty</th>
                        <th class="col-num">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in items" :key="product._id">
                        <td class="col-item">
                            <div class="item-cell">
                                <img :src="imageOf(product.image)" alt="" @error="onImgError">
                                <div>
                                    <div class="item-name">{{ product.name }}</div>
                                    <div v-if="product.branch" class="item-sub">{{ product.branch }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="col-num">{{ money(product.price) }}</td>
                        <td class="col-qty">{{ product.qty }}</td>
                        <td class="col-num strong">{{ money(product.price * product.qty) }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="invoice-total">
                <div class="count">{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</div>
                <div class="amount-label">Total due</div>
                <div class="amount">{{ money(total) }}</div>
            </div>

            <footer class="invoice-foot">
                <p class="thanks">Thank you for your purchase.</p>
                <div class="signatures">
                    <div><span></span>Customer signature</div>
                    <div><span></span>Seller signature</div>
                </div>
            </footer>
        </div>

    </div>
</template>

<script>
import { computed, ref } from "vue";

const IMG_BASE = "http://localhost:2026/uploads/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
    props: { items: { type: Array, default: () => [] } },
    emits: ["increase", "decrease", "remove", "clicktest"],
    setup(props) {
        const today = new Date().toISOString().slice(0, 10);
        const issueDate = ref(today);
        const dueDate = ref("");

        const lineTotal = (p) => (p.price * p.qty).toFixed(2);
        const total = computed(() =>
            props.items.reduce((sum, p) => sum + p.price * p.qty, 0).toFixed(2)
        );
        const itemCount = computed(() =>
            props.items.reduce((sum, p) => sum + p.qty, 0)
        );

        const money = (n) =>
            "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const formatDate = (iso) =>
            new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric",
            });

        // simple readable number based on the date, e.g. INV-20261019
        const invoiceNo = computed(() =>
            "INV-" + (issueDate.value || today).replaceAll("-", "")
        );

        const imageOf = (image) => {
            if (!image) return FALLBACK;
            if (/^https?:\/\//.test(image)) return image;
            return IMG_BASE + image.split(/[\\/]/).pop();
        };
        const onImgError = (e) => {
            if (!e.target.src.endsWith(FALLBACK)) e.target.src = FALLBACK;
        };

        return {
            issueDate, dueDate, invoiceNo, itemCount,
            lineTotal, total, money, formatDate, imageOf, onImgError,
        };
    },
};
</script>

<style>
@page {
    size: A4;
    margin: 0;
}

/* ---------- print only ---------- */
@media print {
    body * {
        visibility: hidden;
    }
    .print-area,
    .print-area * {
        visibility: visible;
    }
    .print-area {
        position: fixed;
        border: 1px solid green;
        inset: 0;
        width: 100%;
        height: auto;
        background: #fff;
        box-sizing: border-box;
        padding: 14mm 10mm !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }

    .invoice {
        --green: #15803d;
        --green-dark: #0f5c2b;
        --ink: #1c2420;
        --muted: #6b7a72;
        --line: #d9e2dc;
        color: var(--ink);
        font-size: 11pt;
        font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    }

    /* header */
    .invoice-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 8mm;
      
    }
    .invoice-logo { height: 30mm; width: auto; }
    .invoice-meta { text-align: right; }
    .invoice-meta h1 {
        margin: 0 0 3mm;
        font-size: 30pt;
        font-weight: 800;
        letter-spacing: -0.5px;
        color: var(--green-dark);
        line-height: 1;
    }
    .invoice-meta dl { margin: 0; font-size: 10pt; }
    .invoice-meta dl div {
        display: flex;
        justify-content: flex-end;
        gap: 6mm;
        padding: 0.8mm 0;
    }
    .invoice-meta dt { color: var(--muted); }
    .invoice-meta dd { margin: 0; font-weight: 600; min-width: 28mm; text-align: right; }

    /* table */
    .invoice-table {
        width: 100%;
        margin-top: 8mm;
        border-collapse: collapse;
    }
    .invoice-table thead { display: table-header-group; } /* repeats on every page */
    .invoice-table th {
        text-align: left;
        font-size: 9.5pt;
        font-weight: 600;
        color: var(--muted);
        padding: 0 3mm 3mm;
        border-bottom: 1px solid var(--ink);
    }
    .invoice-table td {
        padding: 3.5mm 3mm;
        border-bottom: 1px solid var(--line);
        vertical-align: middle;
    }
    .invoice-table tr { break-inside: avoid; page-break-inside: avoid; }
    .invoice-table tbody tr:nth-child(even) td { background: #f5f9f6; }

    .col-item { width: 52%; }
    .col-qty { text-align: center !important; width: 10%; }
    .col-num { text-align: right !important; white-space: nowrap; }
    .strong { font-weight: 700; color: var(--green-dark); }

    .item-cell { display: flex; align-items: center; gap: 4mm; }
    .item-cell img {
        width: 16mm;
        height: 16mm;
        object-fit: contain;
        border: 1px solid var(--line);
        border-radius: 2mm;
        background: #fff;
        flex: none;
    }
    .item-name { font-weight: 700; color: var(--ink); }
    .item-sub { font-size: 9pt; color: var(--muted); margin-top: 0.5mm; }

    /* total block */
    .invoice-total {
        display: flex;
        align-items: baseline;
        gap: 6mm;
        margin: 8mm 0 0 auto;
        width: 90mm;
        padding: 5mm 6mm;
        background: var(--green) !important;
        color: #fff;
        border-radius: 2mm;
        break-inside: avoid;
    }
    .invoice-total .count { font-size: 9pt; opacity: 0.85; flex: 1; }
    .invoice-total .amount-label { font-size: 10pt; }
    .invoice-total .amount { font-size: 18pt; font-weight: 800; }

    /* footer */
    .invoice-foot { margin-top: 22mm; break-inside: avoid; }
    .invoice-foot .thanks {
        margin: 0 0 18mm;
        font-size: 12pt;
        font-weight: 600;
        color: var(--green-dark);
    }
    .signatures { display: flex; justify-content: space-between; gap: 20mm; }
    .signatures div {
        flex: 1;
        text-align: center;
        font-size: 9pt;
        color: var(--muted);
    }
    .signatures span {
        display: block;
        border-top: 1px solid var(--ink);
        margin-bottom: 1.5mm;
    }
}
</style>