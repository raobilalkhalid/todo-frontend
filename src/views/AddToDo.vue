<template>
  <h2>Add ToDo</h2>
  <form>
    <div class="form-floating">
      <input
        v-model="data.title"
        type="text"
        class="form-control"
        placeholder="Title"
      />
      <label for="floatingInput">Title</label>
    </div>
    <div class="form-floating">
      <input
        v-model="data.description"
        type="text"
        class="form-control"
        placeholder="Description"
      />
      <label for="floatingInput">Description</label>
    </div>
    <button @click.prevent="AddTodo" class="w-100 btn btn-lg btn-primary" type="submit">
      Add ToDo
    </button>
  </form>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent } from "vue";
export default defineComponent({
  name: "ToDo",
  data() {
    return {
      data: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    AddTodo() {
      axios
        .post(
          "https://localhost:5001/api/todo/Add",
          {
            title: this.data.title,
            description: this.data.description,
            username: localStorage.getItem("user"),
            timestamp: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(( res) => {
          console.log(res);
          this.$router.push('/todo');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>
