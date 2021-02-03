// index.js
import { createApp } from 'vue';
// 根组件
import App from './App.vue';
// 路由
import router from './router/index';
// store
import store from './store/store.js';

createApp(App).use(router).use(store).mount('#app')
