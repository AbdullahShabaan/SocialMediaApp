import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import useAddComment from "@/app/_hooks/Comments/useAddComment";
import useGetSpecificPost from "@/app/_hooks/Posts/useGetSpecificPost";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import useSetNotification from "@/app/_hooks/Notification/useSetNotification";
const AddComment = ({
  photo,
  postId,
  setPostDetails,
  setCommentData,
  userPostId,
}) => {
  const [comment, setComment] = useState(null);
  const { mutateAsync, isPending, isSuccess } = useAddComment();
  const { mutateAsync: reCallPosts } = useGetSpecificPost();
  const { mutateAsync: setNotification } = useSetNotification();
  const {
    id,
    name,
    photo: userPhoto,
  } = useSelector((state) => state.UserDataSlice);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginTop: "20px",
        }}
      >
        <Avatar src={photo} />
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          style={{ backgroundColor: "#28343E", color: "white" }}
          className="add-post"
          placeholder="Say Something?"
        ></textarea>
        <Button
          onClick={async () => {
            const data = {
              content: comment,
              post: postId,
            };
            await mutateAsync(data);
            const response = await reCallPosts(postId);
            if (setPostDetails != null) {
              setPostDetails(response.data.post);
            }
            setComment("");
            setCommentData(response.data.post.comments[0]);
            if (userPostId != id) {
              await setNotification({
                userId: userPostId,
                id,
                name,
                photo: userPhoto,
                postId,
                like: false,
                comment: true,
                share: false,
              });
            }
            Toast.fire({
              icon: "success",
              title: "Your comment has been added successfully",
            });
          }}
          disabled={!comment || isPending}
          sx={{
            textTransform: "capitalize",
            color: "white",
            bgcolor: "#28343E",
            ":disabled": { bgcolor: "#28343E" },
          }}
          size="small"
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default AddComment;
