import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import create from './utils/create';

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$create = create

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
