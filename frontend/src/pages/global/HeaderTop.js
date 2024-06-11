import React from "react";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserRoleLabel } from "../employee/UserInfoDashboard";
import WorkIcon from "@mui/icons-material/Work";
import { userLogoutAction } from "../../redux/actions/userAction";

function HeaderTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userProfile);

  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const getUserRoleMenuItems = (role) => {
    const menuItems = {
      0: [
        { label: "Dashboard", to: "/employee/dashboard" },
        { label: "All Jobs", to: "/jobs" },
        { label: "Applied Jobs", to: "/employee/jobs" },
        { label: "Personal Info", to: "/employee/info" },
      ],
      1: [
        { label: "Manage Jobs", to: "/employer/jobs" },
        { label: "All Jobs", to: "/jobs" },
        { label: "Personal Info", to: "/employer/info" },
      ],
      2: [
        { label: "Users Administration", to: "/admin/users" },
        { label: "Jobs Administration", to: "/admin/jobs" },
      ],
    };

    return (
      menuItems[role]?.map((item, index) => (
        <MenuItem key={index}>
          <Link className="menu-items" to={item.to}>
            {item.label}
          </Link>
        </MenuItem>
      )) || []
    );
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOB PORTAL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {getUserRoleMenuItems(user?.role)}
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </Box>

          <WorkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOB PORTAL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {getUserRoleMenuItems(user?.role)}
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {getUserRoleLabel(user?.role)}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {getUserRoleMenuItems(user?.role)}
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderTop;
