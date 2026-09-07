import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from "../src/routes/Routes.js"
import {FontAwesomeIcon} from "./Icons/Icons.js";
import Menu from './components/menu/Menu.vue';
import Account from './components/account/Account.vue';
const app =createApp(App);


app.component("FontAwesomeIcon",FontAwesomeIcon);
app.component("Menu",Menu);
app.component("Account",Account)
app.use(router)


app.mount('#app')
