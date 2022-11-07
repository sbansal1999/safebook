import React from "react";
import Chat from "./Chat";


export default function Chats() {
  return (
    <div className="chats">
      <div className="userchat">
        <img
          className="userimg"
          src="https://i.pinimg.com/736x/64/5a/97/645a97899b437f047f4f88bee2e7755c.jpg"
          alt=""
        />
        <div className="userchatinfo">
          <span>Bansal</span>
          <p>hello</p>
        </div>
      </div>
      <div className="userchat">
        <img
          className="userimg"
          src="https://i.pinimg.com/736x/64/5a/97/645a97899b437f047f4f88bee2e7755c.jpg"
          alt=""
        />
        <div className="userchatinfo">
          <span>Bansal</span>
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}
