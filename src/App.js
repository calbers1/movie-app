import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Papa from "papaparse";
import Movie from "./Components/Movie";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import Filters from "./Components/Filters";
import AddMovie from "./Components/AddMovie";
import { ConstructionOutlined } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [rows, setRows] = useState([]);
  const [movieSlice, setMovieSlice] = useState([]);
  const [result, setResult] = useState([]);
  const [numberOfMovies, setNumberOfMovies] = useState(10);
  const [filterValue, setFilterValue] = useState("");

  //startup function
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("./movie_plots.csv")
        .then((response) => response.text())
        .then((text) => {
          var resultArr = [];
          Papa.parse(text, {
            header: true,
            worker: true,
            step: (results) => {
              resultArr = [...resultArr, results.data];
            },
            complete: () => {
              setRows(resultArr);
            },
          });
        });
    };
    getData();
  }, []);

  //get the amount of movies specified (movies = the filtered array of movies)
  const getMovies = (movies, numberToGet) => {
    if (movies.length > 0) {
      setMovieSlice(
        movies.slice(
          0,
          numberToGet > movies.length ? movies.length : numberToGet
        )
      );
    }
  };

  //when rows are loaded, filter movies
  useEffect(() => {
    filterMovies(rows, numberOfMovies);
  }, [rows]);

  //After filtering, get the movies
  useEffect(() => {
    getMovies(result, numberOfMovies);
  }, [result, numberOfMovies]);

  //when the filters change, apply them
  useEffect(() => {
    filterMovies(rows, numberOfMovies);
  }, [filterValue]);

  //this sets the filter value from our Filters component, and then kicks off a useEffect.
  const setFilter = (filterValue, numMovies) => {
    if (numMovies > 100 || numMovies < 1) {
      alert(
        "Number must be between 1 and 100. It has been reset to 10. also, how did you even get here?"
      );
    }
    var cleanNumber = numMovies > 100 || numMovies < 1 ? 10 : numMovies;
    setFilterValue(filterValue);
    setNumberOfMovies(cleanNumber);
  };

  //This is called every time we want to display movies. If there's no filter value (default), just give us the default list. Default number is 10.
  const filterMovies = (movies, numMovies) => {
    var tempMovies = [];
    if (filterValue != "") {
      movies.filter((val) => {
        if (
          val.Title &&
          val.Title.toString().toLowerCase().includes(filterValue.toLowerCase())
        ) {
          tempMovies = [...tempMovies, val];
          return val;
        }
      });
      if (tempMovies.length > 0) {
        setResult(tempMovies);
      } else {
        setResult([]);
      }
    } else {
      setResult(movies);
    }
    setNumberOfMovies(numMovies);
  };

  //adds new movie to the front of the line.
  const addNewMovie = (newMovie) => {
    setRows([newMovie, ...rows]);
  };

  //checks for the movie, removes it from the array.
  const deleteMovie = (movieToDelete) => {
    var tempMovies = [];
    tempMovies = rows.filter((val) => {
      return val.Title && val !== movieToDelete;
    });
    setRows(tempMovies);
  };

  //update the movie by removing the old one and inserting the new one.
  const updateMovie = (movieToDelete, newMovie) => {
    var tempMovies = [];
    tempMovies = rows.filter((val) => {
      return val.Title && val !== movieToDelete;
    });
    tempMovies = [newMovie, ...tempMovies];
    setRows(tempMovies);
  };

  //component body : if there are no movies found and no rows, loading, else none found, else load content.
  return (
    <div className="App">
      <Filters setFilter={setFilter} returnMovies={setFilter}></Filters>
      <AddMovie submitMovie={addNewMovie}></AddMovie>
      {movieSlice.length <= 0 ? (
        <div className="Loading">
          {rows.length > 0
            ? "No movies found. Please change your search terms."
            : "Loading..."}
        </div>
      ) : (
        movieSlice.map((row, i) => (
          <Movie
            key={uuidv4()}
            number={i}
            movie={row}
            onDeleteMovie={deleteMovie}
            submitMovie={addNewMovie}
            onUpdateMovie={updateMovie}
          ></Movie>
        ))
      )}
    </div>
  );
}

export default App;
