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
    const auth = firebase.auth();
    const database = firebase.database()