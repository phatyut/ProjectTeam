<template>
    <div class="w-full min-h-full bg-slate-50 p-4 md:p-6">

        <!-- Header -->
        <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
                <h1 class="text-2xl font-bold text-green-700">Orders &amp; returns</h1>
                <p class="text-sm text-slate-500">
                    {{ mode === 'order' ? 'Choose products and place a customer order.' : 'Find an order and return its items.' }}
                </p>
            </div>

            <div role="tablist" class="inline-flex gap-1 p-1 bg-white rounded-full border border-slate-200 shadow-sm">
                <button
                    v-for="m in modes" :key="m.key" type="button" role="tab"
                    :aria-selected="mode === m.key"
                    class="px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                    :class="mode === m.key ? 'bg-green-700 text-white shadow' : 'text-green-700 hover:bg-green-50'"
                    @click="mode = m.key"
                >{{ m.label }}</button>
            </div>
        </div>

        <!-- Message -->
        <p
            v-if="message.text"
            class="mb-4 rounded-lg px-4 py-2 text-sm font-semibold border"
            :class="message.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'"
        >{{ message.text }}</p>

        <!-- ===================== ORDER ===================== -->
        <div v-if="mode === 'order'" class="grid gap-5 lg:grid-cols-[1fr_380px]">

            <!-- Product picker -->
            <section class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <input
                    v-model="search" type="search" placeholder="Search products by name or branch"
                    class="w-full mb-4 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                >

                <p v-if="loading" class="py-10 text-center text-slate-400">Loading products…</p>
                <p v-else-if="!filteredProducts.length" class="py-10 text-center text-slate-400">
                    No products match your search.
                </p>

                <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 max-h-150 overflow-y-auto pr-1">
                    <article
                        v-for="p in filteredProducts" :key="p._id"
                        class="flex flex-col rounded-lg border border-slate-200 p-3 hover:border-green-700 transition-colors"
                    >
                        <img :src="imageOf(p.image)" alt="" class="h-28 w-full object-contain mb-2" @error="onImgError">
                        <h3 class="font-bold text-green-700 truncate">{{ p.name }}</h3>
                        <p class="text-xs text-slate-500 truncate">{{ p.branch }}</p>
                        <div class="mt-auto pt-3 flex items-center justify-between">
                            <span class="font-bold">{{ money(p.price) }}</span>
                            <button
                                type="button"
                                class="rounded-full bg-green-700 text-white text-sm font-semibold px-4 py-1 hover:bg-green-800 transition-colors cursor-pointer"
                                @click="addToOrder(p)"
                            >Add</button>
                        </div>
                    </article>
                </div>
            </section>

            <!-- Order summary -->
            <aside class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col h-fit lg:sticky lg:top-4">
                <h2 class="font-bold text-lg mb-3">Order</h2>

                <div class="grid gap-3 mb-4">
                    <label class="text-sm">
                        <span class="block mb-1 text-slate-500">Customer name</span>
                        <input v-model="customer.name" type="text" class="field">
                    </label>
                    <label class="text-sm">
                        <span class="block mb-1 text-slate-500">Phone</span>
                        <input v-model="customer.phone" type="tel" class="field">
                    </label>
                </div>

                <p v-if="!orderItems.length" class="py-6 text-center text-slate-400 text-sm">
                    No items yet. Click Add on a product.
                </p>

                <ul class="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    <li v-for="it in orderItems" :key="it._id" class="py-2 flex items-center gap-2">
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-green-700 truncate">{{ it.name }}</p>
                            <p class="text-xs text-slate-500">{{ money(it.price) }} each</p>
                        </div>
                        <div class="flex items-center gap-2 rounded-full border border-slate-200 px-1">
                            <button type="button" class="qty-btn" @click="changeQty(it, -1)" aria-label="Decrease"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                            <span class="w-5 text-center font-bold text-sm">{{ it.qty }}</span>
                            <button type="button" class="qty-btn" @click="changeQty(it, 1)" aria-label="Increase"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                        </div>
                        <p class="w-20 text-right font-semibold">{{ money(it.price * it.qty) }}</p>
                        <button type="button" class="text-slate-400 hover:text-red-600 cursor-pointer" @click="removeFromOrder(it._id)" aria-label="Remove">
                            <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </button>
                    </li>
                </ul>

                <div class="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                    <span class="font-bold">Total</span>
                    <span class="text-xl font-bold text-green-700">{{ money(orderTotal) }}</span>
                </div>

                <button
                    type="button" :disabled="!orderItems.length || saving"
                    class="mt-4 rounded-lg bg-green-700 text-white font-semibold py-2.5 hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    @click="placeOrder"
                >{{ saving ? 'Placing order…' : 'Place order' }}</button>
            </aside>
        </div>

        <!-- ===================== RETURN ===================== -->
        <div v-else class="grid gap-5 lg:grid-cols-[1fr_380px]">

            <section class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <form class="flex gap-2 mb-4" @submit.prevent="findOrder">
                    <input v-model.trim="orderNo" type="text" placeholder="Order number" class="field flex-1">
                    <button
                        type="submit" :disabled="!orderNo || searching"
                        class="rounded-lg bg-green-700 text-white font-semibold px-5 hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >{{ searching ? 'Searching…' : 'Find order' }}</button>
                </form>

                <p v-if="!foundOrder" class="py-12 text-center text-slate-400">
                    Enter an order number to see what can be returned.
                </p>

                <template v-else>
                    <div class="mb-3 flex flex-wrap justify-between gap-2 text-sm">
                        <p><span class="text-slate-500">Order</span> <b>{{ foundOrder.orderNo }}</b></p>
                        <p v-if="foundOrder.customerName"><span class="text-slate-500">Customer</span> <b>{{ foundOrder.customerName }}</b></p>
                        <p v-if="foundOrder.createdAt"><span class="text-slate-500">Date</span> <b>{{ formatDate(foundOrder.createdAt) }}</b></p>
                    </div>

                    <ul class="divide-y divide-slate-100">
                        <li v-for="line in returnLines" :key="line.productId" class="py-3 flex items-center gap-3">
                            <img :src="imageOf(line.image)" alt="" class="h-14 w-14 object-contain rounded border border-slate-200" @error="onImgError">
                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-green-700 truncate">{{ line.name }}</p>
                                <p class="text-xs text-slate-500">
                                    {{ money(line.price) }} each · bought {{ line.qty }}
                                    <span v-if="line.alreadyReturned"> · returned {{ line.alreadyReturned }}</span>
                                </p>
                            </div>

                            <div v-if="line.maxReturn > 0" class="flex items-center gap-2 rounded-full border border-slate-200 px-1">
                                <button type="button" class="qty-btn" @click="changeReturn(line, -1)" aria-label="Return fewer"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                                <span class="w-5 text-center font-bold text-sm">{{ line.returnQty }}</span>
                                <button type="button" class="qty-btn" @click="changeReturn(line, 1)" aria-label="Return more"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                            </div>
                            <span v-else class="text-xs text-slate-400">Fully returned</span>
                        </li>
                    </ul>
                </template>
            </section>

            <aside class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col h-fit lg:sticky lg:top-4">
                <h2 class="font-bold text-lg mb-3">Return</h2>

                <div class="grid gap-3 mb-4">
                    <label class="text-sm">
                        <span class="block mb-1 text-slate-500">Reason</span>
                        <select v-model="returnReason" class="field">
                            <option v-for="r in reasons" :key="r" :value="r">{{ r }}</option>
                        </select>
                    </label>
                    <label class="text-sm">
                        <span class="block mb-1 text-slate-500">Note (optional)</span>
                        <textarea v-model="returnNote" rows="3" class="field resize-none"></textarea>
                    </label>
                </div>

                <div class="flex items-center justify-between border-t border-slate-200 pt-3">
                    <span class="font-bold">Refund</span>
                    <span class="text-xl font-bold text-green-700">{{ money(refundTotal) }}</span>
                </div>

                <button
                    type="button" :disabled="!returnCount || saving"
                    class="mt-4 rounded-lg bg-green-700 text-white font-semibold py-2.5 hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    @click="submitReturn"
                >{{ saving ? 'Saving…' : `Return ${returnCount} ${returnCount === 1 ? 'item' : 'items'}` }}</button>
            </aside>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const API = "http://localhost:2026/api";
