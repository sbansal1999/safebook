import React, { useState } from "react";
import NavLoggedIn from "./NavLoggedIn";

import profile_image from "./../images/profile.jpg";
import SideNavBar from "./SideNavBar";
import { useCookies } from "react-cookie";
import FeedContent from "./FeedContent";
import ProfileSideBar from "./ProfileSideBar";
import DisplayMedia from "./DisplayMedia";

function ShowMedia() {
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
        <div style={{ width: "50vw" }} className="p-3 side-bar-border">
          <DisplayMedia />
        </div>
        <div
          style={{ width: "25vw" }}
          className="d-flex justify-content-center"
        >
          <ProfileSideBar />
        </div>
      </div>
    </div>
  );
}

export default ShowMedia;
