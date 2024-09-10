import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useRemoveLike = () => {
  const fetchLikes = async ({ likeId }) => {
    return await axios.delete(`http://localhost:3005/PstsLiked/${likeId}`);
  };
  const likesMutation = useMutation({
    mutationFn: fetchLikes,
  });
  return likesMutation;
};

export default useRemoveLike;
