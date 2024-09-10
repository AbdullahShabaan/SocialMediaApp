import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MemoriesSlider from "../MemoriesSlider/MemoriesSlider";
import { useSelector } from "react-redux";
import useUserPosts from "@/app/_hooks/Posts/useUserPosts";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  boxShadow: 24,
};

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageIndex, setImageIndex] = React.useState(null);
  const { posts } = useSelector((state) => state.PostsSlice);
  const token = Cookies.get("userToken");
  const decoded = jwt.decode(token);
  const { data } = useUserPosts(decoded.user);
  const images = data?.data?.posts.map((post) => post.image ?? "");

  return (
    <Card
      sx={{
        maxWidth: 345,
        mb: 2,
        borderRadius: 4,
        boxShadow: 4,
        p: 3,
        bgcolor: "#1B2730",
        color: "white",
      }}
    >
      <Typography component={"h3"} variant="h6" sx={{ py: 1 }}>
        Sweets Memories
      </Typography>
      <div
        style={{
          height: "1px",
          width: "40px",
          backgroundColor: "#DC4734",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {images?.map((image, index: number) => (
          <div
            key={index}
            style={{
              borderRadius: "6px",
              overflow: "hidden",
              width: "65px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              handleOpen();
              setImageIndex(index);
            }}
          >
            {image && (
              <img
                style={{ cursor: "pointer" }}
                width={"100%"}
                height={"100%"}
                src={image}
                alt="memories"
              ></img>
            )}
          </div>
        ))}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MemoriesSlider imagesSlider={images} imageIndex={imageIndex} />
          </Box>
        </Modal>
      </div>
    </Card>
  );
}

export default function Memories() {
  return (
    <div>
      {/* <Media loading /> */}
      <Media />
    </div>
  );
}
