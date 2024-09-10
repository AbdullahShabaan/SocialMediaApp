import React from "react";
import { useSelector } from "react-redux";

const Cover = () => {
  const { photo } = useSelector((state) => state.UserDataSlice);

  return (
    <div
      style={{
        backgroundImage: `url(
          "https://linked-posts.routemisr.com/uploads/7b8f29c7-5390-4045-b907-8dbd2df7e6e8-241513285_4254592044636278_6228006272036394703_n.jpeg"
        )`,
        height: "300px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        className="profile-photo"
        style={{
          position: "absolute",
          width: "270px",
          height: "270px",
          backgroundColor: "black",
          border: "8px solid white",
          left: "100px",
          bottom: "-165px",
          backgroundImage: `url(${photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default Cover;
