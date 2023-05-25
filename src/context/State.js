import React, { useState, useEffect } from "react";
import BsContext from "./Context";

const BsState = (props) => {
  //this is the state variable for managing the seats 
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [time, changeTime] = useState("");
  const [movie, changeMovie] = useState("");
  const [noOfSeat, changeNoOfSeats] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });
  const [lastBookingDetails, setLastBookingDetails] = useState(null);

  // this function is used  to make a post request to the server with the booking details
  const handlePostBooking = async () => {
    //from here we are  sending api request to backend with user selected movie, slot and seats to book movie.
    const response = await fetch(`https://ruby-puzzled-kitten.cyclic.app/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: movie, slot: time, seats: noOfSeat }),
    });

    const data = await response.json();

    // used to  error popup if the response status is other than  200
    setErrorPopup(true);
    setErrorMessage(data.message);

    // used to clear  form and the local storage if the response status is 200
    if (response.status === 200) {
      changeTime("");
      changeMovie("");
      changeNoOfSeats({
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        D1: "",
        D2: "",
      });
      setLastBookingDetails(data.data);

      window.localStorage.clear();
    }
  };

  // this function help  to make a get request to the server to get the last booking details
  const handleGetLastBooking = async () => {
    const response = await fetch(`https://ruby-puzzled-kitten.cyclic.app/api/booking`, {
      method: "GET",
    });

    const data = await response.json();
    // here we are setting last booking details recieved from the backend.
    setLastBookingDetails(data.data);
  };

  //getting movies slot and seats from localstorage and updating state useful when page refreshes
  useEffect(() => {
    const movie = window.localStorage.getItem("movie");
    const slot = window.localStorage.getItem("slot");
    const seats = JSON.parse(window.localStorage.getItem("seats"));

    if (movie || slot || seats) {
      changeTime(slot);
      changeMovie(movie);
      changeNoOfSeats(seats);
    }
  }, []);

  return (
    // this will provide all required data to the app
    <BsContext.Provider
      value={{
        handlePostBooking,
        handleGetLastBooking,
        movie,
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        changeNoOfSeats,
        lastBookingDetails,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </BsContext.Provider>
  );
};

export default BsState;
