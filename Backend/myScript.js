// Récupère les travaux 
const getWorks = async () => {
    const fetchResult = await fetch("http://localhost:5678/api/works");
    const jsonResult = await fetchResult.json();
    console.log(jsonResult);
    return jsonResult; 
}


//Affiche les travaux
const displayWorks = (list, category) => {
    const portfolio =  document.getElementById("portfolio");
    portfolio.innerHTML = '';
    const title = portfolio.appendChild(document.createElement("h2"));
    title.innerHTML = "Mes Projets";
    portfolio.classList.add("gallery");

    if(category == null || category == 0)
    {
        for (let i = 0; i < list.length; i++) {
            let figure = document.createElement("figure")
            let figcaption = document.createElement("figcaption");
            figcaption.innerHTML = list[i].title;
            let image = document.createElement("img");
            image.src = list[i].imageUrl;
            image.alt = list[i].title;
            figure.appendChild(image);
            figure.appendChild(figcaption);
            portfolio.appendChild(figure);
        }
    }
    else{
        for (let i = 0; i < list.length; i++) {
            if(list[i].categoryId == category)
            {
                let figure = document.createElement("figure")
                let figcaption = document.createElement("figcaption");
                figcaption.innerHTML = list[i].title;
                let image = document.createElement("img");
                image.src = list[i].imageUrl;
                image.alt = list[i].title;
                figure.appendChild(image);
                figure.appendChild(figcaption);
                portfolio.appendChild(figure);
            }
        }
    }
}

// Créé les boutons filtres 
function setUpFilters() {
    

    let buttonTous = document.createElement("button");
    buttonTous.innerHTML = "Tous";
    portfolio.appendChild(buttonTous);
    //portfolio.insertBefore(buttonTous, );
    let buttonObjets = document.createElement("button");
    buttonObjets.innerHTML = "Objets";
    portfolio.appendChild(buttonObjets);
    let buttonApparts = document.createElement("button");
    buttonApparts.innerHTML = "Appartements";
    portfolio.appendChild(buttonApparts);
    let buttonHotels = document.createElement("button");
    buttonHotels.innerHTML = "Hôtels & Restaurants";
    portfolio.appendChild(buttonHotels);

    buttonTous.addEventListener('click', onFiltersClick);
    buttonObjets.addEventListener('click', onFiltersClick);
    buttonApparts.addEventListener('click', onFiltersClick);
    buttonHotels.addEventListener('click', onFiltersClick);
}

// Associer catégories et boutons 
function onFiltersClick(event){
    console.log(event.currentTarget.innerHTML);
}


//Appel fonction 
const letsGo = async () => {
    const list = await getWorks(); 
    displayWorks(list, 0);
    setUpFilters();
}
letsGo();

// Affiche les filtres de catégories
