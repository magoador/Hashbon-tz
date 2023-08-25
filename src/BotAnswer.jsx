import React from "react";
import Typed from "typed.js";

import robot__logo from "./assets/img/Robot.svg";

function BotAnswer({ text }) {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [text],
      showCursor: false,
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="Chat__message Message">
      <div className="Message__logo">
        <img src={robot__logo} alt="" />
      </div>
      <div className="Message__text" ref={el}></div>
    </div>
  );
}

export default BotAnswer;
