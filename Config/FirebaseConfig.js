// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC9R2loYGYn17ULgr0EN_LqHX4bzqcnixA",
  authDomain: "business-directory-9f54c.firebaseapp.com",
  projectId: "business-directory-9f54c",
  storageBucket: "business-directory-9f54c.appspot.com",
  messagingSenderId: "625319441811",
  appId: "1:625319441811:web:69c34856309ce8ae21a466",
  measurementId: "G-C4WP0PEQFC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);