import React from "react";
import NavBar from "./NavBar";
import background_image from "../images/background.jpg";
export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div
        className="d-flex justify-content-center align-items-center mt-5"
        style={{ width: "100%" }}
      >
        <div
          className="d-flex flex-column align-items-end"
          style={{ width: "15vw" }}
        >
          <h1 className="huge">S</h1>
          <h1 className="huge">A</h1>
          <h1 className="huge">F</h1>
          <h1 className="huge">E</h1>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ width: "70vw" }}
        >
          <br />
          <img src={background_image} style={{ width: "80%" }} />
        </div>
        <div
          className="d-flex flex-column align-items-start"
          style={{ width: "15vw" }}
        >
          <h1 className="huge">B</h1>
          <h1 className="huge">O</h1>
          <h1 className="huge">O</h1>
          <h1 className="huge">K</h1>
        </div>
      </div>
    </div>
  );
}
