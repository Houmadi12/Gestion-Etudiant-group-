// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore, doc, getDocs, addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBc-g4b8BiwsbBigH9xNilnNEi_1jLSpWI",
    authDomain: "gestion-etudiants-f98e2.firebaseapp.com",
    projectId: "gestion-etudiants-f98e2",
    storageBucket: "gestion-etudiants-f98e2.appspot.com",
    messagingSenderId: "299493335262",
    appId: "1:299493335262:web:eddac99292f8584f98224f",
    measurementId: "G-FFBY6NM6QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
