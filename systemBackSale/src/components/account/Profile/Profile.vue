<template>
    <div class="w-full relative flex justify-center items-center h-full z-50">
        <div class="bg-slate-100 p-8 gap-3  w-[50%] h-full flex flex-col">
            <div class="flex justify-between">
                <div @click="testclick" class="relative hover:bg-slate-300 px-2 py-1.5 bg-slate-200 rounded-full">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long"  />
                    
                    </div>
                <!-- <div>setting</div> -->
            </div>
  <!-- profile image  -->
            <div  class="w-full h-75 rounded-lg shadow-2xs bg-slate-200 flex flex-col gap-4 justify-center items-center">
                <div class="relative">
                    <div class=" border border-slate-300 relative flex justify-center overflow-hidden items-end w-55 h-55 rounded-full">
                        <font-awesome-icon icon="fa-solid fa-user" class="text-gray-700 text-[170px]"/>
                    </div>
                    <button @click="imageChange">
                        <div class=" absolute top-[55%] -right-2">
                            <font-awesome-icon icon="fa-solid fa-camera-rotate" class="text-[28px] text-gray-800" />
                        </div>
                    </button>
                </div>
                <div>
                    <p class="uppercase font-bold text-2xl">{{ name}}</p>
                </div>
            </div>
            <div class="relative w-full ">
                <div class="absolute top-0 flex right-0">
                    <button @click="testsignout">
                    <div class="flex gap-1 bg-slate-200 p-2 rounded-md">
                        <div class="font-medium text-[14px]">SignOut</div>
                            <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
                        </div>
                    </button>
                </div>

            </div>
                    <font-awesome-icon icon="fa-solid fa-up-long" class="-rotate-90" />


            
            
            This Profile page
        </div>

    </div>
</template>
<script>
import { profile } from '../../../sharing/Sharing';
import { useRouter } from 'vue-router';
export default{
    data(){
        return {
            name:"yut"

        }
    },
    setup(){
        const router = useRouter()
        const testclick =()=>{
           profile.viewProfile=false;
          
        }

        const imageChange =()=>{
            alert("You clicked on imageChange")
        }

        const testsignout =()=>{
             profile.viewProfile=false;
            router.replace("/login")
        }
        return{
            profile,
            testclick,
            imageChange,
            testsignout
        }
    }
}

</script>