<template>
    <div class="relative w-full h-auto pt-5 flex flex-col gap-6">
        <Sly></Sly>
        <ShopByCategories></ShopByCategories>
        <Dealsview/>
        <Review></Review>
        <Footer/>
        



    </div>
</template>
<script>
import Review from './review/Review.vue';
import Sly from './Sly.vue';
import ShopByCategories from './shopByCategory/ShopByCategory.vue';
import Footer from '../footer/Footer.vue';
import Dealsview from './dealsview/Dealsview.vue';

export default{
    components:{Review, Sly, ShopByCategories,Footer,Dealsview }
}
</script>