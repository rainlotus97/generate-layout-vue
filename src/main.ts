import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { DynamicNodeVue } from 'dynamic-node-vue';
import { cardInit } from './utils/index';
import 'dynamic-node-vue/lib/index.css'

cardInit();

const app = createApp(App);

app.use(DynamicNodeVue);

app.mount('#app');