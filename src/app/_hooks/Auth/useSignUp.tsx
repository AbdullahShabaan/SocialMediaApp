import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useSignUp: any = () => {
  const signUpFetch = async (data: object) => {
    return await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      data
    );
  };

  const signUp = useMutation({
    mutationFn: signUpFetch,
  });
  return signUp;
};

export default useSignUp;
