import { getUser } from "./service.js";

const formelement = document.getElementById("login");
formelement.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const usernameElement = document.getElementById("user");
    const result = await getUser(usernameElement.value);
    
    if(result !== null){
        localStorage.setItem("username",result.name);
        console.log(result.children[0].name);
        localStorage.setItem("focuschild",result.children[0].name);
        localStorage.setItem("Potental","");
        window.location.href = "profile.html"
    }
})