import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import NavLoggedIn from "./NavLoggedIn";
import SideNavBar from "./SideNavBar";

const Home = () => {
  return (
    <div>
      <NavLoggedIn />
      <div className="d-flex">
        <div
          style={{ width: "25vw", paddingRight: "2%" }}
          className="side-bar-border"
        >
          <SideNavBar />
        </div>
        <div style={{ width: "75vw" }} className="p-3 side-bar-border">
          <div className="home mt-4">
            <div className="container">
              <Sidebar />
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
