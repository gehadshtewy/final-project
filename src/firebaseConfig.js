// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtdPpIDCCTnmP3ZgnBcloLQ9TH9Aewj-Y",
  authDomain: "delicious-5b9de.firebaseapp.com",
  projectId: "delicious-5b9de",
  storageBucket: "delicious-5b9de.appspot.com",
  messagingSenderId: "796258916459",
  appId: "1:796258916459:web:aadf26229eba0c3f79f92e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);