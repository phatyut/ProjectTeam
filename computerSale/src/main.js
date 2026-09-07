import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from './icons/Icons.js';
import router from './routes/Routes.js';
import Menu from "./components/menu/Menu.vue";
import Head from './components/head/Head.vue';
const app =createApp(App);

app.component("Menu",Menu)
app.component("Head",Head)
app.component("FontAwesomeIcon",FontAwesomeIcon)
app.use(router)
app.mount('#app')
