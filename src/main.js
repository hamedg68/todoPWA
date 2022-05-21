import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.mixin({
    data() {
        return {
            isMobileCheck: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        }
    }
});
window.isMobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')