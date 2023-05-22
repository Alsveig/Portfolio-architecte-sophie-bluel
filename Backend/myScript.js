// // let allWorks = [];

// // const 
// //     fetch("http://localhost:5678/api/works")
// //         .then(reponse => reponse.json())
// //         //.then(reponse2 => console.table(reponse2))
// //         .then(function (data) {
// //             displayWorks(data)
// //         });
      

// // let portfolioSection = document.getElementById("portfolio");
// // let galleryContainer = document.createElement("div");
// // galleryContainer.classList.add("gallery");
// // portfolioSection.appendChild(galleryContainer);

// // let worksArray = [];

// //     for (let i = 0; i < works.length; i++) {
// //         let figure = document.createElement("figure")
// //         let figcaption = document.createElement("figcaption");
// //         figcaption.innerHTML = allWorks[i].title;
// //         let image = document.createElement("img");
// //         image.src = allWorks[i].imageUrl;
// //         image.alt = allWorks[i].title;
// //         figure.appendChild(image);
// //         figure.appendChild(figcaption);
// //         worksArray[i] = figure;
// //         galleryContainer.appendChild(figure);
// //     }

// Récupère les données 
const getWorks = async () => {
    const fetchResult = await fetch("http://localhost:5678/api/works");
    const jsonResult = await fetchResult.json();
    console.log(jsonResult);
    return jsonResult; 
}

//Affiche les données dans le DOM 


const displayWorks = (list) => {
    const portfolio =  document.getElementById("portfolio");
    portfolio.classList.add("gallery");
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

const letsGo = async () => {
    const list = await getWorks(); 

    displayWorks(list);
}

letsGo();
