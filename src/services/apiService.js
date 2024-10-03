import axios from "axios";


const apiClient = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getCategories() {
    return apiClient.get("/categories");
  },
  getCategoryById(id) {
    return apiClient.get(`/category/${id}`);
  },
  getAuthorInfo(id) {
    return apiClient.get(`/author/${id}`);
  },
};
