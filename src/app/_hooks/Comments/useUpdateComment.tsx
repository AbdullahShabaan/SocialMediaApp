import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const updateComment = async ({ commentId, content }) => {
  return axios.put(
    `https://linked-posts.routemisr.com/comments/${commentId}`,
    content,
    {
      headers: {
        token: Cookies.get("userToken"),
      },
    }
  );
};
const useUpdateComment = () => {
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
  });
  return updateCommentMutation;
};

export default useUpdateComment;
