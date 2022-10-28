import React from "react";
import NavBar from "./NavBar";
import background_image from "../images/background.jpg"
export default function HomePage() {
  return (
    <div>
      <NavBar />
      <br />
      <h6 style={{ fontSize: "50px" }}> SAFE</h6>
      <img src={background_image} style={{ height: "350px", width: "auto" }} />
      <h6 style={{ fontSize: "50px" }}>BOOK</h6>
    </div>
  );
}

