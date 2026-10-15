
<template>
  <div class="space-y-5">
    <!-- Summary -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div v-for="s in ['Pending', 'In Transit', 'Delivered', 'Cancelled']" :key="s"
        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full" :class="statusStyle[s].dot"></span>
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ s }}</p>
        </div>
        <p class="mt-1 text-2xl font-extrabold text-slate-800">{{ count(s) }}</p>
      </div>
    </div>

    <!-- Table card -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-extrabold text-slate-800">Delivery Inventory</h2>

        <div class="flex flex-col gap-2 sm:flex-row">
          <input
            v-model="search"
            type="text"
            placeholder="Search item, supplier, ID..."
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 sm:w-60"
          />

          <div class="relative w-full sm:w-44">
            <select
              v-model="selectedStatus"
              class="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-9 text-xs font-bold text-slate-600 hover:border-green-200 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
            >
              <option v-for="s in statuses" :key="s" :value="s">
                {{ s === 'All' ? 'All Status' : s }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left text-sm">
          <thead>
            <tr class="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th class="px-5 py-3">Item</th>
              <th class="px-5 py-3">Supplier</th>
              <th class="px-5 py-3">Qty</th>
              <th class="px-5 py-3">Date</th>
              <th class="px-5 py-3">Status</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr v-if="!filtered.length">
              <td colspan="5" class="px-5 py-10 text-center text-slate-400">No deliveries found</td>
            </tr>

            <tr v-for="d in filtered" :key="d.id" class="transition hover:bg-green-50/60">
              <td class="px-5 py-3">
                <div class="flex items-center gap-3">
                  <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 ring-1 ring-green-100">
                    <img src="/imgs/microcomputer.png" alt="" class="h-7 w-7 object-contain" />
                  </div>
                  <div>
                    <p class="font-semibold text-slate-700">{{ d.item }}</p>
                    <p class="text-xs text-slate-400">{{ d.id }}</p>
                  </div>
                </div>
              </td>

              <td class="px-5 py-3 text-slate-600">{{ d.supplier }}</td>
              <td class="px-5 py-3 font-semibold text-slate-700">{{ d.qty }}</td>
              <td class="px-5 py-3 text-slate-500">{{ d.date }}</td>

              <td class="px-5 py-3">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                  :class="statusStyle[d.status].badge"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="statusStyle[d.status].dot"></span>
                  {{ d.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
    import { ref, computed } from 'vue'
    
    const deliveries = ref([
      { id: 'DL-1001', item: 'Microcomputer', supplier: 'Phatyut Co.', qty: 20, date: '2026-10-12', status: 'Delivered' },
      { id: 'DL-1002', item: 'Mini PC i5', supplier: 'Tech Supply', qty: 10, date: '2026-10-14', status: 'In Transit' },
      { id: 'DL-1002', item: 'Mini PC i5', supplier: 'Tech Supply', qty: 10, date: '2026-10-14', status: 'In Transit' },
      { id: 'DL-1003', item: 'SSD 512GB', supplier: 'Tech Supply', qty: 50, date: '2026-10-16', status: 'Pending' },
      { id: 'DL-1004', item: 'RAM 16GB', supplier: 'Phatyut Co.', qty: 30, date: '2026-10-10', status: 'Cancelled' },
      { id: 'DL-1004', item: 'RAM 16GB', supplier: 'Phatyut Co.', qty: 30, date: '2026-10-10', status: 'Cancelled' },
    ])
    
    const statuses = ['All', 'Pending', 'In Transit', 'Delivered', 'Cancelled']
    const selectedStatus = ref('All')
    const search = ref('')
    
    const filtered = computed(() =>
      deliveries.value.filter((d) => {
        const matchStatus = selectedStatus.value === 'All' || d.status === selectedStatus.value
        const q = search.value.toLowerCase()
        const matchSearch =
          !q || d.item.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.supplier.toLowerCase().includes(q)
        return matchStatus && matchSearch
      })
    )
    
    const count = (s) => deliveries.value.filter((d) => d.status === s).length
    
    const statusStyle = {
      Pending:      { badge: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' },
      'In Transit': { badge: 'bg-blue-50 text-blue-600',   dot: 'bg-blue-500' },
      Delivered:    { badge: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
      Cancelled:    { badge: 'bg-red-50 text-red-600',     dot: 'bg-red-500' },
    }
    </script>