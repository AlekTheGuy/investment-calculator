import "./App.css";
import {
  Grid,
  TextField,
  InputAdornment,
  Switch,
  Checkbox,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [advanced, setAdvanced] = useState(false);
  const [starting, setStarting] = useState(50000);
  const [monthly, setMonthly] = useState(1000);
  const [interest, setInterest] = useState(5);
  const [years, setYears] = useState(10);
  const [accumulated, setAccumulated] = useState(0);
  const [capitalGainsTax, setCapitalGainsTax] = useState(35.2);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [shieldedYearly, setShieldedYearly] = useState(0.8);
  const [totalShielded, setTotalShielded] = useState(0);

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

  const updateCapitalGainsTax = (event: ChangeEvent<HTMLInputElement>) => {
    setCapitalGainsTax(Number(event.target.value));
  };

  const updateShieldedYearly = (event: ChangeEvent<HTMLInputElement>) => {
    setShieldedYearly(Number(event.target.value));
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
    if (!advanced) {
      let totalSum = starting;
      for (let i = 1; i <= years * 12; i++) {
        totalSum += monthly;
        totalSum *= 1 + interest / 100 / 12;
      }
      setAccumulated(Math.round(totalSum));
    } else {
      let totalSum = starting;
      let totalInvested = starting;
      let totalShielded = 0;
      for (let i = 1; i <= years * 12; i++) {
        totalSum += monthly;
        totalSum *= 1 + interest / 100 / 12;
        totalInvested += monthly;
        if (i % 12 == 0) {
          totalShielded += (totalSum * shieldedYearly) / 100;
        }
      }
      setTotalShielded(Math.round(totalShielded));
      setTotalInvested(totalInvested);
      setAccumulated(Math.round(totalSum));
      setTotalTaxes(
        Math.round(
          ((accumulated - totalInvested + totalShielded) * capitalGainsTax) /
            100
        )
      );
    }
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
              variant="filled"
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
              variant="filled"
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
              variant="filled"
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
              variant="filled"
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
    if (!advanced) {
      return (
        <Grid item>
          <Grid container direction={"column"}>
            <Grid item>
              <h1>
                Final sum:{" "}
                {accumulated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}kr
              </h1>
            </Grid>
            <Grid item width={300}>
              <Pie data={data} options={options} />
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <Grid container direction={"column"} alignItems={"center"}>
            <Grid item textAlign={"center"}>
              <h1>
                Payout after tax:{" "}
                {(accumulated - totalTaxes)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                kr
              </h1>
              <h3>
                Payout before tax:{" "}
                {accumulated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}kr
              </h3>
              <h3>
                total taxes:{" "}
                {totalTaxes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}kr
              </h3>
              <h3>
                Invested:{" "}
                {totalInvested.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                kr
              </h3>
              <h3>
                shielded:{" "}
                {totalShielded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                kr
              </h3>
            </Grid>
            <Grid item width={300}>
              <Pie data={data} options={options} />
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const advancedInput = () => {
    if (advanced) {
      return (
        <Grid item>
          <Grid container direction={"column"}>
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
                    onChange={updateCapitalGainsTax}
                    id="tax"
                    label="Capital gains tax"
                    variant="filled"
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
                    onChange={updateShieldedYearly}
                    id="shielded"
                    label="Shielded yearly"
                    variant="filled"
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
        justifyContent={"center"}
        textAlign={"center"}
        spacing={3}
        paddingTop={5}
      >
        <h1>Investment calculator</h1>
        {simpleInput()}
        <h2>
          Taxes <Checkbox checked={advanced} onChange={updateAdvanced} />
        </h2>
        {advancedInput()}
        {Results()}
      </Grid>
    </>
  );
}

export default App;
