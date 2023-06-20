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
    const buttonDiv = portfolio.appendChild(document.createElement("div"));
    buttonDiv.id = buttonDiv;
    const divForWorks = portfolio.appendChild(document.createElement("div"));
    divForWorks.classList.add("gallery");
    divForWorks.id = divForWorks;

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
            divForWorks.appendChild(figure);
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
                divForWorks.appendChild(figure);
            }
        }
    }

    let buttonTous = document.createElement("button");
    buttonTous.innerHTML = "Tous";
    buttonDiv.appendChild(buttonTous);
    let buttonObjets = document.createElement("button");
    buttonObjets.innerHTML = "Objets";
    buttonDiv.appendChild(buttonObjets);
    let buttonApparts = document.createElement("button");
    buttonApparts.innerHTML = "Appartements";
    buttonDiv.appendChild(buttonApparts);
    let buttonHotels = document.createElement("button");
    buttonHotels.innerHTML = "Hôtels & Restaurants";
    buttonDiv.appendChild(buttonHotels);

   buttonTous.addEventListener('click', function(){
    displayWorks(list, 0);
    
});
    buttonObjets.addEventListener('click', function(){
    displayWorks(list, 1);
    
});
   buttonApparts.addEventListener('click', function(){
    displayWorks(list, 2);
    
});
    buttonHotels.addEventListener('click', function(){
    displayWorks(list, 3);
    
});
}

// Créé les boutons filtres 
/**function setUpFilters(list) {  

    
    let buttonTous = document.createElement("button");
    buttonTous.innerHTML = "Tous";
    buttonDiv.appendChild(buttonTous);
    let buttonObjets = document.createElement("button");
    buttonObjets.innerHTML = "Objets";
    buttonDiv.appendChild(buttonObjets);
    let buttonApparts = document.createElement("button");
    buttonApparts.innerHTML = "Appartements";
    buttonDiv.appendChild(buttonApparts);
    let buttonHotels = document.createElement("button");
    buttonHotels.innerHTML = "Hôtels & Restaurants";
    buttonDiv.appendChild(buttonHotels);

   buttonTous.addEventListener('click', function(){
    displayWorks(list, 0);
    setUpFilters(list);
});
    buttonObjets.addEventListener('click', function(){
    displayWorks(list, 1);
    setUpFilters(list);
});
   buttonApparts.addEventListener('click', function(){
    displayWorks(list, 2);
    setUpFilters(list);
});
    buttonHotels.addEventListener('click', function(){
    displayWorks(list, 3);
    setUpFilters(list);
});
}*/


//Appel fonction 
const letsGo = async () => {
    const list = await getWorks(); 
    displayWorks(list, 0);
}
letsGo();

// Affiche les filtres de catégories
