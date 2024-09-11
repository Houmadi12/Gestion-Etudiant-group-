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