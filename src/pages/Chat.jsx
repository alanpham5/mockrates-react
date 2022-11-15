import { Message } from "../components/Message";

export function Chat() {
  return (
    <div>
      <h1>This is the chat page.</h1>
      <Message
        backgroundColor={"#81968F"}
        text="We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy...I just want to tell you how I'm feeling Gotta make you understand. Never gonna give you up, never gonna let you down Never gonna run around and desert you "
        isReceived={true}
      />
      <Message
        backgroundColor={"#81968F"}
        text="Never gonna make you cry, never gonna say goodbye Never gonna tell a lie and hurt you"
      />
    </div>
  );
}
