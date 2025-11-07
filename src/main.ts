import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";

import 'virtual:uno.css';
import './styles/global.scss';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .mount("#app");
