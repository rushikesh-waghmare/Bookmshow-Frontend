
// importing the  UI components from the  UI folder 
import LastBookingDetails from "../UI/LastBookingDetails";
import SelectMovie from "../UI/MovieSelection";
import SelectSeats from "../UI/SelectSeats";
import TimeShedule from "../UI/MovieTiming";
import Modal from "../UI/ErrorModal";
// importing the home.css 
import "../styles/Home.css";
//importing context 
import BsContext from "../../context/Context";
import { useContext ,useMemo } from "react";

const Home = (props) => {
  // Get the required data from context using useContext hook
  const context = useContext(BsContext);
  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
    changeNoOfSeats,
  } = context;  // get properties from context



  //useMemo is a hook in React that can be used to memoize a function, which means it will only recompute the function if one of its dependencies has changed. This can be useful for optimizing performance in cases where a function is expensive to compute.

  //This function checks whether any seat in the seats object has a negative value. It does this by looping through each seat in the seats object, checking if the value is negative, and returning true if it finds any negative values. If it doesn't find any negative values, it returns false.
  const checkNegativeSeatsValidity = useMemo(() => {
    // Define a function that takes in a `seats` object
    return (seats) => {
      // Loop through each seat in the `seats` object
      for (let seat in seats) {
        // Check if the seat has a negative value
        if (Number(seats[seat]) < 0) {
          // If any seat has a negative value, return true
          return true;
        }
      }
      // If all seats have non-negative values, return false
      return false;
    };
  }, []);
  
  


  //This function checks whether all seats in the seats object have a value of zero. It does this by looping through each seat in the seats object, checking if the value is greater than zero, and returning false if it finds any values greater than zero. If it doesn't find any values greater than zero, it returns true.
  const checkZeroSeatsValidity = useMemo(() => {
  // Define a function that takes in a `seats` object
  return (seats) => {
    // Loop through each seat in the `seats` object
    for (let seat in seats) {
      // Check if the seat has a positive value
      if (Number(seats[seat]) > 0) {
        // If any seat has a positive value, return false
        return false;
      }
    }
    // If all seats have a zero value, return true
    return true;
  };
}, []);


//This code defines a function called handleBookNow() which is used to handle the booking process. It first checks if a movie and a time slot have been selected. If not, it sets an error message and displays a popup.
  const handleBookNow = () => {
    //If a movie and time slot have been selected, it calls two helper functions, checkNegativeSeatsValidity() and checkZeroSeatsValidity(), to check if the number of seats selected is valid. If the number of seats is negative or zero, it sets an error message and displays a popup.
    switch (true) {
      case !movie:
        setErrorPopup(true);
        setErrorMessage("Please select a movie!");
        break;
      case !time:
        setErrorPopup(true);
        setErrorMessage("Please select a time slot!");
        break;
      case checkNegativeSeatsValidity(noOfSeat) || checkZeroSeatsValidity(noOfSeat):
        setErrorPopup(true);
        setErrorMessage("Invalid Seats!");
        break;
      default:
        handlePostBooking();
        changeNoOfSeats({}); // reset seats after booking
    }
  };
//If all the conditions are satisfied, it calls another function called handlePostBooking() and resets the selected seats by calling the changeNoOfSeats() function and passing an empty object. This function is defined elsewhere in the code and is responsible for making an API call to book the selected seats.








/*  The component also renders the Modal component, which displays error messages, and the SelectMovie, LastBookingDetails, TimeShedule, and SelectSeats components, which are used to select a movie, display the user's last booking details, select a time slot, and select the number of seats, respectively. */
  return (
    <>
      <Modal />
      <div className="container">
        <div className="selection_container">
          <div className="wrapper">
            <div className="select_movie_component">
              <SelectMovie />
            </div>
            <div className="last_booking_details_container">
              <LastBookingDetails />
            </div>
          </div>
          <div className="time_seats_container">
            <TimeShedule />
            <SelectSeats />
 {/* The onClick handler for the button element calls the handleBookNow function.   */}
            <button
              onClick={() => {
                handleBookNow();
              }}
              className="BN-btn "
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;