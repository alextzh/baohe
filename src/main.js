import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import {showToast, showAlert, showDialog, showPicker} from 'common/js/cubeTool'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Toast,
  Picker,
  Dialog,
  Scroll,
  Slide,
  createAPI
} from 'cube-ui'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg'),
  attempt: 360
})

Vue.use(Toast)
Vue.use(Picker)
Vue.use(Dialog)
Vue.use(Scroll)
Vue.use(Slide)

// 挂载提示插件到Vue实例
Vue.prototype.$toast = showToast
Vue.prototype.$alert = showAlert
Vue.prototype.$dialog = showDialog
Vue.prototype.$picker = showPicker

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
window.onload = function() {
  document.addEventListener('message', function(e) {
    store.commit('SET_MACHINE_NUM', e.data)
  })
}
