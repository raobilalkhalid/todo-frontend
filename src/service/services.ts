import axios from "axios";

const BASE_URL = "https://localhost:5001/api/todo/";
const tooken = localStorage.getItem("token");

class TodoServices {
  deleteTodo(providedString: any) {
    axios.post(
      BASE_URL + "delete",
      {
        providedString,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default new TodoServices();
