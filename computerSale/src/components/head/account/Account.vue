<template>
    <div class="p-4 gap-1.5 flex flex-col ">
        <div class="flex justify-center items-center pt-5 ">
            <button @click="account.viewaccount=false">
                <div class="absolute top-1 left-1 rounded-full hover:bg-gray-100 w-10 h-10 flex justify-center items-center">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="text-gray-700"/>
                </div>
            </button>
            <div class="relative w-15 h-15  border border-slate-200 bg-slate-200 rounded-full overflow-hidden flex justify-center items-end"> 
                <font-awesome-icon icon="fa-solid fa-user" class="text-gray-700 text-[50px]"/>
            </div>
        </div>
        <div class="text-center">Name</div>
        <div><button @click="btnmanageAccount">Manage Account</button></div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { account } from '../../../sharing/Sharing';
export default{
    setup(){
        const router = useRouter()
        const btnmanageAccount =()=>{
            account.viewaccount=false
            router.replace("/account")
        }
        return {
            account,
            router,
            btnmanageAccount
        }
    }
}
</script>