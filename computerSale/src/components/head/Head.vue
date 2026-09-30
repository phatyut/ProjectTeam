

<template>
<div class="px-2 sticky top-0 flex flex-col z-20 bg-white w-full ">

    <!-- <div class="absolute top-0 left-0 bg-green-500/50 w-full h-full blur-[30px] z-10"></div> -->

    <div class=" flex  items-center justify-between  z-20">
        <div>
            <img src="../../../public/img/microcomputer.png" alt="microcomputer" class="h-15">
        </div>
       
          <Menu></Menu>   

        <div class="flex justify-between gap-2 items-center">
            <div class="hover:bg-green-100 p-1 rounded-full text-center w-9 h-9 flex justify-center items-center">
                <font-awesome-icon icon="fa-solid fa-bell"   class="text-green-900 text-[17px]" />
                <!-- <font-awesome-icon icon="fa-solid fa-repeat"  class="text-green-900 text-[17px]" /> -->
            </div>
            <div class="hover:bg-green-100 p-1 rounded-full text-center w-9 h-9 flex justify-center items-center">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" class="text-green-900 text-[17px]" />
            </div>
            <button @click="account.viewaccount=true">
                <div class="hover:bg-green-100 p-1 rounded-full text-center w-9 h-9">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-green-900 text-[18px]" />
                </div>
            </button>
        </div>
    </div>
    <div class="fixed top-0 right-0 w-75 h-full bg-black shadow-2xl z-30 rounded-l-2xl" v-if="account.viewaccount">
        <Account></Account>
    </div>
    <div class="absolute top-0 right-10 w-75 h-full bg-white shadow-2xl z-30 rounded-l-2xl" v-if="StoreCard.showCard">
        <StoreCards></StoreCards>
    </div>
</div>
</template>
<script>
import { account,StoreCard } from '../../sharing/Sharing.js';
import Account from './account/Account.vue';
import StoreCards from './StoreCards/StoreCards.vue';
export default{
    components:{Account,StoreCards},
    setup(){
        return {
            account,
            StoreCard
        }
    }
}
</script>
