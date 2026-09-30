<template>
    <div class="relative w-full h-full bg-slate-50 p-2  " >
        <div class="flex justify-between items-center">
            <div>
                <img src="../../../../public/imgs/microcomputer.png" alt="" class="h-37.5">
            </div>

            <div class="flex flex-col">
                <input type="Date" class="border-b border-dotted ">
                <input type="Date" class="border-b border-dotted ">
            </div>
        </div>
       
       
        <div class="border-b border-green-700 flex items-center justify-between px-2 hover:bg-slate-100">
            <div><img src="../../../../public/imgs/microcomputer.png" alt="" class="h-18 "></div>
            <div class="">
                    <div class="uppercase font-bold text-green-700">name</div>
                    <div class=" text-[12px]">model name model name</div>
            </div>
            <div>
                <P class="font-eng text-green-700">9000$</P>
            </div>
            <div class="flex  rounded-full gap-5 justify-center items-center shadow-2xs shadow-green-700 p-1">
                <button class="px-0.5 bg-slate-200 rounded-full *:text-green-700 " @click="minu"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                    <p class="font-bold">{{ qty }}</p>
                <button class="px-1 bg-green-700 rounded-full *:text-white" @click="Add"><font-awesome-icon icon="fa-solid fa-plus" /></button>
            </div>
            <div>
                <button class="font-eng *:text-green-700  rounded-full">
                    <font-awesome-icon icon="fa-solid fa-trash-can" class="hover:text-red-600 hover:cursor-pointer" />
                </button>
            </div>
        </div>

        <div class=" flex items-center justify-between px-2 bg-slate-50 p-2">
            <div class="uppercase font-bold">Total:</div>
            <div class="font-eng text-green-700">12$</div>
        </div>
       
    </div>
</template>
<script>
import { computed, ref } from 'vue';
export default{
    setup(){
        const test =ref( 1);
        const qty = ref(0)
        const Add = computed(()=>{
            qty.value++
        })

        const minu = computed(()=>{
            if(qty<=0){
               alert("testing")
                
            }else{
                qty.value--
            }
        })
        return {
            qty,
            Add,
            minu,
            test

        }
    }
}
</script>