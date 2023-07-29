import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

  (()=>{// Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCvy5U5VgRBqbX8xB3pv98NGbDvUTgl6zQ",
    authDomain: "imdb-clone12.firebaseapp.com",
    databaseURL: "https://imdb-clone12-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "imdb-clone12",
    storageBucket: "imdb-clone12.appspot.com",
    messagingSenderId: "963159739617",
    appId: "1:963159739617:web:b764b0d144e4cdec973ba0",
    measurementId: "G-XH9M2MZZTV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);})();