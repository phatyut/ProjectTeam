<template>
    <div class="w-full h-screen overflow-y-scroll z-40 fixed space-y-5 top-0 right-0 bg-white p-4">
        <button
          type="button"
          @click.prevent="router.back()"
          class="flex h-10 w-10 items-center justify-center  rounded-full text-green-800 bg-gray-50 transition hover:bg-gray-200 hover:text-green-700" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6" fill="none"  viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="px-8 sticky -top-4 z-20 bg-white   ">
          <div class="w-full pb-4 pt-4  items-center shadow-[0px_2px_0px] shadow-slate-50 flex gap-4 border-b border-slate-200">
            <button class="px-5 py-2.5 rounded-md font-bold text-black  "
                    @click="clickChangeSetmore('SetType')"
                    :class="ChanegSetMore==='SetType'?'bg-green-600 text-gray-100':'bg-slate-50 text-green-900 border border-slate-100'">
                        Set Of Type
            </button>
            <button class="px-5 py-2.5 rounded-md font-bold text-black  border border-slate-200"
                    @click="clickChangeSetmore('SetWebsite')"
                    :class="ChanegSetMore==='SetWebsite'?'bg-green-600 text-gray-100':'bg-slate-50 text-green-900 border border-slate-100'"> 
                        Set Website
              </button>
          </div>
        </div>
        <div>
          <KeepAlive>
              <component :is="ChanegSetMore"></component>
          </KeepAlive>
        </div>

    </div>
</template>

<script>
import {useRouter} from "vue-router"
import { ref } from 'vue';
import SetWebsite from './setWebsite/SetWebsite.vue';
import SetType from './setType/SetType.vue';
export default{
  components:{SetType,SetWebsite},
    setup(){
      const router = useRouter()
      const ChanegSetMore = ref('SetType');
      const clickChangeSetmore =(newArg)=>{
          ChanegSetMore.value =newArg
      }

        return {
            router,
            ChanegSetMore,
            clickChangeSetmore,
            
          
        }
    }
}
</script>