// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import focus from './directives/VFocus.js'

Vue.config.productionTip = false

Vue.directive('focus', focus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App, },
  template: '<App/>',
})
