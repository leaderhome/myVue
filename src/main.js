import Vue from 'vue'
import router from '@/router/router'
import App from '@/App.vue'

//css
require('@/assets/commoncss/common.css');

//js
require('@/assets/commonjs/zepto.min.js');
window.myObj = (require('@/assets/commonjs/common.js')).myObj;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
