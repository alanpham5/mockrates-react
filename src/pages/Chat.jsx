import { Message } from "../components/Message";
import { useState } from "react";
import { Button } from "../components/Button";
import "./Chat.css";
import { useColor } from "../api/hooks/useColor";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, getFirestore, doc, Timestamp, arrayUnion, updateDoc, } from "firebase/firestore";
import { useDocumentOnce } from 'react-firebase-hooks/firestore';


// Firebase configuration for SOCRATES-DEMO database
// Need to make authentication work. Currently permission denied error.
// const firebaseConfig = {
//   apiKey: "AIzaSyCMyM1CXcwj4rBoHEeq8hUPBnr0VI21Co0",
//   authDomain: "socratesdemo-99f36.firebaseapp.com",
//   projectId: "socratesdemo-99f36",
//   storageBucket: "socratesdemo-99f36.appspot.com",
//   messagingSenderId: "969208138660",
//   appId: "1:969208138660:web:7af41e39da6d5db4f40f31",
//   measurementId: "G-PHVFGTQQ0N"
// }


// Firebase configuration for PLAY-WITH-FIRESTORE database
const firebaseConfig = {
  apiKey: "AIzaSyC9mJSVM2UnlZamuw0zSoGosyklGUShOEI",
  authDomain: "play-with-firestore-dc032.firebaseapp.com",
  projectId: "play-with-firestore-dc032",
  storageBucket: "play-with-firestore-dc032.appspot.com",
  messagingSenderId: "333488195018",
  appId: "1:333488195018:web:97862afe30715a0c08bb33"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);     // For authentication with sponsors' firestore
const db = getFirestore(app);     // db is the instance of Firestore

// Supposed the user has a user ID "4".
const uid = 2;



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


// WORKS
// Create a new decoument in message collection
async function createUserMessage (id, text) {
  var docRef = doc(db, "messages", id.toString());
  await setDoc(docRef, {
            user_id: id,
            date: Timestamp.now(),
            text_seq: arrayUnion(text)
  }).then(() => {
    alert("Data added.");
  })
  .catch((error) => {
    alert("Error occured: " + error);
  });
}


// WORKS
// Append one text to text_seq array
async function addToTextSeq(id, text) {
  var docRef = doc(db, "messages", id.toString());
  await updateDoc(docRef, {
            text_seq: arrayUnion(text)
  }).then(() => {
    alert("Data Updated.");
  })
  .catch((error) => {
    alert("Error occured: " + error);
  });
}


// WORK
// Get the user's activeDays from Firestore
function GetActiveDays(snapshot) {

    var activeDays = snapshot.get("activeDays");
    alert(activeDays);

}


// NOT FINISHED
// Add new user if new user. If user exist, update text.
async function addMessagesFunction(id, text) {
  const docRef = doc(db, "messages", id.toString());
  await docRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      docRef.onSnapshot((doc) => {
        addToTextSeq(doc, id, text);
      });
    } else {
      createUserMessage (docRef, id, text);
    }
  });
}


// NOT FINISHED
// Purpose: For each message that the user sends, compare it with the most recent activity in Firestore.
// If current timestamp > most recent record, new day happens. Increment activeDays by 1.
// Reset inactiveDaysLeft to 2.
// TODO: Research JS syntax and map.
async function getMostRecentActiveDate(docSnapshot) {

  // mostRecent = array of maps?
  var date_array = docSnapshot.get("allDates");
  var sorted_date_array = date_array.keys().sort();
  console.log(sorted_date_array);

}






export function Chat() {

  console.log("In Chat()");

  // messages is a list of messages between Socky and the user.
  const [messages, setMessages] = useState([]);

  // text is a string containing the content of each message.
  const [text, setText] = useState("");
  const { colors } = useColor();

  // const [msg_snapshot, msg_loading, msg_error, msg_reload] = useDocumentOnce(doc(db, "messages", uid.toString()));
  const [act_snapshot, act_loading, act_error, act_reload] = useDocumentOnce(doc(db, "activityCount", uid.toString()));



  // Defining onSubmit for when the user replies.
  // When the user tap send, shallow copy the prevMessage list.
  // Add the new {message.text, message.received} to the list.
  const onSubmit = (event) => {
    event.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, received: false },
    ]);

    
    // These works. Try it by uncommenting one at a time.
    // createUserMessage(uid, text);
    // addToTextSeq(uid, text);
    // GetActiveDays(act_snapshot);

    
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
