import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBBCjjZh785QhMZxSnPtvwK1bSdGgHwsrk",
  authDomain: "facechat-e88e2.firebaseapp.com",
  projectId: "facechat-e88e2",
  storageBucket: "facechat-e88e2.appspot.com",
  messagingSenderId: "834886804732",
  appId: "1:834886804732:web:103aff3a863493bb602379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

