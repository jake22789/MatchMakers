import { CreateNewUser, getUser } from "./service.js";

const formelement = document.getElementById("login");
formelement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameElement = document.getElementById("user");
  const result = await getUser(usernameElement.value);

  if (result !== null) {
    localStorage.setItem("username", result.name);
    if (result.children[0]) {
      localStorage.setItem("focuschild", result.children[0].name);
    }
    localStorage.setItem("Potental", "");
    window.location.href = "profile.html";
  }
});
const newAcountElement = document.getElementById("newUser");
newAcountElement.addEventListener("click", () => {
  const containerElement = document.getElementById("form");

  const userFormElement = document.createElement("form");
  const userLabelElement = document.createElement("label");
  const userNameElement = document.createElement("input");
  const userSubmitElement = document.createElement("input");
  userFormElement.classList = "login";
  userLabelElement.textContent = "Parent Name";
  userSubmitElement.type = "submit";
  userNameElement.id = "input";
  userFormElement.appendChild(userLabelElement);
  userFormElement.appendChild(userNameElement);
  userFormElement.appendChild(userSubmitElement);

  userFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userinputElement = document.getElementById("input");
    console.log(userinputElement.value);
    if (userinputElement.value) {
      CreateNewUser(userinputElement.value);
    }
  });

  containerElement.replaceChildren();

  containerElement.appendChild(userFormElement);
});
