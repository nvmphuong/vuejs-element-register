import Vue from 'vue'
import App from './App.vue'

// Import element-ui
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(Element, {
    locale,
    size: 'medium' // set element-ui default size
})
import './styles/element-variables.scss'

// CSS resets
import 'normalize.css/normalize.css'

import store from './store'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
    store
}).$mount('#app')
