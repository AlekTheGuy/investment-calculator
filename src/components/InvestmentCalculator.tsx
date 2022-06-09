import "./InvestmentCalculator.css";

import { Grid, TextField, InputAdornment, Card } from "@mui/material";
import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Box } from "@mui/system";

const InvestmentCalculator = () => {
  const [starting, setStarting] = useState(50000);
  const [monthly, setMonthly] = useState(1000);
  const [interest, setInterest] = useState(5);
  const [years, setYears] = useState(10);
  const [accumulated, setAccumulated] = useState(0);

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

  useEffect(() => {
    let totalSum = starting;
    for (let i = 1; i <= years * 12; i++) {
      totalSum += monthly;
      totalSum *= 1 + interest / 100 / 12;
    }
    setAccumulated(Math.round(totalSum));
  });

  const Results = () => {
    return (
      <>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <h2>
              Total sum:{" "}
              {accumulated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}kr
            </h2>
          </Grid>
          <Grid item>
            <div>
              Amount invested:{" "}
              {(monthly * years * 12)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              kr
            </div>
          </Grid>
          <Grid item>
            <div>
              Amount of interest:{" "}
              {(accumulated - starting - monthly * years * 12)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              kr
            </div>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Grid className="root-grid" container direction={"column"} spacing={0}>
        <Grid item>
          <h1>Investment calculator</h1>
        </Grid>
        <Grid item>
          <>
            <Grid container spacing={2} direction={"row"}>
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
          </>
        </Grid>
        <Grid item>
          <Results />
        </Grid>
      </Grid>
    </>
  );
};

export default InvestmentCalculator;
