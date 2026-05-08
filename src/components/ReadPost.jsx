import { getPost } from "../services/PostApi";
import { useState, useEffect } from "react";

const getPostData = async () => {
  const res = await getPost;
  console.log(res.data);
};

useEffect(() => {
  getPostData();
}, []);
