import React from "react";

export default function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" classname="inputform"/>
      </div>
      <div className="userchat">
        <img
          className="userimg"
          src="https://i.pinimg.com/736x/64/5a/97/645a97899b437f047f4f88bee2e7755c.jpg"
          alt=""
        />
        <div className="userchatinfo">
          <span> VERMA</span>
        </div>
      </div>
    </div>
  );
}
