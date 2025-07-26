// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCkbMEa_UzElh6eh-eCygvpVafmUMQOQZw",
  authDomain: "immuno-track.firebaseapp.com",
  projectId: "immuno-track",
  storageBucket: "immuno-track.firebasestorage.app",
  messagingSenderId: "414306294818",
  appId: "1:414306294818:web:e154beb01a677b3a1b3e7b",
  measurementId: "G-7RGGJF1MS3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
