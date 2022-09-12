import "./App.css";
import {
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
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

  const pieData = {
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

  const labels = ["cool", "cool2", "cool3"];
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: 'Dataset 2',
        data: [3, 2, 1],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: 'Dataset 3',
        data: [3, 1, 3],
        backgroundColor: "rgb(255, 205, 86)",
      },
    ]
  };

  const barOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }

  const pieOptions = {
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
            <Pie data={pieData} options={pieOptions} />
            <Bar data={barChartData} options={barOptions} />
          </Grid>
        </Grid>
      </Grid>
    );
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
        {Results()}
      </Grid>
    </>
  );
}

export default App;
