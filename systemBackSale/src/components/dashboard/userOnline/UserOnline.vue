
<template>
  <div class="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left text-sm">
        <thead>
          <tr class="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
            <th class="px-5 py-3">Name</th>
            <th class="px-5 py-3">Status</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
          v-for="d in devices"
            :key="d.id"
            class="transition hover:bg-green-50/60"
            >
            <td class="px-5 py-3">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 ring-1 ring-green-100">
                  <img
                    src="/imgs/microcomputer.png"
                    alt=""
                    class="h-7 w-7 object-contain"
                  />
                </div>
                <p class="font-semibold text-slate-700">{{ d.name }}</p>
              </div>
            </td>

            <td class="px-5 py-3">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                :class="d.status === 'Online'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-slate-100 text-slate-500'"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="d.status === 'Online' ? 'bg-green-500' : 'bg-slate-400'"
                  ></span>
                {{ d.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
                  <script setup>
                  import { ref } from 'vue'
                  
                  const devices = ref([
                    { id: 1, name: 'phatyut', status: 'Online' },
                    { id: 2, name: 'phatyut', status: 'Offline' },
                  ])
                  </script>