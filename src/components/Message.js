import React from 'react'

function Message() {
  return (
    <div className="message">
      <div className="messageinfo">
        <img
          className="img"
          src="https://i.pinimg.com/736x/64/5a/97/645a97899b437f047f4f88bee2e7755c.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messagecontent">
        <p>hello</p>
        {/* <img src="https://i.pinimg.com/736x/64/5a/97/645a97899b437f047f4f88bee2e7755c.jpg" /> */}
      </div>
    </div>
  );

}

export default Message