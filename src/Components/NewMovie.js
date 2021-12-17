import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./NewMovie.css";
import { v4 as uuidv4 } from "uuid";

const NewMovie = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [movieObj, setMovieObj] = useState(props.newMovie);
  const [title, setTitle] = useState(props.newMovie.Title);
  const [directors, setDirectors] = useState(props.newMovie.Director);
  const [genre, setGenre] = useState(props.newMovie.Genre);
  const [cast, setCast] = useState(props.newMovie.Cast);
  const [origin, setOrigin] = useState(props.newMovie.Origin_Ethnicity);
  const [plot, setPlot] = useState(props.newMovie.Plot);
  const [release, setRelease] = useState(props.newMovie.Release_Year);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setMovieObj({
      Release_Year: release === "" ? "Unknown" : release,
      Title: title === "" ? "Unknown" : title,
      Origin_Ethnicity: origin === "" ? "Unknown" : origin,
      Director: directors === "" ? "Unknown" : directors,
      Cast: cast === "" ? "Unknown" : cast,
      Genre: genre === "" ? "Unknown" : genre,
      Wiki_Page: "#",
      Plot: plot === "" ? "Unknown" : plot,
      key: movieObj.key,
    });
  };

  useEffect(() => {
    //set our state
    setRelease(movieObj.Release_Year);
    setTitle(movieObj.Title);
    setOrigin(movieObj.Origin_Ethnicity);
    setDirectors(movieObj.Director);
    setCast(movieObj.Cast);
    setGenre(movieObj.Genre);
    setPlot(movieObj.Plot);
    if (isLoaded) {
      if (isSubmitted) {
        props.onNewMovieSubmit(movieObj);
        props.onBtnClick();
      }
    } else setIsLoaded(true);
  }, [movieObj]);

  return (
    <form onSubmit={submitHandler}>
      <div className="NewMovie-controls">
        <div className="NewMovie-control">
          <label>Title</label>
          <TextField
            defaultValue={title}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setTitle(event.target.value.trim())}
          ></TextField>
        </div>
        <div className="NewMovie-control">
          <label>Release Year</label>
          <TextField
            defaultValue={release}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setRelease(event.target.value.trim())}
          ></TextField>
        </div>
        <div className="NewMovie-control">
          <label>Director(s)</label>
          <TextField
            defaultValue={directors}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setDirectors(event.target.value.trim())}
          ></TextField>
        </div>
        <div className="NewMovie-control">
          <label>Genre</label>
          <TextField
            defaultValue={genre}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setGenre(event.target.value.trim())}
          ></TextField>
        </div>
        <div className="NewMovie-control">
          <label>Cast</label>
          <TextField
            defaultValue={cast}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setCast(event.target.value.trim())}
          ></TextField>
        </div>
        <div className="NewMovie-control">
          <label>Origin</label>
          <TextField
            defaultValue={origin}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setOrigin(event.target.value.trim())}
          ></TextField>
        </div>
        <div className="NewMovie-control">
          <label>Plot</label>
          <TextField
            defaultValue={plot}
            sx={{
              color: "var(--light-stuff)",
              backgroundColor: "var(--light-stuff)",
            }}
            variant="filled"
            onChange={(event) => setPlot(event.target.value.trim())}
          ></TextField>
        </div>

        <div className="NewMovie-control">
          <div className="NewMovie-action">
            <Button
              variant="contained"
              onClick={submitHandler}
              className="NewMovie-button"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewMovie;
