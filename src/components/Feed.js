import React from "react";
import FeedContent from "./FeedContent";
import NavLoggedIn from "./NavLoggedIn";
import SideNavBar from "./SideNavBar";

export default function Feed() {
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
          <FeedContent />
        </div>
      </div>
    </div>
  );
}
