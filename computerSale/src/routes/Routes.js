import {createRouter,createWebHistory}  from "vue-router";
import Homepage from "../components/home/Home.vue";
import Shop from "../components/shop/Shop.vue";
const routes =[
    {path:"/",redirect:"/home"},
    {path:"/home",component:Homepage},
    {path:"/shop",component:Shop},
]

const router = createRouter({
    history:createWebHistory(),
    routes
})



export default router