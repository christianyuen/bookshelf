// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB3ldNIyxCj-GAOd4F_uqn76cGH-HVFTI",
    authDomain: "react-bookshelf-b6566.firebaseapp.com",
    databaseURL: "https://react-bookshelf-b6566-default-rtdb.firebaseio.com",
    projectId: "react-bookshelf-b6566",
    storageBucket: "react-bookshelf-b6566.appspot.com",
    messagingSenderId: "847411714371",
    appId: "1:847411714371:web:9c7c670da5e8d7b56637f6"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;