<template>
<div class="relative w-full lg:h-full flex px-2 pt-1  gap-4  ">
    <div class="w-[60%] h-160  relative overflow-y-scroll pr-2 scroll-smooth   ">
        <!-- Head search and select type -->
        <div class="sticky top-0 bg-green-900 z-10 p-2 pl-2 rounded-md flex justify-between items-center">
            <div>
                <input
                    v-model.trim="search"
                    type="search"
                    placeholder="search ... "
                    class="bg-white h-10 w-80 rounded-md px-3"
                >
            </div>
            <div class="bg-slate-50/10 rounded-lg text-white shadow-2xl py-2 px-3">
                <select v-model="category" class="outline-none">
                    <option value="" class="text-black">All</option>
                    <option v-for="c in categories" :key="c" :value="c" class="text-black">{{ c }}</option>
                </select>
            </div>
        </div>

        <p v-if="loading" class="pt-6 text-center text-slate-500">Loading...</p>
        <p v-else-if="errorMsg" class="pt-6 text-center text-red-600">{{ errorMsg }}</p>
        <p v-else-if="!filteredItems.length" class="pt-6 text-center text-slate-500">No products found</p>

        <div class="grid grid-cols-3 gap-4 pt-4 ">
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

    <div class="w-[40%] relative h-full flex flex-col gap-1 *:rounded-md    pr-2 scroll-smooth   ">
        <div class="p-3 bg-slate-50 flex *:hover:bg-slate-200 *:transition-all duration-300 *:p-2 *:rounded-md">
            <font-awesome-icon icon="fa-solid fa-print" class="text-2xl text-green-900 hover:cursor-pointer " @click="printer" />
            <font-awesome-icon icon="fa-solid fa-arrows-to-eye" class="text-2xl text-green-900 hover:cursor-pointer" />
            <font-awesome-icon icon="fa-solid fa-flask" class="text-2xl text-green-900 hover:cursor-pointer" />
        </div>
        <InvoiceSale
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

export default {
    components: { ViewProducts, InvoiceSale, ProductDetail },
    setup() {
        const checkInvoice = ref(false);
        const items = ref([]);
        const loading = ref(false);
        const errorMsg = ref("");
        const search = ref("");
        const category = ref("");
        const selected = ref(null); // product shown in the details window

        const products = async () => {
            loading.value = true;
            errorMsg.value = "";
            try {
                const res = await axios.get(API);
                console.log("products response:", res.data);
                // works for { data: [...] }, { data: { data: [...] } } and a plain [...]
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
        onMounted(products);

        const categories = computed(() => [
            ...new Set(items.value.map((p) => p.category).filter(Boolean)),
        ]);

        const filteredItems = computed(() => {
            const q = search.value.toLowerCase();
            return items.value.filter((p) => {
                const matchSearch =
                    !q ||
                    p.name?.toLowerCase().includes(q) ||
                    p.model?.toLowerCase().includes(q) ||
                    p.productCode?.toLowerCase().includes(q);
                const matchCategory = !category.value || p.category === category.value;
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