import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CommentActions from "../CommentActions/CommentActions";
import Button from "@mui/material/Button";
import useUpdateComment from "@/app/_hooks/Comments/useUpdateComment";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

interface MediaProps {
  loading?: boolean;
  comment: object | undefined;
  userPostId: string;
}
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

function Media(props: MediaProps) {
  const { id, photo } = useSelector((state) => state.UserDataSlice);

  const { loading, comment: getComment, userPostId, postId, reset } = props;
  const [comment, setComment] = React.useState(getComment);
  const [editComment, setEditComment] = React.useState(false);
  const [commentId, setCommentId] = React.useState(null);
  const [commentContent, setCommentContent] = React.useState(comment?.content);
  const { mutateAsync: updateComment, isPending } = useUpdateComment();

  React.useEffect(() => {
    const handleClick = (e) => {
      if (e.target == document.body) {
        setEditComment(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <Card
      sx={{
        boxShadow: "none",
        bgcolor: "#1B2730",
        p: 2,
        borderRadius: 0,
      }}
    >
      {comment && (
        <>
          <CardHeader
            sx={{ px: 0, py: 1 }}
            avatar={
              loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar
                  alt={comment?.commentCreator.name}
                  src={
                    comment?.commentCreator._id == id
                      ? photo
                      : comment?.commentCreator.photo
                  }
                />
              )
            }
            action={
              loading
                ? null
                : id == comment?.commentCreator._id && (
                    <CommentActions
                      id={comment?._id}
                      setCommentId={setCommentId}
                      setEditComment={setEditComment}
                      editComment={editComment}
                      setComment={setComment}
                      userPostId={userPostId}
                      postId={postId}
                      reset={reset}
                    />
                  )
            }
            title={
              loading ? (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              ) : (
                <span style={{ paddingLeft: "10px", color: "white" }}>
                  {comment?.commentCreator.name}
                </span>
              )
            }
            subheader={
              loading ? (
                <Skeleton animation="wave" height={10} width="40%" />
              ) : (
                <span style={{ paddingLeft: "10px", color: "white" }}>
                  {new Date(comment?.createdAt).toDateString()}
                </span>
              )
            }
          />

          <CardContent
            sx={{ p: 0, borderBottom: "1px solid #28343E", color: "white" }}
          >
            {loading ? (
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            ) : (
              <div>
                {editComment && commentId == comment?._id ? (
                  <div
                    style={{
                      paddingRight: "20px",
                      paddingLeft: "20px",
                      display: "flex",
                      gap: 5,
                    }}
                  >
                    <textarea
                      value={commentContent}
                      onBlur={(e) => {
                        if (!e.target.classList.value == "add-post") {
                          setEditComment(false);
                        }
                      }}
                      onChange={() => {
                        setCommentContent(event.target.value);
                      }}
                      className="add-post"
                      placeholder="Say Something?"
                      style={{
                        width: "100%",
                        backgroundColor: "#28343E",
                        color: "white",
                      }}
                    ></textarea>
                    <Button
                      disabled={isPending}
                      sx={{
                        textTransform: "capitalize",
                        border: "1px solid #28343E",
                        bgcolor: "#28343E",
                        color: "white",
                      }}
                      size="small"
                      onClick={async () => {
                        const content = {
                          content: commentContent,
                        };
                        const response = await updateComment({
                          commentId: comment?._id,
                          content,
                        });
                        if (response.data.message == "success") {
                          Toast.fire({
                            icon: "success",
                            title: "Your comment has been updated successfully",
                            position: "top-end",
                          });
                          setComment(response.data.comment);

                          setEditComment(false);
                        }
                      }}
                    >
                      Update
                    </Button>
                  </div>
                ) : (
                  <Typography
                    sx={{ pl: 7, color: "white" }}
                    variant="body2"
                    color="text.secondary"
                    component="p"
                  >
                    {comment?.content}
                  </Typography>
                )}
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default function Comment({
  comment,
  loading,
  userPostId,
  postId,
  reset,
}) {
  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Media loading />
      ) : (
        <Media
          loading={loading}
          comment={comment}
          userPostId={userPostId}
          postId={postId}
          reset={reset}
        />
      )}
    </div>
  );
}
