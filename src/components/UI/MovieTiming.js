import React, { useContext, useCallback } from "react";
import RadioComponent from "./RadioComponent";
import { slots } from "../../data"; 
import "../styles/movieTiming.css";
import BsContext from "../../context/Context";

const TimeShedule = () => {
  const context = useContext(BsContext);

  const { time, changeTime } = context;

  const handleChangeTime = useCallback((value) => {
    //The useCallback hook is used to memoize this function so that it is only created once and not recreated on every re-render of the component.
    changeTime(value);
    window.localStorage.setItem("slot", value);
  }, [changeTime]);

  return (
    <>
      <div className="Slot_container">
        <h1 className="TS_heading">Select a Schedule :-</h1>
        <div className="TS_main_container">
          {slots.map((el, index) => {
            // rendering the radio component on each time slot
            return (
              <RadioComponent
                text={el}
                changeSelection={handleChangeTime}
                data={time}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimeShedule;
