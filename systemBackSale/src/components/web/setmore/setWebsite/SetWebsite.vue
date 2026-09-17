<template>
    <div class="px-8 h-full ">
        <div class="flex flex-col w-full h-full gap-2.5">
            <div class=" w-full ">
                <div class=" flex  bg-slate-50 *:border gap-4 *:py-2 rounded-lg p-4 
                                *:rounded-md  *:border-slate-200 *:font-bold *:text-[14px]  *:px-5">

                    <button 
                            @click="FunSwitchMenu('HomeWebsite')"
                            :class="switchmenu==='HomeWebsite' ?
                                                'bg-green-700 text-white'
                                                :
                                                ' bg-slate-100 text-green-800'">
                                        Home
                    </button>
                    <button 
                            @click="FunSwitchMenu('ShopWebsite')"
                            :class="switchmenu==='ShopWebsite' ?
                                                'bg-green-700 text-white'
                                                :
                                                ' bg-slate-100 text-green-800'">
                                        Shop
                    </button>
                    <button 
                            @click="FunSwitchMenu('DealsWebsite')"
                            :class="switchmenu==='DealsWebsite' ?
                                                'bg-green-700 text-white'
                                                :
                                                ' bg-slate-100 text-green-800'">
                                        Deals
                    </button>
                    <button 
                            @click="FunSwitchMenu('SupportWebsite')"
                            :class="switchmenu==='SupportWebsite' ?
                                                'bg-green-700 text-white'
                                                :
                                                ' bg-slate-100 text-green-800'">
                                        Support
                    </button>
                    <button 
                            @click="FunSwitchMenu('ContactWebsite')"
                            :class="switchmenu==='ContactWebsite' ?
                                                'bg-green-700 text-white'
                                                :
                                                ' bg-slate-100 text-green-800'">
                                        Contect
                    </button>
                </div>
            </div>
            <div class="  w-full rounded-md">
               <KeepAlive>
                    <component :is="switchmenu"></component>
               </KeepAlive>
            </div>
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';
import HomeWebsite from './homewebsite/HomeWebsite.vue';
import ContactWebsite from "./contactwebsite/ContactWebsite.vue";
import DealsWebsite from "./dealswebsite/DealsWebsite.vue";
import ShopWebsite from "./shopwebsite/ShopWebsite.vue";
import SupportWebsite from "./supportwebsite/SupportWebsite.vue"
export default{
    components:{
                    HomeWebsite,
                    ContactWebsite,
                    DealsWebsite,
                    ShopWebsite,
                    SupportWebsite
                },
    setup(){
        const switchmenu = ref('HomeWebsite');
        const FunSwitchMenu = (newArg) =>{
            switchmenu.value =newArg
        }
        return{
            switchmenu,
            FunSwitchMenu
        }
    }
}
</script>