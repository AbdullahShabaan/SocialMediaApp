import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchSharedPosts = async ({ queryKey }) => {
  const [, data] = queryKey;

  return await axios.get(`http://localhost:3005/PostsShared?userId=${data}`);
};
const useGetSharedPosts = (data) => {
  return useQuery({
    queryKey: ["likes", data],
    queryFn: fetchSharedPosts,
  });
};

export default useGetSharedPosts;
