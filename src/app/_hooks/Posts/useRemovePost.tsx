import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemovePost = () => {
  const queryClient = useQueryClient();
  const removePost = async (postId: string) => {
    return await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: Cookies.get("userToken"),
        },
      }
    );
  };

  const removePostMutation = useMutation({
    mutationFn: removePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["userPosts"]);
    },
  });
  return removePostMutation;
};

export default useRemovePost;
