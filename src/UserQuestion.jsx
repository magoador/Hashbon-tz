import React from "react";
import user__logo from "./assets/img/T.svg";

const UserQuestion = ({ text }) => {
  return (
    <div className="Chat__message MessageYour">
      <div className="Message__logo">
        <img src={user__logo} alt="" />
      </div>
      <div className="Message__text">{text}</div>
    </div>
  );
};

export default UserQuestion;
