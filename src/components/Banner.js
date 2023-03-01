import React from "react";

function Banner({ text = "No data avilable" }) {
  return (
    <div className="banner">
      <h2>{text}</h2>
    </div>
  );
}

export default Banner;
