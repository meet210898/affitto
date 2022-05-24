import * as React from "react";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Footer from "../components/footer";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { listFaq, listFaqCategory } from "../../actions/user/userActions";

export default function VehicleList() {
  const dispatch = useDispatch();

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
          <Fade top>
            <>
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
            </>
          </Fade>
        </Grid>
        <Grid md={2} xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
