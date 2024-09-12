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
const password = document.querySelector("#password") 


inscrp.addEventListener("click", (e) => {
  e.preventDefault(); 
  name.value = "Ambdou";
  email.value = "Soilihi@gmail.com";
  

}) 
// inscrp.addEventListener("click", (e) => {
        // e.preventDefault();
        // if (prenom.value !== "" && nom.value !== "" && note.value !== "" && moyenne.value !== "") {
      
        //   ajouterEtudiant(prenom, nom, note, moyenne)
        //   rslt.innerHTML = "Enregistrement reussi"
        //   rslt.classList.add("text-success");
        //   setTimeout(()=>{rslt.innerHTML = "Veuillez re-enregistrer"},"1000");
        // } else {
        //   rslt.innerHTML = "Remplissage des champs obligatoire"
        //   rslt.classList.add("text-danger");
        // }
        // // Vider les input
        // prenom.value = ""
        // nom.value = "";
        // note.value = "";
        // moyenne.value = "";      
// })

async function ajouterEtudiant() {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "etudiants"), {
      nom: lastname.value,
      email:"",
      password:""
    });
    reccuperInfoEtudiant();
    prenom.value = "";
    nom.value = "";
    note.value = ""
    moyenne.value = ""
  }