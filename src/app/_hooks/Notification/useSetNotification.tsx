import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useSetNotification = () => {
  const fetchNotification = async ({
    userId,
    id,
    name,
    photo,
    postId,
    like,
    comment,
    share,
  }) => {
    return await axios.post(`http://localhost:3005/Notifications`, {
      postUser: userId,
      userId: id,
      userName: name,
      userPhoto: photo,
      postId: postId,
      like,
      comment,
      share,
      createdAt: new Date(),
    });
  };
  const notificationMutation = useMutation({
    mutationFn: fetchNotification,
  });
  return notificationMutation;
};

export default useSetNotification;
