import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;
  const { photo, name } = useSelector((state) => state.UserDataSlice);

  return (
    <Card
      sx={{
        maxWidth: 345,
        mb: 2,
        borderRadius: 4,
        boxShadow: 4,
        bgcolor: "#1B2730",
      }}
    >
      {loading ? (
        <div>
          <Skeleton
            sx={{ height: 120 }}
            animation="wave"
            variant="rectangular"
          />
          <Skeleton
            sx={{ margin: "auto", marginTop: "-40px" }}
            animation="pulse"
            variant="circular"
            width={75}
            height={75}
          />
          <Skeleton width="30%" sx={{ margin: "auto", mt: 2 }}>
            <Typography>.</Typography>
          </Skeleton>
          <Skeleton width="90%" sx={{ margin: "auto" }}>
            <Typography>.</Typography>
          </Skeleton>
        </div>
      ) : (
        <CardContent
          sx={{
            position: "relative",
            height: "120px",
            backgroundImage: `url(
          "https://linked-posts.routemisr.com/uploads/08dad150-747d-4179-9509-6bd8d70e3014-7b8f29c7-5390-4045-b907-8dbd2df7e6e8-241513285_4254592044636278_6228006272036394703_n.jpeg"
        )`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <CardHeader
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: "50%",
              transform: "translatex(-50%)",
            }}
            avatar={
              loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={75}
                  height={75}
                />
              ) : (
                <Avatar
                  sx={{ width: "75px", height: "75px" }}
                  alt="Ted talk"
                  src={photo}
                />
              )
            }
          />
        </CardContent>
      )}

      <CardContent
        sx={{ pt: 4, textAlign: "center", bgcolor: "#1B2730", color: "white" }}
      >
        {!loading && (
          <>
            <Typography sx={{ py: 2 }} variant="p" component="h4">
              {name}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "300" }}
              variant="p"
              component="p"
            >
              Any one can join with but Social network us if you want Any one
              can join with us if you want
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Profile() {
  return (
    <div>
      {/* <Media loading /> */}
      <Media />
    </div>
  );
}
