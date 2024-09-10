import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchPosts = async ({ queryKey }) => {
  const [, userPosts] = queryKey;

  return await axios.get(
    `https://linked-posts.routemisr.com/users/${userPosts}/posts?limit=10`,
    {
      headers: {
        token: Cookies.get("userToken"),
      },
    }
  );
};
const useUserPosts = (id) => {
  return useQuery({
    queryKey: ["userPosts", id],
    queryFn: fetchPosts,
  });
};

export default useUserPosts;
