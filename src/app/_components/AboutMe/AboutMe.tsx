import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import WorkIcon from "@mui/icons-material/Work";
import ChaletIcon from "@mui/icons-material/Chalet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;
  const { name } = useSelector((state) => state.UserDataSlice);

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
        {name}
      </Typography>
      <div
        style={{ height: "1px", width: "40px", backgroundColor: "#DC4734" }}
      ></div>
      <p style={{ padding: "20px 0px", fontSize: "14px" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
        provident.
      </p>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        <li>
          <WorkIcon
            sx={{ color: "#DC4734", verticalAlign: "middle", mr: 2 }}
          ></WorkIcon>
          Web Developer
        </li>
        <li>
          <ChaletIcon
            sx={{ color: "#DC4734", verticalAlign: "middle", mr: 2 }}
          ></ChaletIcon>
          Melbourne, Australia
        </li>
        <li>
          <LocationOnIcon
            sx={{ color: "#DC4734", verticalAlign: "middle", mr: 2 }}
          ></LocationOnIcon>
          Pulshar, Melbourne
        </li>
        <li>
          <FavoriteBorderIcon
            sx={{ color: "#DC4734", verticalAlign: "middle", mr: 2 }}
          ></FavoriteBorderIcon>
          Travel, Swimming
        </li>
      </ul>
    </Card>
  );
}

export default function AboutMe() {
  return (
    <div>
      {/* <Media loading /> */}
      <Media />
    </div>
  );
}
