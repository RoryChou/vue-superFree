import Vue from 'vue'
import Search from './components/search.vue'
import Cart from './components/cart.vue'
import History from './components/history.vue'
import SearchTitle from './components/search-title.vue'
import HotCitys from './components/hot-citys.vue'

new Vue({
  el: '#app',
    components: { Search ,Cart,History,SearchTitle,HotCitys}
});
