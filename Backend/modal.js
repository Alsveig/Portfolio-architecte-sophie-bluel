/**function indexMod() {
    // créé lien cliquable et supprime les filtres
    const checkToken = localStorage.getItem("token");
    if (checkToken) {
        const modifierLink = document.createElement("a");
        modifierLink.innerHtml = "modifier";
        modifierLink.classList.add("modal_link");
        const beforeNode = document.getElementById("divForWorks");
        const parentNode = document.getElementById("portfolio");
        parentNode.insertBefore(modifierLink, beforeNode);
        //modifierLink.addEventListener('click',);
        const divToEmpty = document.getElementById("buttonDiv");
        divToEmpty.innerHTML = "";
    }
    // fonction à déclencher au clic = ouvrir la modale 
}*/



