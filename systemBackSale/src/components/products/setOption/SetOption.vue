<template>
<div class="top-0 left-0 z-40 w-screen h-screen  fixed bg-slate-100/95 flex  gap-5  ">
    <div>
        <button @click="router.replace('/products')">back</button>
    </div>
    <SetCategory />
    <SetProductCode />
</div>
</template>

<script>
import { useRouter } from 'vue-router';
import SetCategory from './SetCategory.vue';
import SetProductCode from './SetProductCode.vue';
export default {
    components: {
        SetCategory,
        SetProductCode
    },
    setup() {
        const router = useRouter()
        return {
            router

        }
    }
}
</script>
