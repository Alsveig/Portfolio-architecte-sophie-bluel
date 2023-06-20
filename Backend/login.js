
async function LogIn(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
        "email": email,
        "password": password,
    }; // créé objet user 
    console.log(JSON.stringify(user));

    const fetchResult = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    console.log('zbrbrbr');
    const jsonResult = await fetchResult.json();
    console.log(jsonResult);
    localStorage.setItem("token", jsonResult.token);

    if (jsonResult.userId){
        alert('IT WORKS');
        redirect();
    } else {
        alert('Erreur dans l’identifiant ou le mot de passe');
    }
}

//Redirection vers page d'accueil après connexion
const redirect = function(){
    window.location.href="https://alsveig.github.io/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
};


const authButton = document.getElementById("auth");
authButton.addEventListener('click', LogIn);

