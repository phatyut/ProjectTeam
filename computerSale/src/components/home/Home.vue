<template>
    <div class="relative w-full h-auto pt-5 flex flex-col gap-6">
        <Sly></Sly>
        <Review></Review>
        <ShopByCategories></ShopByCategories>
        <FlashDeals></FlashDeals>



    </div>
</template>
<script>
import Review from './review/Review.vue';
import Sly from './Sly.vue';
import ShopByCategories from './shopByCategories/ShopByCategories.vue';
import FlashDeals from './flashDeals/FlashDeals.vue';
export default{
    components:{Review, Sly, ShopByCategories, FlashDeals}
}
</script>