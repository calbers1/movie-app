import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Button } from "@mui/material";
import NewMovie from "./NewMovie";
import "./AddMovie.css";
import { v4 as uuidv4 } from "uuid";

const AddMovie = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultMovie = {
    Release_Year: "",
    Title: "",
    Origin_Ethnicity: "",
    Director: "",
    Cast: "",
    Genre: "",
    Wiki_Page: "#",
    Plot: "",
    key: uuidv4(),
  };

  const submitMovieHandler = (newMovie) => {
    props.submitMovie(newMovie);
  };

  const displayBtnClickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  var displayItem = isExpanded ? (
    <NewMovie
      onNewMovieSubmit={submitMovieHandler}
      onBtnClick={displayBtnClickHandler}
      newMovie={defaultMovie}
    ></NewMovie>
  ) : (
    <div className="addMovie">
      <div className="AddMovie-button" onClick={displayBtnClickHandler}>
        <h4>Add Movie</h4>
        <ExpandMoreIcon></ExpandMoreIcon>
      </div>
    </div>
  );

  return displayItem;
};

export default AddMovie;
