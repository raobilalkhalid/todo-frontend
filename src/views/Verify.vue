<template>
<h2>Verification Code sent to your Email</h2>
  <form @submit.prevent="submit">
    <input
      type="number"
      v-model="data.verificationCode"
      class="form-control"
      placeholder="Code"
    />
    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "Verify",
  setup() {
    const data = reactive({
      verificationCode: "",
    });
    const router = useRouter();

    const submit = async () => {
      await axios
        .post("https://localhost:5001/api/user/VerifyUser", {
          username: localStorage.getItem("username"),
          verificationcode: data.verificationCode,
        })
        .then(({ data }: any) => {
          console.log(data);
          router.push("/login");
        })
        .catch((err) => {
          alert("Enter the Valid Code")
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
