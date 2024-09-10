import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import WorkIcon from "@mui/icons-material/Work";
import ChaletIcon from "@mui/icons-material/Chalet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

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
        Advertizement
      </Typography>
      <div
        style={{
          height: "1px",
          width: "40px",
          backgroundColor: "#DC4734",
          marginBottom: "10px",
        }}
      ></div>

      <div>
        <img
          src={
            "https://linked-posts.routemisr.com/uploads/a428f47e-8a2a-433b-80c7-a89a1f655608-1662457875088.jpg"
          }
          alt={"Advertizement"}
          width={"100%"}
        ></img>
      </div>
    </Card>
  );
}

export default function Advertizement() {
  return (
    <div>
      {/* <Media loading /> */}
      <Media />
    </div>
  );
}
