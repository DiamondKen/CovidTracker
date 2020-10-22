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
import DataTable from '../components/Analytics/DataTable';
import LocationsChart from '../components/Analytics/LocationsChart';
import { CircularProgress } from '@material-ui/core'

const countries = [
  "Afghanistan",
  "Algeria",
  "Australia",
  "Austria",
  "Bahrain",
  "Belgium",
  "Cambodia",
  "Canada",
  "China",
  "Croatia",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Hong Kong",
  "India",
  "Iran",
  "Israel",
  "Italy",
  "Japan",
  "Kuwait",
  "Lebanon",
  "Malaysia",
  "Nepal",
  "Phillipines",
  "Russia",
  "Singapore",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "UAE",
  "UK",
  "USA",
  "Vietnam",
];
const sex = ["male", "female", "Other"];

export default function Home() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState({
    country: countries[0],
    age: 0,
    gender: sex[0],
  });
  const [inputValue, setInputValue] = useState({
    country: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    if (data) {
      setData(null)
    }
    axios
      .get(`/analytics/search/`, {
        params: {
          data: value,
        },
      })
      .then(({ data }) => {
        setData(data.filteredData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })
  };

  const handleValueChange = (key, v) => {
    let newValue = value;
    newValue[key] = v;
    setValue(newValue);
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
          <div className={styles.title}>BBCDS Covid-19 Analytics</div>
          <div className={styles.description}>
            Helping you understand the current state of Covid-19
          </div>
          <Container maxWidth="lg">
            <Grid
              container
              className={styles.gridContainer}
              justify="center"
              spacing={5}
            >
              {/* Country Autocompete */}
              <Grid item xs={5}>
                <Autocomplete
                  value={value.country}
                  onChange={(event, newValue) => {
                    handleValueChange("country", newValue);
                  }}
                  // inputValue={inputValue.country}
                  // onInputChange={(event, newInputValue) => {
                  //   handleInputChange("country", newInputValue);
                  // }}
                  options={countries}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" variant="outlined" />
                  )}
                  blurOnSelect
                />
              </Grid>

              {/* Age selection */}
              <Grid item xs={2}>
                <TextField onChange={e => handleValueChange("age", e.target.value)} label="Age" variant="outlined" />
              </Grid>

              {/* Gender autocomplete */}
              <Grid item xs={5}>
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

              <Grid className={styles.submit} item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Container>

          {loading &&
            <div className={styles.loading}>
              <CircularProgress style={{ color: 'black' }} size={16} />
            </div>
          }

          {data &&
            <div className={styles.analytics}>
              <div className={styles.table}>
                <DataTable data={data} key={data} />
              </div>
              <div className={styles.charts}>
                <LocationsChart data={data} />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