const IMG_BASE = "http://localhost:2026/uploads/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
    setup() {
        /* ---------- shared ---------- */
        const modes = [
            { key: "order", label: "Order" },
            { key: "return", label: "Return" },
        ];
        const mode = ref("order");
        const saving = ref(false);
        const message = ref({ text: "", ok: true });
        let messageTimer;

        const notify = (text, ok = true) => {
            message.value = { text, ok };
            clearTimeout(messageTimer);
            messageTimer = setTimeout(() => (message.value.text = ""), 4000);
        };

        const money = (n) =>
            "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const formatDate = (d) =>
            new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const imageOf = (image) => {
            if (!image) return FALLBACK;
            if (/^https?:\/\//.test(image)) return image;
            return IMG_BASE + image.split(/[\\/]/).pop();
        };
        const onImgError = (e) => {
            if (!e.target.src.endsWith(FALLBACK)) e.target.src = FALLBACK;
        };
        const unwrap = (res) => res.data?.data ?? res.data;

        /* ---------- order ---------- */
        const products = ref([]);
        const loading = ref(false);
        const search = ref("");
        const customer = ref({ name: "", phone: "" });
        const orderItems = ref([]);

        const loadProducts = async () => {
            loading.value = true;
            try {
                const list = unwrap(await axios.get(`${API}/products`));
                products.value = Array.isArray(list) ? list : [];
            } catch {
                notify("Could not load products. Check that the server is running.", false);
            } finally {
                loading.value = false;
            }
        };
        onMounted(loadProducts);

        const filteredProducts = computed(() => {
            const q = search.value.trim().toLowerCase();
            if (!q) return products.value;
            return products.value.filter((p) =>
                `${p.name ?? ""} ${p.branch ?? ""}`.toLowerCase().includes(q)
            );
        });

        const addToOrder = (p) => {
            const found = orderItems.value.find((i) => i._id === p._id);
            if (found) found.qty++;
            else orderItems.value.push({ _id: p._id, name: p.name, price: Number(p.price), qty: 1 });
        };
        const changeQty = (item, delta) => {
            item.qty += delta;
            if (item.qty < 1) removeFromOrder(item._id);
        };
        const removeFromOrder = (id) => {
            orderItems.value = orderItems.value.filter((i) => i._id !== id);
        };
        const orderTotal = computed(() =>
            orderItems.value.reduce((s, i) => s + i.price * i.qty, 0)
        );

        const placeOrder = async () => {
            saving.value = true;
            try {
                const res = await axios.post(`${API}/orders`, {
                    customerName: customer.value.name,
                    phone: customer.value.phone,
                    items: orderItems.value.map((i) => ({
                        productId: i._id, name: i.name, price: i.price, qty: i.qty,
                    })),
                    total: orderTotal.value,
                });
                const created = unwrap(res);
                notify(`Order ${created?.orderNo ?? ""} placed.`.replace("  ", " "));
                orderItems.value = [];
                customer.value = { name: "", phone: "" };
            } catch (err) {
                notify(err.response?.data?.message || "Could not place the order.", false);
            } finally {
                saving.value = false;
            }
        };

        /* ---------- return ---------- */
        const reasons = ["Defective or damaged", "Wrong item", "Changed mind", "Other"];
        const orderNo = ref("");
        const searching = ref(false);
        const foundOrder = ref(null);
        const returnLines = ref([]);
        const returnReason = ref(reasons[0]);
        const returnNote = ref("");

        const findOrder = async () => {
            searching.value = true;
            foundOrder.value = null;
            returnLines.value = [];
            try {
                const res = await axios.get(`${API}/orders`, { params: { orderNo: orderNo.value } });
                const data = unwrap(res);
                const order = Array.isArray(data) ? data[0] : data;
                if (!order) {
                    notify("No order found with that number.", false);
                    return;
                }
                foundOrder.value = order;
                returnLines.value = (order.items || []).map((i) => {
                    const alreadyReturned = i.returnedQty || 0;
                    return {
                        productId: i.productId,
                        name: i.name,
                        image: i.image,
                        price: Number(i.price),
                        qty: i.qty,
                        alreadyReturned,
                        maxReturn: i.qty - alreadyReturned,
                        returnQty: 0,
                    };
                });
            } catch (err) {
                notify(err.response?.data?.message || "Could not search for the order.", false);
            } finally {
                searching.value = false;
            }
        };

        const changeReturn = (line, delta) => {
            line.returnQty = Math.min(line.maxReturn, Math.max(0, line.returnQty + delta));
        };
        const returnCount = computed(() =>
            returnLines.value.reduce((s, l) => s + l.returnQty, 0)
        );
        const refundTotal = computed(() =>
            returnLines.value.reduce((s, l) => s + l.price * l.returnQty, 0)
        );

        const submitReturn = async () => {
            saving.value = true;
            try {
                await axios.post(`${API}/returns`, {
                    orderId: foundOrder.value._id,
                    orderNo: foundOrder.value.orderNo,
                    items: returnLines.value
                        .filter((l) => l.returnQty > 0)
                        .map((l) => ({ productId: l.productId, name: l.name, price: l.price, qty: l.returnQty })),
                    reason: returnReason.value,
                    note: returnNote.value,
                    refundTotal: refundTotal.value,
                });
                notify(`Return saved. Refund ${money(refundTotal.value)}.`);
                returnNote.value = "";
                await findOrder(); // refresh what is still returnable
            } catch (err) {
                notify(err.response?.data?.message || "Could not save the return.", false);
            } finally {
                saving.value = false;
            }
        };

        return {
            modes, mode, saving, message, money, formatDate, imageOf, onImgError,
            // order
            loading, search, filteredProducts, customer, orderItems, orderTotal,
            addToOrder, changeQty, removeFromOrder, placeOrder,
            // return
            reasons, orderNo, searching, foundOrder, returnLines, returnReason, returnNote,
            returnCount, refundTotal, findOrder, changeReturn, submitReturn,
        };
    },
};
</script>

<style scoped>
.field {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #cbd5e1;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    background: #fff;
    outline: none;
}
.field:focus {
    border-color: #15803d;
    box-shadow: 0 0 0 3px rgb(21 128 61 / 0.2);
}
.qty-btn {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 9999px;
    color: #15803d;
    cursor: pointer;
}
.qty-btn:hover {
    background: #f0fdf4;
}
</style>