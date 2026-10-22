import {createRouter,createWebHistory} from "vue-router";

import Dashboard from "../components/dashboard/Dashboard.vue";


import Products from "../components/products/Products.vue";
import SetCategory from "../components/products/setOption/SetOption.vue";


import Website from "../components/web/Website.vue";
import AddProductToWeb from "../components/web/addproduct/AddProductToWeb.vue";
import Setmore from "../components/web/setmore/Setmore.vue";


import Users from "../components/users/Users.vue";
import Addemployee from "../components/users/addEmployee/Addemployee.vue";
import EditEmployee from "../components/users/updateEmployee/UpdateEmployee.vue"
import ViewEmployee from "../components/users/viewEmployee/ViewEmployee.vue"; // adjust to your real path


import Invioce from "../components/invioce/Invioce.vue";
import OrderReturn from "../components/orderReturn/OrderReturn.vue";



import Suppliers from "../components/suppliers/Suppliers.vue";

import AddSuppliers from "../components/suppliers/addSuppliers/AddSuppliers.vue";
import UpdateSuppliers from "../components/suppliers/updateSuppliers/UpdateSuppliers.vue";
import ViewSupplier from "../components/suppliers/viewSuppliers/ViewSupplier.vue";


import Stocks from "../components/stocks/Stocks.vue";
import AddStock from "../components/stocks/AddStock/AddStock.vue";
import EditStock from "../components/stocks/editStock/EditStock.vue";




import Sales from "../components/sales/Sales.vue";
import Reports from "../components/reports/Reports.vue";
import Repairs from '../components/Repairs/Repairs.vue';
import Expenses from "../components/expenses/Expenses.vue";
import Login from "../components/login/Login.vue";
import Signup from "../components/signup/Signup.vue";
import Profile from "../components/account/Profile/Profile.vue";
import Setting from "../components/setting/Setting.vue";
import Help from "../components/help/Help.vue";
import Test from "../components/test/test.vue";

const routes =[
    {path:"/dashboard",component:Dashboard},
    {path:"/login",component:Login},
    {path:"/",redirect:"/login"},

    {path:"/products",component:Products},
    {path:"/products/setoptionStock",component:SetCategory},,


    {path:"/website",component:Website},
    {path:"/website/addProductToWeb",component:AddProductToWeb},
    {path:"/website/setmore",component:Setmore},


    {path:"/users",component:Users},
    {path:"/users/addemployee",component:Addemployee},
    {path:"/users/editEmployee/:id",component:EditEmployee},
    {path:"/users/viewEmployee/:id",component:ViewEmployee},
    
    {path:"/invioce",component:Invioce},
    {path:"/orderReturn",component:OrderReturn},



    {path:"/suppliers",component:Suppliers},
    {path:"/suppliers/addsuppliers",component:AddSuppliers},
    {path:"/suppliers/editsuppliers/:id",component:UpdateSuppliers},
    {path:"/suppliers/viewsuppliers/:id",component:ViewSupplier},



    {path:"/stocks",component:Stocks},
    {path:"/stocks/AddStocks",component:AddStock},
    {path:"/stocks/editStock/:id",component:EditStock},

    
   


    {path:"/sales",component:Sales},
    {path:"/reports",component:Reports},
    {path:"/repairs",component:Repairs},
    {path:"/expenses",component:Expenses},
    {path:"/signup",component:Signup},
    {path:"/profile",component:Profile},
    {path:"/setting",component:Setting},
    {path:"/help",component:Help},
    {path:"/test",component:Test},
]

const router =createRouter({

    history:createWebHistory(),
    routes
})


export default router