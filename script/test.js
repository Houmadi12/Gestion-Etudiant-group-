async function mettre() {
    try {
        const snapshot = await getDocs(liste);
        snapshot.docs.forEach(doc => {
            todo.push({ ...doc.data(), id: doc.id });
        });
        onSnapshot(liste, (snap) => {
            todo = [];
            snap.docs.forEach((doc) => {
                todo.push({ ...doc.data(), id: doc.id });
            });
            ajouter();
        });
    } catch (e) {
        console.error("Erreur: ", e);
    }
}



// afficher les infos dans le card
function AfficheCard(tab) {
    // Déclaration des variable necessaire pour l'affichage de card
    let sommeNote = 0;
    let tabMoyenne = [];


    for (let i = 0; i < tab.length; i++) {
        sommeNote += parseInt(tab[i].note);
        tabMoyenne.push(parseInt(tab[i].moyenne));
    }

    let max = Math.max(...tabMoyenne);

    someEtd.innerText = sommeNote;
    // moyennePlusGrand.innerText = max
    nbrEtd.innerText = tab.length;

    if (max == "-Infinity") {
        moyenneetd.innerText = 0;
    } else {
        moyenneetd.innerText = max
    }
}

// Sindy Code
function card(tab) {
  const SommeNote = document.querySelector("#SommeNotes");
  const PlusGrandeMoyenne = document.querySelector("#MoyenPlusGrand");
  let nbrEtudiant = document.getElementById("nbrEtudiants");
  let Tableau = [];
  let somme = 0;
  for (let i = 0; i < tab.length; i++) {
    somme += parseInt(tab[i].note);
    Tableau.push(parseInt(tab[i].moyenne));
  }

  let num = Math.max(...Tableau);
  SommeNote.innerHTML = somme;
  PlusGrandeMoyenne.innerHTML = num;

  nbrEtudiant.innerHTML = tab.length;
}

// Mariama code filtre

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
