import {createRouter,createWebHistory} from "vue-router";

import Dashboard from "../components/dashboard/Dashboard.vue";
import Products from "../components/products/Products.vue";
import Website from "../components/web/Website.vue";
import Users from "../components/users/Users.vue";
import Invioce from "../components/invioce/Invioce.vue";
import OrderReturn from "../components/orderReturn/OrderReturn.vue";
import Suppliers from "../components/suppliers/Suppliers.vue";
import Stocks from "../components/stocks/Stocks.vue";
import Sales from "../components/sales/Sales.vue";
import Reports from "../components/reports/Reports.vue";
import Repairs from '../components/Repairs/Repairs.vue';
import Expenses from "../components/expenses/Expenses.vue";
import Login from "../components/login/Login.vue";
import Signup from "../components/signup/Signup.vue";
import Profile from "../components/account/Profile/Profile.vue";

const routes =[
    {path:"/dashboard",component:Dashboard},
    {path:"/login",component:Login},
    {path:"/",redirect:"/login"},
    {path:"/products",component:Products},
    {path:"/website",component:Website},
    {path:"/users",component:Users},
    {path:"/invioce",component:Invioce},
    {path:"/orderReturn",component:OrderReturn},
    {path:"/suppliers",component:Suppliers},
    {path:"/stocks",component:Stocks},
    {path:"/sales",component:Sales},
    {path:"/reports",component:Reports},
    {path:"/repairs",component:Repairs},
    {path:"/expenses",component:Expenses},
    {path:"/signup",component:Signup},
    {path:"/profile",component:Profile},

]

const router =createRouter({

    history:createWebHistory(),
    routes
})


export default router