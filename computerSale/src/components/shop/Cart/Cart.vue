<template>
    <div class="w-full min-h-full bg-gradient-to-br fixed top-0 left-0 z-40 from-green-50 via-slate-50 to-white p-4 md:p-8">

        <!-- Success screen -->
        <div v-if="confirmed" class="mx-auto mt-10 max-w-md rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-green-100">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">✓</div>
            <h2 class="text-2xl font-bold text-slate-800">Order confirmed</h2>
            <p class="mt-2 text-sm text-slate-500">
                {{ confirmed.qty }} {{ confirmed.qty === 1 ? 'piece' : 'pieces' }} · {{ money(confirmed.total) }}$
            </p>
            <button
                type="button"
                class="mt-6 w-full rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-green-800 cursor-pointer"
                @click="continueShopping"
            >Back to shop</button>
        </div>

        <template v-else>
            <!-- Header -->
            <div class="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                    <h1 class="text-3xl font-extrabold tracking-tight text-green-700">Your cart</h1>
                    <span class="rounded-full bg-green-700 px-3 py-1 text-sm font-bold text-white shadow-sm">
                        {{ totalQty }}
                    </span>
                </div>

                <div class="flex gap-2">
                    <button
                        type="button"
                        class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-green-600 hover:text-green-700 cursor-pointer"
                        @click="continueShopping"
                    >← Continue shopping</button>

                    <button
                        type="button" :disabled="!lineCount"
                        class="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        @click="confirmClear"
                    >Clear cart</button>
                </div>
            </div>

            <!-- Empty -->
            <div v-if="!lineCount" class="mx-auto max-w-5xl rounded-2xl bg-white p-14 text-center text-slate-400 shadow-sm ring-1 ring-slate-200">
                <div class="mb-2 text-5xl">🛒</div>
                Your cart is empty.
            </div>

            <!-- Content -->
            <div v-else class="mx-auto grid max-w-5xl gap-5 lg:grid-cols-3">

                <!-- Items -->
                <div class="space-y-3 lg:col-span-2">
                    <div
                        v-for="item in list"
                        :key="idOf(item)"
                        class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
                    >
                        <div class="min-w-0 flex-1">
                            <p class="truncate text-base font-semibold text-slate-800">{{ item.name }}</p>
                            <p class="text-sm text-slate-500">{{ money(item.price) }}$ each</p>
                        </div>

                        <!-- Qty -->
                        <div class="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
                            <button
                                type="button"
                                class="h-8 w-8 rounded-lg bg-white font-bold text-slate-600 shadow-sm hover:text-green-700 cursor-pointer"
                                @click="decrease(argOf(item))"
                            >−</button>
                            <span class="w-9 text-center text-sm font-bold text-slate-800">{{ item.qty }}</span>
                            <button
                                type="button"
                                class="h-8 w-8 rounded-lg bg-white font-bold text-slate-600 shadow-sm hover:text-green-700 cursor-pointer"
                                @click="increase(argOf(item))"
                            >+</button>
                        </div>

                        <p class="w-24 text-right text-base font-bold text-green-700">
                            {{ money(item.price * item.qty) }}$
                        </p>

                        <button
                            type="button"
                            class="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer"
                            @click="cancelItem(item)"
                        >Cancel</button>
                    </div>
                </div>

                <!-- Summary -->
                <div class="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6">
                    <h2 class="mb-4 text-lg font-bold text-slate-800">Order summary</h2>

                    <dl class="space-y-2 text-sm">
                        <div class="flex justify-between text-slate-500">
                            <dt>Products</dt><dd class="font-semibold text-slate-700">{{ lineCount }}</dd>
                        </div>
                        <div class="flex justify-between text-slate-500">
                            <dt>Total quantity</dt><dd class="font-semibold text-slate-700">{{ totalQty }}</dd>
                        </div>
                        <div class="flex justify-between border-t border-slate-200 pt-3 text-base">
                            <dt class="font-bold text-slate-800">Total</dt>
                            <dd class="font-extrabold text-green-700">{{ money(total) }}$</dd>
                        </div>
                    </dl>

                    <button
                        type="button"
                        class="mt-5 w-full rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-green-800 cursor-pointer"
                        @click="showConfirm = true"
                    >Confirm order</button>
                </div>
            </div>
        </template>

        <!-- Confirm modal -->
        <div
            v-if="showConfirm"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            @click.self="showConfirm = false"
        >
            <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h3 class="text-xl font-bold text-slate-800">Confirm your order?</h3>
                <p class="mt-1 text-sm text-slate-500">Please check the items before confirming.</p>

                <ul class="mt-4 max-h-56 space-y-2 overflow-y-auto text-sm">
                    <li v-for="item in list" :key="idOf(item)" class="flex justify-between gap-3">
                        <span class="truncate text-slate-700">{{ item.name }} × {{ item.qty }}</span>
                        <span class="font-semibold text-slate-800">{{ money(item.price * item.qty) }}$</span>
                    </li>
                </ul>

                <div class="mt-4 flex justify-between border-t border-slate-200 pt-3 text-base">
                    <span class="font-bold text-slate-800">Total ({{ totalQty }} pcs)</span>
                    <span class="font-extrabold text-green-700">{{ money(total) }}$</span>
                </div>

                <div class="mt-6 flex gap-3">
                    <button
                        type="button"
                        class="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                        @click="showConfirm = false"
                    >Back</button>
                    <button
                        type="button" :disabled="submitting"
                        class="flex-1 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-800 disabled:opacity-60 cursor-pointer"
                        @click="placeOrder"
                    >{{ submitting ? 'Saving...' : 'Yes, confirm' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, unref } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "../UseCart.js";

export default {
    setup() {
        const router = useRouter();
        const { items, increase, decrease, remove, clear, total } = useCart();

        const showConfirm = ref(false);
        const submitting = ref(false);
        const confirmed = ref(null); // { qty, total } after a successful order

        // works whether `items` is a ref or a plain reactive array
        const list = computed(() => unref(items) || []);
        const lineCount = computed(() => list.value.length);
        const totalQty = computed(() =>
            list.value.reduce((sum, i) => sum + Number(i.qty || 0), 0)
        );

        // CHANGE if your item uses another id field
        const idOf = (item) => item._id ?? item.id;
        // CHANGE if increase/decrease/remove in useCart expect the whole item instead of an id
        const argOf = (item) => idOf(item);

        const money = (n) =>
            Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // CHANGE "/shop" to the route of your shop page
        const continueShopping = () => router.push("/shop");

        const cancelItem = (item) => {
            if (confirm(`Cancel "${item.name}" from the cart?`)) remove(argOf(item));
        };

        const confirmClear = () => {
            if (confirm("Remove all items from the cart?")) clear();
        };

        const placeOrder = async () => {
            submitting.value = true;
            try {
                // TODO: save the order to your backend here, for example:
                // await axios.post("/api/orders", { items: list.value, total: unref(total) });

                confirmed.value = { qty: totalQty.value, total: unref(total) };
                clear();
                showConfirm.value = false;
            } catch (e) {
                alert("Could not confirm the order. Please try again.");
            } finally {
                submitting.value = false;
            }
        };

        return {
            list, lineCount, totalQty, total,
            increase, decrease,
            showConfirm, submitting, confirmed,
            idOf, argOf, money,
            continueShopping, cancelItem, confirmClear, placeOrder,
        };
    },
};
</script>