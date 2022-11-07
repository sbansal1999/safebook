import React from "react";
import Messages from "./Messages";
import Input from "./Input";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Tanya</span>
        <div className="chatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
