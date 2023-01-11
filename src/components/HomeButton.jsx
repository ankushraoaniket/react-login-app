// Can be removed, only purpose is to show redirect working

import React from "react";
import { useNavigate } from "react-router-dom";

function HomeButton() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <div>
      <button className="testButton" type="button" onClick={handleClick}>
        Redirect
      </button>
      <small>Button tries to take user to '/'</small>
    </div>
  );
}

export default HomeButton;
