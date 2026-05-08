import { useState } from "react";
import { deletePost } from "../services/PostApi";

export const handleDeletePost = async (id, data, setData) => {
  try {
    const res = await deletePost(id);
    if (res.status === 200) {
      const newUpdatedData = data.filter((currPost) => {
        return currPost.id !== id;
      });
      setData(newUpdatedData);
      console.log("Deleted successfully");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
