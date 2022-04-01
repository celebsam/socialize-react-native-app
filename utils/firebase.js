import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBbUC088_k1f3SQej7EJcCFkE0zH9h3YE",
  authDomain: "signal-clone-c8453.firebaseapp.com",
  projectId: "signal-clone-c8453",
  storageBucket: "signal-clone-c8453.appspot.com",
  messagingSenderId: "522263091920",
  appId: "1:522263091920:web:b27f4d4996d1fd46e49cd5",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
