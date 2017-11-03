// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import baseStyle from '../global/less/base.less'
import rule from '../global/js/rule.js'
import Axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype._global = rule;
Vue.prototype.$http = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})