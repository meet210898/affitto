import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listVehicle, getCompany } from "../../actions/user/userActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import carSeat from "../public/image/svgs/car-seat.webp";
import carGear from "../public/image/svgs/car-gear.webp";
import carFuel from "../public/image/svgs/car-fuel.webp";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  listFaqByFaqCategoryDetails,
  listFaq,
  listFaqCategory,
} from "../../actions/user/userActions";

export default function VehicleList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(listFaq(0));
    dispatch(listFaqCategory());
  }, [dispatch]);

  const faqList = useSelector((state) => state.faqList);
  const { faqInfo } = faqList;

  const faqCategoryList = useSelector((state) => state.faqCategoryList);
  const { faqCategoryInfo } = faqCategoryList;

  return (
    <>
      <Topbar />
      <Grid container marginTop="20px">
        <Grid md={2} xs={1}></Grid>

        <Grid md={8} xs={10}>
          {faqCategoryInfo?.map((item) => (
            <>
              <h3>{item.faqCategory}</h3>
              {faqInfo
                ?.filter((data) => item._id === data.faqCategoryId)
                .map((data) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={data._id}
                      style={{
                        padding: "10px",
                        backgroundColor: "#f1f1f1",
                      }}
                    >
                      <Typography
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        {data.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        style={{ fontSize: "13px", color: "#7f868e" }}
                      >
                        {data.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </>
          ))}
        </Grid>
        <Grid md={2} xs={1}></Grid>
      </Grid>
    </>
  );
}
