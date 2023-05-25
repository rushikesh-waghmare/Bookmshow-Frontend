import React, { useEffect } from "react";
import "../styles/lastbookingdetails.css";
import { useContext } from "react";
import BsContext from "../../context/Context";
import { seats } from "../../data";

const LastBookingDetails = (props) => {
  const context = useContext(BsContext);

  const { handleGetLastBooking, lastBookingDetails } = context;

  useEffect(() => {
    // fetching the details of last booking
    handleGetLastBooking();
  });

  return (
    <div className="last_booking_details_container_main">
      <h2 className="last_booking_details_header">Last Booking Details:</h2>
      {lastBookingDetails ? (
        // this will show the last booking details if avalible
        <>
          <div className="seats_container">
            <p className="seats_header">Seats:</p>
            <ul className="seats">
              {seats.map((seat, index) => {
                //this will map through seats arry and show it
                return (
                  <li className="seat_value" key={index}>
                    {seat}: {Number(lastBookingDetails.seats[seat])}
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="slot" style={{ textAlign: "left" }}>
            {/* this will show the time slot of booking */}
            Slot: <span>{lastBookingDetails.slot}</span>
          </p>
          <p className="movie">
            {/* show the movie name of last booked movie */}
            Movie: <span>{lastBookingDetails.movie}</span>
          </p>
        </>
      ) : (
        // display the message if the last boking details are not avaliable
        <p className="no_previous_booking_msg">No Previous Booking Found!</p>
      )}
    </div>
  );
};

export default LastBookingDetails;
