<template>
    <div class="relative w-full  flex px-2 pt-1  gap-4  ">
        <div class="w-[60%] h-160  relative overflow-y-scroll pr-2 scroll-smooth   ">

<!-- Head search and select type -->
            <div class="sticky top-0 bg-green-900 z-10 p-2 pl-2 rounded-md flex justify-between items-center">
                <div>
                    <input type="search" placeholder="search ... " class="bg-white h-10 w-80 rounded-md">
                </div>
                <div class="bg-slate-50/10 rounded-lg text-white shadow-2xl py-2 px-3">
                    <select name="" id="" class="outline-none">
                        <option value="one" disabled>Select</option>
                        <option value="one">one</option>
                        <option value="one">one</option>
                        <option value="one">one</option>
                        <option value="one">one</option>
                        <option value="one">onetwo</option>
                        <option value="one">one</option>
                    </select>
                </div>
             
            </div>
            <div class="grid grid-cols-3 gap-4 pt-4 ">
                    <ViewProducts v-for="ele in items" :name="ele.name" :price="ele.price" :model="ele.model"></ViewProducts>

            </div>

          
          
        </div>
        <div class="w-[40%] lg:min-h-full flex flex-col gap-2 relative rounded-md overflow-hidden  shadow-2xs">
             <div class="p-3 bg-slate-50 flex *:hover:bg-slate-200 *:transition-all duration-300 *:p-2 *:rounded-md">
                    <font-awesome-icon icon="fa-solid fa-print" class="text-2xl text-green-900 hover:cursor-pointer " @click="printer"/>
                    <font-awesome-icon icon="fa-solid fa-arrows-to-eye" class="text-2xl text-green-900 hover:cursor-pointer" />
            </div>
            
            <InvoiceSale></InvoiceSale>
        </div>

    </div>
</template>
<script>
import { ref } from 'vue';
import ViewProducts from './viewProducts/ViewProducts.vue';
import InvoiceSale from './invoiceSale/InvoiceSale.vue';
export default{
    components:{ViewProducts,InvoiceSale},
    setup(){
        const items =ref([
            {name:"computer" ,price:1200,model:"Dell optiplex 5050"},
            {name:"computer" ,price:1200,model:"Dell optiplex 5050"},
            {name:"computer" ,price:1200,model:"Dell optiplex 5050"},
            {name:"computer" ,price:1200,model:"Dell optiplex 5050"},
            {name:"computer" ,price:1200,model:"Dell optiplex 5050"},
            {name:"computer" ,price:1200,model:"Dell optiplex 5050"},
           
        ]);
        const printer =()=>{
            window.print();
        }
        return {
            items,
            printer
        }
    }
}
</script>