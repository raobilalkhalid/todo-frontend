<template>
  <form>
    <h2>ToDo List</h2>

    <button @click="addtodo" class="w-100 btn btn-lg btn-primary" type="submit">
      Add ToDo
    </button>
  </form>
  <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">TimeSpan</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody v-for="(item, index) in todoList" :key="index">
      <tr>
        <td>{{ item.title }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.timestamp }}</td>
        <td>
          <button @click="editmodel(item)">
            <router-link :to="'/todo/' + item.id">Edit</router-link>
          </button>
          <button @click="deletemodel(item)">
            delete<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import axios from "axios";

import { Todos } from "@/service/todo";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ToDo",
  data() {
    return {
      todoList: [] as Todos[],
      currentTodos: {} as Todos
    };
  },
  methods: {
    addtodo() {
      this.$router.push("addtodo");
    },
    editmodel(model: Todos) {
      this.currentTodos = model;
      console.log(this.currentTodos.id);
    },
    deletemodel(model: Todos) {
      console.log(model.id);
      axios
        .post(
          "https://localhost:5001/api/todo/delete",
          {
            id: model.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.retrieveTodo();
          console.log(this.todoList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    retrieveTodo() {
      axios
        .post(
          "https://localhost:5001/api/todo/FindBy",
          {
            username: localStorage.getItem("user"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.todoList = res.data as Array<Todos>;
          console.log(this.todoList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.retrieveTodo();
  },
});
</script>
