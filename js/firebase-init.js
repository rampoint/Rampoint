// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUzAILjPJy3zoUVWkD7U4YdI6MDh_QlS4",
  authDomain: "rampoint-81352.firebaseapp.com",
  databaseURL: "https://rampoint-81352-default-rtdb.firebaseio.com",
  projectId: "rampoint-81352",
  storageBucket: "rampoint-81352.appspot.com",
  messagingSenderId: "694254448576",
  appId: "1:694254448576:web:7b78f9707f2625aa9ca225",
  measurementId: "G-5GMT9136G7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
