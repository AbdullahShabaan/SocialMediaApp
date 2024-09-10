import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const useDeleteComment = () => {
  const deleteComment = async (commentId) => {
    return axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      {
        headers: {
          token: Cookies.get("userToken"),
        },
      }
    );
  };

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
  });
  return deleteCommentMutation;
};

export default useDeleteComment;
