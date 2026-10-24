<template>
<div class="w-full flex gap-5 p-5 rounded-lg bg-white text-green-900">
    <!-- ============ LEFT: products ============ -->
    <div class="w-[60%] h-160 overflow-y-auto pr-2 scroll-smooth">

        <!-- Sticky Search & Tag Filter Block -->
        <div class="sticky top-0 z-10 pb-4 bg-white">
            <div class="rounded-2xl bg-white p-3 flex flex-col gap-3 shadow-md shadow-green-900/10">
                <div class="flex items-center gap-3">
                    <input
                        v-model.trim="search"
                        type="search"
                        placeholder="Search products..."
                        class="flex-1 h-11 px-4 rounded-xl bg-white border text-green-900 placeholder-green-700/50
                               outline-none transition-all focus:bg-green-100 focus:ring-2 focus:ring-green-300"
                    >
                    <span class="px-3 py-2 rounded-xl bg-green-50 text-sm text-green-800">
                        <b>{{ filteredItems.length }}</b> items
                    </span>
                </div>

                <!-- Multi-Selectable Category Tags Bar -->
                <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none items-center">
                    <button
                        class="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                        :class="category.length === 0
                            ? 'bg-green-900 text-white shadow-md shadow-green-900/20 scale-[1.02]'
                            : 'bg-green-50 text-green-900 hover:bg-green-100'"
                        @click="category = []"
                    >
                        All
                    </button>
                    <button
                        v-for="c in categories"
                        :key="c"
                        class="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                        :class="category.includes(c)
                            ? 'bg-green-900 text-white shadow-md shadow-green-900/20 scale-[1.02]'
                            : 'bg-green-50 text-green-900 hover:bg-green-100'"
                        @click="toggleCategory(c)"
                    >
                        {{ c }}
                    </button>
                </div>
            </div>
        </div>

        <p v-if="loading" class="py-16 text-center text-green-700 animate-pulse">Loading...</p>
        <p v-else-if="errorMsg" class="my-4 p-4 rounded-2xl bg-red-50 text-red-600 text-center">{{ errorMsg }}</p>
        <p v-else-if="!filteredItems.length" class="py-16 text-center text-green-700/60">No products found</p>

        <div class="grid grid-cols-3 gap-4 p-1 pb-4">
            <ViewProducts
                v-for="ele in filteredItems"
                :key="ele._id"
                :name="ele.name"
                :price="ele.salePrice"
                :branch="ele.branch"
                :image="ele.image"
                @add="addToCart(ele)"
                @view="selected = ele"
            ></ViewProducts>
        </div>
    </div>

    <!-- Product details window -->
    <ProductDetail
        v-if="selected"
        :product="selected"
        @close="selected = null"
        @add="addToCart(selected); selected = null"
    ></ProductDetail>

    <!-- ============ RIGHT: invoice ============ -->
    <div class="w-[40%] h-160 flex flex-col gap-3 p-1">

        <div class="flex items-center gap-2 p-2 rounded-2xl bg-white shadow-md shadow-green-900/10">
            <button class="w-11 h-11 rounded-xl text-green-900 transition-all hover:bg-green-900 hover:text-white hover:scale-105" title="Print" @click="printer">
                <font-awesome-icon icon="fa-solid fa-print" class="text-xl" />
            </button>
            <button class="w-11 h-11 rounded-xl text-green-900 transition-all hover:bg-green-900 hover:text-white hover:scale-105" title="View">
                <font-awesome-icon icon="fa-solid fa-arrows-to-eye" class="text-xl" />
            </button>
            <button class="w-11 h-11 rounded-xl text-green-900 transition-all hover:bg-green-900 hover:text-white hover:scale-105" title="Test">
                <font-awesome-icon icon="fa-solid fa-flask" class="text-xl" />
            </button>
            <span class="ml-auto pr-3 text-sm text-green-800">
                Cart <b class="text-green-900">{{ cart.length }}</b>
            </span>
        </div>

        <InvoiceSale
            class="flex-1 min-h-0"
            :items="cart"
            @increase="increase"
            @decrease="decrease"
            @remove="removeItem"
            @clicktest="testing"
        ></InvoiceSale>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import ViewProducts from "./viewProducts/ViewProducts.vue";
import InvoiceSale from "./invoiceSale/InvoiceSale.vue";
import ProductDetail from "./productDetail/ProductDetail.vue";

const API = "http://localhost:2026/api/products";
const apiCategory = "http://localhost:2026/api/category";

export default {
    components: { ViewProducts, InvoiceSale, ProductDetail },
    setup() {
        const checkInvoice = ref(false);
        const items = ref([]);
        const loading = ref(false);
        const errorMsg = ref("");
        const search = ref("");
        const category = ref([]); // Array to support multi-tag filtering
        const categoriesList = ref([]);
        const selected = ref(null);

        const products = async () => {
            loading.value = true;
            errorMsg.value = "";
            try {
                const res = await axios.get(API);
                const body = res.data.data ?? res.data;
                items.value = Array.isArray(body) ? body : body?.data || [];
                if (!items.value.length) {
                    errorMsg.value = "API answered, but no products were found in the response.";
                }
            } catch (error) {
                console.log(error);
                errorMsg.value = error.response?.data?.message || error.message;
            } finally {
                loading.value = false;
            }
        };

        const getCategory = async () => {
            try {
                const res = await axios.get(apiCategory);
                categoriesList.value = res.data.data || [];
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            products();
            getCategory();
        });

        const categories = computed(() => [
            ...new Set(items.value.map((p) => p.category).filter(Boolean)),
        ]);

        // Toggle category tag on/off
        const toggleCategory = (c) => {
            const index = category.value.indexOf(c);
            if (index > -1) {
                category.value.splice(index, 1);
            } else {
                category.value.push(c);
            }
        };

        const filteredItems = computed(() => {
            const q = search.value.toLowerCase();
            return items.value.filter((p) => {
                const matchSearch =
                    !q ||
                    p.name?.toLowerCase().includes(q) ||
                    p.model?.toLowerCase().includes(q) ||
                    p.productCode?.toLowerCase().includes(q);
                
                // Matches if no tags are selected or if the product's category is included in the selection
                const matchCategory = category.value.length === 0 || category.value.includes(p.category);
                
                return matchSearch && matchCategory;
            });
        });

        // ---- invoice (cart) ----
        const cart = ref([]);

        const addToCart = (p) => {
            const found = cart.value.find((i) => i._id === p._id);
            if (found) {
                found.qty++;
            } else {
                cart.value.push({
                    _id: p._id,
                    name: p.name,
                    model: p.model,
                    image: p.image,
                    price: Number(p.salePrice) || 0,
                    qty: 1,
                });
            }
        };

        const increase = (id) => {
            const item = cart.value.find((i) => i._id === id);
            if (item) item.qty++;
        };

        const decrease = (id) => {
            const item = cart.value.find((i) => i._id === id);
            if (item && item.qty > 1) item.qty--;
        };

        const removeItem = (id) => {
            cart.value = cart.value.filter((i) => i._id !== id);
        };

        const printer = () => {
            window.print();
        };

        const testing = () => {
            alert("you Clicked on print button");
        };

        return {
            items,
            loading,
            errorMsg,
            search,
            category,
            categories,
            filteredItems,
            toggleCategory,
            checkInvoice,
            selected,
            cart,
            addToCart,
            increase,
            decrease,
            removeItem,
            printer,
            testing,
        };
    },
};
</script>