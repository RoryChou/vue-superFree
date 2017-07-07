import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(axios);

new Vue({
  el: '#app',
  render: h => h(App)
});
