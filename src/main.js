import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueCookie from "vue-cookie";
import Clipboard from "v-clipboard";
import VueHead from "vue-head";
import { routes } from "./routes.js";

import { store } from "./Store/Store";

Vue.use(VueRouter);
Vue.use(VueHead, {
  separator: "-",
  complement: "کلوپ وِگان"
});
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(Vuelidate);
Vue.use(Clipboard);
Vue.http.options.root = "https://api.c1t.ir/api/";

export const router = new VueRouter({
  routes: routes,
  mode: "history",
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});

new Vue({
  el: "#app",
  vuetify,
  store,
  router,
  render: h => h(App)
});
