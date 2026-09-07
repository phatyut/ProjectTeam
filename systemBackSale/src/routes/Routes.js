import {createRouter,createWebHistory} from "vue-router";
import Dashboard from "../components/dashboard/Dashboard.vue";
import Products from "../components/products/Products.vue";
import Website from "../components/web/Website.vue";
import Users from "../components/users/Users.vue";

const routes =[
    {path:"/dashboard",component:Dashboard},
    {path:"/",redirect:"/dashboard"},
    {path:"/products",component:Products},
    {path:"/website",component:Website},
    {path:"/users",component:Users},
]

const router =createRouter({

    history:createWebHistory(),
    routes
})


export default router