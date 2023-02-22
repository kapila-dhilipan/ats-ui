import React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from '@mui/material/Avatar';
import tricia from "../assets/tricia.jpeg";
import laurie from "../assets/laurie.jpeg";
import Layout from "../Layout";
import styles from "./UC.module.css";
import adddemand from "../assets/demanddashboard.jpeg";
import submission from "../assets/submissiondashboard.jpeg";
import l1selected from "../assets/l1selecteddashboard.jpeg";
import l2selected from "../assets/l2selecteddashboard.jpeg";
import offered from "../assets/offereddashboard.jpeg";
import joined from "../assets/joineddasboard.jpeg";
import calendar from "../assets/calendardashboard.jpeg";
import { DonutChart } from "@uifabric/charting";
import sorticon from "../assets/sorticon.jpeg";

var cardStyle1 = {
  display: "block",
  width: "30vw",
  transitionDuration: "0.3s",
  height: "25vw",
};

function UC() {

  var totaldemand = 100;
  var totalsubmission = 50;
  var points = [
    { legend: "DEMANDS", data: totaldemand, color: "#f27163" },
    { legend: "SUBMISSION", data: totalsubmission, color: "#81cd7b" },
  ];
  const chartTitle = "Demand vs Submission Chart";
  var data = {
    chartTitle: chartTitle,
    chartData: points,
  };

  return (
    <>
      <div className={styles.headerStyle}>
        <div className={styles.title}>
          <h3>Dashboard</h3>
        </div>
        <div className={styles.calendar}>
          <img src={calendar} height="20px" alt="Job7" />
        </div>
      </div>
      <br />
      <br />
      <div className={styles.cardstyle}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
              <CardActionArea>
                <div className={styles.image}>
                  <img src={adddemand} height="50px" alt="Job1" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h10" component="div">
                    DEMANDS
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    75
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
              <CardActionArea>
                <div className={styles.image}>
                  <img src={submission} height="50px" alt="Job2" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h10" component="div">
                    SUBMISSIONS
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    60
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
              <CardActionArea>
                <div className={styles.image}>
                  <img src={l1selected} height="50px" alt="Job3" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h10" component="div">
                    L1 SELECTED
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    23
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
              <CardActionArea>
                <div className={styles.image}>
                  <img src={l2selected} height="50px" alt="Job4" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h10" component="div">
                    L2 SELECTED
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    12
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
              <CardActionArea>
                <div className={styles.image}>
                  <img src={offered} height="50px" alt="Job5" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h10" component="div">
                    OFFERED
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    10
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
              <CardActionArea>
                <div className={styles.image}>
                  <img src={joined} height="50px" alt="Job6" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h10" component="div">
                    JOINED
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    8
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <br />
      <br />
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <div className={styles.cardstyle1}>
            <Card style={cardStyle1} sx={{ maxWidth: 400, Height: 1700 }}>
              <CardContent>
                <h2>Demand vs Submission</h2>
                <br />
                <br />
                <DonutChart data={data}
                            innerRadius={90}
                            height={280}
                            width={250}
                            valueInsideDonut={points[0].data}                />
                <div className={styles.hrdesignbox}>
                  <hr className={styles.hrdesign} />
                </div>
                <div className={styles.labelsdesign}>
                  <div>
                    <h5 style={{ fontWeight: 400 }}>DEMANDS</h5>
                    <h1 style={{ fontWeight: 450 }}>{points[0].data}</h1>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 400 }}>SUBMISSIONS</h5>
                    <h1 style={{ fontWeight: 400 }}>{points[1].data}</h1>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={styles.cardstyle1}>
            <Card style={cardStyle1} sx={{ maxWidth: 400, Height: 1700 }}>
              <CardContent>
                <h2>Open Demands</h2>
              </CardContent>
              <CardActions>
                <table width="100%">
                  <tr className={styles.trWidth}>
                    <th style={{ fontWeight: 400 }}>
                      Demands
                      <img src={sorticon} alt="sort" height={12} />
                      <br/>
                      <br/>
                      <hr />
                    </th>
                    <th width="20" style={{ fontWeight: 400 }}>
                      Count
                      <img src={sorticon} alt="sort" height={12} />
                      <br/>
                      <br/>
                      <hr />
                    </th>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td><h3>dot Developer</h3><hr /></td>
                    <td><h3 className={styles.h3Style}>02</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td><h3>Java Developer</h3><hr /></td>
                    <td><h3 className={styles.h3Style}>02</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td><h3>Tableau Designer</h3><hr /></td>
                    <td><h3 className={styles.h3Style}>02</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td><h3>UX Designer</h3><hr /></td>
                    <td><h3 className={styles.h3Style}>02</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td><h3>Front-end Developer</h3><hr /></td>
                    <td><h3 className={styles.h3Style}>02</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td><h3>Creative Designer</h3><hr /></td>
                    <td><h3 className={styles.h3Style}>02</h3><hr /></td>
                    <hr />
                  </tr>
                </table>
              </CardActions>
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={styles.cardstyle1}>
            <Card style={cardStyle1} sx={{ maxWidth: 400, Height: 1700 }}>
              <CardContent>
                <h2>Overall Submissions</h2>
              </CardContent>
              <CardActions>
                <table width="100%">
                  <tr className={styles.trWidth}>
                    <th style={{ fontWeight: 400 }}>
                      Recruiter Name
                      <img src={sorticon} alt="sort" height={12} />
                      <br/>
                      <br/>
                      <hr />
                    </th>
                    <th width="40" style={{ fontWeight: 400 }}>
                      Count
                      <img src={sorticon} alt="sort" height={12} />
                      <br/>
                      <br/>
                      <hr />
                    </th>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td>
                      <div className={styles.col}>
                    <Avatar alt="Remy Sharp" src={tricia} />
                      <h3 className={styles.nameStyle}>Tricia Wisoky</h3>
                      </div>
                      <hr /></td>
                    <td><h3 className={styles.h3AStyle}>12</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td>
                    <div className={styles.col}>
                    <Avatar alt="Remy Sharp" src={laurie} />
                      <h3 className={styles.nameStyle}>Alvin Farrell</h3>
                      </div>
                      <hr />
                    </td>
                    <td><h3 className={styles.h3AStyle}>15</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td>
                    <div className={styles.col}>
                    <Avatar alt="Remy Sharp" src={tricia} />
                      <h3 className={styles.nameStyle}>Silvia West</h3>
                      </div>
                      <hr />
                    </td>
                    <td><h3 className={styles.h3AStyle}>20</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td>
                    <div className={styles.col}>
                    <Avatar alt="Remy Sharp" src={laurie} />
                      <h3 className={styles.nameStyle}>Lynne West</h3>
                      </div>
                      <hr />
                    </td>
                    <td><h3 className={styles.h3AStyle}>22</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td>
                    <div className={styles.col}>
                    <Avatar alt="Remy Sharp" src={tricia} />
                      <h3 className={styles.nameStyle}>Stacy Berge</h3>
                      </div>
                      <hr />
                    </td>
                    <td><h3 className={styles.h3AStyle}>24</h3><hr /></td>
                  </tr>
                  <tr className={styles.trWidth}>
                    <td>
                    <div className={styles.col}>
                    <Avatar alt="Remy Sharp" src={laurie} />
                      <h3 className={styles.nameStyle}>Laurie Watsica</h3>
                      </div>
                      <hr />
                    </td>
                    <td><h3 className={styles.h3AStyle}>30</h3><hr /></td>
                  </tr>
                </table>
              </CardActions>
            </Card>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default UC;