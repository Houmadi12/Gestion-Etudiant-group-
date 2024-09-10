                                                                                                        // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6Rc89AeMxmn7U5tLyxc1FF_LjlNGz98s",
    authDomain: "gestionetudiant-g.firebaseapp.com",
    projectId: "gestionetudiant-g",
    storageBucket: "gestionetudiant-g.appspot.com",
    messagingSenderId: "707935631381",
    appId: "1:707935631381:web:4fa247ca606dea5551b61c",
    measurementId: "G-56CH56JP3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Selecteur
const btn = document.querySelector("#btn1");
const prenom = document.querySelector("#name");
const nom = document.querySelector("#lastname");
const note = document.querySelector("#score");
const moyenne = document.querySelector("#average");
const rslt = document.querySelector("#result")

// ==================================
//         Evenement boutton
// ==================================

// Evenement Ajouter étudiant
btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (prenom.value !== "" && nom.value !== "" && note.value !== "" && moyenne.value !== "") {

        ajouterEtudiant(prenom, nom, note, moyenne);
        rslt.innerHTML = "Enregistrement reussi"
        rslt.classList.add("text-success");

    }else{
        rslt.innerHTML = "Remplissage des champs obligatoire"
        rslt.classList.add("text-danger");
    }

    // Vider les input
    prenom.value = "";
    nom.value = "";
    note.value = "";
    moyenne.value = "";
})


// =======================================
//             Fonctions
// =======================================

// Fonction d'ajout d'un étudiant
async function ajouterEtudiant(name, lastname, score, average) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "etudiants"), {
        prenom: name.value,
        nom: lastname.value,
        note: score.value,
        moyenne: average.value
    });
    console.log("Document written with ID: ", docRef.id);
}