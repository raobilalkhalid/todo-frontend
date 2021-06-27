<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input
        v-model="data.username"
        type="email"
        class="form-control"
        placeholder="name@example.com"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        v-model="data.password"
        type="password"
        class="form-control"
        placeholder="Password"
      />
      <label for="floatingPassword">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const data = reactive({
      username: "",
      password: "",
    });
    const router = useRouter();

    const submit = async () => {
      await axios
        .post("https://localhost:5001/api/login/login", {
          username: data.username,
          password: data.password,
        })
        .then(({ data }: any) => {
           localStorage.clear();
          localStorage.setItem("token", data.token);
          localStorage.setItem("user",data.user);
          store.dispatch("setAuth", true);

          router.push("/");
        })
        .catch((err) => {
          alert("Invalid Credentials")
          console.log(err);
        });
    };

    return {
      data,
      submit,
    };
  },
};
</script>

<style scoped></style>
