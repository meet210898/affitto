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

const drawerWidth = 240;

function Sidebar(props) {
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const useStyles = makeStyles({
    paper: {
      backgroundColor: "#21325E !important",
      color: "white !important",
    },
  });

  const classes = useStyles();

  const drawer = (
    <div>
      <Toolbar />
      <Divider style={{ backgroundColor: "white" }} />
      <List>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/AddCity"
        >
          <ListItem name="City" icon="fa fa-building" />
        </NavLink>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/viewCity"
        >
          <ListItem name="View City" icon="fa fa-building" />
        </NavLink>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/State"
        >
          <ListItem name="State" icon="fa fa-map-pin" />
        </NavLink>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/viewState"
        >
          <ListItem name="View State" icon="fa fa-building" />
        </NavLink>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/addVehicletype"
        >
          <ListItem name="Add Vehicle Type" icon="fa fa-building" />
        </NavLink>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/AdminDashboard/ViewVehicleType"
        >
          <ListItem name="View Vehicle Type" icon="fa fa-building" />
        </NavLink>
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
