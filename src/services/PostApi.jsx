import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get method
export const getPost = () => {
  return api.get("/comments");
};

// delete method
export const deletePost = (id) => {
  return api.delete(`/comments/${id}`);
};

// post method
export const postData = (post) => {
  return api.post("/comments", post);
};

// put method
export const updateDataPost = (id, post) => {
  return api.put(`/comments/${id}`, post);
};
