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
const btn = document.querySelector("#btn1");
const prenom = document.querySelector("#name");
const nom = document.querySelector("#lastname");
const note = document.querySelector("#score");
const moyenne = document.querySelector("#average");
const rslt = document.querySelector("#result");
const tbody = document.querySelector("#tbody")

// Selecteur modifier
const modifPrenom = document.querySelector("#prenomEdit");
const modifnom = document.querySelector("#nomEdit");
const modifnote = document.querySelector("#noteEdit");
const modifmoyenne = document.querySelector("#moyenneEdit");
const verfie = document.querySelector("#verifie");

// Déclaration des variables
const filtre = document.getElementById("inputFilter");
let allStudents = [];
let actuelPage = 1;
const studentsPerPage = 5;

// ==================================
//         Evenement boutton
// ==================================

// Evenement Ajouter étudiant
btn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("bonjour");

  // if (prenom.value !== "" && nom.value !== "" && note.value !== "" && moyenne.value !== "") {

  //   ajouterEtudiant(prenom, nom, note, moyenne)
  //   rslt.innerHTML = "Enregistrement reussi"
  //   rslt.classList.add("text-success");
  //   setTimeout(() => { rslt.innerHTML = "Veuillez re-enregistrer" }, "1000");
  // } else {
  //   rslt.innerHTML = "Remplissage des champs obligatoire"
  //   rslt.classList.add("text-danger");
  // }
  // // Vider les input
  // prenom.value = ""
  // nom.value = "";
  // note.value = "";
  // moyenne.value = "";
})


// =======================================
//             Fonctions
// =======================================

// Verifie note
window.verifieNote = function(){
  const valeur = note.value;
  
  if(parseInt(valeur)>=0 && parseInt(valeur)<=20){
    setTimeout(()=>{
      note.classList.remove("border-danger");
      btn.classList.remove("disabled");
      note.classList.add("border-success")
    },"1000");
  }else{
    setTimeout(()=>{
      note.classList.add("border-danger");
      btn.classList.add("disabled")
    },"1000");
  }

}

// Verifie moyenne
window.verifieMoyenne = function(){
  const valeur = moyenne.value;
  
  if(parseInt(valeur)>=0 && parseInt(valeur)<=20){
    setTimeout(()=>{
      moyenne.classList.remove("border-danger");
      btn.classList.remove("disabled");
      moyenne.classList.add("border-success")
    },"1000");
  }else{
    setTimeout(()=>{
      moyenne.classList.add("border-danger");
      btn.classList.add("disabled")
    },"1000");
  }

}

// Verifie note Modifier
window.verifieNoteModif = function(){
  const valeur =  modifmoyenne.value;
  
  if(parseInt(valeur)>=0 && parseInt(valeur)<=20){
    setTimeout(()=>{
      modifmoyenne.classList.remove("border-danger");
      btn.classList.remove("disabled");
      modifmoyenne.classList.add("border-success")
    },"1000");
  }else{
    setTimeout(()=>{
      modifmoyenne.classList.add("border-danger");
      document.querySelector("#modif-btn").classList.add("disabled")
    },"1000");
  }

}


// Reccuperation des donnée
async function reccuperInfoEtudiant() {

  const colRef = collection(db, "etudiants");

  // Écoutez les changements
  onSnapshot(colRef, (snapshot) => {

    let etudians = []

    snapshot.forEach((doc) => {
      etudians.push({ ...doc.data(), id: doc.id })
    });
    console.log(etudians);
    afficherEtudiants(etudians)
  });

}

reccuperInfoEtudiant();

// Fonction d'ajout d'un étudiant
async function ajouterEtudiant(name, lastname, score, average) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "etudiants"), {
    prenom: name.value,
    nom: lastname.value,
    note: parseInt(score.value),
    moyenne: parseInt(average.value)
  });
  reccuperInfoEtudiant();
  prenom.value = "";
  nom.value = "";
  note.value = ""
  moyenne.value = ""
}

// Fonction Affiche Tableau
function AfficheEtudiants(tab) {
  const tbody = document.querySelector("#tbody");

  let tableList = ''
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
  card();
  tbody.innerHTML = tableList;
}

window.modifEtd = function (indice) {
  const colRef = collection(db, "etudiants");

  // Écoutez les changements
  onSnapshot(colRef, (snapshot) => {
    let etudians = [];

    snapshot.forEach((doc) => {
      etudians.push({ ...doc.data(), id: doc.id });
      console.log(etudians);
    });

    modifPrenom.value = etudians[indice].prenom;
    modifnom.value = etudians[indice].nom;
    modifnote.value = etudians[indice].note;
    modifmoyenne.value = etudians[indice].moyenne;

    document.querySelector("#modif-btn").addEventListener("click", async (e) => {
      e.preventDefault();
      const resulModif = document.querySelector("#resltMdf");

      for (let i = 0; i < etudians.length; i++) {

        if (etudians[i].id === etudians[indice].id) {

          const washingtonRef = doc(db, "etudiants", etudians[i].id);

          // Set the "capital" field of the city 'DC'
          await updateDoc(washingtonRef, {
            prenom: modifPrenom.value,
            nom: modifnom.value,
            note: modifnote.value,
            moyenne: modifmoyenne.value
          });

          resulModif.innerHTML = "Modification reussi";
          resulModif.classList.add("text-success")
          modifPrenom.value = "";
          modifnom.value = "";
          modifnote.value = "";
          modifmoyenne.value = "";
        }
      }
    });
  });
};


