import React from "react";

function ToggleBtn({
  button1 = "btn1",
  button2 = "btn2",
  toggle = true,
  setToggle,
}) {
  return (
    <div className="toggle-btn__container">
      <button
        onClick={() => {
          if (toggle) return;
          setToggle();
        }}
        className={`toggle-btn ${toggle ? "toggle-btn--active" : ""}`}
      >
        {button1}
      </button>
      <button
        onClick={() => {
          if (!toggle) return;
          setToggle();
        }}
        className={`toggle-btn ${!toggle ? "toggle-btn--active" : ""}`}
      >
        {button2}
      </button>
    </div>
  );
}

export default ToggleBtn;
