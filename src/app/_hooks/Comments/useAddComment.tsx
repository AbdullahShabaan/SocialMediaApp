import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddComment = () => {
  const fetchAddComment = async (data) => {
    return await axios.post(
      "https://linked-posts.routemisr.com/comments",
      data,
      {
        headers: {
          token: Cookies.get("userToken"),
        },
      }
    );
  };

  const addCommentToPost = useMutation({
    mutationFn: fetchAddComment,
  });
  return addCommentToPost;
};

export default useAddComment;
