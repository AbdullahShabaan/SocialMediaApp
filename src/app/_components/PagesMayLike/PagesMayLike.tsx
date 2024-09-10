import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
      <h3>Pages You May Like</h3>
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <>
              <div>React</div>
              <FavoriteBorderIcon />
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <>
              <div>Abdullah shaaban</div>
              <FavoriteBorderIcon />
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <>
              <div>Angular</div>
              <FavoriteBorderIcon />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function PagesMayLike() {
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
