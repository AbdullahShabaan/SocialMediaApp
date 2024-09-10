// Footer.js
import React from "react";
import { Container, Typography, Box, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        py: 4,
        width: "100%",
        position: "relative",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Section 1: Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Circle
            </Typography>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </Typography>
          </Grid>

          {/* Section 2: Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
                Terms of Service
              </Link>
              <Link href="#" color="inherit" sx={{ display: "block" }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Section 3: Social Media Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
                Facebook
              </Link>
              <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
                Twitter
              </Link>
              <Link href="#" color="inherit" sx={{ display: "block" }}>
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
