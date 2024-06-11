import { Box } from "@mui/material";
import React from "react";
import HeaderTop from "./HeaderTop";

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ width: "100%", bgcolor: "#F0F0F0" }}>
          <HeaderTop />
          <Box sx={{ p: 3 }}>
            <Component {...props} />
          </Box>
        </Box>
      </div>
    );
  };

export default Layout;
