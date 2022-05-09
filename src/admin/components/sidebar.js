import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import ListItem from "./list";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/loginActions";
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

const drawerWidth = 265;

function Sidebar(props) {
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
      backgroundColor: "#21325E !important",
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
      <Toolbar />
      <Divider style={{ backgroundColor: "white", width: "100%" }} />
      <List>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/viewUser"
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
        </NavLink>
        {pages.map((item) => (
          <>
            <ListItemButton onClick={() => handleClick(item.page)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.page} />
              {open[item.page] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[item.page]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <NavLink
                    style={{ color: "white", textDecoration: "none" }}
                    to={`/AdminDashboard/add${item.page}`}
                  >
                    <ListItem name={`Add ${item.page}`} />
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <NavLink
                    style={{ color: "white", textDecoration: "none" }}
                    to={`/AdminDashboard/view${item.page}`}
                  >
                    <ListItem name={`View ${item.page}`} />
                  </NavLink>
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink
            style={{ color: "white", textDecoration: "none" }}
            to="/"
            onClick={logoutHandler}
          >
            Logout
          </NavLink>
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Sidebar;
