<template>
    <div class="p-4 gap-1.5 flex flex-col">
        <div class="flex justify-center items-center pt-5 ">
            <button @click="account.viewaccount=false">
                <div class="absolute top-1 left-1 rounded-full hover:bg-gray-100 w-[40px] h-[40px] flex justify-center items-center">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="text-gray-700"/>
                </div>
            </button>
            <div class="relative w-[60px] h-[60px]  border border-slate-200 bg-slate-200 rounded-full overflow-hidden flex justify-center items-end"> 
                <font-awesome-icon icon="fa-solid fa-user" class="text-gray-700 text-[50px]"/>
            </div>
        </div>
        <div class="text-center">Name</div>
    </div>
</template>
<script>
import { account } from '../../../sharing/Sharing';
export default{
    setup(){
        return {
            account
        }
    }
}
</script>