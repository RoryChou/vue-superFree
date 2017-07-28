/**
 * Created by rory on 2017/7/27.
 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../components/home/search.vue'
import Combo from '@/components/list/combo.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode:'history',
  routes:[
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/combo',
      name: 'combo',
      component: Combo
    }
  ]
})
