import Vue from 'vue'
import Router from 'vue-router'

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
