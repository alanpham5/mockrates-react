import { Message } from "../components/Message";
import { useState } from "react";
import { Button } from "../components/Button";
import "./Chat.css";
import { useColor } from "../api/hooks/useColor";
import { createUserMessage, addToTextSeq, GetActiveDays } from "../api/hooks/firestore";


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

  console.log("In Chat()");

  // messages is a list of messages between Socky and the user.
  const [messages, setMessages] = useState([]);

  // text is a string containing the content of each message.
  const [text, setText] = useState("");
  const { colors } = useColor();



  // Defining onSubmit for when the user replies.
  // When the user tap send, shallow copy the prevMessage list.
  // Add the new {message.text, message.received} to the list.
  const onSubmit = (event) => {
    event.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, received: false },
    ]);

    
    // These work. Try it by uncommenting one at a time.
    //createUserMessage(text);
    //addToTextSeq(text);
    alert(GetActiveDays());

    
    // Reset text to empty string
    setText("");

    // Wait for 3000 ms, if there are fewer than 6 back and forth responses, Socky replies.
    sleep(3000).then(() => {
      if (messages.length < 6) {
        setMessages((prevMessages) => [
          ...prevMessages,
          sockyMessages.at(Math.floor((messages.length + 2) / 2)),
        ]);
      }
    });
  };

  // What the Chat function displays.
  return (

    // Socky's chat bubble is primary color.
    // The user's chat bubble is secondary color.
    // Background color is tertiary color.
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
          text={sockyMessages[0].text}      // Socky sends the first message and waits.
          isReceived={true}
        />

        {messages.map((message) => {        // Turn each text in messages list to a Message component.
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
        <form                               // Reply box at the bottom for the user
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
