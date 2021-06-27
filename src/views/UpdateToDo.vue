<template>
  <h2>Update ToDo</h2>
  <form>
    <div class="form-floating">
      <input
        v-model="todoList.title"
        type="text"
        class="form-control"
        placeholder="Title"
      />
      <label for="floatingInput">Title</label>
    </div>
    <div class="form-floating">
      <input
        v-model="todoList.description"
        type="text"
        class="form-control"
        placeholder="Description"
      />
      <label for="floatingInput">Description</label>
    </div>
    <button
      @click.prevent="update"
      class="w-100 btn btn-lg btn-primary"
      type="submit"
    >
      Update ToDo
    </button>
  </form>
</template>

<script lang="ts">
import axios from "axios";

import { Todos } from "@/service/todo";
import { defineComponent } from "vue";
export default defineComponent({
  name: "UpdateToDo",
  data() {
    return {
      todoList: {} as Todos,
    };
  },
  methods: {
    async update() {
      await axios
        .post(
          "https://localhost:5001/api/todo/update",
          {
            id: this.todoList.id,
            title: this.todoList.title,
            description: this.todoList.description,
            timestamp: new Date(),
            userid: this.todoList.userid,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.$router.push("/todo");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTodo(id: number) {
      axios
        .post(
          "https://localhost:5001/api/todo/FindById",
          {
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.todoList = res.data;
          console.log(this.todoList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTodo(Number(this.$route.params.id));
  },
});
</script>

<style scoped></style>
