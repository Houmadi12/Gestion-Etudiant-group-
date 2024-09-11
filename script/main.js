// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';


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
// ==========================
//          Selecteur
// ==========================

// Selecteur d'ajout
const btn = document.querySelector("#btn1");
const prenom = document.querySelector("#name");
const nom = document.querySelector("#lastname");
const note = document.querySelector("#score");
const moyenne = document.querySelector("#average");
const rslt = document.querySelector("#result");
const tbody = document.querySelector("#tbody");


// Selecteur modification
const modifPrenom = document.querySelector("#prenomEdit");
const modifnom = document.querySelector("#nomEdit");
const modifnote = document.querySelector("#noteEdit")
const modifmoyenne = document.querySelector("#moyenneEdit")
// Déclaration des variables
let etudians = [];
let max = 0

// ==================================
//         Evenement boutton
// ==================================

// Reccuperation des donnée firebase
reccuperInfoEtudiant();

// Evenement Ajouter étudiant
btn.addEventListener("click",(e) => {
    e.preventDefault();
    if (prenom.value !== "" && nom.value !== "" && note.value !== "" && moyenne.value !== "") {

        ajouterEtudiant(prenom, nom, note, moyenne);
        rslt.innerHTML = "Enregistrement reussi"
        rslt.classList.add("text-success");
      

    }else{
        rslt.innerHTML = "Remplissage des champs obligatoire"
        rslt.classList.add("text-danger");
    }
    AfficheEtudiants(etudians);

    // Vider les input
    prenom.value = "";
    nom.value = "";
    note.value = "";
    moyenne.value = "";
})


// =======================================
//             Fonctions
// =======================================

// Reccuperation des donnée
async function reccuperInfoEtudiant() {
    const querySnapshot = await getDocs(collection(db, "etudiants"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        etudians.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });

    AfficheEtudiants(etudians);


}

// Fonction d'ajout d'un étudiant
async function ajouterEtudiant(name, lastname, score, average) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "etudiants"), {
        prenom: name.value,
        nom: lastname.value,
        note: parseInt(score.value),
        moyenne: parseInt(average.value)
    });
    console.log("Document written with ID: ", docRef.id);
  
}

// Fonction Affiche Tableau
function AfficheEtudiants (tab) {
    const tbody = document.querySelector("#tbody");
    let tableList = '';
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
                        <td><button class="btn-supp btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                `
        }
        // max++
        // NombreEtudiant()
    }
    card(tab)
    tbody.innerHTML = tableList;
   
}


function NombreEtudiant() {
    let nbrEtudiant= document.getElementById("nbrEtudiants");
    nbrEtudiant.innerText = max;

}
// window.modifEtd =  function modifEtd(id) {
//     alert("salut")
//     const washingtonRef = doc(db, "etudians", "modifEtd.id");

// // Set the "capital" field of the city 'DC'
//  updateDoc(washingtonRef, {
//     prenom: name.value,
//     nom: lastname.value,
//     note: parseInt(score.value),
//     moyenne: parseInt(average.value)
// });

    
// }

// window.modifEtd =  function modifEtd(id) {
//     // alert(etudians[id].prenom)

//     etudians[id].prenom =modifPrenom.value
//     modifnom.value =etudians[id].nom 
//     modifnote.value =etudians[id].note 
//     modifmoyenne.value =etudians[id].moyenne

  

// }



// Assurez-vous que Firebase est correctement initialisé dans votre projet

// Fonction pour modifier les données d'un étudiant
window.modifEtd = function modifEtd(id) {
    // Accéder aux éléments du formulaire
    const prenom = document.getElementById('prenomEdit').value;
    const nom = document.getElementById('nomEdit').value;
    const note = document.getElementById('noteEdit').value;
    const moyenne = document.getElementById('moyenneEdit').value;
    
    // Référence à la base de données Firebase
    const dbRef = firebase.database().ref('etudians/' + id);
    
    // Mise à jour des données
    dbRef.update({
        prenom: prenom,
        nom: nom,
        note: note,
        moyenne: moyenne
    }).then(() => {
        // Succès
        alert('Les données ont été mises à jour avec succès!');
    }).catch((error) => {
        // Erreur
        console.error('Erreur lors de la mise à jour:', error);
        alert('Une erreur est survenue lors de la mise à jour des données.');
    });
}


function card(tab){
    const SommeNote= document.querySelector("#SommeNotes");
    const PlusGrandeMoyenne= document.querySelector("#MoyenPlusGrand")
    let nbrEtudiant= document.getElementById("nbrEtudiants");
    let Tableau = []
    let somme = 0
for(let i=0;i<tab.length;i++){
    somme+=tab[i].note
Tableau.push(parseInt(tab[i].moyenne))
}

let num = Math.max(...Tableau)
SommeNote.innerHTML=somme
PlusGrandeMoyenne.innerHTML = num

nbrEtudiant.innerHTML = tab.length

}


