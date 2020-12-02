import styles from "../styles/pages/Home.module.css";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import DataTable from "../components/Analytics/DataTable";
import LocationsChart from "../components/Analytics/LocationsChart";
import AgeChart from "../components/Analytics/AgeChart";
import RDRatioChart from "../components/Analytics/RDRatioChart";
import { CircularProgress } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import { locationOptions, countryOptions } from '../utils/dataUtils'

const sex = ["male", "female", "Other"];
const recovered = ["Yes", "No"];
const death = ["Yes", "No"];

export default function Home() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState({
    country: "",
    location: "",
    age: "",
    gender: "",
    recovered: "",
    death: "",
  });
  const [inputValue, setInputValue] = useState({
    country: "",
    location: "",
    age: "",
    gender: "",
    recovered: "",
    death: "",
  });
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    if (data) {
      setData(null);
    }
    axios
      .get(`/analytics/search/`, {
        params: {
          data: value,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then(({ data }) => {
        setData(data.filteredData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleValueChange = (key, v, reason) => {
    if (reason == "clear") {
      setValue({
        ...value,
        [key]: null,
      });
    } else {
      setValue({
        ...value,
        [key]: v,
      });
    }
  };

  const handleInputChange = (key, v) => {
    let newValue = inputValue;
    newValue[key] = v;
    setInputValue(newValue);
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.title}>BBCDS COVID-19 Analytics</div>
          <div className={styles.description}>
            Helping you understand the current state of COVID-19
          </div>
          {/* <div className={styles.searchTitle}>
            Search for cases of Covid-19
          </div> */}
          <Container maxWidth="lg">
            <Grid
              container
              className={styles.gridContainer}
              justify="center"
              spacing={2}
            >
              {/* Country Autocompete */}
              <Grid item xs={6}>
                <Autocomplete
                  value={value.country}
                  onChange={(event, newValue) => {
                    handleValueChange("country", newValue);
                  }}
                  // inputValue={inputValue.country}
                  // onInputChange={(event, newInputValue) => {
                  //   handleInputChange("country", newInputValue);
                  // }}
                  options={countryOptions}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      helperText="Country of case"
                    />
                  )}
                  blurOnSelect
                />
              </Grid>

              {/* Location selection */}
              <Grid item xs={6}>
                <Autocomplete
                  value={value.location}
                  onChange={(e, newValue) => {
                    console.log("location", newValue)
                    return handleValueChange("location", newValue)
                  }
                  }
                  options={locationOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" variant="outlined" helperText="Location of case" />
                  )}
                  blurOnSelect
                />
              </Grid>

              {/* pick start date */}
              <Grid item xs={6}>
                <div className={styles.date_picker}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      margin="normal"
                      id="date-picker-dialog"
                      label="Enter start date"
                      format="MM/dd/yyyy"
                      value={startDate}
                      onChange={setStartDate}
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      helperText="Filter search by cases logged after this date"
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Grid>

              {/* pick end date */}
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    margin="normal"
                    id="date-picker-dialog"
                    label="Enter end date"
                    format="MM/dd/yyyy"
                    value={endDate}
                    onChange={setEndDate}
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    helperText="Filter search by cases logged before this date"
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              {/* Age selection */}
              <Grid item xs={3}>
                <TextField
                  onChange={(e) => handleValueChange("age", e.target.value)}
                  defaultValue={value.age}
                  label="Age"
                  variant="outlined"
                  helperText="Age of person"
                />
              </Grid>

              {/* Gender autocomplete */}
              <Grid item xs={3}>
                <Autocomplete
                  value={value.gender}
                  onChange={(event, newValue) => {
                    handleValueChange("gender", newValue);
                  }}
                  // inputValue={inputValue.gender}
                  // onInputChange={(event, newInputValue) => {
                  //   handleInputChange("gender", newInputValue);
                  // }}
                  // id="controllable-states-demo"
                  options={sex}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Gender" variant="outlined" />
                  )}
                  blurOnSelect
                />
              </Grid>

              {/* Recovered input*/}
              <Grid item xs={3}>
                <Autocomplete
                  value={value.recovered}
                  onChange={(event, newValue) => {
                    handleValueChange("recovered", newValue);
                  }}
                  // inputValue={inputValue.country}
                  // onInputChange={(event, newInputValue) => {
                  //   handleInputChange("country", newInputValue);
                  // }}
                  options={recovered}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Recovered"
                      variant="outlined"
                      helperText="Check if person recovered from Covid"
                    />
                  )}
                  blurOnSelect
                />
              </Grid>

              {/* death Autocompete */}
              <Grid item xs={3}>
                <Autocomplete
                  value={value.death}
                  onChange={(event, newValue) => {
                    handleValueChange("death", newValue);
                  }}
                  // inputValue={inputValue.country}
                  // onInputChange={(event, newInputValue) => {
                  //   handleInputChange("country", newInputValue);
                  // }}
                  options={death}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Death"
                      variant="outlined"
                      helperText="Check if person passed away from Covid"
                    />
                  )}
                  blurOnSelect
                />
              </Grid>

              <Grid className={styles.submitContainer} item xs={12}>
                <Button
                  className={styles.submitButton}
                  variant="contained"
                  onClick={handleSubmit}
                  color="primary"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Container>

          {loading && (
            <div className={styles.loading}>
              <CircularProgress style={{ color: "black" }} size={16} />
            </div>
          )}

          {data && (
            <div className={styles.analytics}>
              <div className={styles.table}>
                <DataTable data={data} key={data} />
              </div>
              <div className={styles.charts}>
                <LocationsChart data={data} />
                <AgeChart data={data} />
              </div>
              <div className={styles.charts}>
                <RDRatioChart data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
