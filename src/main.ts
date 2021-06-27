import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const local = localStorage.getItem("token");

if (local != null) {
  store.dispatch("setAuth", true);
}
else{
    store.dispatch("setAuth", false);
}

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
