// Récupère les travaux 
const getWorks = async () => {
    const fetchResult = await fetch("http://localhost:5678/api/works");
    const jsonResult = await fetchResult.json();
    console.log(jsonResult);
    return jsonResult;
}

// Récupère les catégories
const getCat = async () => {
    const fetchResult = await fetch("http://localhost:5678/api/categories");
    const jsonResultCat = await fetchResult.json();
    console.log(jsonResultCat);
    return jsonResultCat;
}

// Crée modif intro 
const intro = document.getElementById("introduction");
const photo = document.getElementById("figure_intro");

const modifyPic = photo.appendChild(document.createElement("p"));
modifyPic.innerHTML = "modifier";
modifyPic.id = "pic-mod";

const prez = document.getElementById("prez");
const beforeMod = document.getElementById("before-mod");

const modifyPrez = document.createElement("p");
modifyPrez.innerHTML = "modifier";
modifyPrez.id = "prez-mod";
prez.insertBefore(modifyPrez, beforeMod);


// Crée div titre & modifier + div boutons + div travaux
const portfolio = document.getElementById("portfolio");
const titleDiv = document.createElement("div");
titleDiv.classList.add("portfolio_title");
portfolio.appendChild(titleDiv);
const title = titleDiv.appendChild(document.createElement("h2"));
title.innerHTML = "Mes Projets";
const modify = titleDiv.appendChild(document.createElement("p"));
modify.innerHTML = "modifier";
modify.id = "open-modal_button";
const buttonDiv = portfolio.appendChild(document.createElement("div"));
buttonDiv.id = "buttonDiv";
const divForWorks = portfolio.appendChild(document.createElement("div"));
divForWorks.classList.add("gallery");
divForWorks.id = "divForWorks";


// Afficher les travaux et les boutons
const display = (works, categories) => {

    //Affiche travaux 
    function showWorks(works, category) {
        divForWorks.innerHTML = "";
        if (category == null || category == 0) {
            for (let i = 0; i < works.length; i++) {
                let figure = document.createElement("figure")
                let figcaption = document.createElement("figcaption");
                figcaption.innerHTML = works[i].title;
                let image = document.createElement("img");
                image.src = works[i].imageUrl;
                image.alt = works[i].title;
                figure.appendChild(image);
                figure.appendChild(figcaption);
                divForWorks.appendChild(figure);
            }
        }
        else {
            for (let i = 0; i < works.length; i++) {
                if (works[i].categoryId == category) {
                    let figure = document.createElement("figure")
                    let figcaption = document.createElement("figcaption");
                    figcaption.innerHTML = works[i].title;
                    let image = document.createElement("img");
                    image.src = works[i].imageUrl;
                    image.alt = works[i].title;
                    figure.appendChild(image);
                    figure.appendChild(figcaption);
                    divForWorks.appendChild(figure);
                }
            }
        }
    }

    // Créé les filtres
    function createFilters(categories) {
        const showAllButton = document.createElement("button");
        showAllButton.id = "tous";
        showAllButton.innerHTML = "Tous";
        buttonDiv.appendChild(showAllButton);
        showAllButton.addEventListener('click', function () { showWorks(works, 0) });
        for (let i = 0; i < categories.length; i++) {
            const filterButton = document.createElement("button");
            filterButton.id = categories[i].id;
            filterButton.innerHTML = categories[i].name;
            buttonDiv.appendChild(filterButton);
            filterButton.addEventListener('click', function () { showWorks(works, filterButton.id) });
        }
    }
    showWorks(works, 0);
    createFilters(categories);
}

// Modifie apparence index si connecté ou non
function typeOfIndex() {
    const checkToken = localStorage.getItem("token");
    if (checkToken == null) {
        const blackBar = document.getElementById("black_bar");
        blackBar.style.display = "none";
        modify.style.display = "none";
        modifyPic.style.display = "none";
        modifyPrez.style.display = "none";
    } else {
        buttonDiv.style.display = "none";
    }
}

// Gestion de la modale
const modale = document.getElementById("modal1");
const blur = document.querySelector("div");
const closeButton = document.getElementById("close");
modale.style.display = "none";
const modale2 = document.getElementById("modal2");
modale2.style.display = "none";

//Ouvrir modale
const openModal1 = function () {
    modale.style.display = "block";
    modale2.style.display = "none";
    blur.id = "blur";
}

//Fermer modale
const closeModal1 = function () {
    modale.style.display = "none";
    blur.id = "";
}
modify.addEventListener('click', function () { openModal1() });
closeButton.addEventListener('click', function () { closeModal1() });

//Aller de la modale 1 à la 2
const addButton = document.getElementById("add_button");
addButton.addEventListener('click', function () { goAddModal() });
const goAddModal = function () {
    modale.style.display = "none";
    modale2.style.display = "block";
}

// Retour modale 2 vers 1 
const from2to1 = function () {
    modale.style.display = "block";
    modale2.style.display = "none";
    blur.id = "blur";
}
const modalReturn = document.getElementById("return-arrow");
modalReturn.addEventListener('click', function () { from2to1() })

// Fermer modale depuis modale 2
const closeModal2 = function () {
    modale.style.display = "none";
    modale2.style.display = "none";
    blur.id = "";
}
const close2 = document.getElementById("close2");
close2.addEventListener('click', function () { closeModal2() });


// Affiche travaux + créé bouton supp
function listing(works) {
    const divListing = document.getElementById("listing");

    for (let i = 0; i < works.length; i++) {
        let figure = document.createElement("figure")
        let figcaption = document.createElement("figcaption");
        figcaption.innerHTML = "éditer";
        let image = document.createElement("img");
        image.src = works[i].imageUrl;
        image.alt = works[i].title;
        const trash = document.createElement("i");
        trash.classList.add("fa-regular", "fa-trash-can", "fa-2xs");
        trash.id = works[i].id;
        const trashId = trash.id;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        image.insertAdjacentElement("beforebegin", trash);
        divListing.appendChild(figure);

        trash.addEventListener('click', function () { deleteWork(trashId) });
    }
    //Supprimer un projet 
    function deleteWork(id) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

//Créer options form modale 2 
const catField = document.getElementById("category");

function createFormCatList(categories){
    const emptyOption = document.createElement("option");
    emptyOption.classList.add("options");
    catField.appendChild(emptyOption);
    for (let i = 0; i < categories.length; i++){
        const option = document.createElement("option");
        option.classList.add("options");
        option.value = categories[i].name;
        option.innerHTML = categories[i].name;
        catField.appendChild(option);
    }
}

const workForm = document.getElementById("new-work_form");
const sendWork = document.getElementById("valid");

sendWork.onclick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);

    const response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: new FormData(workForm),
    });

    const result = await response.json();
    console.log(result.message);
}

console.log(localStorage.getItem("token"));

const letsGo = async () => {
    const works = await getWorks();
    const categories = await getCat();
    typeOfIndex();
    display(works, categories);
    listing(works);
    createFormCatList(categories);
}
letsGo();

