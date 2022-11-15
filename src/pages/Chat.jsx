import { Message } from "../components/Message";
import { useState } from "react";
import { Button } from "../components/Button";
import "./Chat.css";
import { useColor } from "../api/hooks/useColor";

const sockyMessages = [
  {
    text: "Hi! It's your mental health companion, Socky! How are you feeling today?",
    received: true,
  },
  {
    text: "That's awesome! Can you tell me some things you did that were productive?",
    received: true,
  },
  {
    text: "OMG that's great! Glad you spent your time well today! It's always important to take some time to breathe, rest, and exercise. What ways have you taken the time to do so?",
    received: true,
  },
  {
    text: "Cool! Thanks for taking the time to tell me about your day. I'll see you next time!",
    received: true,
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { colors } = useColor();
  const onSubmit = (event) => {
    event.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, received: false },
    ]);
    setText("");
    sleep(3000).then(() => {
      if (messages.length < 6) {
        setMessages((prevMessages) => [
          ...prevMessages,
          sockyMessages.at(Math.floor((messages.length + 2) / 2)),
        ]);
      }
    });
  };

  return (
    <div
      style={{
        padding: 30,
        justifyContent: "left",
        backgroundColor: colors.tertiary,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1>This is the chat page.</h1>
        <Message
          backgroundColor={colors.primary}
          text={sockyMessages[0].text}
          isReceived={true}
        />
        {messages.map((message) => {
          return (
            <Message
              backgroundColor={colors.primary}
              text={message.text}
              isReceived={message.received}
            />
          );
        })}
      </div>
      <div
        style={{
          height: "10vh",
          margin: 0,
        }}
      />
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
              margin: 5,
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
