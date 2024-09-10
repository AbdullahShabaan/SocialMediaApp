import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const useAddPost = () => {
  const addPost = async (formData) => {
    return await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: Cookies.get("userToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const addPostMutation = useMutation({
    mutationFn: addPost,
  });
  return addPostMutation;
};

export default useAddPost;
