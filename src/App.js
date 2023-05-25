import React from "react";
import "./App.css";
import BsState from "./context/State";
import Home from "./components/pages/Home";
function App() {
  return (
    <>
      <BsState>
        <Home />
      </BsState>
    </>
  );
}

export default App;