// Fonction d'affichage de card
function card() {

  const SommeNote = document.querySelector("#SommeNotes");
  const PlusGrandeMoyenne = document.querySelector("#MoyenPlusGrand");
  let nbrEtudiant = document.getElementById("nbrEtudiants");
  let Tableau = [];
  let somme = 0;

  const colRef = collection(db, "etudiants");

  // Écoutez les changements
  onSnapshot(colRef, (snapshot) => {

    let etudians = []

    snapshot.forEach((doc) => {
      etudians.push({ ...doc.data(), id: doc.id })
    });

    for (let i = 0; i < etudians.length; i++) {
      somme += parseInt(etudians[i].note);
      Tableau.push(parseInt(etudians[i].moyenne));
    }

    let num = Math.max(...Tableau);
    SommeNote.innerHTML = somme;
    
    if(num == "-Infinity"){
      PlusGrandeMoyenne.innerHTML = 0;
    }else{
      PlusGrandeMoyenne.innerHTML = num;
    }

    nbrEtudiant.innerHTML = etudians.length;

  });
}

// Fonction detail
window.detailEtd = function (indice) {
  const colRef = collection(db, "etudiants");

  // Écoutez les changements
  onSnapshot(colRef, (snapshot) => {

    let etudians = []

    snapshot.forEach((doc) => {
      etudians.push({ ...doc.data(), id: doc.id })
    });

    document.querySelector("#prenomDetail").innerText = etudians[indice].prenom;
    document.querySelector("#nomDetail").innerText = etudians[indice].nom;
    document.querySelector("#noteDetail").innerText = etudians[indice].note;
    document.querySelector("#moyenneDetail").innerText = etudians[indice].moyenne;

  });
}

window.detailDelate = async function (indice) {

  const colRef = collection(db, "etudiants");
  let etudians = []
  // Écoutez les changements
  onSnapshot(colRef, (snapshot) => {
    snapshot.forEach((doc) => {
      etudians.push({ ...doc.data(), id: doc.id })
    });
    etudians.forEach(async (element) => {
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
          console.error("Erreur lors de la suppression du document : ", error)
        }
      }
    })
  });
}

async function filterEtudiants(e) {

  const searchString = e.target.value.toLowerCase();

  try {
    const colRef = collection(db, "etudiants");
    const snapshot = await getDocs(colRef);

    allStudents = [];
    snapshot.forEach((doc) => {
      allStudents.push({ ...doc.data(), id: doc.id });
    });

  let filterData = allStudents.filter(el => el.prenom.toLowerCase().includes(searchString));
     // Afficher la première page des étudiants
     afficherEtudiants(filterData);
} catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
  }
}

filtre.addEventListener("input", filterEtudiants);



// --------------------------pagination------

async function reccuperInfo() {
  try {
    const colRef = collection(db, "etudiants");
    const snapshot = await getDocs(colRef);

    allStudents = [];
    snapshot.forEach((doc) => {
      allStudents.push({ ...doc.data(), id: doc.id });
    });

    // Afficher la première page des étudiants
    afficherEtudiants(allStudents);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
  }
}

reccuperInfo();

function afficherEtudiants(tab) {
  // Calculer les indices de début et de fin pour la page actuelle
  const startIndex = (actuelPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  // Découper le tableau pour obtenir la page actuelle des étudiants
  const paginatedStudents = tab.slice(startIndex, endIndex);
  // const paginatedStudents = allStudents.slice(startIndex, endIndex);

  // Afficher les étudiants dans le tableau
  AfficheEtudiants(paginatedStudents);

  // Mettre à jour les contrôles de pagination
  mettreAJourControlesPagination();
}

function mettreAJourControlesPagination() {
  const totalPages = Math.ceil(allStudents.length / studentsPerPage);

  // Mettre à jour les boutons Précédent et Suivant
  document.getElementById('prevPage').disabled = actuelPage === 1;
  document.getElementById('nextPage').disabled = actuelPage === totalPages;

  // Mettre à jour l'affichage du numéro de la page
  document.getElementById("pageInfo").innerText = `Page ${actuelPage} sur ${totalPages}`;
}

document.getElementById('prevPage').addEventListener('click', async () => {
  if (actuelPage > 1) {
    actuelPage--;
    try {
      const colRef = collection(db, "etudiants");
      const snapshot = await getDocs(colRef);
  
      allStudents = [];
      snapshot.forEach((doc) => {
        allStudents.push({ ...doc.data(), id: doc.id });
      });
  
      // Afficher la première page des étudiants
      afficherEtudiants(allStudents);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
    // afficherEtudiants(etudians);
  }
});

document.getElementById('nextPage').addEventListener('click', async () => {
  const totalPages = Math.ceil(allStudents.length / studentsPerPage);
  if (actuelPage < totalPages) {
    actuelPage++;
    try {
      const colRef = collection(db, "etudiants");
      const snapshot = await getDocs(colRef);
  
      allStudents = [];
      snapshot.forEach((doc) => {
        allStudents.push({ ...doc.data(), id: doc.id });
      });
  
      // Afficher la première page des étudiants
      afficherEtudiants(allStudents);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
    // afficherEtudiants(etudians);
  }
});


