import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/vue-clipboard";
import App from "./App.vue";
import "./css/bootstrap-dark.css";

Vue.config.productionTip = false;

window.sessionStorage.setItem(
  "auth_endpoint",
  "https://accounts.google.com/o/oauth2/v2/auth"
);
window.sessionStorage.setItem(
  "token_endpoint",
  "https://www.googleapis.com/oauth2/v4/token"
);
window.sessionStorage.setItem("scope", "https://www.googleapis.com/auth/drive");
window.sessionStorage.setItem(
  "custom_parameters",
  "access_type=offline&prompt=select_account+consent"
);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
