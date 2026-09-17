<template>
    <div class=" flex flex-col h-full gap-3  ">
        <div class=" h-full  rounded-md  overflow-hidden     bg-slate-50"  >
           <div class="text-center  font-eng text-[16px] border-b border-green-800 text-green-800  px-2 py-6">MICRO MENU</div>
           <div  class="pt-4   w-full flex flex-col gap-0.5   ">
            
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/dashboard" class="relative w-full py-2 font-medium" @click="clickActive('dashboard')"
                                :class="checkmenu ==='dashboard'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Dashboard 
                        
                    </routerLink>
                </div>
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/sales" class="relative w-full py-2 font-medium" @click="clickActive('sale')"
                                :class="checkmenu ==='sale'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Sale 
                        
                    </routerLink>
                </div>

                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/stocks" class="relative w-full py-2 font-medium" @click="clickActive('stocks')"
                                :class="checkmenu ==='stocks'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Stocks 
                        
                    </routerLink>
                </div>

                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/products" class="relative w-full py-2 font-medium" @click="clickActive('products')"
                                :class="checkmenu ==='products'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Products 
                        
                    </routerLink>
                </div>

                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/website" class="relative w-full py-2 font-medium" @click="clickActive('website')"
                                :class="checkmenu ==='website'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Website 
                        
                    </routerLink>
                </div>

                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/users" class="relative w-full py-2 font-medium" @click="clickActive('users')"
                                :class="checkmenu ==='users'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Customers 
                        
                    </routerLink>
                </div>
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/suppliers" class="relative w-full py-2 font-medium" @click="clickActive('suppliers')"
                                :class="checkmenu ==='suppliers'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Suppliers 
                        
                    </routerLink>
                </div>
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/orderReturn" class="relative w-full py-2 font-medium" @click="clickActive('orders')"
                                :class="checkmenu ==='orders'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Orders/Refun 
                        
                    </routerLink>
                </div>
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/reports" class="relative w-full py-2 font-medium" @click="clickActive('reports')"
                                :class="checkmenu ==='reports'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Reports 
                        
                    </routerLink>
                </div>
            
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/invioce" class="relative w-full py-2 font-medium" @click="clickActive('invioce')"
                                :class="checkmenu ==='invioce'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Invioce
                        
                    </routerLink>
                </div>
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/repairs" class="relative w-full py-2 font-medium" @click="clickActive('repairs')"
                                :class="checkmenu ==='repairs'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Repairs
                        
                    </routerLink>
                </div>
                <div class="flex gap-1.5 px-3 justify-center items-center">
                    <routerLink to="/expenses" class="relative w-full py-2 font-medium" @click="clickActive('expenses')"
                                :class="checkmenu ==='expenses'?'bg-green-700 text-center  text-green-100  transition-all duration-100  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'
                                                                :'bg-slate-100 text-center hover:bg-slate-200 text-green-800 hover:underline transition-all duration-300  border-y border-slate-100 border-l  shadow-amber-700 rounded-md'">        
                             Expenses
                        
                    </routerLink>
                </div>
            
               
              
                
                
                
               
               
               
                
            </div>
       </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default{
    setup(){
        const checkmenu =ref("dashboard")
        const clickActive =(somemenu)=>{
            checkmenu.value =somemenu
        }
        return{
            checkmenu,
            clickActive
        }
    }
}
</script>