import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const useChangeProfilePic = () => {
  const changePhoto = async (formData) => {
    return axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: Cookies.get("userToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const changePhotoMutation = useMutation({
    mutationFn: changePhoto,
  });
  return changePhotoMutation;
};

export default useChangeProfilePic;
