<template>
<div class=" py-3 flex gap-2 rounded-md  ">
    <button class="py-2 px-5 font-bold  rounded-full text-gray-200 text-[13px] border border-slate-100 " @click="clickChnageStyle('all')" :class="btnChangeStyle==='all'?'bg-green-700':'bg-slate-50 text-gray-900'">All</button>
    <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll" @click="clickChnageStyle('gaming')" :class="btnChangeStyle==='gaming'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Gaming</button>
    <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll" @click="clickChnageStyle('Labtops')" :class="btnChangeStyle==='Labtops'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Labtops</button>
    <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll" @click="clickChnageStyle('Desktops')" :class="btnChangeStyle==='Desktops'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Desktops</button>
    <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll" @click="clickChnageStyle('Components')" :class="btnChangeStyle==='Components'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Components</button>
    <button class="py-2 px-5 font-bold  rounded-full  text-[13px] border border-slate-100 llll" @click="clickChnageStyle('Accessaries')" :class="btnChangeStyle==='Accessaries'?'bg-green-700 text-white':'bg-slate-50 text-gray-900'">Accessaries</button>
</div>
<!-- <div class="py-2 flex px-5 font-bold bg-slate-50 rounded-full text-gray-600  border border-slate-100 ">
    <p>Sort by: </p>
    <select name="" id="">
        <option value="">Newtest</option>
        <option value="">Newtest</option>
        <option value="">Newtest</option>
    </select>
</div> -->
</template>
<script>
import { ref,onMounted,watch } from "vue";
export default {
    setup() {
        const btnChangeStyle = ref('all')
        const clickChnageStyle = (style) => {
            btnChangeStyle.value = style
        };
        onMounted(()=>{
            const checkbtn=localStorage.getItem('btncheckstyle');
            if(checkbtn){
                btnChangeStyle.value=checkbtn;
            }
        });
        watch(btnChangeStyle,(newValue)=>{
            localStorage.setItem('btncheckstyle',newValue);
        });
        return {
            btnChangeStyle,
            clickChnageStyle
        }
    }
}
</script>
