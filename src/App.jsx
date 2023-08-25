import { useEffect, useState } from "react";

import "./App.scss";
import send__button from "./assets/img/send__button.svg";
import BotAnswer from "./BotAnswer";
import UserQuestion from "./UserQuestion";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askQuestion = async (message) => {
    try {
      const question = await fetch(
        "http://185.46.8.130/api/v1/chat/send-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const readable = question.body.getReader();

      let chanks = [];
      let result = [];
      while (true) {
        const { done, value } = await readable.read();
        if (done) {
          break;
        }
        const uint8array = new TextDecoder().decode(value);
        chanks.push(uint8array);
      }
      chanks = chanks.join("");
      const uint8arraySplitted = chanks.split("}{");
      for (let obj of uint8arraySplitted) {
        if (obj[obj.length - 1] !== "}") {
          obj += "}";
        }
        if (obj[0] !== "{") {
          obj = "{" + obj;
        }
        if (obj.includes("done")) {
          continue;
        }
        let jsonObject = JSON.parse(obj);
        result.push(jsonObject.value);
      }

      setMessages(prevMessages => [...prevMessages, { sender: "bot", text: result.join("") }]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  }, [messages]);

  const addQuestion = () => {
    setMessages([...messages, { sender: "user", text: question }]);
    console.log(askQuestion(question));
    
    setQuestion("");
  };


  return (
    <div className="App">
      <div className="App__wrapper">
        <div className="App__bText">Bot Chat</div>
        <div className="App__mText">AI-based service</div>
        <div className="App__chat Chat">
          <div className="Chat__wrapper">
            {messages &&
              messages.map((message, index) => {
                if (message.sender === "user") {
                  return <UserQuestion key={index} text={message.text} />;
                } else {
                  return <BotAnswer key={index} text={message.text} />;
                }
              })}
          </div>
        </div>
        <div className="App__input">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Start typing here..."
          />
          <button onClick={addQuestion}>
            <img src={send__button} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
