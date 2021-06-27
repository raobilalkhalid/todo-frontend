<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Sign Up</h1>

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
    <div class="form-floating">
      <input
        v-model="datas.confirmPassword"
        type="password"
        class="form-control"
        placeholder="confirmPassword"
      />
      <label for="floatingPassword">Confirm Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "Register",
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });
    const datas = reactive({
      confirmPassword: "",
    });
    const router = useRouter();

    const submit = async () => {
      if (data.password == datas.confirmPassword) {
        await axios
        .post("https://localhost:5001/api/user/CreateUser", {
          username: data.username,
          password: data.password,
        })
        .then(({ res }: any) => {
          console.log(res);
          localStorage.setItem("username",data.username);
          router.push("/verify");
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        alert("Confirm Password did not match");
      }
    };

    return {
      data,
      datas,
      submit,
    };
  },
};
</script>
