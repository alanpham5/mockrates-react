import { Message } from "../components/Message";
import { useState } from "react";
import { Button } from "../components/Button";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, text]);
    setText("");
  };
  return (
    <div>
      <h1>This is the chat page.</h1>
      <Message
        backgroundColor={"#81968F"}
        text="We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy...I just want to tell you how I'm feeling Gotta make you understand. Never gonna give you up, never gonna let you down Never gonna run around and desert you "
        isReceived={true}
      />
      {messages.map((message) => {
        return <Message backgroundColor={"#81968F"} text={message} />;
      })}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button backgroundColor={"#81968F"} label="Send" type="submit" />
      </form>
    </div>
  );
}
