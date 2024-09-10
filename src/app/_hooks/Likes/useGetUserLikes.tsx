import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchLikes = async ({ queryKey }) => {
  const [, data] = queryKey;

  return await axios.get(
    `http://localhost:3005/PstsLiked?postId=${data.postId}&&userId=${data.userId}`
  );
};
const useGetUserLikes = (data) => {
  return useQuery({
    queryKey: ["likesUser", data],
    queryFn: fetchLikes,
  });
};

export default useGetUserLikes;
