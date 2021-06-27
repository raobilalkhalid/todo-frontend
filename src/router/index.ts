import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import { computed } from "vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Verify from "@/views/Verify.vue";
import ToDo from "@/views/ToDo.vue";
import AddToDo from "@/views/AddToDo.vue";
import { useStore } from "vuex";
import UpdateToDo from "@/views/UpdateToDo.vue";
import store from "../store";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/verify",
    component: Verify,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/todo",
    component: ToDo,
    beforeEnter: (to, from, next) => {
      if (!store.state.authenticated) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/todo/:id",
    component: UpdateToDo,
    beforeEnter: (to, from, next) => {
      if (!store.state.authenticated) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/addtodo",
    component: AddToDo,
    beforeEnter: (to, from, next) => {
      if (!store.state.authenticated) {
        next("/login");
      } else {
        next();
      }
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
