
<template>
  <div class="w-full rounded-lg h-full flex flex-col gap-4  ">
    <div class="flex flex-col gap-4 *:h-24  *:rounded-md">
      <div class="bg-slate-50 flex justify-center items-center flex-col">
        <p class="font-bold text-green-900 text-4xl">{{ webCount }}</p>
        <p class="font-bold text-green-900">Host to Web</p>
      </div>
      <div class="bg-slate-50 flex justify-center items-center flex-col">
        <p class="font-bold text-green-900 text-4xl">{{ webCount }}</p>
        <p class="font-bold text-green-900">User Orders</p>
      </div>
      <div class="bg-slate-50 flex justify-center items-center flex-col">
        <p class="font-bold text-green-900 text-4xl">{{ webCount }}</p>
        <p class="font-bold text-green-900">Return Products</p>
      </div>
      <div class="bg-slate-50 flex justify-center items-center flex-col">
        <p class="font-bold text-green-900 text-4xl">{{ webCount }}</p>
        <p class="font-bold text-green-900">Host to Web</p>
      </div>
      
    </div>
   
   
    
  </div>
</template>
<script>
import {ref,inject} from "vue"
export default{
  setup(){
    const webCount = inject("webCount",0)
    return {
      webCount

    }
  }
}
</script>

