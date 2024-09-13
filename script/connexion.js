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
const connexion = document.querySelector("#btn-connexion");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const respons = document.querySelector("#reponse");

connexion.addEventListener("click", (e) => {
  e.preventDefault();
  let un = email.value;
  let deux = password.value;
  connexionUser(un, deux);
});

// fonction de connexion

async function connexionUser(email, password) {
  let verifi = false;
  const colRef = collection(db, "users");

  // Écoutez les changements
  onSnapshot(colRef, (snapshot) => {
    let utilisateurs = [];

    snapshot.forEach((doc) => {
      utilisateurs.push({ ...doc.data(), id: doc.id });
    });
    console.log(utilisateurs);
    utilisateurs.forEach((element) => {
      if (element.email === email && element.password === password) {
        verifi = true;
        // document.location.href ='accueil.html'
      }
    });
    if (verifi === true) {
      alert("connexion reussie");
      document.location.href = "acceuil.html";
    } else {
        respons.innerHTML="veuillez verifier vos identifiants";
        respons.classList.add("text-danger");

    }
  });
}
