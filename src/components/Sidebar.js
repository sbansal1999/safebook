import React from "react";
import Chatnavbar from "./Chatnavbar";
import Search from "./Search"
import Chats from "./Chats"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Chatnavbar />
      <Search/>
      <Chats/>
    </div>
  );
}
