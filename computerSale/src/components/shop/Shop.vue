<template>
<div class="relative w-full h-auto flex flex-wrap gap-2">
    <SlideReviewShop/>
    <div class="flex w-full gap-4">

        <!-- ================= SIDEBAR ================= -->
        <div class="w-[20%] h-full px-2" v-if="shop.shopmenu">
            <div class="sticky top-16">
                <div class="rounded-md flex flex-col gap-3">
                    <div class="bg-slate-50 p-3 rounded-md border border-slate-100">
                        <div class="flex items-center gap-3">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-layer-group" />
                            </div>
                            <div class="font-bold">Categories</div>
                        </div>
                        <div class="pt-4 flex flex-col gap-1.5 *:font-bold text-gray-500 *:hover:cursor-pointer">
                            <SelectCategory/>
                        </div>
                    </div>

                    <!-- price range -->
                    <div class="flex flex-col gap-6 bg-slate-50 border border-slate-100 rounded-md p-3">
                        <div class="flex items-center gap-3">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-layer-group" />
                            </div>
                            <div class="font-bold">Price range</div>
                        </div>
                        <div class="flex w-full gap-2 items-center">
                            <p class="text-[14px] text-green-700 p-2 font-bold">$0</p>
                            <input
                                type="range" min="0" :max="maxPrice" step="1"
                                v-model.number="setRangePrice"
                                class="w-full h-0.5 accent-emerald-700"
                            >
                            <p class="text-[14px] text-green-700 p-2 font-bold">${{ setRangePrice }}</p>
                        </div>
                    </div>

                    <div class="bg-slate-50 flex flex-col gap-3.5 rounded-md border border-slate-100 p-3">
                        <div class="flex items-center gap-3">
                            <div>
                                <font-awesome-icon icon="fa-brands fa-rebel" />
                            </div>
                            <div class="font-bold">Brand</div>
                        </div>
                        <div class="flex flex-col w-full gap-2">
                            <SelectBrands/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= PRODUCTS ================= -->
        <div class="flex flex-col gap-3 w-full" :class="shop.shopmenu?'flex flex-col gap-3 w-full':'flex justify-start  items-center'">
            <div class="flex justify-between relative w-[85%] items-center">
                <BtnShop/>
            </div>

            <p v-if="loading" class="py-10 text-center text-slate-400">Loading products…</p>
            <div v-else-if="errorMsg" class="py-10 text-center">
                <p class="text-red-600">{{ errorMsg }}</p>
                <button
                    type="button"
                    class="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700 cursor-pointer"
                    @click="getItemsWeb"
                >
                    Try again
                </button>
            </div>
            <p v-else-if="!webs.length" class="py-10 text-center text-slate-400">
                No products found.
            </p>
            <p v-else-if="!filteredWebs.length" class="py-10 text-center text-slate-400">
                No products match the selected filters.
            </p>

            <div class="grid grid-cols-4 gap-8 text-black" :class="shop.shopmenu?'w-full':'w-[85%]'">
                <div v-for="items in filteredWebs" :key="items._id">
                    <div
                        class="group relative flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-xl"
                    >
                        <!-- IMAGE -->
                        <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                            <img
                                :src="imageOf(items.image, items.updatedAt)"
                                :alt="items.title"
                                class="h-full w-full cursor-zoom-in object-cover transition duration-500 group-hover:scale-105"
                                @error="onImgError"
                                @click="openZoom(items)"
                            />

                            <!-- Title tag -->
                            <span class="pointer-events-none absolute left-3 top-3 max-w-[65%] truncate rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">
                                {{ items.title }}
                            </span>

                            <!-- Favorite -->
                            <button class="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-400 shadow transition hover:text-red-500">
                                ♥
                            </button>

                            <!-- Discount -->
                            <span
                                v-if="discount(items) > 0"
                                class="pointer-events-none absolute bottom-3 left-3 rounded-md bg-red-600 px-2.5 py-1 text-sm font-extrabold text-white shadow"
                            >
                                -{{ discount(items) }}%
                            </span>
                        </div>

                        <!-- DETAILS -->
                        <div class="px-5 pt-4">
                            <p class="truncate text-xs font-semibold uppercase tracking-wider text-green-700">
                                {{ items.model }}
                            </p>
                            <h2 class="truncate text-xl font-extrabold text-slate-900">{{ items.brand }}</h2>

                            <!-- SPECS -->
                            <div class="mt-3 grid grid-cols-3 gap-2">
                                <div class="min-w-0 rounded-lg bg-slate-100 px-2 py-2 text-center">
                                    <p class="text-xs font-medium text-slate-500">CPU</p>
                                    <p class="truncate text-sm font-bold text-slate-900" :title="items.cpu">{{ items.cpu }}</p>
                                </div>
                                <div class="rounded-lg bg-slate-100 px-2 py-2 text-center">
                                    <p class="text-xs font-medium text-slate-500">RAM</p>
                                    <p class="text-sm font-bold text-slate-900">{{ items.ram }}</p>
                                </div>
                                <div class="rounded-lg bg-slate-100 px-2 py-2 text-center">
                                    <p class="text-xs font-medium text-slate-500">SSD</p>
                                    <p class="text-sm font-bold text-slate-900">{{ ssdLabel(items.ssd) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- TEAR LINE -->
                        <div class="relative mt-5">
                            <div class="mx-5 border-t-2 border-dashed border-slate-300"></div>
                            <!-- notches: change bg-slate-100 to match your page background -->
                            <span class="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-slate-200 bg-slate-100"></span>
                            <span class="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-slate-200 bg-slate-100"></span>
                        </div>

                        <!-- PRICE + ACTIONS -->
                        <div class="mt-auto px-5 pb-5 pt-4">
                            <div class="flex items-end justify-between gap-2">
                                <div>
                                    <p v-if="discount(items) > 0" class="text-sm text-slate-500 line-through">
                                        {{ money(items.salePrice) }}$
                                    </p>
                                    <p class="text-3xl font-black leading-none text-green-700">{{ money(finalPrice(items)) }}$</p>
                                </div>

                                <p
                                    v-if="dealEnd(items)"
                                    class="text-right text-xs font-semibold"
                                    :class="dealEnd(items).over ? 'text-red-600' : 'text-slate-600'"
                                >
                                    {{ dealEnd(items).over ? 'Ended' : 'Deal ends' }}<br />
                                    {{ dealEnd(items).text }}
                                </p>
                            </div>

                            <div class="mt-4 flex gap-2">
                                <button
                                    type="button"
                                    class="flex-1 cursor-pointer rounded-lg py-2.5 text-base font-bold text-white transition active:scale-95"
                                    :class="justAdded === items._id ? 'bg-green-800' : 'bg-green-600 hover:bg-green-700'"
                                    @click="buy(items)"
                                >
                                    {{ justAdded === items._id ? 'Added ✓' : 'BUY' }}
                                </button>
                                <button class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-green-600 hover:text-green-700">
                                    More
                                </button>
                            </div>

                            <p v-if="qtyInCart(items._id)" class="mt-2 text-center text-sm font-medium text-green-700">
                                {{ qtyInCart(items._id) }} in your cart
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- floating cart bar: appears after the first item is added -->
    <button
        v-if="cartCount"
        type="button"
        class="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-green-700 px-5 py-3 text-white shadow-lg transition hover:bg-green-800 cursor-pointer"
        @click="goToCart"
    >
        <font-awesome-icon icon="fa-solid fa-cart-shopping" />
        <span class="font-bold">{{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}</span>
        <span class="border-l border-white/40 pl-3 font-bold">{{ money(cartTotal) }}$</span>
    </button>

    <!-- full screen image viewer: click the dark background, press X, or press Esc to close -->
    <div
        v-if="zoomItem"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        @click="closeZoom"
    >
        <button
            type="button"
            class="absolute right-5 top-5 h-10 w-10 rounded-full bg-white/20 text-2xl text-white transition hover:bg-white/40 cursor-pointer"
            @click.stop="closeZoom"
        >
            ✕
        </button>

        <img
            :src="imageOf(zoomItem.image, zoomItem.updatedAt)"
            :alt="zoomItem.title"
            class="max-h-full max-w-full rounded-lg object-contain"
            @click.stop
            @error="onImgError"
        />
    </div>
</div>
</template>

<script>
import SlideReviewShop from "./slideReviewShop/SlideReviewShop.vue"
import SelectCategory from "./selectCategory/SelectCategory.vue"
import SelectBrands from "./selectBrands/SelectBrands.vue"
import BtnShop from "./btnShop/BtnShop.vue"

import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useCart } from "./UseCart.js" // change the path if you saved useCart.js somewhere else
import { shop } from "../../sharing/Sharing.js"

const API = "http://localhost:2026/api/web";

// multer saves website images in backend/public/uploadsWebsite (the database stores the filename only)
const IMG_BASE = "http://localhost:2026/uploadsWebsite/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
    components: {
        SlideReviewShop,
        SelectCategory,
        SelectBrands,
        BtnShop,
    },
    setup() {
        const router = useRouter();
        const cart = useCart();

        const webs = ref([]);
        const loading = ref(false);
        const errorMsg = ref("");
        const setRangePrice = ref(0);

        // ---------- images ----------
        // "version" (updatedAt) keeps the browser from showing an old cached picture after an edit
        const imageOf = (image, version) => {
            if (!image) return FALLBACK;
            if (/^https?:\/\//.test(image)) return image;
            const url = IMG_BASE + image.split(/[\\/]/).pop();
            return version ? `${url}?v=${new Date(version).getTime()}` : url;
        };
        // use the fallback once, so a missing fallback cannot loop
        const onImgError = (e) => {
            if (!e.target.src.endsWith(FALLBACK)) e.target.src = FALLBACK;
        };

        // ---------- zoom (full screen image) ----------
        const zoomItem = ref(null);

        const openZoom = (p) => {
            zoomItem.value = p;
            document.body.style.overflow = "hidden"; // stop the page scrolling behind the viewer
        };
        const closeZoom = () => {
            zoomItem.value = null;
            document.body.style.overflow = "";
        };
        const onKey = (e) => {
            if (e.key === "Escape" && zoomItem.value) closeZoom();
        };
        onMounted(() => window.addEventListener("keydown", onKey));
        onBeforeUnmount(() => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = ""; // in case you leave the page while zoomed
        });

        // ---------- price helpers ----------
        // ASSUMPTION: "deals" is a discount percent (10 = 10% off) and salePrice is the price before the discount.
        // If your meaning is different, change only these two functions.
        const discount = (p) => {
            const d = Math.ceil(Number(p.deals) || 0);
            return Math.min(Math.max(d, 0), 100);
        };
        const finalPrice = (p) => Number(p.salePrice || 0) * (1 - discount(p) / 100);

        const money = (n) =>
            Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // ssd is stored in GB: 256 -> "256 GB", 1024 -> "1 TB"
        const ssdLabel = (gb) => {
            const n = Number(gb);
            if (!n) return "-";
            return n >= 1024 && n % 1024 === 0 ? `${n / 1024} TB` : `${n} GB`;
        };

        const dealEnd = (p) => {
            if (!p.timeOfDeals) return null;
            const d = new Date(p.timeOfDeals);
            return { text: d.toLocaleDateString(), over: d < new Date() };
        };

        // ---------- filters ----------
        // the slider goes up to the most expensive product, so it always fits your data
        const maxPrice = computed(() => {
            const top = Math.max(0, ...webs.value.map(finalPrice));
            return Math.ceil(top);
        });

        // a product must pass BOTH filters: the price slider and the category buttons (BtnShop)
        const filteredWebs = computed(() =>
            webs.value.filter((p) => {
                const okPrice = finalPrice(p) <= setRangePrice.value;
                const current = String(shop.category || "all").toLowerCase();
                const okCategory =
                    current === "all" ||
                    String(p.category || "").toLowerCase() === current;
                return okPrice && okCategory;
            })
        );

        // ---------- cart ----------
        const justAdded = ref(null); // id of the product whose button shows "Added ✓"
        let addedTimer;

        const buy = (p) => {
            cart.add({
                _id: p._id,
                name: p.title,
                branch: [p.brand, p.model].filter(Boolean).join(" "),
                price: Number(finalPrice(p).toFixed(2)), // the discounted price is what the customer pays
                image: imageOf(p.image),                 // full URL, so the cart page can show it from any folder
            });
            justAdded.value = p._id;
            clearTimeout(addedTimer);
            addedTimer = setTimeout(() => (justAdded.value = null), 1200);
        };
        onBeforeUnmount(() => clearTimeout(addedTimer));

        const qtyInCart = (id) => cart.items.value.find((i) => i._id === id)?.qty || 0;

        // CHANGE "/cart" to the route of your cart / invoice page
        const goToCart = () => router.push("/cart");

        // ---------- load ----------
        const getItemsWeb = async () => {
            loading.value = true;
            errorMsg.value = "";
            try {
                const res = await axios.get(API);
                console.log("GET", API, "->", res.data); // look at this in the browser console (F12)

                // accepts { data: [...] }, or a plain array [...]
                const list = Array.isArray(res.data) ? res.data : res.data?.data;
                if (!Array.isArray(list)) {
                    throw new Error('The API answered, but there is no product list in "data". Check the console (F12).');
                }

                webs.value = list;
                setRangePrice.value = maxPrice.value; // start with every product visible
            } catch (error) {
                console.log(error);
                if (error.response) {
                    // the server answered with an error (404, 500, ...)
                    errorMsg.value =
                        error.response.data?.message || `Server error ${error.response.status} on ${API}`;
                } else if (error.request) {
                    // no answer at all: server stopped, wrong port, or CORS
                    errorMsg.value = `Cannot reach the server at ${API}. Is the backend running on port 2026?`;
                } else {
                    errorMsg.value = error.message;
                }
            } finally {
                loading.value = false;
            }
        };
        onMounted(getItemsWeb);

        return {
            shop,
            setRangePrice,
            maxPrice,
            webs,
            filteredWebs,
            loading,
            errorMsg,
            getItemsWeb,
            imageOf,
            onImgError,
            zoomItem,
            openZoom,
            closeZoom,
            discount,
            finalPrice,
            money,
            ssdLabel,
            dealEnd,
            justAdded,
            buy,
            qtyInCart,
            goToCart,
            cartCount: cart.count,
            cartTotal: cart.total,
        };
    },
}
</script>