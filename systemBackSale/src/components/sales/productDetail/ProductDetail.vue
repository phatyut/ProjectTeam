<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-green-950/60 p-4 backdrop-blur-sm"
        @click.self="$emit('close')"
    >
        <Transition appear
            enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
            enter-from-class="opacity-0 translate-y-6"
            enter-to-class="opacity-100 translate-y-0"
        >
            <div
                class="relative my-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                role="dialog"
                aria-modal="true"
                :aria-label="product.name"
            >
                <!-- Image -->
                <div class="relative flex h-64 items-center justify-center bg-slate-100 p-6">
                    <img :src="imageSrc" alt="" class="h-full w-full object-contain" @error="onImgError" />

                    <span
                        v-if="product.category"
                        class="absolute left-4 top-4 rounded-full bg-green-900 px-3 py-1 text-sm font-medium text-white"
                    >
                        {{ product.category }}
                    </span>

                    <button
                        type="button"
                        class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow ring-1 ring-slate-200 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                        aria-label="Close"
                        @click="$emit('close')"
                    >
                        <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M5 5l10 10M15 5L5 15" />
                        </svg>
                    </button>
                </div>

                <!-- Name + specs -->
                <div class="flex flex-col gap-5 p-6">
                    <h2 class="text-2xl font-bold leading-tight text-slate-900">{{ product.name }}</h2>

                    <dl class="grid grid-cols-3 gap-3">
                        <div class="min-w-0 rounded-xl border border-slate-200 px-3 py-2">
                            <dt class="text-xs text-slate-500">Product code</dt>
                            <dd class="truncate font-semibold text-slate-900" :title="product.productCode">{{ product.productCode || "-" }}</dd>
                        </div>
                        <div class="min-w-0 rounded-xl border border-slate-200 px-3 py-2">
                            <dt class="text-xs text-slate-500">Model</dt>
                            <dd class="truncate font-semibold text-slate-900" :title="product.model">{{ product.model || "-" }}</dd>
                        </div>
                        <div class="min-w-0 rounded-xl border border-slate-200 px-3 py-2">
                            <dt class="text-xs text-slate-500">Branch</dt>
                            <dd class="truncate font-semibold text-slate-900" :title="product.branch">{{ product.branch || "-" }}</dd>
                        </div>
                    </dl>
                </div>

                <!-- Price + action bar -->
                <div class="flex items-center justify-between gap-4 bg-green-900 px-6 py-5">
                    <div>
                        <p class="text-sm text-green-200">Sale price</p>
                        <p class="font-eng leading-none text-white tabular-nums">
                            <span class="mr-0.5 text-xl font-semibold text-green-300">$</span><span class="text-4xl font-bold">{{ price }}</span>
                        </p>
                    </div>

                    <button
                        type="button"
                        class="rounded-xl bg-white px-6 py-3 font-bold text-green-900 hover:bg-green-50 active:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        @click="$emit('add')"
                    >
                        Add to invoice
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const IMG_BASE = "http://localhost:2026/uploads/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
    props: {
        product: { type: Object, required: true },
    },
    emits: ["close", "add"],
    setup(props, { emit }) {
        const failed = ref(false);

        const imageSrc = computed(() => {
            const image = props.product.image;
            if (!image || failed.value) return FALLBACK;
            if (/^https?:\/\//.test(image)) return image;
            return IMG_BASE + image.split(/[\\/]/).pop();
        });

        const price = computed(() => {
            const n = Number(props.product.salePrice);
            return Number.isFinite(n) ? n.toFixed(2) : "0.00";
        });

        const onImgError = () => {
            failed.value = true;
        };

        // Esc closes the window
        const onKey = (e) => {
            if (e.key === "Escape") emit("close");
        };
        onMounted(() => window.addEventListener("keydown", onKey));
        onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

        return { imageSrc, price, onImgError };
    },
};
</script>