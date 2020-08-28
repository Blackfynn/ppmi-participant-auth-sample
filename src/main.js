import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import './assets/styles/_element-overrides.scss'

Vue.config.productionTip = false

new Vue({
  router,
    render: h => h(App),
	}).$mount('#app')
