import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchNotification = async ({ queryKey }) => {
  const [, data] = queryKey;

  return await axios.get(
    `http://localhost:3005/Notifications?postUser=${data}`
  );
};
const useGetNotification = (data) => {
  return useQuery({
    queryKey: ["notification", data],
    queryFn: fetchNotification,
    refetchInterval: 10000,
  });
};

export default useGetNotification;
