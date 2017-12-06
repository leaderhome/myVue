import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(Router);

/*按需加载*/
export const vueConfig = {
	vue: {
		home:     resolve => require.ensure([], () => resolve(require('@/views/Home')), 'vue/home'),
    about:     resolve => require.ensure([], () => resolve(require('@/views/About')), 'vue/about'),
	}
}

export default new Router({
    mode: "history",
    routes: [
      {path: '', name: 'home', meta: {}, component: vueConfig.vue.home},
      {path: '/about', name: 'about', meta: {}, component: vueConfig.vue.about},
    ]
})

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/About',
//       name: 'About',
//       component: About
//     }
//   ]
// });
