// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATMQMPBLEqdO9RBlUsVP4gMHFO7RanvDg",
  authDomain: "bots-and-botany-sheet.firebaseapp.com",
  projectId: "bots-and-botany-sheet",
  storageBucket: "bots-and-botany-sheet.firebasestorage.app",
  messagingSenderId: "600941946831",
  appId: "1:600941946831:web:36bab88d7637c6ac6454ba",
  measurementId: "G-2087J89E67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);
