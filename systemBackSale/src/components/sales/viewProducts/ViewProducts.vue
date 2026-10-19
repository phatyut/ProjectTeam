<template>
    <div class="relative w-full h-auto flex flex-col gap-3 border border-slate-50 bg-slate-50 rounded-md overflow-hidden p-3 group hover:border-green-700 hover:border-[0.5]">

        <div class="flex flex-col gap-2.5">
            <div class="flex justify-center items-center h-50 w-full transition-all duration-400 group-hover:scale-110">
                <img
                    :src="imageSrc"
                    alt=""
                    class="max-h-full object-contain cursor-zoom-in"
                    @error="onImgError"
                    @click="isEnlarged = true"
                >
            </div>

            <div class="flex justify-between items-center">
                <div>{{ name }}</div>
                <div class="text-green-700 font-eng">{{ price }}$</div>
            </div>

            <div class="font-eng text-green-700">{{ branch }}</div>

            <div class="flex *:px-1 gap-2 *:rounded-md">
                <button class="border border-green-700" @click="$emit('view')">view</button>
                <button class="w-full py-2 font-bold text-white bg-green-900" @click.once="$emit('add')">Add</button>
            </div>
        </div>

        <!-- Full-screen image, rendered outside the card so overflow-hidden and scale can't affect it -->
        <Teleport to="body">
            <div
                v-if="isEnlarged"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
                @click="isEnlarged = false"
            >
                <img :src="imageSrc" alt="" class="max-w-full max-h-full object-contain">
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