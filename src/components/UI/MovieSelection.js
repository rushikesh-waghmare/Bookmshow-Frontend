import React, { useContext, useEffect } from "react";
import RadioComponent from "./RadioComponent";
import { moviesList } from "../../data";
import BsContext from "../../context/Context";
import "../styles/movieSelection.css";

const SelectMovie = () => {
  const context = useContext(BsContext);

  const { movie, changeMovie } = context;
  useEffect(() => {
    // Get the selected movie from local storage
    const selectedMovie = window.localStorage.getItem("movie");

    // The useEffect function takes a callback function that is executed when the component mounts and any time movie or changeMovie change.
    if (selectedMovie && selectedMovie !== movie) {
      changeMovie(selectedMovie);
    }
    // If a selected movie is found in local storage and it is different than the current movie state, it updates the context with the selected movie using the changeMovie function.
  }, [changeMovie, movie]);

  // this will handle the change of selected movie
  const handleChangeMovie = (value) => {
    // used to update the selected movie
    changeMovie(value);

    // this will store the selected movie in local storage
    window.localStorage.setItem("movie", value);
  };

  return (
    <>
      {/* used to display heading*/}
      <h1 className="SM_heading">Select a Movie :-</h1>

      {/* this will display the selected movie option */}
      <div className="SM_main_container">
        {moviesList.map((el, index) => {
          return (
            <RadioComponent
              text={el}
              changeSelection={handleChangeMovie}
              data={movie}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default SelectMovie;
