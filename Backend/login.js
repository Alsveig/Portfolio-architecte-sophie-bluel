
/**function LogIn(){
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if ( email == "sophie.bluel@test.tld" && password == "S0phie"){
        
// valider la connexion 
// diriger vers page d'accueil

     
    } else {
        return 'Erreur dans l’identifiant ou le mot de passe';
    }
    }
*/


async function LogIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email == "sophie.bluel@test.tld" && password == "S0phie"){
        console.log('IT WORKS');
    } else {
        return 'Erreur dans l’identifiant ou le mot de passe';
    }
    const user = {
        "email": email,
        "password": password,
    }; // créé objet user 
    console.log(user);
    const fetchResult = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const jsonResult = await fetchResult.json();
    console.log(jsonResult);
    localStorage.setItem("token", jsonResult.token);
    
}

const authButton = document.getElementById("auth");
authButton.addEventListener('click', LogIn);

