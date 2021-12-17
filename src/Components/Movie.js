import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NewMovie from "./NewMovie";
import "./Movie.css";

const Movie = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [thisMovie, setThisMovie] = useState(props.movie);
  const [isEditable, setIsEditable] = useState(false);

  const submitMovieHandler = (newMovie) => {
    setIsEditable(false);
    props.onUpdateMovie(thisMovie, newMovie);
  };

  const displayBtnClickHandler = () => {};

  const clickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteHandler = (e) => {
    props.onDeleteMovie(thisMovie);
  };

  const editHandler = (e) => {
    setIsEditable(true);
  };

  var stuffToRender = isEditable ? (
    <NewMovie
      onNewMovieSubmit={submitMovieHandler}
      onBtnClick={displayBtnClickHandler}
      newMovie={thisMovie}
    ></NewMovie>
  ) : !isExpanded ? (
    <>
      <div className="Movie">
        <a className="Movie-title" href={props.movie.Wiki_Page}>
          {props.number + 1 + ". " + props.movie.Title}
        </a>
        <a className="Movie-detail">
          <div className="Movie-year">
            <h2>Release:</h2> {props.movie.Release_Year}
          </div>
          <div className="Movie-director">
            <h2>Directed By:</h2> {props.movie.Director}
          </div>
          <div className="Movie-genre">
            <h2>Genre:</h2> {props.movie.Genre}
          </div>
          <div className="Movie-cast">
            <h2>Cast:</h2>{" "}
            {props.movie.Cast === "" ? "unknown" : props.movie.Cast}
          </div>
          <div className="Movie-origin">
            <h2>Origin:</h2> {props.movie.Origin_Ethnicity}
          </div>
        </a>
        <div className="expand" onClick={clickHandler}>
          <h2>Plot:</h2>
          <div className="Movie-plot hidden">"{props.movie.Plot}"</div>
          <ExpandMoreIcon></ExpandMoreIcon>
        </div>
      </div>
      <div className="icons">
        <DeleteIcon className="icon" onClick={deleteHandler}></DeleteIcon>
        <EditIcon className="icon" onClick={editHandler}></EditIcon>
      </div>
    </>
  ) : (
    <>
      <div className="Movie">
        <a className="Movie-title" href={props.movie.Wiki_Page}>
          {props.number + 1 + ". " + props.movie.Title}
        </a>
        <a className="Movie-detail" onClick={clickHandler}>
          <div className="Movie-year">
            <h2>Release:</h2> {props.movie.Release_Year}
          </div>
          <div className="Movie-director">
            <h2>Directed By:</h2> {props.movie.Director}
          </div>
          <div className="Movie-genre">
            <h2>Genre:</h2> {props.movie.Genre}
          </div>
          <div className="Movie-cast">
            <h2>Cast:</h2>{" "}
            {props.movie.Cast === "" ? "unknown" : props.movie.Cast}
          </div>
          <div className="Movie-origin">
            <h2>Origin:</h2> {props.movie.Origin_Ethnicity}
          </div>
        </a>
        <div className="expand" onClick={clickHandler}>
          <h2>Plot:</h2>
          <div className="Movie-plot">"{props.movie.Plot}"</div>
          <ExpandLessIcon></ExpandLessIcon>
        </div>
      </div>
      <div className="icons">
        <DeleteIcon className="icon" onClick={deleteHandler}></DeleteIcon>
        <EditIcon className="icon" onClick={editHandler}></EditIcon>
      </div>
    </>
  );
  return stuffToRender;
};

export default Movie;
