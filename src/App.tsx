import "./App.css";
import { Grid, TextField, InputAdornment, Switch } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [advanced, setAdvanced] = useState(true);
  const [starting, setStarting] = useState(50000);
  const [monthly, setMonthly] = useState(1000);
  const [interest, setInterest] = useState(5);
  const [years, setYears] = useState(10);
  const [accumulated, setAccumulated] = useState(0);
  const [tax, setTax] = useState(35.2);
  const [shielded, setShielded] = useState(0.8);

  const updateStarting = (event: ChangeEvent<HTMLInputElement>) => {
    setStarting(Number(event.target.value));
  };

  const updateMonthly = (event: ChangeEvent<HTMLInputElement>) => {
    setMonthly(Number(event.target.value));
  };

  const updateInterest = (event: ChangeEvent<HTMLInputElement>) => {
    setInterest(Number(event.target.value));
  };

  const updateYears = (event: ChangeEvent<HTMLInputElement>) => {
    setYears(Number(event.target.value));
  };

  const updateTax = (event: ChangeEvent<HTMLInputElement>) => {
    setTax(Number(event.target.value));
  };

  const updateShielded = (event: ChangeEvent<HTMLInputElement>) => {
    setShielded(Number(event.target.value));
  };

  const updateAdvanced = (event: ChangeEvent<HTMLInputElement>) => {
    setAdvanced(Boolean(event.target.checked));
  };

  const data = {
    labels: ["Invested", "Interest", "Initial sum"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          monthly * 12 * years,
          accumulated - starting - monthly * years * 12,
          starting,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    animation: {
      animateRotate: false,
    },
  };

  useEffect(() => {
    let totalSum = starting;
    for (let i = 1; i <= years * 12; i++) {
      totalSum += monthly;
      totalSum *= 1 + interest / 100 / 12;
    }
    setAccumulated(Math.round(totalSum));
  });

  const simpleInput = () => {
    return (
      <Grid item>
        <Grid container spacing={2} direction={"row"} justifyContent={"center"}>
          <Grid item>
            <TextField
              className="inputField"
              type={"number"}
              onChange={updateStarting}
              id="starting"
              label="Starting amount"
              variant="outlined"
              defaultValue={50000}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kr</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              className="inputField"
              type={"number"}
              onChange={updateMonthly}
              id="recurring"
              label="Monthly investment"
              variant="outlined"
              defaultValue={1000}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kr</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              className="inputField"
              type={"number"}
              onChange={updateInterest}
              id="monthly-interest"
              label="Yearly interest"
              variant="outlined"
              defaultValue={5}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              className="inputField"
              type={"number"}
              onChange={updateYears}
              id="years"
              label="Amount of years"
              variant="outlined"
              defaultValue={10}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">years</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const Results = () => {
    return (
      <Grid item>
        <Grid container direction={"column"}>
          <Grid item>
            <h2>
              Total sum:{" "}
              {accumulated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}kr
            </h2>
          </Grid>
          <Grid item width={300}>
            <Pie data={data} options={options} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const advancedInput = () => {
    if (advanced) {
      return (
        <Grid item>
          <Grid container direction={"column"} spacing={2}>
            <h1>Taxes</h1>
            <Grid item>
              <Grid
                container
                spacing={2}
                direction={"row"}
                justifyContent={"center"}
              >
                <Grid item>
                  <TextField
                    className="inputField"
                    type={"number"}
                    onChange={updateTax}
                    id="tax"
                    label="Tax on profits"
                    variant="outlined"
                    defaultValue={35.2}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    className="inputField"
                    type={"number"}
                    onChange={updateShielded}
                    id="shielded"
                    label="Shielded yearly"
                    variant="outlined"
                    defaultValue={0.8}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        textAlign={"center"}
        spacing={2}
      >
        <Grid item>
          <h1>Investment calculator</h1>
        </Grid>
        <Grid
          component="label"
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1}
        >
          <Grid item>basic</Grid>
          <Grid item>
            <Switch
              checked={advanced} // relevant state for your case
              onChange={updateAdvanced} // relevant method to handle your change
            />
          </Grid>
          <Grid item>advanced</Grid>
        </Grid>
        {simpleInput()}
        {advancedInput()}
        {Results()}
      </Grid>
    </>
  );
}

export default App;
