import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBByfsGVwOQEw_0aqKyxwUXsa7aRID3yIE",
  authDomain: "miniblog-a195c.firebaseapp.com",
  projectId: "miniblog-a195c",
  storageBucket: "miniblog-a195c.firebasestorage.app",
  messagingSenderId: "323389948722",
  appId: "1:323389948722:web:d4f2740bac9530cbda4d2b",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
