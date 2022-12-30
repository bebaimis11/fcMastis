
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});