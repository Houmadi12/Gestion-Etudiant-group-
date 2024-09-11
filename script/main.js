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
  doc
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
const btn = document.querySelector("#btn1");
const prenom = document.querySelector("#name");
const nom = document.querySelector("#lastname");
const note = document.querySelector("#score");
const moyenne = document.querySelector("#average");
const rslt = document.querySelector("#result");
const tbody = document.querySelector("#tbody");

// Déclaration des variables
let etudians = [];
const filtre = document.getElementById("inputFilter");

// ==================================
//         Evenement boutton
// ==================================

// Reccuperation des donnée firebase


// Evenement Ajouter étudiant
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    prenom.value !== "" &&
    nom.value !== "" &&
    note.value !== "" &&
    moyenne.value !== ""
  ) {
    ajouterEtudiant(prenom, nom, note, moyenne);
    rslt.innerHTML = "Enregistrement reussi";
    rslt.classList.add("text-success");
  } else {
    rslt.innerHTML = "Remplissage des champs obligatoire";
    rslt.classList.add("text-danger");
  }
  AfficheEtudiants(etudians);
  // Vider les input
  prenom.value = "";
  nom.value = "";
  note.value = "";
  moyenne.value = "";
});

// =======================================
//             Fonctions
// =======================================

// Reccuperation des donnée
async function reccuperInfoEtudiant() {

  try {
    let liste = collection(db, "etudiants");
    const snapshot = await getDocs(liste);
       snapshot.docs.forEach((doc) => {
         etudians.push({ ...doc.data(), id: doc.id });
       });
    AfficheEtudiants(etudians);
  } catch (e) {
    console.error("Erreur: ", e);
  }
}
reccuperInfoEtudiant();
// Fonction d'ajout d'un étudiant
async function ajouterEtudiant(name, lastname, score, average) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "etudiants"), {
    prenom: name.value,
    nom: lastname.value,
    note: parseInt(score.value),
    moyenne: parseInt(average.value),
  });
//   reccuperInfoEtudiant();
  AfficheEtudiants(etudians);
  console.log("Document written with ID: ", docRef.id);
}

// Fonction Affiche Tableau
function AfficheEtudiants(tab) {
  const tbody = document.querySelector("#tbody");
  let tableList = "";
  for (let i = 0; i < tab.length; i++) {
    let index = i;
    if (i < tab.length) {
      tableList += `
                    <tr>
                        <td>${tab[i].prenom}</td>
                        <td>${tab[i].nom}</td>
                        <td>${tab[i].note}</td>
                        <td>${tab[i].moyenne}</td>
                        <td><button class="btn-modif btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="modifEtd(${index})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button class="btn-detail btn btn-info" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="detailEtd(${index})"><i class="fa-solid fa-eye"></i></button></td>
                        <td><button class="btn-supp btn btn-danger" onclick="detailDelate(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                `;
    }
  }

  tbody.innerHTML = tableList;
}

 window.detailDelate = async function (indice) {
    etudians.forEach(async (element)=>{
        if (
          element.nom === etudians[indice].nom &&
          element.prenom === etudians[indice].prenom &&
          element.note === etudians[indice].note &&
          element.moyenne === etudians[indice].moyenne
        ) {
                try {
                    await deleteDoc(doc(db, "etudiants", element.id));
                    reccuperInfoEtudiant();
                    console.log("Document supprimé avec succès.");
                } catch (error) {
                    console.error("Erreur lors de la suppression du document : ", error);
                }
        }
    })
 }

  // Fonction pour filtrer les étudiants
  function rechercheFilter() {
    const filterValue = filtre.value.toLowerCase();
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row) => {
      const firstName = row.textContent.toLowerCase();
      if (firstName.includes(filterValue)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
  filtre.addEventListener("input", rechercheFilter);
