import { getUser } from "./service.js";

async function renderPage(){
    const username = localStorage.getItem("username");
    const profile = await getUser(username);
    console.log(profile.children)
    buildChildCard(profile.children);
    BuildParentcard(profile.name);
}
function buildChildCard(children){
    const childrenContainerElement = document.getElementById("children");

    childrenContainerElement.replaceChildren();

    children.forEach(child => {
        const childElement = document.createElement("div");
        childElement.classList = "childcard";
        const nameElement = document.createElement("div"); 
        nameElement.textContent = child.name;
        childElement.appendChild(nameElement);
        childrenContainerElement.appendChild(childElement);
    });
    
    
}
function BuildParentcard(name){
    const parentElement = document.getElementById("content");
    const nameElement = document.createElement("div");

    parentElement.replaceChildren();
    
    nameElement.textContent = name;
    parentElement.appendChild(nameElement);

}
renderPage();