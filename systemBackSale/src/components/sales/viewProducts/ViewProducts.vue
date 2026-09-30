<template>
    <div class="relative w-full h-auto flex flex-col gap-3  border border-slate-50 bg-slate-50 rounded-md overflow-hidden p-3 group hover:border-green-700">

        <div class=" flex flex-col gap-2.5">
            <div class=" flex justify-center items-center h-50 w-full group-hover:scale-110 group-hover:transition-all duration-400  "><img src="../../../../public/imgs/microcomputer.png" alt="" class=""></div>
            <div class=" flex justify-between items-center">
                <div class="">{{ name }}</div >
                <div class="text-green-700 font-eng">{{ price }}$</div>
            </div>
            <div class=" font-eng text-green-700">{{ model }}</div>
            <div class="flex *:px-1 gap-2 *:rounded-md  ">
                <button class="border border-green-700 ">view</button>
                <button class="w-full py-2 font-bold text-white bg-green-900">Add</button>
            </div>
        </div>
    </div>
    
</template>
<script>
export default{
    props:["name","price","model"]
}

</script>