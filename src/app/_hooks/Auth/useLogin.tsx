import LoginInitialValues from "@/app/_interfaces/LoginInitialValues";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLogin = () => {
  const login = async (data: LoginInitialValues) => {
    const req = axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      data
    );
    return req;
  };

  const loginMutation = useMutation({
    mutationFn: login,
  });
  return loginMutation;
};

export default useLogin;
