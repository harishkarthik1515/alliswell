import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYb-YZ8Jg4GOFFOSmeoYp4h4N-eqibgIw",
  authDomain: "alliswell-51f8f.firebaseapp.com",
  projectId: "alliswell-51f8f",
  storageBucket: "alliswell-51f8f.appspot.com",
  messagingSenderId: "860598138034",
  appId: "1:860598138034:web:f0f8718f2c42fdbdaec5ab",
  measurementId: "G-YFK66S9S1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
