import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import useGetNotification from "@/app/_hooks/Notification/getNotification";
import { useSelector } from "react-redux";
import CountTime from "../CountTime/CountTime";

const Image = styled("img")({
  width: "100%",
});

function SkeletonChildrenDemo(props: { loading?: boolean }) {
  const { loading = false } = props;
  const { id } = useSelector((state) => state.UserDataSlice);
  const { data, refetch } = useGetNotification(id);
  console.log(data?.data?.slice(-3).reverse());

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
      <h3>Recent Notifications</h3>
      {data?.data.length < 1 && (
        <Typography sx={{ fontSize: "13px", fontWeight: "300", py: 1 }}>
          You don't have any notification yet!
        </Typography>
      )}
      {data?.data
        ?.slice(-3)
        .reverse()
        .map((noti, index) => (
          <Box
            key={{ index }}
            sx={{ display: "flex", alignItems: "center", py: 2, gap: 1 }}
          >
            <Box sx={{ margin: 1 }}>
              {loading ? (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              ) : (
                <Avatar src={noti.userPhoto} />
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
                    {noti.userName} Liked your post
                  </Typography>
                  <Typography sx={{ fontWeight: "100", fontSize: "13px" }}>
                    <CountTime
                      date1={new Date(noti?.createdAt)}
                      date2={new Date()}
                    />
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default function Notification() {
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
