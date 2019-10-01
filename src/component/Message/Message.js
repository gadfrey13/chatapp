import React from "react";
import "./Message.css";

const Message = props => {
  const { message } = props;
  const split = message.split(":");
  const display = () => {
    if (split.length > 1) {
      const type = split[0];
      const name = split[1];
      const text = split[2];
      if (type === "status") {
        return (
          <div className="text blue">
            <p>{text}</p>
          </div>
        );
      } else if (type === "receive") {
        return (
          <div className="bubble white">
            <p>{text}</p>
          </div>
        );
      } else if(type === "send"){
          return(
            <div className="bubble black">
            <p>{text}</p>
          </div>
          )
      }
    } else {
      return <div></div>;
    }
  };
  return <div>{display()}</div>;
};

export default Message;
