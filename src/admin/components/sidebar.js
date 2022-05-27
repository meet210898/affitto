import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import ListItem from "./list";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/admin/Login";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import HouseIcon from "@mui/icons-material/House";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CategoryIcon from "@mui/icons-material/Category";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import logo from "../public/logo/logo4.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 265;

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pages = [
    { page: "State", icon: <AddLocationAltIcon style={{ color: "white" }} /> },
    { page: "City", icon: <LocationCityIcon style={{ color: "white" }} /> },
    { page: "VehicleType", icon: <CarRentalIcon style={{ color: "white" }} /> },
    { page: "Company", icon: <HouseIcon style={{ color: "white" }} /> },
    { page: "Vehicle", icon: <DirectionsCarIcon style={{ color: "white" }} /> },
    { page: "Faq", icon: <QuestionAnswerIcon style={{ color: "white" }} /> },
    { page: "FaqCategory", icon: <CategoryIcon style={{ color: "white" }} /> },
  ];

  const useStyles = makeStyles({
    paper: {
      backgroundColor: "black !important",
      color: "white !important",
    },
  });
  const [open, setOpen] = React.useState({
    State: false,
    City: false,
    VehicleType: false,
    Company: false,
    Vehicle: false,
  });

  const handleClick = (page) => {
    setOpen({ ...open, [page]: !open[page] });
  };

  const classes = useStyles();

  const drawer = (
    <div>
      <center>
        <img
          src={logo}
          style={{
            objectFit: "cover",
            height: "55px",
            width: "180px",
          }}
          height="auto"
          width="150px"
          alt="blank"
        />
      </center>
      <Divider style={{ backgroundColor: "white", width: "100%" }} />
      <List>
        <ListItem
          headerIcon={<DashboardIcon style={{ color: "white" }} />}
          name="Dashboard"
          site="Dashboard"
        />
        <ListItem
          headerIcon={<PersonIcon style={{ color: "white" }} />}
          name="User"
          site="viewUser"
        />
        <ListItem
          headerIcon={<BookOnlineIcon style={{ color: "white" }} />}
          name="Booking"
          site="viewBooking"
        />

        {pages.map((item) => (
          <>
            <ListItemButton
              className="navListItem"
              onClick={() => handleClick(item.page)}
            >
              <ListItemIcon className="icon">{item.icon}</ListItemIcon>
              <ListItemText primary={item.page} />
              {open[item.page] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[item.page]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItem
                    headerIcon={<ArrowForwardIcon style={{ color: "white" }} />}
                    site={`add${item.page}`}
                    name={`Add ${item.page}`}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItem
                    headerIcon={<ArrowForwardIcon style={{ color: "white" }} />}
                    site={`view${item.page}`}
                    name={`View ${item.page}`}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ))}
      </List>
      <Divider style={{ backgroundColor: "white" }} />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logoutHandler = () => {
    dispatch(logout());
  };
  console.log({ props });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "black",
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid xs={2}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid xs={8} md={8} display="flex"></Grid>
            <Grid
              style={{ display: "flex", justifyContent: "right" }}
              xs={2}
              md={2}
            >
              <NavLink
                style={{
                  color: "white",
                  textDecoration: "none",
                  justifyContent: "right",
                  display: "flex",
                }}
                to="/"
                onClick={logoutHandler}
              >
                <Button sx={{ color: "white", fontSize: "1rem" }}>
                  <b>Logout</b>
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          classes={{ paper: classes.paper }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          classes={{ paper: classes.paper }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          justifyContent: "center",
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
