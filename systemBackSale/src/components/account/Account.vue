<template>
    <div class=" relative w-full h-full flex justify-between  items-center p-4 ">
        <div class="flex gap-2 justify-center items-center ">
            <div >
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
            <div class="flex justify-center items-center lg:size-8.75 hover:bg-gray-100 rounded-full"><font-awesome-icon icon="fa-regular fa-envelope" class="text-[20px]"/></div>
            <div class="flex justify-center items-center lg:size-8.75 hover:bg-gray-100 rounded-full"><font-awesome-icon icon="fa-regular fa-bell" class="text-[20px]" /></div>
            <button class="hover:cursor-pointer" @click="testclickme">
                <div class="lg:size-7.5 bg-green-900  rounded-full uppercase flex justify-center items-center text-white text-[16px]">y</div>
            </button>

            
        </div>
        <div    
                class="z-10 right-0 top-0 w-full h-full fixed bg-slate-200/95 flex justify-center items-center"
                v-if="profile.viewProfile">
            <Profile/>
        </div>
    </div>
</template>
<script>
import  {profile}  from '../../sharing/Sharing';
import Profile from './Profile/Profile.vue';
export default{
    components:{Profile},
    setup(){
        const testclickme =()=>{
           profile.viewProfile=true
        }
        return {
            profile,
            testclickme
        }
    }
}

</script>