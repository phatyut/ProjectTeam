<template>
    <div>
        <div class="flex justify-center items-center gap-5 *:hover:underline *:hover:cursor-pointer *:font-bold *:text-green-700 *:transition-all *:duration-300">
            <button @click="this.viewReport='SaleReport'" >Sale</button>
            <button @click="this.viewReport='StockReport'">Stock</button>
            <button @click="this.viewReport='ProductsReport'">Products</button>
            <button @click="this.viewReport='WebsiteReport'">Website</button>
        </div>
         <div>
            <KeepAlive>
                <component :is="viewReport"></component>
            </KeepAlive>
         </div>
    </div>
</template>
<script>
import { ref } from "vue";
import SaleReport from "./saleReport/SaleReport.vue";
import StockReport from "./stockReport/StockReport.vue";
import ProductsReport from "./productsReport/ProductsReport.vue";
import WebsiteReport from "./websiteReport/WebsiteReport.vue";
export default {
    components: {
        SaleReport,
        StockReport,
        ProductsReport,
        WebsiteReport
    },
    setup() {
        const viewReport = ref("SaleReport");
        const checkStyle = ref(false);
        return {
            viewReport,
            checkStyle
        }
    }
}

</script>