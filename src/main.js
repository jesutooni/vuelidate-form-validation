import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';

Vue.use(Vuelidate)

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
