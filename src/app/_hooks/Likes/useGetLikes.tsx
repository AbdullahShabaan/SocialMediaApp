import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
const fetchLikes = async ({ queryKey }) => {
  const [, postId] = queryKey;

  return await axios.get(`http://localhost:3005/PstsLiked?postId=${postId}`);
};
const useGetLikes = (postId) => {
  return useQuery({
    queryKey: ["likes", postId],
    queryFn: fetchLikes,
  });
};

export default useGetLikes;
