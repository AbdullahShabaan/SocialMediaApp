import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddLike = () => {
  const fetchLikes = async ({ postId, userId }) => {
    return await axios.post("http://localhost:3005/PstsLiked", {
      postId,
      userId,
    });
  };
  const likesMutation = useMutation({
    mutationFn: fetchLikes,
  });
  return likesMutation;
};

export default useAddLike;
