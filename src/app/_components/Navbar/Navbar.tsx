"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { resetUserToken } from "@/app/lib/redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import useGetNotification from "@/app/_hooks/Notification/getNotification";
import CountTime from "../CountTime/CountTime";

export default function Navbar() {
  const { id } = useSelector((state) => state.UserDataSlice);
  const { data, refetch } = useGetNotification(id);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const router = useRouter();

  const { resetToken } = resetUserToken;
  const dispatch = useDispatch();
  const handleLogOut = () => {
    Cookies.remove("userToken");
    router.push("/Login");
    dispatch(resetToken());
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [anchorElTwo, setAnchorElTwo] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorElTwo);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTwo(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElTwo(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          router.push("./Profile");
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          router.push("./EditProfile");
        }}
      >
        Edit Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogOut();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#06141D",
          boxShadow: 2,
          color: "white",
          height: "60px",
          boxShadow: 0,
        }}
      >
        <Container>
          <Toolbar sx={{ p: 0 }}>
            <Typography
              sx={{ pr: 2, fontSize: "17px" }}
              variant="h6"
              noWrap
              component="div"
            >
              Circle
            </Typography>
            <Typography
              sx={{ px: 2, fontSize: "17px", cursor: "pointer" }}
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                router.push("./Home");
              }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <div>
                  <Badge
                    sx={{ mr: -2 }}
                    badgeContent={data?.data.length}
                    color="error"
                  >
                    <Button
                      sx={{ color: "white" }}
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <NotificationsIcon />
                    </Button>
                    {data?.data.length < 1 && (
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorElTwo}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: "14px", p: 1 }}
                          >
                            You don't have yet
                          </Typography>
                        </MenuItem>
                      </Menu>
                    )}
                    {data?.data.length > 0 && (
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorElTwo}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {data?.data
                          ?.slice(-3)
                          .reverse()
                          .map((noti, index) => (
                            <MenuItem key={index} onClick={handleClose}>
                              <Box sx={{ margin: 1 }}>
                                <Avatar src={noti.userPhoto} />
                              </Box>
                              <Box sx={{ width: "100%", px: 3 }}>
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    p: 1,
                                  }}
                                >
                                  {noti.userName}
                                  <Typography sx={{ fontSize: "14px" }}>
                                    {noti.like && "Liked your post"}
                                    {noti.comment && "Comment on your post"}
                                    {noti.share && "Shared your post"}
                                  </Typography>
                                  <Typography
                                    variant="p"
                                    sx={{ fontSize: "12px", m: 0, p: 0 }}
                                  >
                                    <CountTime
                                      date1={new Date(noti?.createdAt)}
                                      date2={new Date()}
                                    />
                                  </Typography>
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                      </Menu>
                    )}
                  </Badge>
                </div>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
