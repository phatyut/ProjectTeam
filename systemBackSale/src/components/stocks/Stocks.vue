<template>
    <div class="relative w-full h-full flex flex-col px-1">
        <div>
            <StockView/>
        </div>
        
    </div>
</template>
<script>

import StockView from './StockView.vue';
export default{
    components:{StockView,}
}
</script>