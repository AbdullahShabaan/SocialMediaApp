"use client";
import Posts from "@/app/_components/Posts/Posts";
import useGetSpecificPost from "@/app/_hooks/Posts/useGetSpecificPost";
import { useEffect, useState } from "react";
import Comment from "../../../_components/Comment/Comment";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import { useParams } from "next/navigation";
import Navbar from "@/app/_components/Navbar/Navbar";

const page = () => {
  const { id } = useParams();
  const { mutateAsync, isPending, isError, reset } = useGetSpecificPost();
  const [postDetails, setPostDetails] = useState(null);
  const [postUserId, setPostUserId] = useState(null);
  const [postId, setPostId] = useState(null);
  useEffect(() => {
    async function getPost() {
      const response = await mutateAsync(id);

      setPostDetails(response.data.post);
      console.log(response.data.post.id);

      setPostUserId(response.data.post.user._id);
      setPostId(response.data.post.id);
    }
    getPost();
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{ width: { xs: "100%", lg: "60%" } }}
          style={{
            paddingTop: "80px",
            paddingBottom: "30px",
            margin: "auto",
          }}
        >
          {isPending && <Posts data={undefined} loading={true}></Posts>}
          {!isPending && postDetails != null && (
            <>
              <Posts
                data={postDetails}
                loading={isPending}
                isError={isError}
                commentDetails={true}
                setPostDetails={setPostDetails}
                postId={postId}
              ></Posts>
              <div style={{ marginTop: "20px" }}>
                <Typography sx={{ color: "white" }} variant="h6" gutterBottom>
                  Comments {postDetails.comments.length}
                </Typography>
                {postDetails.comments.length > 0 && (
                  <Box
                    style={{
                      backgroundColor: "transparent",
                    }}
                    sx={{ boxShadow: 3 }}
                  >
                    {postDetails.comments?.map((comment) => (
                      <Box key={comment._id}>
                        <Comment
                          userPostId={postUserId}
                          comment={comment}
                          loading={isPending}
                          setPostDetails={setPostDetails}
                          postId={postId}
                          reset={reset}
                        ></Comment>
                      </Box>
                    ))}
                  </Box>
                )}
              </div>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default page;
