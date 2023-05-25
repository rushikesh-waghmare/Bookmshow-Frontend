import React, { useContext } from "react";
import BsContext from "../../context/Context";
import "../styles/errorModal.css";

function Modal(props) {
  // here we are getting error and the functions from context
  const context = useContext(BsContext);
  const { errorPopup, errorMessage, setErrorPopup, setErrorMessage } = context;

  // this is the function for closing error modal
  const handleClosePopup = () => {
    setErrorMessage("");
    setErrorPopup(false);
  };
  // rendering the error model
  return (
    <>
      {errorPopup && (
        <div
          className={`modal-container ${errorPopup ? "active" : "inactive"}`}
        >
          <div className="modal">
            <div className="modal-header">
              <strong>Message</strong>
            </div>
            <div className="modal-body">
              {/* the error message will display */}
              <span>{errorMessage}</span>
            </div>
            <div className="modal-footer">
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
