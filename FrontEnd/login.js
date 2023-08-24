//Redirection vers page d'accueil après connexion
const redirect = function () {
    window.location.href = "index.html";
}

//Afficher message d'erreur 
const error = function () {
    if (!document.getElementById('error')) {
        const parentNode = document.querySelector("form");
        const beforeNode = document.getElementById("password");
        const msgErreur = document.createElement("p");
        msgErreur.classList.add("error");
        msgErreur.id = "error";
        msgErreur.innerHTML = 'Erreur dans l’identifiant ou le mot de passe';
        parentNode.insertBefore(msgErreur, beforeNode);
    }
}


async function LogIn(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
        "email": email,
        "password": password,
    }; // créé objet user 
    console.log(JSON.stringify(user));
    try {
        const fetchResult = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        });
        const jsonResult = await fetchResult.json();
        if (jsonResult.userId) {
            localStorage.setItem("token", jsonResult.token);
            redirect();
        } else if (!jsonResult.userId) {
            error();
        } else {
            alert(`HTTP¨error! status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
    
    


}



//Bouton connexion
const authButton = document.getElementById("auth");
console.log(authButton.value);
authButton.addEventListener('click', LogIn);
