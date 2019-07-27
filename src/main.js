import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App)
}).$mount('#app')
