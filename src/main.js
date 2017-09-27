/* eslint no-new:0, no-lonely-if:0, import/first:0, import/extensions:0 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import NProgress from 'nprogress';
import 'element-ui/lib/theme-default/index.css';
import 'normalize.css/normalize.css';
import '@/assets/iconfont/iconfont';
import IconSvg from '@/components/Icon-svg/index.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg);
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.userInfo.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.roles;
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to });
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
