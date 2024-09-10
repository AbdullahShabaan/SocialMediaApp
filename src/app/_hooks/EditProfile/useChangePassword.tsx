import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useChangePassword = () => {
  const changePass = async (data) => {
    return axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      {
        password: data.oldPassword,
        newPassword: data.password,
      },
      {
        headers: {
          token: Cookies.get("userToken"),
        },
      }
    );
  };
  const chnagePassMutation = useMutation({
    mutationFn: changePass,
  });
  return chnagePassMutation;
};

export default useChangePassword;
