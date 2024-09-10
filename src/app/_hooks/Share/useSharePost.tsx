import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useSharePost = () => {
  const fetchSharePost = async ({ postId, userId, data, thoughts }) => {
    return await axios.post("http://localhost:3005/PostsShared", {
      postId,
      userId,
      data: { thoughts, userId, ...data },
      thoughts,
      createdAt: new Date(),
    });
  };
  const shareMutation = useMutation({
    mutationFn: fetchSharePost,
  });
  return shareMutation;
};

export default useSharePost;
