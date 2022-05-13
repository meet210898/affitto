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
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUserDetails, logout } from "../../actions/user/userActions";
import jwt_decode from "jwt-decode";
import ReactRoundedImage from "react-rounded-image";
import { makeStyles } from "@mui/styles";
import logo from "../public/image/logo/logo.png";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles({
  root: {
    textTransform: "none",
    fontFamily: "Poppins",
  },
});

const pages = [
  "Home",
  "Company",
  "Vehicles",
  "Booking",
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

  const logoutHandler = () => {
    dispatch(logout());
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
    <AppBar style={{ backgroundColor: "white" }} position="static">
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
              to="/user"
            >
              <img
                src={logo}
                style={{ objectFit: "cover" }}
                height="auto"
                width="150px"
                // maxWidth="100px"
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
              {pages.map((page) =>
                localStorage.getItem("user-token") && page === "Register" ? (
                  ""
                ) : page === "Home" ? (
                  <NavLink
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/user`}
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
                )
              )}
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
              to="/user"
            >
              <img
                src={logo}
                style={{ objectFit: "cover" }}
                height="auto"
                width="150px"
                // maxWidth="100px"
                alt="blank"
              />
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              localStorage.getItem("user-token") && page === "Register" ? (
                ""
              ) : page === "Home" ? (
                <NavLink style={{ textDecoration: "none" }} to={`/user`}>
                  <Button
                    className={classes.root}
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Button>
                </NavLink>
              ) : (
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/user/${page.replace(/\s/g, "")}`}
                >
                  <Button
                    className={classes.root}
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Button>
                </NavLink>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {localStorage.getItem("user-token") ? (
              <Tooltip title="Open settings">
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ReactRoundedImage
                    image={`http://localhost:4000/${user?.personalImage}`}
                    alt="vehicle"
                    style={{ objectFit: "cover" }}
                    imageWidth="50"
                    imageHeight="50"
                    roundedSize="0"
                  />
                </IconButton> */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="personalImage"
                    src={`http://localhost:4000/${user?.personalImage}`}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={`/user/Login`}
              >
                <MenuItem key="Login" onClick={handleCloseNavMenu}>
                  <Button
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Button>
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
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to="/user/profile"
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to="/user"
                onClick={logoutHandler}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
