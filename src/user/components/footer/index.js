import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import logo from "../../public/image/logo/logo5.png";
import FooterIcons from "./icons";
import Copyright from "./copyright";
import "../css/footer.css";

//icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const useStyles = makeStyles({
  root: {
    textTransform: "none",
    fontFamily: "Poppins",
    textAlign: "left",
    "&:hover": {
      color: "#346DC1",
    },
  },
});

const pages = ["Home", "Company", "Category", "Vehicles", "FAQ", "About us"];
const icons = [
  <FacebookIcon />,
  <TwitterIcon />,
  <InstagramIcon />,
  <YouTubeIcon />,
  <LinkedInIcon />,
];

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className="containerStyle">
      <Grid xs={1} md={1}></Grid>
      <Grid xs={10} md={10} display="flex" flexWrap="wrap">
        <Grid xs={12} md={5}>
          <img src={logo} height="auto" width="150px" alt="blank" />
          <Grid container display="flex">
            {icons.map((icon) => (
              <FooterIcons icon={icon} />
            ))}
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
        <Grid xs={12} md={4} style={{ marginBottom: "16px" }}>
          {pages.map((page) => (
            <NavLink
              style={{ textDecoration: "none" }}
              to={
                page === "Home" ? `/user` : `/user/${page.replace(/\s/g, "")}`
              }
            >
              <Button id="btnStyle" className={`${classes.root} `} key={page}>
                {page}
              </Button>
            </NavLink>
          ))}
        </Grid>
        <Grid xs={12} md={3}>
          <p className="queStyle">Have Questions?</p>
          <p className="supportStyle">24/7 Customer Support</p>
          <h4 className="contactStyle">Contact us</h4>
          <p className="numberStyle">+91-8320236259</p>
          <p className="mailStyle">care@affitto.co.in</p>
        </Grid>
      </Grid>
      <Grid xs={1} md={1}></Grid>
    </Grid>
  );
};
export default Footer;
