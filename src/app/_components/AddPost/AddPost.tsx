import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import PostModal from "../Modal/Modal";
import { useSelector } from "react-redux";

const Image = styled("img")({
  width: "100%",
});

function SkeletonChildrenDemo(props: { loading?: boolean }) {
  const { loading = false } = props;
  const { photo } = useSelector((state) => state.UserDataSlice);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#1B2730",
          p: 1,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <Box sx={{ margin: 1 }}>
            {loading ? (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar src={photo} alt="profile" />
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            {loading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <PostModal></PostModal>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default function AddPost() {
  return (
    <Grid container spacing={8} sx={{ mb: "15px" }}>
      {/* <Grid item xs>
        <SkeletonChildrenDemo loading />
      </Grid> */}
      <Grid item xs>
        <SkeletonChildrenDemo />
      </Grid>
    </Grid>
  );
}
