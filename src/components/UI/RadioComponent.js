import React from "react";
import "../styles/radioComponent.css";


const RadioComponent = ({ text, changeSelection, data }) => {
  // this will handle radio button selection
  const handleChecked = (value) => {
    changeSelection(value);
  };

  return (
    <div
      name={text}
      // apply the 'active' class if the radio button is selected (i.e., data is equal to the text)
      className={`form-check-label ${data === text ? "active" : "inactive"}`}
      onClick={() => {
        // call the handleChecked function with the selected value
        handleChecked(text);
      }}
    >
      <span className={"text"}>{text}</span>
    </div>
  );
};

export default RadioComponent;
