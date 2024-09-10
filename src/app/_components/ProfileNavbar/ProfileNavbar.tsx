"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProfileNavbar() {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#1B2730",
          boxShadow: 2,
          color: "white",
          height: { xl: "60px", sx: "100px" },
          boxShadow: 0,
        }}
      >
        <Container>
          <Toolbar
            sx={{
              p: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "end",
              gap: { xs: "0px", xl: 10 },
              display: { xs: "none", lg: "flex" },
            }}
          >
            <Box
              sx={{
                p: 0,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ px: 4, fontSize: "17px", cursor: "pointer" }}
                variant="h6"
                noWrap
                component="div"
              >
                Timeline
              </Typography>
              <Typography
                sx={{ px: 4, fontSize: "17px", cursor: "pointer" }}
                variant="h6"
                noWrap
                component="div"
              >
                About
              </Typography>
              <Typography
                sx={{ px: 4, fontSize: "17px" }}
                variant="h6"
                noWrap
                component="div"
              >
                Photos
              </Typography>
              <Typography
                sx={{ px: 4, fontSize: "17px" }}
                variant="h6"
                noWrap
                component="div"
              >
                Friends
              </Typography>
              <Typography
                sx={{ px: 4, fontSize: "17px", fontWeight: "500" }}
                variant="h6"
                noWrap
                component="div"
              >
                More
              </Typography>
            </Box>
            <Button
              onClick={() => {
                router.push("/EditProfile");
              }}
              sx={{
                bgcolor: "#DC4734",
                ":hover": { bgcolor: "#DC4100" },
                textTransform: "capitalize",
                borderRadius: 5,
                px: 3,
              }}
              variant="contained"
            >
              edit Profile
            </Button>
          </Toolbar>
          <Box
            sx={{
              pt: 9,
              pb: 2,
              flexWrap: "wrap",
              justifyContent: "center",
              display: { xs: "flex", lg: "none" },
            }}
          >
            <Typography
              sx={{ px: 4, fontSize: "17px", cursor: "pointer" }}
              variant="h6"
              noWrap
              component="div"
            >
              Timeline
            </Typography>
            <Typography
              sx={{ px: 4, fontSize: "17px", cursor: "pointer" }}
              variant="h6"
              noWrap
              component="div"
            >
              About
            </Typography>
            <Typography
              sx={{ px: 4, fontSize: "17px" }}
              variant="h6"
              noWrap
              component="div"
            >
              Photos
            </Typography>
            <Typography
              sx={{ px: 4, fontSize: "17px" }}
              variant="h6"
              noWrap
              component="div"
            >
              Friends
            </Typography>
            <Typography
              sx={{ px: 4, fontSize: "17px", fontWeight: "500" }}
              variant="h6"
              noWrap
              component="div"
            >
              More
            </Typography>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}
