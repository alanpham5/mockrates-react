import { Message } from "../components/Message";
import { useState } from "react";
import { Button } from "../components/Button";
import "./Chat.css";
import { useColor } from "../api/hooks/useColor";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { colors } = useColor();
  const onSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, text]);
    setText("");
  };
  return (
    <div
      style={{
        padding: 30,
        justifyContent: "left",
        height: "100vh",
        backgroundColor: colors.tertiary,
      }}
    >
      <h1>This is the chat page.</h1>
      <Message
        backgroundColor={colors.primary}
        text="We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy...I just want to tell you how I'm feeling Gotta make you understand. Never gonna give you up, never gonna let you down Never gonna run around and desert you "
        isReceived={true}
      />
      {messages.map((message) => {
        return <Message backgroundColor={colors.primary} text={message} />;
      })}
      <footer>
        <form
          onSubmit={onSubmit}
          style={{
            flexShrink: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "70%",
              minHeight: 30,
              margin: 10,
              padding: 10,
              fontSize: 18,
              fontFamily: "inherit",
              overflowWrap: "break-word",
              borderRadius: 20,
            }}
          />
          <Button
            backgroundColor={colors.secondary}
            label="Send"
            type="submit"
          />
        </form>
      </footer>
    </div>
  );
}
