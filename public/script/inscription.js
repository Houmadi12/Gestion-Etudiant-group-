// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6Rc89AeMxmn7U5tLyxc1FF_LjlNGz98s",
  authDomain: "gestionetudiant-g.firebaseapp.com",
  projectId: "gestionetudiant-g",
  storageBucket: "gestionetudiant-g.appspot.com",
  messagingSenderId: "707935631381",
  appId: "1:707935631381:web:4fa247ca606dea5551b61c",
  measurementId: "G-56CH56JP3L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Selecteur
const inscrp = document.querySelector("#inscription");
const name = document.querySelector("#nom");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const respons = document.querySelector("#reponse");

inscrp.addEventListener("click", (e) => {
  e.preventDefault();

  if (name.value == "" && email.value == "" && password.value == "") {
    respons.innerHTML = "veuiller saisir un champs valide";
    respons.classList.add("text-danger");
  } else {


    ajouterUser(name.value, email.value, password.value);
    // ---test---
    respons.innerHTML = "enregistrement reussie"
    respons.classList.add("text-success")
    // -----fin-test---
    setTimeout(() => {
      document.location.href = "index.html"
    }, "1000")
  }
});

async function ajouterUser(name, mail, motDEpasse) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "users"), {
    nom: name,
    email: mail,
    password: motDEpasse,
  });
}
