import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const Image = styled("img")({
  width: "100%",
});

function SkeletonChildrenDemo(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <Box
      sx={{
        p: 2,
        boxShadow: 4,
        bgcolor: "#1B2730",
        borderRadius: 4,
        color: "white",
      }}
    >
      <h3>People You May Know</h3>
      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
        <Box sx={{ margin: 1 }}>
          {loading ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Ahmed Ali
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
        <Box sx={{ margin: 1 }}>
          {loading ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar src="https://linked-posts.routemisr.com/uploads/default-profile.png" />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Ahmed Tawfiq
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
        <Box sx={{ margin: 1 }}>
          {loading ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Abdullah SH
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function Friends() {
  return (
    <Grid container spacing={8}>
      {/* <Grid item xs>
        <SkeletonChildrenDemo loading />
      </Grid> */}
      <Grid item xs>
        <SkeletonChildrenDemo />
      </Grid>
    </Grid>
  );
}
