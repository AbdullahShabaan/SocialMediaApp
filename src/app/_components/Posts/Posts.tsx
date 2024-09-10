"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Comment from "../Comment/Comment";
import { useRouter } from "next/navigation";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostActons from "../PostActons/PostActons";
import AddComment from "../AddComment/AddComment";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import useAddLike from "@/app/_hooks/Likes/useAddLike";
import useGetLikes from "@/app/_hooks/Likes/useGetLikes";
import useGetUserLikes from "@/app/_hooks/Likes/useGetUserLikes";
import useRemoveLike from "@/app/_hooks/Likes/useRemoveLike";
import useSharePost from "@/app/_hooks/Share/useSharePost";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DirectionsIcon from "@mui/icons-material/Directions";
import useSetNotification from "@/app/_hooks/Notification/useSetNotification";
interface MediaProps {
  loading?: boolean;
  isFalse?: boolean;
  commentDetails?: boolean;
  data: [];
  setPostDetails: object;
  postId: "string";
}

function Media({
  data,
  loading,
  isFalse,
  commentDetails = false,
  setPostDetails,
  postId,
}: MediaProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { photo, id, name } = useSelector((state) => state.UserDataSlice);
  const [commentData, setCommentData] = React.useState(
    data?.comments ? data?.comments[0] : null
  );
  const [isLike, setIsLike] = React.useState(null);
  const { mutateAsync: addLike } = useAddLike();

  const { data: likes, refetch } = useGetLikes(data?._id);
  const { data: userLikes, refetch: refetchUserLikes } = useGetUserLikes({
    postId: data?._id,
    userId: id,
  });
  const { mutateAsync: removeLike } = useRemoveLike();
  const { mutateAsync: sharePost } = useSharePost();

  const { mutateAsync: setNotification } = useSetNotification();

  const handleLike = async () => {
    if (userLikes?.data?.length > 0) {
      await removeLike({ likeId: userLikes?.data[0]?.id });
      setIsLike(null);
    } else {
      await addLike({ postId: data?._id, userId: id });
      setIsLike(data?._id);
      if (data?.user?._id != id) {
        await setNotification({
          userId: data?.user?._id,
          id,
          name,
          photo,
          postId,
          like: true,
          comment: false,
          share: false,
        });
      }
    }
    await refetch();
    await refetchUserLikes();
  };

  const handleShare = async () => {
    const { value: text } = await Swal.fire({
      background: "#1B2730",
      color: "white",
      input: "textarea",
      inputLabel: "Repost",
      inputPlaceholder: "Type your thoughts here...",
      inputAttributes: {
        "aria-label": "Type your thoughts here",
      },
      showCancelButton: true,
      buttonsStyling: {
        confirmButton: {
          color: "white",
          backgroundColor: "red",
        },
      },
    });
    if (text) {
      Swal.fire("Your Post Has Been Shared");
      const rsponse = await sharePost({
        postId: data?._id,
        userId: id,
        data: data,
        thoughts: text,
      });
      if (data?.user?._id != id) {
        const res = await setNotification({
          userId: data?.user?._id,
          id,
          name,
          photo,
          postId,
          like: false,
          comment: false,
          share: true,
        });
      }
    }
  };
  const shareWithoutThoughts = async () => {
    const rsponse = await sharePost({
      postId: data?._id,
      userId: id,
      data: data,
      thoughts: " ",
    });
    if (data?.user?._id != id) {
      const res = await setNotification({
        userId: data?.user?._id,
        id,
        name,
        photo,
        postId,
        like: false,
        comment: false,
        share: true,
      });
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
    Toast.fire({
      icon: "success",
      title: "Reposted successfully",
    });
  };

  const router = useRouter();
  return (
    <Card
      sx={{
        mb: 2,
        p: 3,
        boxShadow: 3,
        bgcolor: "#1B2730",
        color: "white",
        borderRadius: 4,
      }}
    >
      {data?.thoughts?.length ? (
        <>
          <Box
            sx={{
              fontSize: "14px",
              pb: 1,
              mb: 1,
              borderBottom: "2px solid #29353F",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <DirectionsIcon />
              <Avatar
                sx={{ width: "30px", height: "30px" }}
                alt={name}
                src={photo}
              />
              <p>You reposted this</p>
            </Box>
            <p style={{ paddingLeft: "80px" }}>{data?.thoughts}</p>
          </Box>
        </>
      ) : (
        ""
      )}
      <CardHeader
        sx={{ p: 0 }}
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt={data?.user?.name} src={data?.user?.photo} />
          )
        }
        action={
          loading
            ? null
            : data?.user?._id === id && (
                <PostActons postId={data?._id} data={data} />
              )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" />
          ) : (
            <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
              {data?.user?.name}
            </span>
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            <span style={{ paddingLeft: "10px", color: "white" }}>
              {new Date(data?.createdAt).toDateString()}
            </span>
          )
        }
      />
      <CardContent sx={{ pl: 0 }}>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            onClick={() => {
              router.push(`/PostDetails/${data?._id}`);
            }}
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ cursor: "pointer", color: "white" }}
          >
            {data?.body}
          </Typography>
        )}
      </CardContent>
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        data?.image && (
          <CardMedia
            onClick={() => {
              router.push(`/PostDetails/${data?._id}`);
            }}
            sx={{
              width: "100%",
              height: "400px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundSize: "contained",
            }}
            component="img"
            image={data?.image}
            alt={data?.body}
          />
        )
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            fontSize: "14px",
            fontWeight: "200",
            alignItems: "center",
          }}
        >
          <FavoriteIcon
            sx={{ color: "#d32f2f", fontSize: "20px" }}
          ></FavoriteIcon>
          <div className="count">{likes?.data?.length}</div>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            fontSize: "14px",
            fontWeight: "200",
            alignItems: "center",
          }}
        >
          <div className="count">{data?.comments?.length}</div>
          Comments
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "15px",
          maxWidth: "100%",
          gap: "5px",
        }}
      >
        <Box
          onClick={() => {
            handleLike();
          }}
          sx={{
            px: { xs: 1, sm: 5 },
            py: 1,
            borderRadius: 4,
            cursor: "pointer",
            backgroundColor: "#28343E",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color:
              isLike == data?._id || userLikes?.data?.length > 0
                ? "#d32f2f"
                : "white",
          }}
          style={{ cursor: "pointer" }}
        >
          <VolunteerActivismIcon></VolunteerActivismIcon>
        </Box>
        <Box
          sx={{
            px: { xs: 1, sm: 5 },
            py: 1,
            borderRadius: 4,
            cursor: "pointer",
            backgroundColor: "#28343E",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push(`/PostDetails/${data?._id}`);
          }}
        >
          <i className="fa-regular fa-comments"></i> Comments
        </Box>
        <Box
          sx={{
            px: { xs: 1, sm: 5 },
            borderRadius: 4,
            cursor: "pointer",
            backgroundColor: "#28343E",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              sx={{ color: "white" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <i
                style={{ marginRight: "5px" }}
                className="fa-solid fa-share-nodes"
              ></i>
              Share
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Box sx={{ bgcolor: "balck", overflow: "hidden" }}>
                <MenuItem
                  sx={{
                    bgcolor: "#06141D",
                    color: "white",
                    border: "2px solid #06141D",
                    fontSize: "14px",

                    ":hover": {
                      bgcolor: "#06141D",
                      color: "#ddd",
                    },
                  }}
                  onClick={() => {
                    handleClose();
                    handleShare();
                  }}
                >
                  <RateReviewIcon sx={{ mr: 1 }} />
                  Repost with your thoughts
                </MenuItem>
                <MenuItem
                  sx={{
                    bgcolor: "#06141D",
                    color: "white",
                    border: "2px solid #06141D",
                    fontSize: "14px",
                    ":hover": {
                      bgcolor: "#06141D",
                      color: "#ddd",
                    },
                  }}
                  onClick={() => {
                    handleClose();
                    shareWithoutThoughts();
                  }}
                >
                  <ScreenShareIcon sx={{ mr: 1 }} />
                  Repost
                </MenuItem>
              </Box>
            </Menu>
          </div>
        </Box>
      </div>

      <AddComment
        userPostId={data?.user?._id}
        photo={photo}
        postId={data?._id}
        setPostDetails={setPostDetails ?? null}
        setCommentData={setCommentData}
      />
      {commentData && !commentDetails && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "10px",
            }}
          >
            <Typography color="white" variant="body2">
              Most relevant
            </Typography>
            <i
              className="fa-solid fa-arrow-down"
              style={{ fontSize: "12px" }}
            ></i>
          </div>
        </div>
      )}
      {!commentDetails && commentData && (
        <Comment
          userPostId={data?.user?._id}
          comment={commentData}
          loading={loading}
          postId={postId}
        />
      )}
    </Card>
  );
}

export default function Posts({
  data,
  loading,
  isError,
  commentDetails,
  setPostDetails,
  postId,
}: MediaProps) {
  return (
    <div>
      {loading && data == null ? (
        <Media loading={true} />
      ) : (
        <Media
          key={data?._id}
          data={data}
          loading={loading}
          isError={isError}
          commentDetails={commentDetails}
          setPostDetails={setPostDetails}
          postId={postId}
        />
      )}
    </div>
  );
}
