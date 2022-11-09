import React from "react";
import FeedContent from "./FeedContent";
import FriendFeedContent from "./FriendFeedContent";
import NavLoggedIn from "./NavLoggedIn";
import SideNavBar from "./SideNavBar";

function FriendProfile() {
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
        <div style={{ width: "50vw" }} className="p-3 side-bar-border nav-fix">
          <FriendFeedContent props={window.location.pathname} />
        </div>
      </div>
    </div>
  );
}

export default FriendProfile;
