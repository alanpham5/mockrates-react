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
  
// Supposed the user has a user ID "2".
const uid = 2;
  

async function a_createUserMessage (id, text) {
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


// Append one text to text_seq array
async function a_addToTextSeq(id, text) {
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


export function createUserMessage(text) {
  a_createUserMessage (uid, text);
}


export function addToTextSeq(text) {
    a_addToTextSeq(uid, text);
}


// Get the user's activeDays from Firestore
export function GetActiveDays() {

  const [act_snapshot, act_loading, act_error, act_reload] = useDocumentOnce(doc(db, "activityCount", uid.toString()));
  return act_snapshot.get("activeDays");

}











