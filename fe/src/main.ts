import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "./style.scss"
import VueMarkdownEditor from "./utils/mdEditor"
import store from "./store"
// import "./assets/css/constants.scss"
createApp(App).use(router).use(store).use(VueMarkdownEditor).mount('#app')
