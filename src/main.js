import Vue from 'vue'
import router from '@/router/router'
import App from '@/App.vue'

//css
require('@/commoncss/common.css');

//js
window.myObj = (require('@/commonjs/common.js')).myObj;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
