```vue
<template>
  <div class="min-h-screen bg-slate-100 rounded-md p-6">

    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">

      <div>
        <h1 class="text-2xl font-bold text-slate-800">
          Suppliers.
        </h1>

       
      </div>

      <button
        class="flex items-center gap-2 rounded-xl bg-green-700
               px-5 py-3 font-semibold text-white shadow-lg
               shadow-green-700/20 transition hover:bg-green-800"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Add Supplier
      </button>

    </div>


    <!-- Summary Cards -->



    <!-- Stock Table -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <!-- Table Header -->
      <div
        class="flex flex-col gap-4 border-b border-slate-200
               p-5 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Suppliers List
          </h2>

          <p class="text-sm text-slate-500">
            Manage current Employees quantities
          </p>
        </div>


        <!-- Search + Filter -->
        <div class="flex flex-col gap-3 sm:flex-row">

          <!-- Search -->
          <div class="relative">

            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              class="absolute left-4 top-1/2
                     -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search product..."
              class="w-full rounded-xl border border-slate-200
                     bg-slate-50 py-2.5 pl-11 pr-4 outline-none
                     transition focus:border-green-600
                     focus:bg-white focus:ring-4
                     focus:ring-green-600/10 sm:w-64"
            />

          </div>


          <!-- Category -->
          <select
            class="rounded-xl border border-slate-200
                   bg-slate-50 px-4 py-2.5 text-sm
                   outline-none focus:border-green-600
                   focus:bg-white"
          >
            <option>All Categories</option>
            <option>Laptop</option>
            <option>Desktop</option>
            <option>Monitor</option>
            <option>Component</option>
            <option>Accessories</option>
          </select>

        </div>

      </div>


      <!-- Table -->
      <div class="overflow-x-auto">

        <table class="w-full min-w-237.5">

          <!-- Head -->
          <thead class="bg-slate-50">

            <tr class="border-b border-slate-200 text-left ">

              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                Image
              </th>

              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                Name
              </th>

              <th class="px-5 py-4 text-xs font-bold uppercase text-slate-500">
                Position
              </th>

              <th class="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
                Phone
              </th>

              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">
                Age
              </th>

              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">
                Sex
              </th>
             
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">
                Role
              </th>
             
              <th class="px-5 py-4 text-center text-xs font-bold uppercase text-slate-500">
                Action
              </th>

            </tr>

          </thead>


          <!-- Body -->
          <tbody>
            <tr class="border-b border-slate-100 transition hover:bg-slate-50" v-for="ele in suppliers" :key="ele">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="relative flex h-12 w-12 items-center justify-center rounded-xl">
                  <img src="../../../public/imgs/myPhoto.jpg" alt="" class="h-full w-full object object-center">
                    <font-awesome-icon
                      icon="fa-solid fa-laptop"
                      class="text-xl text-green-700"
                    />
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 text-sm font-medium text-slate-600">
                {{ ele.name }}
              </td>
              <td class="px-5 py-4">
                <span
                  class="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  {{ ele.business }}
                </span>
              </td>
              <td class="px-5 py-4 text-right font-semibold text-slate-700">
                09755521299
              </td>
              <td class="px-5 py-4 text-center">
                <span class="font-bold text-slate-800">
                  24
                </span>
              </td>
              <td class="px-5 py-4 text-center">
                <span
                  class="rounded-full bg-green-100 px-3 py-1.5
                         text-xs font-semibold text-green-700" >
                  male
                </span>
              </td>
              <td class="px-5 py-4 text-center">
                <span
                  class="rounded-full bg-green-100 px-3 py-1.5
                         text-xs font-semibold text-green-700">
                  Admin
                </span>
              </td>
              <td class="px-1 py-4">
                <div class="flex justify-center gap-1 ">
                  <button
                  class="flex h-9 w-9 items-center justify-center
                  rounded-lg bg-blue-50 text-blue-600
                  hover:bg-blue-100"
                  >
                  <font-awesome-icon icon="fa-solid fa-arrows-to-eye" class="hover:cursor-pointer" />
                </button>
                <button
                  class="flex h-9 w-9 items-center justify-center
                         rounded-lg  text-green-700
                         hover:bg-green-100"
                >
                  <font-awesome-icon icon="fa-solid fa-pen-fancy" />
                </button>
                <button
                  class="flex h-9 w-9 items-center justify-center
                         rounded-lg bg-green-50 text-green-700
                         hover:bg-green-100"
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" class="hover:text-red-600 hover:cursor-pointer" />
                </button>
                </div>
              </td>
            </tr>
            

          </tbody>

        </table>

      </div>


      <!-- Footer -->
      <div
        class="flex flex-col gap-3 border-t border-slate-200
               px-5 py-4 sm:flex-row sm:items-center
               sm:justify-between"
      >

        <p class="text-sm text-slate-500">
          Showing <span class="font-semibold text-slate-700">1–3</span>
          of <span class="font-semibold text-slate-700">248</span> products
        </p>

        <div class="flex gap-2">

          <button
            class="rounded-lg border border-slate-200 px-4 py-2
                   text-sm font-medium text-slate-500
                   hover:bg-slate-50"
          >
            Previous
          </button>

          <button
            class="rounded-lg bg-green-700 px-4 py-2
                   text-sm font-semibold text-white"
          >
            1
          </button>

          <button
            class="rounded-lg border border-slate-200 px-4 py-2
                   text-sm font-medium text-slate-600
                   hover:bg-slate-50"
          >
            2
          </button>

          <button
            class="rounded-lg border border-slate-200 px-4 py-2
                   text-sm font-medium text-slate-500
                   hover:bg-slate-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios"
import { ref,onMounted } from 'vue';
export default{
    setup(){

        const suppliers = ref([]);

        const takeDatas = async()=>{
            const data = await axios.get("http://localhost:2026/api/suppliers");
            suppliers.value = data.data 
        } 



        onMounted(takeDatas)

        return {
            suppliers,

        }
    }
}
</script>