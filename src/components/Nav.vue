<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="" class="navbar-brand" v-if="!auth"
        >TODO APP</router-link
      >
      <router-link to="/" class="navbar-brand" v-if="auth">Home</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">Login</router-link>
          </li>
          <li class="nav-item">
          <router-link to="/verify" class="nav-link">Verify</router-link>
        </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <router-link to="/todo" class="nav-link">Todo List</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" @click="logout"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Nav",
  setup() {
    const store = useStore();

    const logout = async () => {
      localStorage.clear();
      await store.dispatch("setAuth", false);
    };
    const auth = computed(() => store.state.authenticated);
    return {
      auth,
      logout,
    };
  },
};
</script>
