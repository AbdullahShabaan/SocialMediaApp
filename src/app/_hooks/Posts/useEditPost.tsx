import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";

const useEditPost = () => {
  const queryClient = useQueryClient();
  const addPost = async ({ formData, postId }) => {
    console.log(postId);
    console.log(formData);

    return await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          token: Cookies.get("userToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const editPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["userPosts"]);
    },
  });
  return editPostMutation;
};

export default useEditPost;
