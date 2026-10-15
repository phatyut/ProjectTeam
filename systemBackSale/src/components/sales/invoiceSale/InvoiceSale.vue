<template>
    <div class="print-area relative w-full h-full bg-slate-50 p-2"  >
        <div class="flex justify-between items-center">
            <div>
                <img src="../../../../public/imgs/microcomputer.png" alt="" class="h-37.5">
            </div>

            <div class="flex flex-col">
                <input type="Date" class="border-b border-dotted ">
                <input type="Date" class="border-b border-dotted ">
            </div>
        </div>

        <p v-if="!items.length" class="py-10 text-center text-slate-400 print:hidden">
            No items yet. Click Add on a product.
        </p>

        <div class="max-h-104 overflow-y-auto print:max-h-none print:overflow-visible">
            <div
                class="border-b border-green-700 flex items-center justify-between px-2 hover:bg-slate-100"
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
                    <button class="px-0.5 bg-slate-200 rounded-full *:text-green-700 print:hidden" @click="$emit('decrease', product._id)"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                    <p class="font-bold">{{ product.qty }}</p>
                    <button class="px-1 bg-green-700 rounded-full *:text-white print:hidden" @click="$emit('increase', product._id)"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                </div>
                <div class="pl-2 print:hidden">
                    <button class="font-eng *:text-green-700  rounded-full" @click="$emit('remove', product._id)">
                        <font-awesome-icon icon="fa-solid fa-trash-can" class="hover:text-red-600 hover:cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>

        <div class=" flex items-center justify-between px-2 bg-slate-50 p-2">
            <div class="uppercase font-bold">Total:</div>
            <div class="font-eng text-green-700">{{ total }}$</div>
        </div>

    </div>
</template>
<script>
import { computed } from "vue";

const IMG_BASE = "http://localhost:2026/uploads/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
    props: { items: { type: Array, default: () => [] },},
    emits: ["increase", "decrease", "remove", "clicktest"],
    setup(props) {
         const lineTotal = (p) => (p.price * p.qty).toFixed(2);
        const total = computed(() => props.items.reduce((sum, p) => sum + p.price * p.qty, 0).toFixed(2));
        const imageOf = (image) => {
            if (!image) return FALLBACK;
            if (/^https?:\/\//.test(image)) return image;
            return IMG_BASE + image.split(/[\\/]/).pop();
        };
        const onImgError = (e) => {
            if (!e.target.src.endsWith(FALLBACK)) e.target.src = FALLBACK;
        };
        return { lineTotal, total, imageOf, onImgError };
    },
};
</script>

<style>

@page {
    size: auto;
    margin: 0;
}

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
        inset: 0;
        width: 100%;
        height: auto;
        background: white;
        box-sizing: border-box;
        padding: 12mm !important; /* replaces the page margin we removed */
    }
}
</style>