import styles from "../../styles/pages/Analytics.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Button from "@material-ui/core/Button";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LocationsChart from "../../components/Analytics/LocationsChart";
import AgeChart from "../../components/Analytics/AgeChart";
import RDRatioChart from "../../components/Analytics/RDRatioChart";
import { Context } from "../../utils/dataContext";

export default function Analytics() {
  const dataContext = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [columns, setColumns] = useState(null)

  useEffect(() => {
    console.time('Retrieving Dataset Runtime');
    if (dataContext.analytics != null) {
      setData(dataContext.data)
      setAnalytics(dataContext.analytics)
      setColumns(dataContext.columns)
      setLoading(false)
      console.timeEnd('Retrieving Dataset Runtime')
    }
  }, [dataContext.data, dataContext.analytics])

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.title}>Analytics</div>
          <div className={styles.description}>Overall analysis of COVID-19 dataset</div>
        </div>
        {!loading ? (
          <Container maxWidth="lg">
            <Grid
              container
              className={styles.gridContainer}
              justify="center"
              spacing={5}
            >
              <Grid item xs={6}>
                <Paper
                  style={{
                    padding: "2.5rem 2rem 0rem 2rem",
                    minHeight: "10rem",
                  }}
                >
                  <Grid container direction="row" justify="center">
                    <Grid className={styles.gridRow} item xs={4}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Cases
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.cases}
                      </div>
                    </Grid>
                    <Grid className={styles.gridRow} item xs={4}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Deaths
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.deaths}
                      </div>
                    </Grid>
                    <Grid className={styles.gridRow} item xs={4}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Recoveries
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.recoveries}
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <RDRatioChart data={data} />
              </Grid>
              <Grid item xs={6}>
                <LocationsChart data={data} />
              </Grid>
              <Grid item xs={6}>
                <Paper
                  style={{
                    padding: "2.5rem 2rem 0rem 2rem",
                    minHeight: "10rem",
                  }}
                >
                  <Grid container direction="row" justify="center">
                    <Grid className={styles.header} item xs={6}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Most affected Country
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.mostCountry}
                      </div>
                    </Grid>
                    <Grid className={styles.header} item xs={6}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Most affected Location
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.mostLocation}
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  style={{
                    padding: "2.5rem 2rem 0rem 2rem",
                    minHeight: "10rem",
                  }}
                >
                  <Grid container direction="row" justify="center">
                    <Grid className={styles.header} item xs={6}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Most affected Age Group
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.mostAgeGroup}
                      </div>
                    </Grid>
                    <Grid className={styles.header} item xs={6}>
                      <div
                        className={styles.description}
                        style={{ margin: "0" }}
                      >
                        Most affected Gender
                      </div>
                      <div
                        className={styles.title}
                        style={{ fontSize: "2rem", margin: "0" }}
                      >
                        {analytics.mostGender}
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <AgeChart data={data} />
              </Grid>
            </Grid>
          </Container>
        ) : (
            <div className={styles.loading}>
              <CircularProgress style={{ color: "black" }} size={16} />
            </div>
          )}
      </div>
    </>
  );
}
