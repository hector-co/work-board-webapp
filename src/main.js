import Vue from "vue"
import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import VModal from "vue-js-modal";
import App from "./App.vue"
import router from "./router"
import store from "./store"
import draggable from 'vuedraggable'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.component('draggable', draggable);

Vue.config.productionTip = false

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App)
}).$mount("#app")
