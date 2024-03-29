import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from 'vue-socket.io';
import { BootstrapVue } from 'bootstrap-vue';
import router from "./router";
import store from "./store";
import CONFIG from "./config";

import "./scss/style.scss";

Vue.use(new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_HOST || CONFIG.VUE_APP_HOST,
    secure: true
}));

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
