import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUserDetails } from "../../actions/user/User";
import jwt_decode from "jwt-decode";
import { makeStyles } from "@mui/styles";
import logo from "../public/image/logo/logo.png";
import Avatar from "@mui/material/Avatar";
import ProfileItem from "./profileItem";
import "../components/css/topbar.css";

const { REACT_APP_HOST } = process.env;
const useStyles = makeStyles({
  root: {
    textTransform: "none",
    fontFamily: "Poppins",
  },
});

const pages = [
  "Home",
  "Company",
  "Category",
  "Vehicles",
  "Register",
  "FAQ",
  "About us",
];

const TopBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    if (localStorage.getItem("user-token")) {
      const userId = localStorage.getItem("user-token");
      const decodeUserId = jwt_decode(userId);

      dispatch(listUserDetails(decodeUserId._id));
    }
  }, [dispatch]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  return (
    <AppBar style={{ backgroundColor: "white" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to="/user/Home"
            >
              <img
                src={logo}
                style={{ objectFit: "cover" }}
                height="auto"
                width="150px"
                alt="blank"
              />
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{ color: "black" }}
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
              {pages.map((page, index) => (
                <div key={`page-${index}`}>
                  {(localStorage.getItem("user-token") &&
                    page === "Register") ||
                  (!localStorage.getItem("user-token") &&
                    page === "My Booking") ? (
                    ""
                  ) : (
                    <NavLink
                      style={{ color: "black", textDecoration: "none" }}
                      to={`/user/${page.replace(/\s/g, "")}`}
                    >
                      <MenuItem
                        className={classes.root}
                        style={{ color: "black" }}
                        key={page}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </NavLink>
                  )}
                </div>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            style={{ color: "black" }}
          >
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to="/user/Home"
            >
              <img
                src={logo}
                style={{ objectFit: "cover" }}
                height="auto"
                width="150px"
                alt="blank"
              />
            </NavLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, index) =>
              (localStorage.getItem("user-token") && page === "Register") ||
              (!localStorage.getItem("user-token") && page === "My Booking") ? (
                ""
              ) : (
                <NavLink
                  key={`l-${index}`}
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "none", color: "#346DC1" }
                      : { textDecoration: "none", color: "black" }
                  }
                  to={`/user/${page.replace(/\s/g, "")}`}
                >
                  <b style={{ margin: "10px", fontSize: "18px" }}>{page}</b>
                </NavLink>
              )
            )}
          </Box>
          {console.log(localStorage.getItem("user-token"))}

          <Box sx={{ flexGrow: 0 }}>
            {localStorage.getItem("user-token") ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="personalImage"
                    src={`${REACT_APP_HOST}/${user?.personalImage}`}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={`/user/Login`}
              >
                <MenuItem key="Login" onClick={handleCloseNavMenu}>
                  <b style={{ margin: "10px", fontSize: "18px" }}>Login</b>
                </MenuItem>
              </NavLink>
            )}

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
              <ProfileItem
                setAnchorElUser={setAnchorElUser}
                site="mybooking"
                name="My Bookings"
              />
              <ProfileItem
                setAnchorElUser={setAnchorElUser}
                site="profile"
                name="Profile"
              />
              <ProfileItem
                setAnchorElUser={setAnchorElUser}
                site=""
                name="Logout"
              />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
