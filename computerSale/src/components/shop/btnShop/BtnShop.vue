<template>
<div class="py-3 flex gap-2 rounded-md">
    <button class="pr-5 hover:cursor-pointer flex justify-center items-center">
        <font-awesome-icon icon="fa-solid fa-left-right" class=" hover:bg-slate-100 py-2 px-4 rounded-md text-green-700 text-[20px] bg-slate-50 " @click="switchTool"/>
    </button>

    <button
        v-for="c in categories"
        :key="c.value"
        type="button"
        class="py-2 px-5 font-bold rounded-full text-[13px] border border-slate-100 cursor-pointer"
        :class="shop.category === c.value ? 'bg-green-700 text-white' : 'bg-slate-50 text-gray-900'"
        @click="shop.category = c.value"
    >
        {{ c.label }}
    </button>
</div>
</template>

<script>
import { watch } from "vue";
import { shop } from "../../../sharing/Sharing";

export default {
    setup() {
        // "value" must match the category saved on each product (WebModel.category)
        const categories = [
            { label: "All", value: "all" },
            { label: "Gaming", value: "gaming" },
            { label: "Labtops", value: "Labtops" },
            { label: "Desktops", value: "Desktops" },
            { label: "Components", value: "Components" },
            { label: "Accessaries", value: "Accessaries" },
            { label: "test", value: "test" },
        ];

        // start with the saved choice (or "all"); no change needed in Sharing.js
        if (!shop.category) shop.category = localStorage.getItem("btncheckstyle") || "all";

        // remember the choice after a page refresh
        watch(() => shop.category, (v) => localStorage.setItem("btncheckstyle", v));

        const switchTool = () => {
            shop.shopmenu = !shop.shopmenu;
        };

        return {
            categories,
            shop,
            switchTool,
        };
    },
};
</script>