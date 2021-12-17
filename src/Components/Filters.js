import "./Filters.css";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

const Filters = (props) => {
  const [numberOfMovies, setNumberOfMovies] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [forceNumber, setForceNumber] = useState(10);

  //force the number to stay between 1 and 100
  const numberHandler = (event) => {
    var newNumber = event.target.value;
    if (newNumber < 1) {
      setForceNumber(numberOfMovies);
    } else if (newNumber > 100) {
      setForceNumber(numberOfMovies);
    } else {
      setForceNumber(newNumber);
      setNumberOfMovies(newNumber);
    }
  };

  const filterHandler = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <div className="Filters">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          label="Movie Title"
          defaultValue=" "
          onChange={filterHandler}
        ></TextField>
        <TextField
          variant="outlined"
          type="number"
          value={forceNumber}
          label="Number of Movies"
          onChange={numberHandler}
        ></TextField>
        <Button
          variant="contained"
          className="Filters-button"
          onClick={(e) => {
            e.preventDefault();
            props.returnMovies(searchTerm, numberOfMovies);
          }}
        >
          Get Movies
        </Button>
      </Box>
    </div>
  );
};

export default Filters;
