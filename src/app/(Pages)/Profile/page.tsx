"use client";
import Cover from "@/app/_components/Cover/Cover";
import ProfileNavbar from "@/app/_components/ProfileNavbar/ProfileNavbar";
import React, { useState } from "react";
import AddPost from "@/app/_components/AddPost/AddPost";
import { Container, Typography, Box } from "@mui/material";
import Notification from "@/app/_components/Notification/Notification";
import Posts from "@/app/_components/Posts/Posts";
import AboutMe from "@/app/_components/AboutMe/AboutMe";
import Memories from "@/app/_components/Memories/Memories";
import Advertizement from "@/app/_components/Advertizement/Advertizement";
import Friends from "@/app/_components/Friends/Friends";
import PagesMayLike from "@/app/_components/PagesMayLike/PagesMayLike";
import useUserPosts from "@/app/_hooks/Posts/useUserPosts";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import useGetSharedPosts from "@/app/_hooks/Share/useGetSharedPosts";
import Navbar from "@/app/_components/Navbar/Navbar";

const ProfilePage = () => {
  const token = Cookies.get("userToken");
  const decoded = jwt.decode(token);
  const { data, isLoading, isError } = useUserPosts(decoded.user);
  const reversedArray = data?.data?.posts.slice().reverse();
  const { data: userSharedPosts } = useGetSharedPosts(decoded.user);
  const postsShared = userSharedPosts?.data;
  const allPosts = [...(reversedArray ?? []), ...(postsShared ?? [])];
  const sortedPosts = allPosts?.sort((a, b) => {
    const dateA = new Date(a?.createdAt).getTime();
    const dateB = new Date(b?.createdAt).getTime();

    return dateA - dateB;
  });
  const allUserPosts = sortedPosts.map((post) => {
    return post?.data ? post.data : post;
  });
  const allUserPostsReversed = allUserPosts.slice().reverse();

  console.log(userSharedPosts);

  return (
    <>
      <Navbar />
      <section>
        <Cover />
        <ProfileNavbar />
        <Container>
          <div style={{ paddingTop: "30px", display: "flex", gap: "15px" }}>
            <Box
              style={{ width: "25%" }}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <div style={{ marginTop: "88px" }}>
                <AboutMe />
              </div>
              <Memories />
              <PagesMayLike />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <AddPost />
              {isLoading && (
                <Posts data={undefined} loading={true} isError={false}></Posts>
              )}
              {allUserPostsReversed.map((post, index) => (
                <Posts
                  key={index}
                  data={post}
                  loading={isLoading}
                  isError={isError}
                  commentDetails={false}
                ></Posts>
              ))}
              {reversedArray?.length < 1 && (
                <Typography
                  variant="p"
                  component={"p"}
                  sx={{
                    bgcolor: "#1B2730",
                    borderRadius: 4,
                    color: "white",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  You haven't posted anything yet. Start sharing your content!
                </Typography>
              )}
            </Box>
            <Box
              style={{ width: "25%" }}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <Notification />
              <div style={{ marginTop: "15px" }}>
                <Advertizement />
              </div>
              <Friends />
            </Box>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
