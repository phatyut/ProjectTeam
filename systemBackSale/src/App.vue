<template>
  <div class="relative w-full h-full gap-2 flex flex-col p-1">
    <div class="h-17.5 rounded-sm bg-slate-50 sticky top-1 z-20">
      <Account></Account>
    </div>

    <div class="w-full h-full flex gap-2">
      <div class="lg:w-[18%] h-full sticky top-20">
        <Menu> </Menu>
      </div>

      <div class="relative w-full h-full flex flex-col rounded-md">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, provide, onMounted, watch } from "vue";
import { pagelogin } from "./sharing/Sharing";

export default {
  setup() {
    const route = useRoute();

    const productCount = ref(0);
    const usersCount = ref(0);
    const suppliersCount = ref(0);
    const webCount = ref(0);
    const stockCount = ref(0);
    const lowStockCount = ref(0);
    const outOfStockCount = ref(0);

    provide("productCount", productCount);
    provide("usersCount", usersCount);
    provide("suppliersCount", suppliersCount);
    provide("webCount", webCount);
    provide("stockCount", stockCount);
    provide("lowStockCount", lowStockCount);
    provide("outOfStockCount", outOfStockCount);

    const getProductCount = async () => {
      try {
        const res = await axios.get("http://localhost:2026/api/products");
        productCount.value = res.data.data?.length || 0;
      } catch (error) {
        console.error("Get product count error:", error);
        productCount.value = 0;
      }
    };

    const getUsersCount = async () => {
      try {
        const res = await axios.get("http://localhost:2026/api/employees");
        usersCount.value = res.data.data?.length || 0;
      } catch (error) {
        console.error("Get employee count error:", error);
        usersCount.value = 0;
      }
    };

    const getSuppliersCount = async () => {
      try {
        const res = await axios.get("http://localhost:2026/api/suppliers");
        suppliersCount.value = res.data.data?.length || 0;
      } catch (error) {
        console.error("Get supplier count error:", error);
        suppliersCount.value = 0;
      }
    };

    const getwebCount = async () => {
      try {
        const res = await axios.get("http://localhost:2026/api/web");
        webCount.value = res.data.data?.length || 0;
      } catch (error) {
        console.error("Can't Count Web error", error);
        webCount.value = 0;
      }
    };

    const getstockCount = async () => {
      try {
        const res = await axios.get("http://localhost:2026/api/stocks");
        const stocks = res.data.data || [];
        stockCount.value = stocks.length;
        lowStockCount.value = stocks.filter((s) => s.status === "Low Stock").length;
        outOfStockCount.value = stocks.filter((s) => s.status === "Out of Stock").length;
      } catch (error) {
        console.error("Can't Count Stock error", error);
        stockCount.value = 0;
        lowStockCount.value = 0;
        outOfStockCount.value = 0;
      }
    };

    // other pages can call this manually if needed
    provide("refreshStockCounts", getstockCount);

    // AUTOMATIC: re-count every time the route changes
    watch(() => route.fullPath, getstockCount);

    onMounted(async () => {
      await Promise.all([
        getProductCount(),
        getUsersCount(),
        getSuppliersCount(),
        getwebCount(),
        getstockCount(),
      ]);
    });

    return {
      route,
      usersCount,
      productCount,
      suppliersCount,
      webCount,
      stockCount,
      lowStockCount,
      outOfStockCount,
      pagelogin,
    };
  },
};
</script>
