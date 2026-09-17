<template>
  <div class="group w-72.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <!-- IMAGE -->
    <div class="relative h-45 overflow-hidden bg-slate-50">
      <img :src="image" :alt="title"
           class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />

      <!-- Category -->
      <span class="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
        {{ category }}
      </span>

      <!-- Favorite -->
      <button class="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:text-red-500">
        ♥
      </button>
    </div>

    <!-- CONTENT -->
    <div class="p-4">
      <p class="text-xs font-semibold uppercase tracking-wider text-green-600">
        {{ brand }}
      </p>
      <h2 class="mt-1 text-lg font-bold text-slate-800">
        {{ title }}
      </h2>

      <div class="mt-3 grid grid-cols-3 gap-2">
        <div class="rounded-lg bg-slate-50 p-2 text-center">
          <p class="text-[10px] text-slate-400">CPU</p>
          <p class="text-xs font-bold text-slate-700">{{ cpu }}</p>
        </div>
        <div class="rounded-lg bg-slate-50 p-2 text-center">
          <p class="text-[10px] text-slate-400">RAM</p>
          <p class="text-xs font-bold text-slate-700">{{ ram }}</p>
        </div>
        <div class="rounded-lg bg-slate-50 p-2 text-center">
          <p class="text-[10px] text-slate-400">SSD</p>
          <p class="text-xs font-bold text-slate-700">{{ ssd }}</p>
        </div>
      </div>

      <!-- PRICE -->
      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-2xl font-extrabold text-green-700">{{ price }}</p>
          <p class="text-xs text-slate-400 line-through">{{ oldPrice }}</p>
        </div>
        <span class="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
          {{ discount }}
        </span>
      </div>

      <div class="mt-4 flex gap-2">
        <button class="flex-1 rounded-lg bg-green-600 py-2 text-sm font-bold text-white transition hover:bg-green-700">
          BUY
        </button>
        <button class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-green-500 hover:text-green-600">
          More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    image: String,
    category: String,
    brand: String,
    title: String,
    cpu: String,
    ram: String,
    ssd: String,
    price: Number,
    oldPrice: Number,
    discount: Number
  }
}
</script>
