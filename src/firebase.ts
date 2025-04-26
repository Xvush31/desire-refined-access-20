import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSwgFru3vvuT6HVhbTV-VUejHWCzJTy50",
  authDomain: "xvush-3190c.firebaseapp.com",
  projectId: "xvush-3190c",
  storageBucket: "xvush-3190c.firebasestorage.app",
  messagingSenderId: "271258165744",
  appId: "1:271258165744:web:86aeb6fb0c6f1912af7d35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
