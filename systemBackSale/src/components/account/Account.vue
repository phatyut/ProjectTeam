<template>
<div class=" relative w-full h-full flex justify-between  items-center p-4 ">
    <div class="flex gap-2 justify-center items-center ">
        <div>
            <img src="../../../public//imgs/microcomputer.png" alt="microcomputer" class="h-14">
        </div>
        <div class="flex flex-col -space-y-2 ">
            <div class=" font-eng text-linear-to-tr from-[#006B2D] via-[#168C20] to-[#7FCB0A]">
                MICRO
            </div>
            <div>
                Computers
            </div>
        </div>
    </div>
    <div class="flex gap-5">
        <div class="flex justify-center items-center lg:size-8.75 hover:bg-gray-100 rounded-full" @click="btnmail">
            <font-awesome-icon icon="fa-regular fa-envelope" class="text-[20px]" />
        </div>
        <div class="flex justify-center items-center transition-all duration-300 lg:size-8.75 hover:bg-gray-100 rounded-full relative" @click="clickNotification">
            <font-awesome-icon icon="fa-regular fa-bell" class="text-[20px]"  />
           <!-- box show notification  -->
            <div class=" w-screen h-screen fixed left-0 top-0 z-40  " v-if="NotificationAction" >
                <Notification/>
            </div>

            <div className="inline-grid *:[grid-area:1/1] absolute top-0 right-1 ">
                <div className="status status-md  animate-ping bg-green-600"></div>
                <div className="status status-md  bg-green-800"></div>
            </div>
        </div>
        <router-link to="/profile">
            <button class="hover:cursor-pointer">
                <div class="lg:size-7.5 bg-green-900  rounded-full uppercase flex justify-center items-center text-white text-[16px]">y</div>
            </button>
        </router-link>

    </div>

</div>
</template>

<script>
import {ref} from "vue"
import Profile from './Profile/Profile.vue';
import Notification from './notification/Notification.vue';
export default {
    components: {
        Profile,
        Notification
    },
    setup() {

        const NotificationAction =ref(false) 
        const clickNotification =()=>{
                NotificationAction.value = !NotificationAction.value
        }

        const btnmail =()=>{
            alert("I testing to youtube.com")
            // 1- ok
        //    window.location.href= 'https://youtube.com'


        // 2 ok 
        window.open("https://youtube.com" , '_blank')
        }

       
        return {
            clickNotification,
            btnmail,
            NotificationAction
          
        }
    }
}
</script>
