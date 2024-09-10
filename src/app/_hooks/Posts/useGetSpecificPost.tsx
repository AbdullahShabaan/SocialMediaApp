import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const getSpecificPost = async (id: string) => {
  return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
    headers: {
      token: Cookies.get("userToken"),
    },
  });
};
const useGetSpecificPost = () => {
  const getPost = useMutation({
    mutationFn: getSpecificPost,
  });
  return getPost;
};

export default useGetSpecificPost;
