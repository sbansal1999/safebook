import React from "react";

export default function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <button>Send</button>
      </div>
    </div>
  );
}
