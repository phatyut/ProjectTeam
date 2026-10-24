<template>
    <div class="group relative flex flex-col rounded-lg overflow-hidden bg-white text-slate-900  shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 transition-all duration-300  hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/10">
        <!-- Top Image Container with floating branch pill -->
        <div class="relative h-48 bg-gradient-to-b from-slate-50 to-slate-100/60 flex items-center justify-center p-6 overflow-hidden">
            <!-- Floating Branch Tag -->
            <div class="absolute top-3 left-3 z-5">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/80 backdrop-blur-md text-green-800 shadow-sm ring-1 ring-slate-900/5">
                    {{ branch }}
                </span>
            </div>

            <!-- Product Image -->
            <img
                :src="imageSrc"
                alt=""
                class="relative max-h-full object-contain drop-shadow-xl cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                @error="onImgError"
                @click="isEnlarged = true"
            >
        </div>

        <!-- Content Area -->
        <div class="flex flex-col flex-1 p-5 gap-4">
            <!-- Name & Details Link -->
            <div class="flex items-start justify-between gap-2">
                <h3 class="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                    {{ name }}
                </h3>
                <button
                    class="shrink-0 text-xs font-medium text-slate-400 transition-colors hover:text-green-700 underline-offset-4 hover:underline"
                    @click="$emit('view')"
                >
                    Details
                </button>
            </div>

            <!-- Bottom Action Bar: Price + Add Button -->
            <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">Price</span>
                    <span class="text-xl font-black text-slate-900 font-eng tracking-tight">{{ price }}$</span>
                </div>

                <button
                    class="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-green-900 text-white text-sm font-semibold tracking-wide 
                           transition-all hover:bg-green-800 active:scale-95 shadow-lg shadow-green-900/20"
                    @click.once="$emit('add')"
                >
                    + Add
                </button>
            </div>
        </div>

        <!-- Full-screen image preview -->
        <Teleport to="body">
            <div
                v-if="isEnlarged"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 cursor-zoom-out"
                @click="isEnlarged = false"
            >
                <img :src="imageSrc" alt="" class="max-w-full max-h-full object-contain drop-shadow-2xl">
            </div>
        </Teleport>
    </div>
</template>

<script>
import { computed, ref } from "vue";

// multer saves product images in  backend/public/uploads  (filename only is stored in the DB)
// Express must serve it, e.g.  app.use("/uploads", express.static("public/uploads"))
const IMG_BASE = "http://localhost:2026/uploads/";
const FALLBACK = "/imgs/microcomputer.png";

export default {
    props: ["name", "price", "branch", "image"],
    emits: ["add", "view"],
    setup(props) {
        const failed = ref(false);
        const isEnlarged = ref(false);

        const imageSrc = computed(() => {
            if (!props.image || failed.value) return FALLBACK;
            if (/^https?:\/\//.test(props.image)) return props.image;   // already a full URL
            const file = props.image.split(/[\\/]/).pop();              // drops any "public/uploads/" prefix
            return IMG_BASE + file;
        });

        const onImgError = () => {
            console.log("image failed:", imageSrc.value);
            failed.value = true;
        };

        return { imageSrc, onImgError, isEnlarged };
    },
};
</script>