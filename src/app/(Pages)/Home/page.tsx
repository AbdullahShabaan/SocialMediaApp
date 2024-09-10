"use client";
import { getPosts } from "@/app/lib/redux/PostsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../_components/Posts/Posts";
import Profile from "@/app/_components/Profile/Profile";
import Notification from "@/app/_components/Notification/Notification";
import Box from "@mui/material/Box";
import AddPost from "@/app/_components/AddPost/AddPost";
import { Container } from "@mui/material";
import { fetchUserData } from "@/app/lib/redux/UserDataSlice";
import Advertizement from "@/app/_components/Advertizement/Advertizement";
import Friends from "@/app/_components/Friends/Friends";
import AboutMe from "@/app/_components/AboutMe/AboutMe";
import PagesMayLike from "@/app/_components/PagesMayLike/PagesMayLike";
import Memories from "@/app/_components/Memories/Memories";
import axios from "axios";
import Navbar from "@/app/_components/Navbar/Navbar";
// https://dribbble.com/shots/17000563-Twitter-Homepage-Concept/attachments/12080191?mode=media
// https://preview.themeforest.net/item/adda-social-network-html-template/full_screen_preview/25498684?_ga=2.89610653.78181690.1724661659-930948791.1724661659
const Home = () => {
  const dispatch = useDispatch<any>();
  const {
    posts: reversePosts,
    isLoading,
    isError,
  } = useSelector((state: any) => state.PostsSlice);
  const arrayCopy = [...reversePosts];
  const posts = arrayCopy?.reverse();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(fetchUserData());
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <div style={{ paddingTop: "80px", display: "flex", gap: "15px" }}>
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
            <Profile />
            <AboutMe />
            <PagesMayLike />
            <div style={{ marginTop: "15px" }}>
              <Memories />
            </div>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <AddPost />
            {isLoading && (
              <Posts
                data={undefined}
                loading={isLoading}
                isError={isError}
              ></Posts>
            )}
            {posts.map((post) => (
              <Posts
                key={post._id}
                data={post}
                loading={isLoading}
                isError={isError}
              ></Posts>
            ))}
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
    </>
  );
};

export default Home;
