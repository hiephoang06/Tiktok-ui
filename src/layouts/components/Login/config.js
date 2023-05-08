import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCyFAbNkt_hhsbBhBGCnLY9NSq9JZbwVec",
  authDomain: "tiktok-8b393.firebaseapp.com",
  projectId: "tiktok-8b393",
  storageBucket: "tiktok-8b393.appspot.com",
  messagingSenderId: "25375337443",
  appId: "1:25375337443:web:0fff79259fe4b56b454ed6",
  measurementId: "G-CNY3FJSKX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export{auth, provider};
