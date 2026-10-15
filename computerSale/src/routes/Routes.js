import {createRouter,createWebHistory}  from "vue-router";
import Homepage from "../components/home/Home.vue";
import Shop from "../components/shop/Shop.vue";
import Deals from "../components/deals/Deals.vue";
import Support from "../components/support/Support.vue";
import Contact from "../components/contact/Contact.vue";
import About from "../components/about/About.vue";
import signup from "../components/register/signup.vue";
import Login from "../components/register/login.vue";

// testing
import Testpage from "../components/test/Testpage.vue";

const routes =[
    {path:"/",redirect:"/shop"},
    {path:"/home",component:Homepage},
    {path:"/shop",component:Shop},
    {path:"/deals",component:Deals},
    {path:"/support",component:Support},
    {path:"/contact",component:Contact},
    {path:"/about",component:About},

    {path:"/signup",component:signup},
    {path:"/login",component:Login},
    {path:"/test",component:Testpage},
]

const router = createRouter({
    history:createWebHistory(),
    routes
})



export default router